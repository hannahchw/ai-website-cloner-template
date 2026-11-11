/**
 * ALL PAGE CONTENT LIVES HERE.
 *
 * To change wording, links, the logo or images, edit this file.
 * Colours live in src/app/globals.css under "BRAND COLOURS".
 * Images and videos live in public/sites/oblique/.
 */

const ORIGIN = "https://oblique.com.my";
const asset = (path: string) => `/sites/oblique/${path}`;

export const brand = {
  name: "Oblique",
  /** Header logo (light background). Old Oblique logo: brand/oblique-wordmark.png, 209x48 */
  logo: { src: asset("brand/clicktrue-15yrs-colour.png"), width: 751, height: 199, alt: "clickTRUE Malaysia, 15 years" },
  /** Footer logo (dark background). Colour option: brand/clicktrue-15yrs-dark-bg.png, 387x103 */
  logoWhite: { src: asset("brand/clicktrue-15yrs-white.png"), width: 501, height: 133, alt: "clickTRUE Malaysia, 15 years" },
  locationTag: "KL · MY",
  contactHref: `${ORIGIN}/contact`,
  quizHref: "https://quiz.oblique.com.my",
};

export const nav = {
  services: [
    { label: "Brand Strategy & Identity", note: "Positioning, messaging, identity", href: `${ORIGIN}/services/brand-strategy` },
    { label: "Performance Marketing", note: "Meta, Google, TikTok", href: `${ORIGIN}/services/performance-marketing` },
    { label: "SEO", note: "Technical SEO, content, authority", href: `${ORIGIN}/services/seo` },
    { label: "GEO", note: "AI search visibility", href: `${ORIGIN}/services/geo` },
    { label: "Social Media Marketing", note: "Strategy, video, photography", href: `${ORIGIN}/services/social-media-content-creation` },
    { label: "Web Design & Development", note: "Conversion-driven sites", href: `${ORIGIN}/services/website-design` },
  ],
  links: [
    { label: "Work", href: "#work" },
    { label: "Approach", href: "#integration" },
    { label: "About", href: `${ORIGIN}/about` },
    { label: "Insights", href: `${ORIGIN}/insights` },
    { label: "Resources", href: `${ORIGIN}/resources` },
  ],
  ctaLabel: "Get in touch",
};

export const hero = {
  eyebrow: "Malaysia's Integrated Digital Marketing Agency",
  srHeading: "An integrated digital marketing agency in Kuala Lumpur.",
  line1: "Grow your brand",
  /** The red word rotates through this list. */
  rotatingWords: ["stronger", "faster", "smarter", "louder", "further"],
  ctaLabel: "Get in touch",
  intro:
    "Oblique is an integrated digital marketing agency in Kuala Lumpur, with one team across brand, content, performance, SEO and web.",
  introBold: "Every channel you invest in makes the others stronger.",
  secondaryLabel: "See selected work →",
  secondaryHref: "#work",
};

export const clients = {
  eyebrow: "Trusted by the teams behind",
  logos: [
    { name: "Sunway", src: asset("logos/1-Sunway-Logo.png") },
    { name: "Pavilion", src: asset("logos/2-Pavilion-logo.png") },
    { name: "VG", src: asset("logos/3-VG-Logo.png") },
    { name: "Getha", src: asset("logos/4-Getha-Logo.png") },
    { name: "Yamaha", src: asset("logos/5-Yamaha-Logo.png") },
    { name: "Moët & Chandon", src: asset("logos/6-Moet-Chandon-Logo.png") },
    { name: "Flower Chimp", src: asset("logos/7-Flower-Chimp-Logo.png") },
    { name: "Alba", src: asset("logos/8-Alba-Logo.png") },
    { name: "Dressing Paula", src: asset("logos/9-Dressing-Paula-Logo.png") },
    { name: "Petico", src: asset("logos/10-Petico-Logo.png") },
    { name: "BIG", src: asset("logos/11-BIG-Logo.png") },
    { name: "Grand Rally", src: asset("logos/12-Grand-Rally-Logo.png") },
  ],
};

