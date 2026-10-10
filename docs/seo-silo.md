# Videngine AI video search silo

Implemented 13 September 2026. This is an editorial and information-architecture map, not a search-volume report.

## Evidence and selection

Public search results for AI video tools, text-to-video, URL-to-video and bulk video creation show several overlapping product categories. Provider pages use these phrases explicitly. Keyword groups below are qualitative targets inferred from those results and product fit; no search volume, difficulty, ranking or traffic forecast has been measured. Broad generative-footage intent is addressed honestly in the selection guide rather than presented as a Videngine capability.

Primary references reviewed:

- https://www.synthesia.io/features/ai-video-generator
- https://fliki.ai/features/text-to-video
- https://creatify.ai/features/url-to-video
- https://pictory.ai/blog-to-video
- https://creatomate.com/docs/tutorials/bulk
- https://shotstack.io/docs/guide/
- https://www.remotion.dev/docs/renderer
- https://developers.google.com/search/docs/appearance/ai-features

## One primary destination per intent

| Role | Target query family | Canonical destination | Distinct job |
| --- | --- | --- | --- |
| Pillar | AI video tools, AI video generator tools, choosing an AI video generator | /ai-video-tools | Select the right production category and navigate to a workflow |
| Workflow | text to video AI, AI video from text, script to video | /notes/text-to-video-ai | Distinguish shot prompts from approved scripts and evaluate controls |
| Workflow | URL to video AI, link to video, website to video | /notes/url-to-video | Extract and validate page content before composing a video |
| Use case | AI product video generator, product video automation, ecommerce video ads | /notes/product-video-automation | Preserve variant accuracy and plan creative tests |
| Use case | article to video, blog to video AI | /notes/article-to-video | Adapt an argument into a spoken, visual explanation |
| Scale | bulk AI video generator, CSV to video, batch video creation | /notes/bulk-video-creation-from-csv | Validate records, test templates and reconcile batch outputs |
| Integration | video automation API, video rendering API, AI video API comparison | /notes/video-automation-api | Evaluate async jobs, retries and delivery; not Videngine API documentation |
| Purchase research | AI video generator cost, AI video tool pricing, video automation cost | /notes/ai-video-generator-cost | Compare total cost per approved output; no invented vendor pricing |
| Foundation | programmatic video, data driven video | /programmatic-video | Explain the production model |
| Comparison | Videngine vs AI video generators, generated vs rendered video | /vs/ai-video-generators | Compare production methods and product fit |

/notes remains the editorial index. It does not compete with the pillar's tool-selection intent.

## Links and conversion

- Global navigation and a homepage editorial introduction link to the pillar.
- The pillar links to all nine supporting destinations.
- Every support page links back to the pillar.
- Workflow pages link contextually to relevant siblings, especially cost, scale and integration.
- The Notes index lists all ten resources with crawlable HTML links.
- Every new page has a self-referencing canonical, unique title/description, visible author/date, Article and BreadcrumbList JSON-LD, and a sitemap entry.
- New guide CTAs lead to the existing studio; pricing research also links to the published pricing section. No invented API signup, free tier, customer results or feature claims.
- Existing teaser redirects remain intact. Established canonical paths are retained.

## Editorial boundaries

Do not make separate near-identical pages for “link to video”, “URL to video AI” and “website to video”. Expand the existing URL guide when useful. Do not add “free”, “no watermark”, avatar generation or image animation landing pages as Videngine features without verifying support. A generative comparison should acknowledge hybrid tools and controls instead of assuming every generator or renderer behaves identically.

Technical repeatability should be described as depending on approved scripts, pinned templates, assets, settings and environment. The established guides and homepage have been clarified to avoid claiming byte-identical results across every pipeline stage.

## Measurement and next decisions

No indexing or ranking claim is made. Next, connect or inspect Search Console and record query/page performance. Evaluate impressions, clicks, query fit and studio-bound visits for these exact canonical pages. Check whether the wrong page appears for a target intent before adding more pages. Compare equivalent periods after pages have been crawled; use trends rather than a single day's results.

