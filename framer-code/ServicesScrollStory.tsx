// Request: scroll storytelling for "Our Services". The section pins while the visitor scrolls; each step moves to the
// next service in order (Leads Generation → Media Buy → Video → Content → Social → Email). The service being read
// grows bigger and darker on the right (showing its description and tags), the others shrink and fade, and the
// visual on the left changes to match. Half a screen of scrolling per service.
// Tablet/phone: no pinning; visual on top plays through on its own and the matching service highlights in sync.
// Visitors can click/tap a service to jump to it. All titles, descriptions, tags and icons are editable in the panel.

import * as React from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { useInView } from "framer-motion"

// ---------- Visual (six scenes) ----------

type VisualProps = {
    mode: "auto" | "scroll" | "play"
    interval: number
    previewScene: number
    activeIndex?: number
    ink: string
    accent: string
    card: string
    soft: string
    ctaLabel: string
    leadToast: string
    ppcQuery: string
    ppcUrl: string
    ppcHeadline: string
    ppcText: string
    contentChip: string
    emailSubject: string
    emailPreview: string
    font: React.CSSProperties
    style?: React.CSSProperties
}

const SCENES = 6
const BOX = 400 // design canvas, scaled to fit the frame

function findSticky(el: HTMLElement | null): HTMLElement | null {
    let n = el?.parentElement || null
    while (n && n !== document.body) {
        if (getComputedStyle(n).position === "sticky") return n
        n = n.parentElement
    }
    return null
}

const heartPath =
    "M12 21s-7.5-4.6-9.5-9.2C1 8 3.5 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.5 0 6 3.5 4.5 7.3C19.5 16.4 12 21 12 21z"