export const problem = {
  eyebrow: "The problem",
  headline: [
    "Most businesses are paying three or four agencies to talk to the same customer. We call it the Four-Agency Trap.",
    "None of them know what the others said",
  ],
  points: [
    "Your branding agency spent months defining who you are. Your ads team has never read that brief.",
    "Your social media is building an audience that your website wasn't designed to convert.",
    "When results disappoint, every agency points at someone else's work.",
    "Right now, you're the only one coordinating all of it.",
  ],
  closingWhite: "Oblique runs it as one team.",
  closingRed: "Everything builds on itself.",
  numbersEyebrow: "By the numbers",
  numbers: [
    { prefix: "RM", value: 30, suffix: "M", label: "Generated for a D2C retail & ecommerce client in four months" },
    { prefix: "", value: 300, suffix: "+", label: "Brands grown across Malaysia and the region" },
    { prefix: "", value: 85, suffix: "%+", label: "Client retention, year over year" },
    { prefix: "RM", value: 7, suffix: "M", label: "In ad spend managed\nacross clients" },
  ],
};

export const services = {
  eyebrow: "What work we do",
  headline: "Five disciplines, run by",
  headlineRed: "one integrated team.",
  intro:
    "Engage us for one service or let us build the full integrated system. Every capability is run by a specialist team, not a junior with a template.",
  items: [
    {
      number: "01",
      tag: "Foundation",
      title: "Brand Strategy & Identity",
      body: "Positioning, messaging architecture and the visual identity system every other channel is built on. It's what makes people remember, trust and choose your brand.",
      bullets: ["Positioning Strategy", "Visual Identity", "Messaging Framework", "Brand Guidelines"],
      image: asset("editorial/service-brand.jpg"),
      imageAlt: "Editorial still life for brand strategy",
      href: `${ORIGIN}/services/brand-strategy`,
    },
    {
      number: "02",
      tag: "Attention",
      title: "Social Media Marketing",
      body: "Story-led video, photography and social strategy that builds the audience your ads will later pay to reach. Content that earns attention first.",
      bullets: ["Content Strategy", "Video Production", "Photography", "Community Management"],
      image: asset("editorial/service-social.jpg"),
      imageAlt: "Editorial still life for social and content",
      href: `${ORIGIN}/services/social-media-content-creation`,
    },
    {
      number: "03",
      tag: "Revenue",
      title: "Performance Marketing",
      body: "Meta, Google and TikTok campaigns built around creative testing and real ROAS. Paid media that earns back every ringgit you spend.",
      bullets: ["Meta Ads", "Google Ads", "TikTok Ads", "Creative Testing & CRO"],
      image: asset("editorial/service-performance.jpg"),
      imageAlt: "Editorial still life for performance marketing",
      href: `${ORIGIN}/services/performance-marketing`,
    },
    {
      number: "04",
      tag: "Compound",
      title: "SEO & GEO",
      body: "Organic visibility that compounds across Google and AI search. When buyers ask ChatGPT or Perplexity who to buy from, you're the name that comes back.",
      bullets: ["Technical SEO", "Content for Search", "GEO · AI Visibility", "Authority & Links"],
      image: asset("editorial/service-seo.jpg"),
      imageAlt: "Editorial still life for SEO and GEO",
      href: `${ORIGIN}/services/seo`,
    },
    {
      number: "05",
      tag: "Conversion",
      title: "Web Design & Development",
      body: "Conversion-driven sites that turn paid and organic traffic into revenue. Built to convert from the first scroll.",
      bullets: ["UX / UI Design", "Custom Development", "Landing Pages", "CRO & Analytics"],
      image: asset("editorial/service-web.jpg"),
      imageAlt: "Editorial still life for website design",
      href: `${ORIGIN}/services/website-design`,
    },
  ],
};

export const integration = {
  eyebrow: "Compound",
  headline: "When your agencies actually work together,",
  headlineRed: "the results compound.",
  coreTitle: "Oblique",
  coreSubtitle: "One Team",
  nodes: ["Brand", "Content", "Performance", "SEO & GEO", "Web"],
  hint: "Hover the diagram. The core follows your cursor.",
  paragraphs: [
    "The story your brand tells and the ads you run start saying the same thing so people remember you instead of scrolling past.",
    "The audience your social media builds becomes the exact people your ads are chasing. You stop paying to reach the same person twice.",
    "When people can already find you without you paying for it, your ad budget goes further.",
    "When your website is built to sell, every ringgit you spend sending people there actually comes back.",
  ],
  closing:
    "Three separate agencies will never give you this. The moment the project ends, so does the conversation.",
};

