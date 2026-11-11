/**
 * ALL PAGE CONTENT LIVES HERE.
 *
 * To change wording, links, the logo or images, edit this file.
 * Colours live in src/app/globals.css under "BRAND COLOURS".
 * Images live in public/sites/clicktrue/ (clickTRUE) and public/sites/oblique/ (logo files).
 *
 * Content source: https://enquiry.clicktrue.biz/ (captured 11 Nov 2026).
 * Any image set to `null` shows a branded placeholder until a real photo is added.
 */

const WHATSAPP =
  "https://api.whatsapp.com/send?phone=601165455041&text=Hi,%20I%20would%20like%20to%20enquire%20about%20your%20digital%20marketing%20services.";
const logoAsset = (path: string) => `/sites/oblique/${path}`;
const asset = (path: string) => `/sites/clicktrue/${path}`;

export const brand = {
  name: "clickTRUE",
  /** Header logo (light background). */
  logo: { src: logoAsset("brand/clicktrue-15yrs-colour.png"), width: 751, height: 199, alt: "clickTRUE Malaysia, 15 years" },
  /** Footer logo (dark background). Colour option: brand/clicktrue-15yrs-dark-bg.png, 387x103 */
  logoWhite: { src: logoAsset("brand/clicktrue-15yrs-white.png"), width: 501, height: 133, alt: "clickTRUE Malaysia, 15 years" },
  locationTag: "PJ · MY",
  contactHref: WHATSAPP,
  youtubeHref: "https://www.youtube.com/@clickTRUEbiz",
};