function ServiceShowcaseVisual(props: VisualProps) {
    const {
        mode = "auto", interval = 3.2, previewScene = 1, activeIndex, ink = "#154882", accent = "#1aaae2",
        card = "#ffffff", soft = "#ece9df", ctaLabel = "Get a free consultation", leadToast = "New enquiry received",
        ppcQuery = "digital marketing agency", ppcUrl = "yourbrand.com",
        ppcHeadline = "Get More Qualified Leads | Free Strategy Call",
        ppcText = "Ads, landing pages and daily optimisation, run by one team.", contentChip = "Published · Blog",
        emailSubject = "Your free guide is here", emailPreview = "Thanks for downloading. Here's what's next…",
        font, style,
    } = props
    const controlled = typeof activeIndex === "number" && activeIndex >= 0
    const isStatic = useIsStaticRenderer()
    const ref = React.useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { margin: "0px 0px -10% 0px" })
    const [own, setOwn] = React.useState(Math.max(0, Math.min(SCENES - 1, previewScene - 1)))
    const [scale, setScale] = React.useState(1)
    const [driver, setDriver] = React.useState<"scroll" | "play">("play")
    const [reduce, setReduce] = React.useState(false)
    const active = controlled ? Math.min(SCENES - 1, activeIndex as number) : own

    // scale the 400x400 design canvas to the frame
    React.useEffect(() => {
        const el = ref.current
        if (!el || typeof ResizeObserver === "undefined") return
        const ro = new ResizeObserver(([e]) => {
            const s = Math.min(e.contentRect.width, e.contentRect.height) / BOX
            React.startTransition(() => setScale(Math.max(0.4, Math.min(1.6, s))))
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    React.useEffect(() => {
        if (typeof window === "undefined") return
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        React.startTransition(() => setReduce(mq.matches))
    }, [])

    // canvas preview: show the chosen scene
    React.useEffect(() => {
        if (isStatic && !controlled) React.startTransition(() => setOwn(Math.max(0, Math.min(SCENES - 1, previewScene - 1))))
    }, [isStatic, previewScene, controlled])

    // scroll-follow when used on its own: scene changes as each service row passes the middle of the screen
    React.useEffect(() => {
        if (controlled || isStatic || typeof window === "undefined") return
        if (mode === "play") { React.startTransition(() => setDriver("play")); return }
        const sticky = findSticky(ref.current)
        const list = sticky?.nextElementSibling as HTMLElement | null
        const rows = list ? (Array.from(list.children) as HTMLElement[]) : []
        const sideBySide = () => {
            if (!sticky || !list) return false
            const a = sticky.getBoundingClientRect(), b = list.getBoundingClientRect()
            return b.left >= a.right - 1
        }
        if (!sticky || rows.length < 2) { React.startTransition(() => setDriver("play")); return }
        let raf = 0
        const update = () => {
            raf = 0
            if (mode === "auto" && !sideBySide()) { React.startTransition(() => setDriver("play")); return }
            React.startTransition(() => setDriver("scroll"))
            const line = window.innerHeight * 0.55
            let idx = 0
            rows.forEach((r, i) => { if (r.getBoundingClientRect().top <= line) idx = i })
            const scene = Math.min(SCENES - 1, idx)
            React.startTransition(() => setOwn(scene))
        }
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [isStatic, mode, controlled])

    // play-through when not following scroll; paused off-screen and for reduced motion
    React.useEffect(() => {
        if (controlled || isStatic || reduce || driver !== "play" || !inView) return
        const id = window.setInterval(() => React.startTransition(() => setOwn((a) => (a + 1) % SCENES)), Math.max(1500, interval * 1000))
        return () => window.clearInterval(id)
    }, [controlled, isStatic, reduce, driver, inView, interval])

    const P = "ctsv"
    const fontFamily = (font && font.fontFamily) || 'Inter, "Inter Placeholder", system-ui, sans-serif'
    const css = `
.${P}{--ink:${ink};--accent:${accent};--card:${card};--soft:${soft};position:relative;width:100%;height:100%;overflow:hidden;font-family:${fontFamily}}
.${P} *{box-sizing:border-box}
.${P}-box{position:absolute;left:50%;top:50%;width:${BOX}px;height:${BOX}px;transform-origin:center}
.${P}-s{position:absolute;inset:0;display:grid;place-items:center;opacity:0;transform:translateY(14px) scale(.98);transition:opacity .55s ease,transform .55s ease;pointer-events:none}
.${P}-s.on{opacity:1;transform:none}
.${P}-c{background:var(--card);border-radius:14px;box-shadow:0 1px 2px rgba(21,72,130,.06),0 12px 32px rgba(21,72,130,.12)}
.${P}-bar{height:8px;border-radius:4px;background:var(--soft)}
.${P}.run .${P}-float{animation:${P}-float 5s ease-in-out infinite}
@keyframes ${P}-float{50%{transform:translateY(-6px)}}
@keyframes ${P}-pop{to{opacity:1;transform:none}}
@keyframes ${P}-fill{to{width:100%}}
@keyframes ${P}-grow{to{transform:scaleX(1)}}
@keyframes ${P}-type{to{width:100%}}
@keyframes ${P}-ring{70%{box-shadow:0 0 0 18px rgba(255,255,255,0)}100%{box-shadow:0 0 0 0 rgba(255,255,255,0)}}
@keyframes ${P}-beat{40%{transform:scale(1.35)}}
@keyframes ${P}-up{0%{opacity:0;transform:translateY(0)}20%{opacity:1}100%{opacity:0;transform:translateY(-110px)}}
@keyframes ${P}-click{0%{opacity:0;transform:translate(30px,30px)}60%{opacity:1;transform:none}75%{transform:scale(.85)}100%{opacity:1;transform:none}}
/* lead gen */
.${P}-lp{width:300px;padding:18px;display:grid;gap:10px}
.${P}-hero{height:64px;border-radius:8px;background:linear-gradient(135deg,var(--ink),var(--accent))}
.${P}-field{height:28px;border-radius:6px;border:1px solid var(--soft);background:#fafafa}
.${P}-btn{height:32px;border-radius:6px;background:var(--accent);color:#fff;font-size:12.5px;font-weight:600;display:grid;place-items:center}
.${P}-toast{position:absolute;right:16px;top:44px;padding:10px 14px;display:flex;gap:10px;align-items:center;font-size:13px;font-weight:500;color:var(--ink);opacity:0;transform:translateY(-8px)}
.${P}-toast b{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#1f9d6b;color:#fff;font-size:12px}
.${P}.run .${P}-s.on .${P}-toast{animation:${P}-pop .5s .9s forwards}
/* ppc */
.${P}-ppc{display:grid;justify-items:center;gap:12px}
.${P}-search{width:330px;height:40px;border-radius:999px;padding:0 16px;display:flex;align-items:center;gap:8px;font-size:13px;color:#2b3a4f}
.${P}-q{display:inline-block;overflow:hidden;white-space:nowrap;width:0;border-right:2px solid var(--accent);max-width:270px}
.${P}.run .${P}-s.on .${P}-q{animation:${P}-type 1.2s steps(28) .2s forwards}
.${P}-ad{width:330px;padding:16px 18px;display:grid;gap:6px}
.${P}-ad small{font-size:11px;font-weight:700;color:#2b3a4f}
.${P}-ad i{font-style:normal;font-size:12px;color:#6f7275}
.${P}-ad strong{font-size:17px;color:#1a0dab;font-weight:500;line-height:1.3}
.${P}-ad span{font-size:12.5px;color:#6f7275;line-height:1.45}
.${P}-cur{position:absolute;width:22px;height:22px;left:250px;top:290px;opacity:0}
.${P}.run .${P}-s.on .${P}-cur{animation:${P}-click 1.4s 1.6s forwards}
/* video */
.${P}-vid{width:330px;height:206px;border-radius:14px;background:linear-gradient(160deg,var(--accent) -40%,var(--ink) 70%);position:relative;display:grid;place-items:center;overflow:hidden}
.${P}-play{width:60px;height:60px;border-radius:50%;background:#fff;display:grid;place-items:center}
.${P}-play::after{content:"";border-left:17px solid var(--ink);border-top:11px solid transparent;border-bottom:11px solid transparent;margin-left:5px}
.${P}.run .${P}-s.on .${P}-play{animation:${P}-ring 1.8s infinite}
.${P}-track{position:absolute;left:14px;right:14px;bottom:14px;height:4px;border-radius:2px;background:rgba(255,255,255,.25)}
.${P}-track i{display:block;height:100%;width:0;background:var(--accent);border-radius:2px}
.${P}.run .${P}-s.on .${P}-track i{animation:${P}-fill 3s linear forwards}
/* content */
.${P}-art{width:290px;padding:16px;display:grid;gap:10px}
.${P}-img{height:96px;border-radius:8px;background:linear-gradient(120deg,var(--soft),#dfe9f3)}
.${P}-t{height:12px;width:80%;border-radius:4px;background:var(--ink)}
.${P}.run .${P}-art .${P}-bar{transform-origin:left;transform:scaleX(0)}
.${P}.run .${P}-s.on .${P}-art .${P}-bar{animation:${P}-grow .5s forwards}
.${P}.run .${P}-s.on .${P}-art .${P}-bar:nth-of-type(4){animation-delay:.2s}
.${P}.run .${P}-s.on .${P}-art .${P}-bar:nth-of-type(5){animation-delay:.35s}
.${P}.run .${P}-s.on .${P}-art .${P}-bar:nth-of-type(6){animation-delay:.5s}
.${P}-chip{position:absolute;left:28px;bottom:52px;font-size:12.5px;font-weight:600;color:var(--ink);padding:8px 12px}
/* social */
.${P}-post{width:250px;padding:14px;display:grid;gap:10px}
.${P}-who{display:flex;gap:8px;align-items:center}
.${P}-av{width:28px;height:28px;border-radius:50%;background:var(--accent)}
.${P}-pimg{height:200px;border-radius:8px;background:linear-gradient(135deg,var(--accent),var(--ink))}
.${P}-acts{display:flex;gap:12px;align-items:center}
.${P}-heart{width:22px;height:22px}
.${P}.run .${P}-s.on .${P}-heart{animation:${P}-beat .6s 1s 2}
.${P}-burst{position:absolute;inset:0;pointer-events:none}
.${P}-burst svg{position:absolute;top:58%;width:18px;height:18px;opacity:0}
.${P}.run .${P}-s.on .${P}-burst svg{animation:${P}-up 2.4s ease-out infinite}
/* email */
.${P}-inbox{width:330px;padding:8px;display:grid}
.${P}-row{display:grid;grid-template-columns:28px 1fr;gap:10px;align-items:center;padding:10px;border-radius:8px}
.${P}-dot{width:28px;height:28px;border-radius:50%;background:var(--soft)}
.${P}-l{display:grid;gap:5px;min-width:0}
.${P}-new{background:rgba(26,170,226,.09)}
.${P}.run .${P}-new{opacity:0;transform:translateY(-10px)}
.${P}.run .${P}-s.on .${P}-new{animation:${P}-pop .5s .4s forwards}
.${P}-new .${P}-dot{background:var(--accent)}
.${P}-new strong{font-size:13px;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${P}-new small{font-size:11.5px;color:#6f7275;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.${P}.idle *{animation-play-state:paused!important}
@media (prefers-reduced-motion:reduce){.${P} *{animation:none!important;transition:none!important}.${P} .${P}-toast,.${P} .${P}-new,.${P} .${P}-cur{opacity:1!important;transform:none!important}.${P} .${P}-q{width:auto!important}}
`
    const running = !isStatic && !reduce
    const cls = `${P}${running ? " run" : ""}${running && !inView ? " idle" : ""}`
    const on = (i: number) => `${P}-s${active === i ? " on" : ""}`
    const heart = (fill: string, left: string, delay: string) => (
        <svg viewBox="0 0 24 24" fill={fill} style={{ left, animationDelay: delay }} aria-hidden="true"><path d={heartPath} /></svg>
    )

    return (
        <div ref={ref} className={cls} style={{ position: "relative", ...style }} role="img" aria-label="Animated illustration of clickTRUE services">
            <style>{css}</style>
            <div className={`${P}-box`} style={{ transform: `translate(-50%,-50%) scale(${scale})` }}>
                {/* 1 Leads generation */}
                <div className={on(0)}>
                    <div className={`${P}-c ${P}-lp ${P}-float`}>
                        <div className={`${P}-hero`} />
                        <div className={`${P}-bar`} style={{ width: "70%" }} />
                        <div className={`${P}-field`} />
                        <div className={`${P}-field`} />
                        <div className={`${P}-btn`}>{ctaLabel}</div>
                    </div>
                    <div className={`${P}-c ${P}-toast`}><b>✓</b>{leadToast}</div>
                </div>
                {/* 2 PPC */}
                <div className={on(1)}>
                    <div className={`${P}-ppc`}>
                        <div className={`${P}-c ${P}-search`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6f7275" strokeWidth="2.5" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                            <span className={`${P}-q`}>{ppcQuery}</span>
                        </div>
                        <div className={`${P}-c ${P}-ad ${P}-float`}>
                            <small>Sponsored</small>
                            <i>{ppcUrl}</i>
                            <strong>{ppcHeadline}</strong>
                            <span>{ppcText}</span>
                        </div>
                    </div>
                    <svg className={`${P}-cur`} viewBox="0 0 24 24" fill={ink} aria-hidden="true"><path d="M4 2l16 9-7 2-3 7z" /></svg>
                </div>
                {/* 3 Video */}
                <div className={on(2)}>
                    <div className={`${P}-c ${P}-vid ${P}-float`}>
                        <div className={`${P}-play`} />
                        <div className={`${P}-track`}><i /></div>
                    </div>
                </div>
                {/* 4 Content */}
                <div className={on(3)}>
                    <div className={`${P}-c ${P}-art ${P}-float`}>
                        <div className={`${P}-img`} />
                        <div className={`${P}-t`} />
                        <div className={`${P}-bar`} />
                        <div className={`${P}-bar`} style={{ width: "90%" }} />
                        <div className={`${P}-bar`} style={{ width: "60%" }} />
                    </div>
                    <div className={`${P}-c ${P}-chip`}>{contentChip}</div>
                </div>
                {/* 5 Social */}
                <div className={on(4)}>
                    <div className={`${P}-c ${P}-post ${P}-float`}>
                        <div className={`${P}-who`}><div className={`${P}-av`} /><div className={`${P}-bar`} style={{ width: 90 }} /></div>
                        <div className={`${P}-pimg`} />
                        <div className={`${P}-acts`}>
                            <svg className={`${P}-heart`} viewBox="0 0 24 24" fill="#e0245e" aria-hidden="true"><path d={heartPath} /></svg>
                            <div className={`${P}-bar`} style={{ width: 60 }} />
                        </div>
                    </div>
                    <div className={`${P}-burst`}>
                        {heart("#e0245e", "50%", "0s")}
                        {heart(accent, "44%", ".6s")}
                        {heart("#e0245e", "56%", "1.2s")}
                    </div>
                </div>
                {/* 6 Email */}
                <div className={on(5)}>
                    <div className={`${P}-c ${P}-inbox ${P}-float`}>
                        <div className={`${P}-row ${P}-new`}>
                            <div className={`${P}-dot`} />
                            <div className={`${P}-l`}><strong>{emailSubject}</strong><small>{emailPreview}</small></div>
                        </div>
                        <div className={`${P}-row`}><div className={`${P}-dot`} /><div className={`${P}-l`}><div className={`${P}-bar`} style={{ width: "70%" }} /><div className={`${P}-bar`} style={{ width: "90%" }} /></div></div>
                        <div className={`${P}-row`}><div className={`${P}-dot`} /><div className={`${P}-l`}><div className={`${P}-bar`} style={{ width: "55%" }} /><div className={`${P}-bar`} style={{ width: "80%" }} /></div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ---------- Scroll story ----------


type Img = { src: string; srcSet?: string; alt?: string }
type Service = { title: string; description: string; tags: string; icon?: Img }
type VisualText = {
    ctaLabel: string
    leadToast: string
    ppcQuery: string
    ppcUrl: string
    ppcHeadline: string
    ppcText: string
    contentChip: string
    emailSubject: string
    emailPreview: string
}

type Props = {
    services: Service[]
    pace: number
    topOffset: number
    interval: number
    stackBelow: number
    mobileVisualHeight: number
    previewIndex: number
    ink: string
    accent: string
    body: string
    rule: string
    cardBg: string
    iconBg: string
    titleFont: React.CSSProperties
    bodyFont: React.CSSProperties
    tagFont: React.CSSProperties
    visualText: VisualText
    style?: React.CSSProperties
}

const ICONS = [
    "",
    "https://framerusercontent.com/images/lxfpCxvxsOvAszN5lv3wvZBfoM.svg",
    "https://framerusercontent.com/images/otqN1eStBLafRBpaU1DXJB0W8.svg",
    "https://framerusercontent.com/images/FnZlAVH5rdYyS8zrsMFohc5zyus.svg",
    "https://framerusercontent.com/images/RXgpDOoSRVN4AdxxeYRVyGMI.svg",
    "https://framerusercontent.com/images/xAflsP9BuCuqDpgtVyAzKvKJjc.svg",
]

const DEFAULT_SERVICES: Service[] = [
    { title: "Leads Generation Solution", description: "Plan, execute, and optimise ad campaigns that drive leads, from ads to landing pages.", tags: "Ad Campaigns · Landing Pages · Daily Optimisation" },
    { title: "Media Buy (Pay-Per-Click)", description: "Search and social ads placed where your buyers are already looking, managed and optimised every day.", tags: "Search Ads · Social Ads · Retargeting" },
    { title: "Video Marketing", description: "Short videos that stop the scroll and explain your offer in seconds.", tags: "Short-form Video · Video Ads · Motion Graphics" },
    { title: "Content Creation", description: "Articles, guides and page copy that answer what your buyers are searching for.", tags: "SEO Articles · Guides · Copywriting" },
    { title: "Social Media Management", description: "Consistent posting and community care that keeps your brand top of mind.", tags: "Content Calendar · Community · Reporting" },
    { title: "Email Marketing", description: "Follow-up emails that turn new contacts into enquiries.", tags: "Nurture Flows · Newsletters · Automation" },
]

const DEFAULT_VISUAL: VisualText = {
    ctaLabel: "Get a free consultation",
    leadToast: "New enquiry received",
    ppcQuery: "digital marketing agency",
    ppcUrl: "yourbrand.com",
    ppcHeadline: "Get More Qualified Leads | Free Strategy Call",
    ppcText: "Ads, landing pages and daily optimisation, run by one team.",
    contentChip: "Published · Blog",
    emailSubject: "Your free guide is here",
    emailPreview: "Thanks for downloading. Here's what's next…",
}

function TargetIcon({ ink, accent }: { ink: string; accent: string }) {
    return (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" stroke={ink} strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4.5" stroke={ink} strokeWidth="1.8" />
            <circle cx="12" cy="12" r="1.8" fill={accent} />
            <path d="M17.5 3.5v3h3" stroke={accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.5 3.5 13.5 10.5" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    )
}

function fontRest(f: React.CSSProperties | undefined): React.CSSProperties {
    if (!f) return {}
    const { fontSize, ...rest } = f
    return rest
}

function px(v: unknown, fallback: number): number {
    const n = parseFloat(String(v ?? ""))
    return Number.isFinite(n) ? n : fallback
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1120
 */
export default function ServicesScrollStory(props: Props) {
    const {
        services, pace = 50, topOffset = 96, interval = 3.2, stackBelow = 900, mobileVisualHeight = 300,
        previewIndex = 1, ink = "#154882", accent = "#1aaae2", body = "#2b3a4f", rule = "#e5e2d8",
        cardBg = "#f3f1ea", iconBg = "#e6f4fb", titleFont, bodyFont, tagFont, visualText, style,
    } = props
    const list = services && services.length ? services : DEFAULT_SERVICES
    const n = list.length
    const vt = { ...DEFAULT_VISUAL, ...(visualText || {}) }
    const isStatic = useIsStaticRenderer()
    const outerRef = React.useRef<HTMLDivElement>(null)
    const inView = useInView(outerRef, { margin: "0px 0px -15% 0px" })
    const clampIdx = (i: number) => Math.max(0, Math.min(n - 1, i))
    const [active, setActive] = React.useState(clampIdx(previewIndex - 1))
    const [width, setWidth] = React.useState(1200)
    const [reduce, setReduce] = React.useState(false)
    const pauseUntil = React.useRef(0)

    const stacked = width < stackBelow
    const pinned = !stacked && !isStatic

    React.useEffect(() => {
        const el = outerRef.current
        if (!el || typeof ResizeObserver === "undefined") return
        const ro = new ResizeObserver(([e]) => React.startTransition(() => setWidth(e.contentRect.width)))
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    React.useEffect(() => {
        if (typeof window === "undefined") return
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
        React.startTransition(() => setReduce(mq.matches))
    }, [])

    React.useEffect(() => {
        if (isStatic) React.startTransition(() => setActive(clampIdx(previewIndex - 1)))
    }, [isStatic, previewIndex, n])

    // Desktop: progress through the pinned section decides the active service
    React.useEffect(() => {
        if (!pinned || typeof window === "undefined") return
        const el = outerRef.current
        if (!el) return
        let raf = 0
        const update = () => {
            raf = 0
            const r = el.getBoundingClientRect()
            const total = el.offsetHeight - (window.innerHeight - topOffset)
            const p = total > 0 ? Math.max(0, Math.min(0.9999, (topOffset - r.top) / total)) : 0
            const idx = clampIdx(Math.floor(p * n))
            el.style.setProperty("--ctss-step", String(Math.min(1, p * n - idx)))
            React.startTransition(() => setActive(idx))
        }
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [pinned, topOffset, n])

    // Tablet/phone: play through while on screen (pauses briefly after a tap)
    React.useEffect(() => {
        if (!stacked || isStatic || reduce || !inView) return
        const id = window.setInterval(() => {
            if (Date.now() < pauseUntil.current) return
            React.startTransition(() => setActive((a) => (a + 1) % n))
        }, Math.max(1500, interval * 1000))
        return () => window.clearInterval(id)
    }, [stacked, isStatic, reduce, inView, interval, n])

    const select = React.useCallback(
        (i: number) => {
            const el = outerRef.current
            if (pinned && el && typeof window !== "undefined") {
                const total = el.offsetHeight - (window.innerHeight - topOffset)
                const start = el.getBoundingClientRect().top + window.scrollY - topOffset
                window.scrollTo({ top: start + ((i + 0.5) / n) * total, behavior: reduce ? "auto" : "smooth" })
            } else {
                pauseUntil.current = Date.now() + 10000
                React.startTransition(() => setActive(i))
            }
        },
        [pinned, topOffset, n, reduce]
    )

    const big = px(titleFont?.fontSize, 40) * (stacked ? 0.7 : 1)
    const small = Math.round(big * 0.62)
    const P = "ctss"
    const css = `
.${P}{--ink:${ink};--accent:${accent};--body:${body};--rule:${rule};--big:${big}px;--small:${small}px}
.${P} *{box-sizing:border-box}
.${P}-grid{display:grid;grid-template-columns:${stacked ? "1fr" : "minmax(0,1fr) minmax(0,1fr)"};gap:${stacked ? 28 : 56}px;align-items:center;width:100%}
.${P}-card{background:${cardBg};border-radius:20px;overflow:hidden;padding:${stacked ? 12 : 24}px;width:100%}
.${P}-list{display:grid;min-width:0}
.${P}-row{appearance:none;background:none;border:0;border-bottom:1px solid var(--rule);margin:0;padding:${stacked ? 14 : 18}px 0;width:100%;text-align:left;cursor:pointer;display:grid;grid-template-columns:44px minmax(0,1fr);gap:16px;align-items:start;color:inherit;font:inherit}
.${P}-row:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:6px}
.${P}-icon{width:44px;height:44px;border-radius:12px;background:${iconBg};display:grid;place-items:center;transform:scale(.86);opacity:.55;transition:transform .45s ease,opacity .45s ease}
.${P}-icon img{width:28px;height:28px;object-fit:contain;display:block}
.${P}-title{display:block;color:var(--ink);font-size:var(--small);line-height:1.1;opacity:.42;transition:font-size .45s ease,opacity .45s ease;padding-top:6px;text-wrap:balance}
.${P}-more{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s ease}
.${P}-more>div{overflow:hidden;min-height:0}
.${P}-desc{display:block;color:var(--body);margin:12px 0 0;max-width:460px}
.${P}-tags{display:block;color:#828486;margin:8px 0 0}
.${P}-bar{height:2px;background:var(--rule);border-radius:2px;margin-top:14px;overflow:hidden}
.${P}-bar i{display:block;height:100%;width:calc(var(--ctss-step,0) * 100%);background:var(--accent)}
.${P}-row.on .${P}-icon{transform:scale(1);opacity:1}
.${P}-row.on .${P}-title{font-size:var(--big);opacity:1}
.${P}-row.on .${P}-more{grid-template-rows:1fr}
.${P}-row:not(.on):hover .${P}-title{opacity:.7}
@media (prefers-reduced-motion:reduce){.${P} *{transition:none!important}}
`
    const visualHeight = stacked ? mobileVisualHeight : isStatic ? 560 : `min(560px, calc(100vh - ${topOffset + 48}px))`

    const content = (
        <div className={`${P}-grid`}>
            <div className={`${P}-card`} style={{ height: visualHeight }}>
                <ServiceShowcaseVisual
                    activeIndex={Math.min(5, active)}
                    mode="play"
                    interval={interval}
                    previewScene={1}
                    ink={ink}
                    accent={accent}
                    card="#ffffff"
                    soft="#ece9df"
                    font={bodyFont}
                    style={{ width: "100%", height: "100%" }}
                    {...vt}
                />
            </div>
            <div className={`${P}-list`} role="tablist" aria-label="Our services">
                {list.map((s, i) => {
                    const on = i === active
                    const iconSrc = s.icon?.src || ICONS[i] || ""
                    return (
                        <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={on}
                            className={`${P}-row${on ? " on" : ""}`}
                            onClick={() => select(i)}
                        >
                            <span className={`${P}-icon`}>
                                {iconSrc ? <img src={iconSrc} srcSet={s.icon?.srcSet} alt="" /> : <TargetIcon ink={ink} accent={accent} />}
                            </span>
                            <span style={{ minWidth: 0 }}>
                                <span className={`${P}-title`} style={fontRest(titleFont)}>{s.title}</span>
                                <span className={`${P}-more`} aria-hidden={!on}>
                                    <div>
                                        {s.description ? <span className={`${P}-desc`} style={bodyFont}>{s.description}</span> : null}
                                        {s.tags ? <span className={`${P}-tags`} style={tagFont}>{s.tags}</span> : null}
                                        {pinned ? <span className={`${P}-bar`} aria-hidden="true"><i /></span> : null}
                                    </div>
                                </span>
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    )

    return (
        <div
            ref={outerRef}
            className={P}
            style={{
                position: "relative",
                width: "100%",
                height: pinned ? `calc(${(n - 1) * pace}vh + 100vh - ${topOffset}px)` : "auto",
                ...style,
            }}
        >
            <style>{css}</style>
            {pinned ? (
                <div style={{ position: "sticky", top: topOffset, height: `calc(100vh - ${topOffset}px)`, display: "flex", alignItems: "center" }}>
                    {content}
                </div>
            ) : (
                content
            )}
        </div>
    )
}

ServicesScrollStory.displayName = "Services Scroll Story"

addPropertyControls(ServicesScrollStory, {
    services: {
        type: ControlType.Array,
        title: "Services",
        maxCount: 6,
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String, title: "Title", defaultValue: "Service name" },
                description: { type: ControlType.String, title: "Description", displayTextArea: true, defaultValue: "" },
                tags: { type: ControlType.String, title: "Tags", defaultValue: "" },
                icon: { type: ControlType.ResponsiveImage, title: "Icon" },
            },
        },
        defaultValue: DEFAULT_SERVICES,
    },
    pace: { type: ControlType.Number, title: "Scroll per service", defaultValue: 50, min: 25, max: 100, step: 5, unit: "vh" },
    topOffset: { type: ControlType.Number, title: "Space for menu bar", defaultValue: 96, min: 0, max: 200, step: 4, unit: "px" },
    interval: { type: ControlType.Number, title: "Mobile: seconds each", defaultValue: 3.2, min: 1.5, max: 8, step: 0.1, unit: "s" },
    stackBelow: { type: ControlType.Number, title: "Stack below width", defaultValue: 900, min: 500, max: 1200, step: 10, unit: "px" },
    mobileVisualHeight: { type: ControlType.Number, title: "Mobile visual height", defaultValue: 300, min: 200, max: 480, step: 10, unit: "px" },
    previewIndex: {
        type: ControlType.Number,
        title: "Canvas preview",
        description: "Which service shows as active in the Framer editor.",
        defaultValue: 1, min: 1, max: 6, step: 1, displayStepper: true,
    },
    visualText: {
        type: ControlType.Object,
        title: "Visual text",
        controls: {
            ctaLabel: { type: ControlType.String, title: "Leads: button", defaultValue: DEFAULT_VISUAL.ctaLabel },
            leadToast: { type: ControlType.String, title: "Leads: pop-up", defaultValue: DEFAULT_VISUAL.leadToast },
            ppcQuery: { type: ControlType.String, title: "PPC: search", defaultValue: DEFAULT_VISUAL.ppcQuery },
            ppcUrl: { type: ControlType.String, title: "PPC: web address", defaultValue: DEFAULT_VISUAL.ppcUrl },
            ppcHeadline: { type: ControlType.String, title: "PPC: headline", defaultValue: DEFAULT_VISUAL.ppcHeadline },
            ppcText: { type: ControlType.String, title: "PPC: text", defaultValue: DEFAULT_VISUAL.ppcText },
            contentChip: { type: ControlType.String, title: "Content: label", defaultValue: DEFAULT_VISUAL.contentChip },
            emailSubject: { type: ControlType.String, title: "Email: subject", defaultValue: DEFAULT_VISUAL.emailSubject },
            emailPreview: { type: ControlType.String, title: "Email: preview", defaultValue: DEFAULT_VISUAL.emailPreview },
        },
    },
    ink: { type: ControlType.Color, title: "Brand navy", defaultValue: "#154882" },
    accent: { type: ControlType.Color, title: "Brand blue", defaultValue: "#1aaae2" },
    body: { type: ControlType.Color, title: "Body text", defaultValue: "#2b3a4f" },
    rule: { type: ControlType.Color, title: "Divider", defaultValue: "#e5e2d8" },
    cardBg: { type: ControlType.Color, title: "Visual card", defaultValue: "#f3f1ea" },
    iconBg: { type: ControlType.Color, title: "Icon background", defaultValue: "#e6f4fb" },
    titleFont: {
        type: ControlType.Font,
        title: "Title font",
        defaultValue: { fontSize: "40px", variant: "Bold", letterSpacing: "-0.035em", lineHeight: "1.08em" },
        controls: "extended",
        defaultFontType: "sans-serif",
    },
    bodyFont: {
        type: ControlType.Font,
        title: "Description font",
        defaultValue: { fontSize: "17px", variant: "Regular", letterSpacing: "0em", lineHeight: "1.6em" },
        controls: "extended",
        defaultFontType: "sans-serif",
    },
    tagFont: {
        type: ControlType.Font,
        title: "Tags font",
        defaultValue: { fontSize: "13px", variant: "Regular", letterSpacing: "0em", lineHeight: "1.5em" },
        controls: "extended",
        defaultFontType: "sans-serif",
    },
})