export const work = {
  eyebrow: "Featured work",
  headline: "Every project starts with a KPI",
  intro: "Here's how they turned out.",
  projects: [
    { title: "Getha", year: "2025", tags: "Social · KOL · Performance", video: asset("work/getha-showreel.mp4"), poster: asset("work/getha-showreel.jpg"), href: `${ORIGIN}/services/performance-marketing#proof` },
    { title: "Grand Rally Pickleball", year: "2025", tags: "Brand · Social · Content", video: asset("work/grand-rally-showreel.mp4"), poster: asset("work/grand-rally-showreel.jpg"), href: `${ORIGIN}/services/brand-strategy#proof` },
    { title: "Alba Dental", year: "2025", tags: "Brand · Website", video: asset("work/alba-showreel.mp4"), poster: asset("work/alba-showreel.jpg"), href: `${ORIGIN}/services/brand-strategy#proof` },
    { title: "Petico", year: "2025", tags: "Performance · SEO", video: asset("work/petico-showreel.mp4"), poster: asset("work/petico-showreel.jpg"), href: `${ORIGIN}/services/performance-marketing#proof` },
  ],
  archiveEyebrow: "More in the archive",
  archiveLabel: "See every live site we've built",
  archiveHref: `${ORIGIN}/services/website-design#sites`,
};

export const process = {
  eyebrow: "The Oblique Method",
  headline: "Growth, delivered in three phases",
  steps: [
    {
      number: "01",
      tag: "Audit & Strategy",
      title: "Understand the problem before building the solution.",
      body: "We start with a brand and growth audit. Positioning, channels, competitors, data. You see where the biggest opportunity is before we spend a ringgit.",
      image: asset("editorial/about-1.jpg"),
      imageAlt: "Audit & Strategy editorial visual",
      theme: "light" as const,
    },
    {
      number: "02",
      tag: "Build & Activate",
      title: "Build the services you actually need.",
      body: "One service or five, we build with integration from day one. Brand brief feeds content. Content feeds creative. Nothing operates in isolation.",
      image: asset("editorial/about-2.jpg"),
      imageAlt: "Build & Activate editorial visual",
      theme: "beige" as const,
    },
    {
      number: "03",
      tag: "Compound & Scale",
      title: "We connect the channels so the results compound.",
      body: "Performance data feeds creative. SEO data feeds content. Brand data feeds everything. Results compound month over month because the system learns.",
      image: asset("editorial/about-3.jpg"),
      imageAlt: "Compound & Scale editorial visual",
      theme: "dark" as const,
    },
  ],
};

export const testimonials = {
  eyebrow: "In their words",
  image: asset("team/team-group-alt.jpg"),
  imageAlt: "The Oblique team",
  caption: "The Oblique team",
  captionSub: "Kuala Lumpur",
  quotes: [
    { name: "Alvin Yip", quote: "Your team's commitment to excellence, attention to detail, and passion for your craft are truly remarkable. The response from our audience has been overwhelmingly positive, and we are already seeing the fantastic impact it is making in our market." },
    { name: "Abby Lum", quote: "Oblique transformed our brand and website flawlessly. Creative, professional and detail-oriented. Their team delivered a sleek, user-friendly site that perfectly captures our vision. Highly recommend!" },
    { name: "Lyana Shareen", quote: "I am delighted to provide a glowing testimonial for Oblique, who has been instrumental in the rebranding journey of the company I am attached with. Working with them has been nothing short of exceptional." },
    { name: "Rachel Lee", quote: "The business has engaged Oblique for a good few years now and they have never disappointed us. We never think twice before introducing Oblique's services to any of our business partners whenever anyone asks for a recommendation. Keep up the good work!" },
  ],
};