Set a pre-publication baseline if historical data is available. Segment brand and non-brand searches. Record conversions separately from ranking visibility. AI referrals and reported citations are partial observations, not a complete measure of answer-engine exposure.

Prioritise further content from actual query data, user questions and demonstrated product capability. Possible next families are property-listing videos, localisation workflows and vendor comparisons, contingent on evidence and enough distinct content to serve the query.

## Comparison cluster (added 8 October 2026)

| Role | Target query family | Canonical destination | Distinct job |
| --- | --- | --- | --- |
| Hub | Videngine alternatives, compare video automation tools | /compare | Route to the right named comparison and explain which kind of tool fits which job |
| Comparison | Synthesia alternative, Videngine vs Synthesia | /vs/synthesia | Avatar-led video against listing videos from inventory |
| Comparison | Creatomate alternative, Videngine vs Creatomate | /vs/creatomate | Template API you wire up against a finished listing-video product |
| Comparison | Shotstack alternative, Videngine vs Shotstack | /vs/shotstack | Developer video infrastructure against a finished product |
| Comparison | Pictory alternative, Videngine vs Pictory | /vs/pictory | Content repurposing with stock footage against videos of the real item |

Rules for this cluster: every competitor fact comes from that competitor's own site or docs and is listed under Sources on the page, with the date it was checked. Each page says plainly when the other tool is the better choice. Prices that conflict on the competitor's own pages are described rather than quoted. Re-check facts quarterly and update the "Facts checked" date; one page per competitor covers both "vs" and "alternative" intent.

## Keyword-led expansion (10 October 2026)

