document.querySelectorAll('.waitlist-form').forEach(form => {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const status = form.querySelector('.waitlist-status');
    const button = form.querySelector('button[type="submit"]');
    if (button.disabled) return;
    status.dataset.error = 'false';
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    button.disabled = true;
    button.textContent = 'Saving your email…';
    status.textContent = '';
    try {
      const response = await fetch('https://app.videngine.io/public/waitlist', {
        method: 'POST', credentials: 'omit',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: String(values.get('email')).trim(), consent: values.get('consent') === 'on', company: values.get('company')}),
        signal: AbortSignal.timeout(15000)
      });
      const data = await response.json();
      if (!response.ok || data.ok !== true) throw new Error(data.error || 'We could not save your email. Please try again.');
      status.textContent = "You’re on the list. We’ll email you when Videngine launches.";
      button.textContent = 'You’re on the list';
      form.reset();
    } catch (error) {
      status.dataset.error = 'true';
      status.textContent = error instanceof TypeError || error.name === 'TimeoutError' ? 'We couldn’t connect. Please try again in a moment.' : error.message;
      button.disabled = false;
      button.textContent = 'Notify me at launch ↗';
    }
  });
});