export const faq = {
  eyebrow: "Questions",
  headline: "What people actually",
  headlineRed: "ask us.",
  intro: "Short, straight answers. If yours isn't here, the strategy call will cover it.",
  items: [
    { q: "Can I engage Oblique for just one service, or do I have to take everything?", a: "Either works. Most clients start with one or two disciplines (brand, performance or web) and layer in others once the first engagement proves itself. The integrated model is a capability, not a requirement. If you only need creative, we'll run creative. If you want everything connected, we'll run everything connected." },
    { q: "How is an integrated agency different from a full-service one?", a: "A full-service agency offers multiple services. An integrated agency runs them as one system under one brief. We call it skill stacking: our operators hold multiple disciplines, so strategy and execution happen in the same room. Insights from performance feed content. SEO learnings shape the brand story. One team, one plan, one conversation." },
    { q: "What kind of businesses do you typically work with?", a: "DTC and founder-led brands between RM 20–50M in revenue, usually in consumer, wellness, F&B, property or industrial categories. Commercially-minded operators who want strategy tied to P&L, not decks. We're a fit for challenger brands, not enterprise accounts with eight approval layers." },
    { q: "What does a typical engagement look like?", a: "Most start with a 30-minute strategy call, followed by a paid audit or discovery phase to map where the biggest opportunity is. From there, scopes range from a single-discipline retainer (e.g. performance-only) to a full-system build (brand, site, content, paid and SEO). Timelines run 8–16 weeks for most builds, with retainers typically starting at three months." },
    { q: "Do you work with brands outside Malaysia?", a: "Yes. Our team is based in Kuala Lumpur but we run engagements across Southeast Asia and occasionally further afield. Clients have included businesses in Singapore, Indonesia, Thailand and beyond. Most of our paid-media and SEO work is region-agnostic; brand and content work is where local nuance matters most." },
    { q: "How much does it cost to work with Oblique?", a: "Project and retainer pricing depends on scope, team size and timeline. As a ballpark, single-service retainers typically start from RM 15k / month and integrated engagements from RM 40k / month. One-off builds (brand or website) range from RM 25k to RM 150k+. We'll scope properly on a first call. No ballpark figure here is a substitute for a real brief." },
  ],
};

export const cta = {
  eyebrow: "What's next",
  headline: "Ready to bring your",
  headlineRed: "marketing together",
  body: "Get in touch and we'll map which services make sense for where you are right now, and show you what an integrated system could do for your brand.",
  primaryLabel: "Get in touch",
  secondaryLabel: "Or take the Brand Strength Quiz",
};

export const footer = {
  copyright: "© Oblique 2026",
  ctaLabel: "Get in touch",
  contact: ["hello@oblique.com.my", "+60 16-203 0912", "Level 15, Menara K1,", "Jalan Klang Lama,", "58000 Kuala Lumpur"],
  columns: [
    {
      title: "Services",
      links: [
        { label: "Brand Strategy & Identity", href: `${ORIGIN}/services/brand-strategy` },
        { label: "Social Media Marketing", href: `${ORIGIN}/services/social-media-content-creation` },
        { label: "Performance Marketing", href: `${ORIGIN}/services/performance-marketing` },
        { label: "SEO", href: `${ORIGIN}/services/seo` },
        { label: "GEO", href: `${ORIGIN}/services/geo` },
        { label: "Web Design & Development", href: `${ORIGIN}/services/website-design` },
      ],
    },
    {
      title: "Studio",
      links: [
        { label: "About", href: `${ORIGIN}/about` },
        { label: "Work", href: "#work" },
        { label: "Insights", href: `${ORIGIN}/insights` },
        { label: "Contact", href: `${ORIGIN}/contact` },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "All Resources", href: `${ORIGIN}/resources` },
        { label: "AI Visibility Checker", href: `${ORIGIN}/resources/ai-visibility-checker` },
        { label: "Breakeven ROAS Calculator", href: `${ORIGIN}/resources/breakeven-roas-calculator` },
        { label: "Brand Strength Quiz", href: "https://quiz.oblique.com.my" },
        { label: "Privacy Policy", href: `${ORIGIN}/privacy-policy` },
        { label: "Cookie Policy", href: `${ORIGIN}/cookie-policy` },
      ],
    },
  ],
  facts: ["Est. 2016", "25 Specialists", "Kuala Lumpur"],
  hours: "Mon to Fri, 9am to 6pm",
  hoursZone: "(GMT +8)",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/oblique.my" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/oblique-branding" },
    { label: "TikTok", href: "https://www.tiktok.com/@oblique.my" },
  ],
};