First pass driven by measured demand: a Google Keyword Planner export of 3,048 keywords (1 September 2025 to 31 August 2026, average monthly searches in Planner's rounded ranges, bids in EUR). Every keyword is mapped to a cluster, a fit level and one target page in `docs/keyword-map.csv`. Volumes are ranges and close variants share a figure, so cluster sums overstate demand; compare clusters by their top term and keyword count, not by sums.

Fit, by keyword count: 1,807 excluded (editors and editing apps, free tools, subtitles and transcripts, cartoons, music and lyric videos, avatars, downloads, adult), 78 low (free AI video generators: no free plan), 778 adjacent (category and format terms Videngine can answer honestly), 278 core (jobs Videngine does), 107 competitor. About half of all volume is excluded.

### Silo architecture

URLs stay where they were; silos are expressed through hubs, breadcrumbs, the Notes index grouping and internal links. New use-case pages live under `/use-cases/` so that silo is also physical.

| Silo | Hub | Members |
| --- | --- | --- |
| AI video tools (category) | /ai-video-tools | /notes/text-to-video-ai, /notes/photos-to-video, /notes/ai-video-generator-cost, /vs/ai-video-generators |
| Programmatic video (method) | /programmatic-video | /notes/url-to-video, /notes/article-to-video, /notes/bulk-video-creation-from-csv, /notes/video-automation-api |
| Use cases (commercial) | /use-cases | /use-cases/video-ads, /notes/product-video-automation, /use-cases/explainer-videos, /use-cases/youtube-videos, /use-cases/short-form-video, /use-cases/real-estate-video |
| Comparisons | /compare | /vs/synthesia, /vs/creatomate, /vs/shotstack, /vs/pictory |

Global navigation's "Uses" now links to /use-cases. Homepage recipe links point to the matching use-case pages. Every page links up to its hub and across to at least two siblings; the Notes index lists every guide grouped by silo.

### New and re-tuned pages

| Page | Primary target | Evidence from the export |
| --- | --- | --- |
| /use-cases (new hub) | AI video for business, video creation for business | Head of the commercial silo; low-volume terms with high bids |
| /use-cases/video-ads (new) | AI video ad maker; marketing, promo and brand video makers | ads maker 5k (top bid €26), ai video ad generator 500 (€23), marketing video maker 500 (€21) |
| /use-cases/explainer-videos (new) | explainer video maker; AI training videos; video presentation maker | 10 terms at 500, bids €10–21 |
| /use-cases/youtube-videos (new) | YouTube video maker; AI YouTube videos | youtube video maker 5k, ai youtube videos 5k; median competition index 28 |
| /use-cases/short-form-video (new) | Shorts maker, reel maker, short video maker | youtube shorts maker 5k, reel maker 5k |
| /use-cases/real-estate-video (new) | real estate listing video | real estate video editing 500 (€8.65); homepage's first use |
| /notes/photos-to-video (new) | create a video from photos; AI slideshow maker | 25+ terms at 5k; separates slideshow intent from generative image-to-video |
| /ai-video-tools (re-tuned) | AI video tools, AI video generation platform, AI video creation software | ai video generation platform 50k (competition index 1), ai video creation software 50k; new platform section and FAQ |
| /notes/text-to-video-ai (re-tuned) | text to video AI, script to video AI | text to video ai 50k (low competition), script to video ai 5k |
| /vs/ai-video-generators (extended) | image to video AI, Sora/Veo/Meta comparisons | ai image to video generator 50k; image-to-video paragraph and FAQ |

### Rules carried forward

- One page per intent. Ads and marketing share /use-cases/video-ads; product catalogue ads stay on /notes/product-video-automation. Shorts live on the short-form page; the YouTube page owns channel and publishing intent.
- No capability claims beyond what the studio does today (checked against the app repo on 10 October 2026). No avatars, generated footage, free plan, languages other than English, ad-platform integrations or analytics.
- Platform facts (YouTube, Instagram, TikTok, Google Ads) are cited to the platform's own pages and dated; where a page could not be verified, the copy says to check current guidance.
- Each page leads with a self-contained short answer, has tables, a numbered workflow, a "wrong tool" section and FAQ schema matching the visible questions, so answer engines can quote it accurately.

### Next

1. Run a second Keyword Planner export seeded with the verticals and jobs this export missed: car dealer video, vehicle listing video, boat listing video, yacht broker video, property video marketing, listing video, ecommerce product video, catalogue video, video for every product, automated YouTube uploads, bulk video creation, CSV to video, video API. Build vertical pages only where demand shows.
2. A named case study once the client agrees to it. A dated, numbered account of real volume is the asset answer engines are most likely to cite.
3. /vs/canva: canva video editor 50k at competition index 4. Build it the way the other comparisons were built, from Canva's own pages.
4. Connect Search Console and record impressions and clicks per page from this date; check for the wrong page ranking for a target intent before adding more.

## Industries silo (10 October 2026)

Built ahead of keyword data, by decision: these are the pages prospects in each industry are sent to and the ones answer engines need to recommend Videngine for a vertical. Measure them in Search Console and re-check against a Keyword Planner export seeded with the terms below before adding more.

| Role | Target query family | Canonical destination | Distinct job |
| --- | --- | --- | --- |
| Hub | automated video by industry | /industries | Route each industry to its guide; what changes and what stays the same |
| Industry | car dealer video, vehicle listing video, dealer inventory video | /industries/car-dealer-video | Walkaround photo order, vehicle facts, portals, stock turnover |
| Industry | boat listing video, yacht broker video, yacht charter video | /industries/boat-listing-video | Boat facts, builder and marina pronunciation, charter template |
| Industry | marketplace listing video, classifieds video, video for every listing | /industries/marketplace-video | Platform-made video: quality gates, seller trust, backfill and daily flow, delivery and cost at volume |
| Industry | SaaS video, release notes video, changelog video | /industries/saas-video | A software company's video programme; links to the explainer guide for the how-to |
| Industry | publisher video, video for publishers, news video automation | /industries/publisher-video | Which stories suit video, image rights, desk sign-off, corrections, cadence; links to article to video for the craft |

Property stays at /use-cases/real-estate-video and products at /notes/product-video-automation; the hub lists both. The use-cases hub's industry table now points at these pages. Footer "Product" column carries Industries sitewide; the Notes index has an Industries group.

Rules for this silo: write for the operator in that industry; no client names, volumes or results; third-party portal and regulator statements only when verified on their own pages (Autotrader UK video links, CAP Code section 3 and the FTC small-business advertising guide are cited on the car dealer page); narration is described as English only.
