/* Homepage reel: plays muted while on screen, pauses off screen, chapter bars follow playback. */
(() => {
  const root = document.querySelector("[data-reel]");
  if (!root) return;

  const video = root.querySelector(".reel-video");
  const frame = root.querySelector(".reel-frame");
  const stage = root.querySelector(".reel-stage");
  const toggle = root.querySelector(".reel-toggle");
  const toggleText = root.querySelector(".reel-toggle__text");
  const bigPlay = root.querySelector(".reel-play");
  const chapters = [...root.querySelectorAll(".reel-chapter")].map((el) => ({
    el,
    start: parseFloat(el.dataset.start),
    end: parseFloat(el.dataset.end),
  }));
  if (!video || !frame || !chapters.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const saveData = !!(navigator.connection && navigator.connection.saveData);

  // Take over from the native controls the page ships with for no-JS visitors.
  video.removeAttribute("controls");
  video.controls = false;
  video.muted = true;
  root.classList.add("is-enhanced");

  let userPaused = reduceMotion.matches || saveData;
  let inView = false;
  let raf = 0;

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

  function paint() {
    const t = video.currentTime || 0;
    const total = isFinite(video.duration) && video.duration > 0 ? video.duration : chapters[chapters.length - 1].end;
    chapters.forEach((c, i) => {
      const end = i === chapters.length - 1 ? total : c.end;
      const p = clamp((t - c.start) / (end - c.start));
      c.el.style.setProperty("--p", p.toFixed(4));
      const active = t >= c.start && (t < end || i === chapters.length - 1);
      c.el.classList.toggle("is-active", active);
      if (active) c.el.setAttribute("aria-current", "step");
      else c.el.removeAttribute("aria-current");
    });
  }

  function loop() {
    paint();
    raf = video.paused ? 0 : requestAnimationFrame(loop);
  }

  function syncState() {
    const playing = !video.paused && !video.ended;
    root.classList.toggle("is-playing", playing);
    root.classList.toggle("is-held", !playing && userPaused);
    const label = playing ? "Pause" : "Play";
    toggle.setAttribute("aria-label", `${label} the Videngine reel`);
    if (toggleText) toggleText.textContent = label;
  }

  function play() {
    if (video.preload !== "auto") video.preload = "auto";
    const attempt = video.play();
    if (attempt && attempt.catch) {
      attempt.catch(() => {
        // Autoplay refused (e.g. low-power mode): fall back to the play button.
        userPaused = true;
        syncState();
      });
    }
  }

  video.addEventListener("play", () => {
    syncState();
    if (!raf) raf = requestAnimationFrame(loop);
  });
  video.addEventListener("pause", () => { syncState(); paint(); });
  video.addEventListener("seeked", paint);
  video.addEventListener("loadedmetadata", paint);

  function togglePlayback() {
    if (video.paused) { userPaused = false; play(); }
    else { userPaused = true; video.pause(); }
  }

  toggle.addEventListener("click", togglePlayback);
  bigPlay.addEventListener("click", togglePlayback);
  video.addEventListener("click", togglePlayback);

  chapters.forEach((c) => {
    c.el.addEventListener("click", () => {
      const seek = () => { video.currentTime = c.start + 0.01; paint(); };
      if (video.readyState >= 1) seek();
      else {
        video.preload = "auto";
        video.addEventListener("loadedmetadata", seek, { once: true });
        video.load();
      }
      userPaused = false;
      play();
    });
  });

  // Start fetching a little before the reel arrives, so it is ready when it scrolls in.
  if (!saveData && "IntersectionObserver" in window) {
    const warm = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        video.preload = "auto";
        warm.disconnect();
      }
    }, { rootMargin: "900px 0px" });
    warm.observe(frame);
  }

  // Play while at least a third of the frame is visible; pause when it leaves.
  if ("IntersectionObserver" in window) {
    const watch = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && !userPaused) play();
      else if (!inView && !video.paused) video.pause();
    }, { threshold: 0.33 });
    watch.observe(frame);
  } else if (!userPaused) {
    play();
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !video.paused) video.pause();
    else if (!document.hidden && inView && !userPaused) play();
  });

  // Gentle scale-up as the frame scrolls into place.
  let scrollRaf = 0;
  function scaleFrame() {
    scrollRaf = 0;
    if (reduceMotion.matches) {
      frame.style.removeProperty("--reel-scale");
      stage.style.removeProperty("--reel-glow");
      return;
    }
    const rect = stage.getBoundingClientRect();
    const vh = window.innerHeight;
    const t = clamp((vh - rect.top) / (vh * 0.6));
    const eased = 1 - Math.pow(1 - t, 3);
    frame.style.setProperty("--reel-scale", (0.9 + 0.1 * eased).toFixed(4));
    stage.style.setProperty("--reel-glow", eased.toFixed(3));
  }
  const requestScale = () => { if (!scrollRaf) scrollRaf = requestAnimationFrame(scaleFrame); };
  window.addEventListener("scroll", requestScale, { passive: true });
  window.addEventListener("resize", requestScale);
  reduceMotion.addEventListener?.("change", requestScale);
  scaleFrame();

  syncState();
  paint();
})();