export const nav = {
  services: [
    { label: "Leads Generation Solution", note: "Ads to landing pages", href: "#services" },
    { label: "Media Buy (PPC)", note: "Google, Facebook, LinkedIn, TikTok", href: "#services" },
    { label: "Video Marketing", note: "Explainers, ads, testimonials", href: "#services" },
    { label: "Content Creation", note: "Blogs, articles, infographics", href: "#services" },
    { label: "Social Media Management", note: "Awareness and engagement", href: "#services" },
    { label: "Email Marketing", note: "Campaigns and automation", href: "#services" },
  ],
  links: [
    { label: "Results", href: "#work" },
    { label: "Your Team", href: "#integration" },
    { label: "How We Work", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  ctaLabel: "Enquire now",
};

export const hero = {
  eyebrow: "Inbound Marketing & Lead Generation Agency",
  srHeading: "clickTRUE Malaysia, an inbound marketing and lead generation agency.",
  line1: "Grow your sales",
  /** The blue word rotates through this list. */
  rotatingWords: ["faster", "smarter", "further", "louder", "stronger"],
  ctaLabel: "Get a FREE consultation",
  intro:
    "clickTRUE is a digital marketing consultancy that specialises in inbound strategy and lead generation for B2B and Education brands.",
  introBold: "We help your buyers say “Yes”.",
  secondaryLabel: "See real results →",
  secondaryHref: "#work",
};

export const clients = {
  eyebrow: "Trusted by leaders for the past 17 years",
  logos: [
    { name: "CGS International", src: asset("clients/01.png") },
    { name: "Brother", src: asset("clients/02.png") },
    { name: "Epson", src: asset("clients/03.png") },
    { name: "Mehko", src: asset("clients/04.png") },
    { name: "Schneider Electric", src: asset("clients/05.png") },
    { name: "SurfsTek", src: asset("clients/06.png") },
    { name: "Newcastle University Medicine Malaysia", src: asset("clients/07.png") },
    { name: "Sunway Education", src: asset("clients/08.png") },
    { name: "TAR UMT", src: asset("clients/09.png") },
    { name: "UniKL", src: asset("clients/10.png") },
    { name: "Sri Bestari Schools", src: asset("clients/11.png") },
    { name: "Toshiba", src: asset("clients/12.png") },
    { name: "Dell", src: asset("clients/13.png") },
    { name: "Canon", src: asset("clients/14.png") },
  ],
};

export const problem = {
  eyebrow: "Why inbound",
  headline: [
    "You didn't end up here by accident.",
    "That's inbound marketing, and it's working on you right now",
  ],
  points: [
    "You clicked an ad. You landed on a page.",
    "Now you're reading copy that speaks directly to your needs.",
    "It sounds simple. But making it work, and keep working, takes serious planning and precision.",
  ],
  closingWhite: "Imagine doing this for your own brand.",
  closingRed: "That's where clickTRUE comes in.",
  numbersEyebrow: "By the numbers",
  numbers: [
    { prefix: "", value: 17, suffix: "+", label: "Years of experience in digital marketing" },
    { prefix: "", value: 5, suffix: "", label: "Specialists dedicated to every campaign" },
    { prefix: "", value: 20, suffix: "", label: "Working days from kickoff to a live landing page campaign" },
    { prefix: "", value: 3, suffix: "", label: "Certified partnerships:\nGoogle, Meta and HubSpot" },
  ],
};

export const services = {
  eyebrow: "Our services",
  headline: "Here's how we turn traffic into trust,",
  headlineRed: "and trust into leads that close.",
  intro:
    "We've supported hundreds of brands across Singapore, Malaysia and Southeast Asia, combining data, technology and storytelling to attract quality leads.",
  items: [
    {
      number: "01",
      tag: "Leads",
      title: "Leads Generation Solution",
      body: "Plan, execute, and optimise ad campaigns that drive leads, from ads to landing pages.",
      bullets: ["Ad Campaigns", "Landing Pages", "Daily Optimisation"],
      image: null,
      imageLabel: "Leads Generation",
      href: "#cta",
    },
    {
      number: "02",
      tag: "Traffic",
      title: "Media Buy (Pay-Per-Click)",
      body: "Strategic paid ad campaigns on Google, Facebook, LinkedIn, TikTok, OpenAI and ChatGPT to drive targeted traffic.",
      bullets: ["Google", "Facebook", "LinkedIn", "TikTok", "ChatGPT"],
      image: null,
      imageLabel: "Media Buy",
      href: "#cta",
    },
    {
      number: "03",
      tag: "Engagement",
      title: "Video Marketing",
      body: "Engaging video content (explainers, ads, testimonials) that boosts engagement and drives conversions.",
      bullets: ["Explainers", "Video Ads", "Testimonials"],
      image: null,
      imageLabel: "Video Marketing",
      href: "#cta",
    },
    {
      number: "04",
      tag: "Nurture",
      title: "Content Creation",
      body: "Developing valuable written and visual content (blogs, articles, infographics) to nurture your audience.",
      bullets: ["Blogs", "Articles", "Infographics"],
      image: null,
      imageLabel: "Content Creation",
      href: "#cta",
    },
    {
      number: "05",
      tag: "Awareness",
      title: "Social Media Management",
      body: "Managing your social media presence to build brand awareness and engage your audience.",
      bullets: ["Brand Awareness", "Audience Engagement"],
      image: null,
      imageLabel: "Social Media",
      href: "#cta",
    },
    {
      number: "06",
      tag: "Retention",
      title: "Email Marketing",
      body: "Nurturing leads and engaging customers with targeted email campaigns and automation.",
      bullets: ["Targeted Campaigns", "Automation"],
      image: null,
      imageLabel: "Email Marketing",
      href: "#cta",
    },
  ] as { number: string; tag: string; title: string; body: string; bullets: string[]; image: string | null; imageLabel: string; href: string }[],
};

export const integration = {
  eyebrow: "Your team",
  headline: "We bring a full team",
  headlineRed: "to your campaign.",
  coreTitle: "clickTRUE",
  coreSubtitle: "Your Team",
  nodes: ["Strategist", "Account Manager", "Content Writer", "Designer", "Media Buyer"],
  hint: "Hover the diagram. The core follows your cursor.",
  paragraphs: [
    "With a dedicated team of five, you're backed by specialists at every stage.",
    "We dig deep into your ideal customer's needs and behaviours. Every campaign is built on insight, not guesswork.",
    "From scroll-stopping ads to high-converting landing pages, we design every touchpoint to guide your buyer toward action.",
    "We monitor daily and optimise when needed to bring down your CPL and scale meaningful ROI.",
  ],
  closing:
    "Transparency isn't optional. You get live dashboards and real-time insights, and every time we optimise, we keep you in the loop.",
};

export const work = {
  eyebrow: "Real results",
  headline: "Case study: Universiti Kuala Lumpur",
  intro:
    "Generate leads for UniKL's 200+ programmes offered across 12 campuses in Malaysia in the span of 10 months.",
  logo: { src: asset("clients/10.png"), alt: "UniKL Universiti Kuala Lumpur" },
  stats: [
    { value: "52k+", label: "Leads captured through our lead gen campaign" },
    { value: "1,584", label: "Actual student enrolments" },
    { value: "42x", label: "Lower cost than target CPL" },
    { value: "344k+", label: "Clicks from students and parents curious to learn more" },
    { value: "21.6 mil", label: "Times our ads appeared across Google and Facebook" },
  ],
  disclaimer:
    "Disclaimer: These results reflect a tailored strategy for UniKL. Outcomes may vary based on your brand, goals, and market conditions.",
  archiveEyebrow: "Want results like these?",
  archiveLabel: "Talk to a lead gen strategist",
  archiveHref: WHATSAPP,
};

export const process = {
  eyebrow: "How we work",
  headline: "Reasons our campaigns work",
  steps: [
    {
      number: "01",
      tag: "Performance Analysis · Competitor Research · Campaign Strategy",
      title: "We diagnose before we prescribe.",
      body: "We deep dive into your past campaigns to uncover what's not working. Whether it's weak targeting, generic copy, or unresponsive landing pages, we identify the root cause before prescribing a solution.",
      image: null,
      imageLabel: "Diagnose",
      theme: "light" as const,
    },
    {
      number: "02",
      tag: "Buyer Persona Research · Inbound Copywriting · Graphic Design",
      title: "We speak your audience's language.",
      body: "We study your prospects' pain points, objections, and motivators, then craft messages that speak directly to them. This empathy-first approach turns passive scrollers into qualified leads.",
      image: null,
      imageLabel: "Audience",
      theme: "beige" as const,
    },
    {
      number: "03",
      tag: "Optimisation · Campaign Monitoring · Live Reports",
      title: "We treat your budget like our own.",
      body: "Transparency isn't optional. We provide live dashboards, real-time insights, and daily monitoring. Every time we optimise, we make sure you're in the loop.",
      image: null,
      imageLabel: "Budget",
      theme: "sand" as const,
    },
    {
      number: "04",
      tag: "Design · Copywriting · Media Planning · Media Buying",
      title: "We bring a full team to your campaign.",
      body: "With a dedicated team of five (Strategist, Account Manager, Content Writer, Designer, and Media Buyer), you're backed by specialists at every stage.",
      image: null,
      imageLabel: "Full team",
      theme: "dark" as const,
    },
  ] as { number: string; tag: string; title: string; body: string; image: string | null; imageLabel: string; theme: "light" | "beige" | "sand" | "dark" }[],
};

export const testimonials = {
  eyebrow: "Real stories",
  image: null as string | null,
  imageLabel: "Google Reviews",
  caption: "5-star Google reviews",
  captionSub: "From clickTRUE clients",
  /** Quotes are copied word for word from clickTRUE's Google reviews. */
  quotes: [
    { name: "Adham Sapie", quote: "2024 would be the 3rd year my company (Universiti Kuala Lumpur - UniKL) has been using the services from ClickTRUE. The company really assists us on gaining genuine and potential leads for enrollment through their digital marketing strategies. We have engaged with them for lead generation and paid ads, and we are happy with the results achieved year after year." },
    { name: "Shira Ismail", quote: "I found them through a recommendation from a study-choice platform agency. We needed help managing our social media and Google Ads, plus creating content. From the first chat, everything felt easy, and I've really enjoyed working with them these past few months." },
    { name: "MK2024 CO", quote: "Working with clickTRUE on video production, advertisement, and our landing page has been an outstanding experience. Their team, both on the ground during shoots and in pre- and post-production, was professional, attentive, and understood our vision, making the entire process seamless." },
    { name: "Zeng Yee Lee", quote: "We have been using Clicktrue lead gen service for several months now, and the results have been outstanding. Their team is professional, responsive, and truly understands our business needs." },
    { name: "Shahina Shahar", quote: "One of the best agency I dealt with. The servicing team is very professional, proactive and highly responsive. They took time to get to know the business and product." },
    { name: "Li Ann Tan", quote: "Really good client servicing. The team is very knowledgeable and we've always had a really easy time working with them." },
  ],
};

export const faq = {
  eyebrow: "Questions",
  headline: "Frequently asked",
  headlineRed: "questions.",
  intro: "Short answers to what clients ask us most. Anything else, we'll cover on a free consultation call.",
  items: [
    { q: "Why build landing pages? Isn't my website enough?", a: "We believe Landing Pages = Focus. They give ad clicks ONE clear conversion path, hence maximizing quality lead capture, unlike distracting websites." },
    { q: "Do you guarantee a minimum number of leads?", a: "We don't guarantee specific lead volumes or CPLs. Those vary by market, season, and competition. What we do guarantee is this: we continuously optimise your campaigns to improve performance and help you get more from your budget over time." },
    { q: "What's the typical timeline for a landing page campaign?", a: "Typically 20 working days from kickoff, once we've had our internal briefing and received all necessary materials from your team." },
    { q: "What industries do you specialise in?", a: "We're especially experienced with education and B2B brands with longer sales cycles, but we've also worked with clients across various industries." },
  ],
};

export const cta = {
  eyebrow: "Get a FREE consultation",
  headline: "Let's uncover what's missing in your",
  headlineRed: "digital marketing",
  headlineEnd: ".",
  body: "Zero obligation. Tailored insights. Talk to a lead gen strategist about your current digital marketing efforts.",
  primaryLabel: "Get a FREE consultation",
  secondaryLabel: "Watch: Is there a difference between B2B and B2C marketing?",
};

export const footer = {
  copyright: "© clickTRUE. All rights reserved.",
  ctaLabel: "Enquire now",
  contact: [
    { label: "WhatsApp +60 11-6545 5041", href: WHATSAPP },
    { label: "No. 29, 2nd Floor," },
    { label: "Jalan SS 22/23, Damansara Jaya," },
    { label: "47400 Petaling Jaya," },
    { label: "Selangor, Malaysia." },
  ] as { label: string; href?: string }[],
  columns: [
    {
      title: "Services",
      links: nav.services.map((s) => ({ label: s.label, href: s.href })),
    },
    {
      title: "Explore",
      links: [
        { label: "Results", href: "#work" },
        { label: "Your Team", href: "#integration" },
        { label: "How We Work", href: "#process" },
        { label: "Real Stories", href: "#testimonials" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ],
  facts: ["17+ Years", "Google Partner", "Meta Business Partner", "HubSpot Consultants"],
  company: "Clicktrue (M) Sdn Bhd (200801017074 (818367-U))",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/clicktruemsia/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/clicktrue" },
    { label: "TikTok", href: "https://www.tiktok.com/@clicktruemsia" },
    { label: "YouTube", href: "https://www.youtube.com/@clickTRUEbiz" },
    { label: "Facebook", href: "https://www.facebook.com/clickTRUEMY" },
  ],
};
