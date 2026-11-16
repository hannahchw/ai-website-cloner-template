// Request: replace the magnet image in the "Our Services" sticky card with a visual that changes per service
// (Concept A). Six small scenes built in brand colours, no images: Leads Generation (landing page + new enquiry),
// PPC (search ad being clicked), Video (play + progress), Content (article writing itself), Social (post + hearts),
// Email (new email arriving). Used inside "Services Scroll Story", which tells it which scene to show (activeIndex).
// On its own: desktop follows the scroll (scene changes as each service passes the middle of the screen),
// tablet/phone plays through on its own while on screen. All card text is editable. Respects "reduce motion".

import * as React from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { useInView } from "framer-motion"

type Props = {
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

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 440
 * @framerIntrinsicHeight 440
 */
export default function ServiceShowcaseVisual(props: Props) {
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

ServiceShowcaseVisual.displayName = "Service Showcase Visual"

addPropertyControls(ServiceShowcaseVisual, {
    mode: {
        type: ControlType.Enum,
        title: "Behaviour",
        options: ["auto", "scroll", "play"],
        optionTitles: ["Auto (scroll on desktop)", "Follow scroll", "Play on its own"],
        defaultValue: "auto",
    },
    interval: { type: ControlType.Number, title: "Seconds per scene", defaultValue: 3.2, min: 1.5, max: 8, step: 0.1, unit: "s" },
    previewScene: {
        type: ControlType.Number,
        title: "Canvas preview",
        description: "Which scene shows in the Framer editor (1 Leads, 2 PPC, 3 Video, 4 Content, 5 Social, 6 Email).",
        defaultValue: 1, min: 1, max: 6, step: 1, displayStepper: true,
    },
    ink: { type: ControlType.Color, title: "Brand navy", defaultValue: "#154882" },
    accent: { type: ControlType.Color, title: "Brand blue", defaultValue: "#1aaae2" },
    card: { type: ControlType.Color, title: "Card", defaultValue: "#ffffff" },
    soft: { type: ControlType.Color, title: "Placeholder lines", defaultValue: "#ece9df" },
    ctaLabel: { type: ControlType.String, title: "Leads: button", defaultValue: "Get a free consultation" },
    leadToast: { type: ControlType.String, title: "Leads: pop-up", defaultValue: "New enquiry received" },
    ppcQuery: { type: ControlType.String, title: "PPC: search", defaultValue: "digital marketing agency" },
    ppcUrl: { type: ControlType.String, title: "PPC: web address", defaultValue: "yourbrand.com" },
    ppcHeadline: { type: ControlType.String, title: "PPC: headline", defaultValue: "Get More Qualified Leads | Free Strategy Call" },
    ppcText: { type: ControlType.String, title: "PPC: text", defaultValue: "Ads, landing pages and daily optimisation, run by one team." },
    contentChip: { type: ControlType.String, title: "Content: label", defaultValue: "Published · Blog" },
    emailSubject: { type: ControlType.String, title: "Email: subject", defaultValue: "Your free guide is here" },
    emailPreview: { type: ControlType.String, title: "Email: preview", defaultValue: "Thanks for downloading. Here's what's next…" },
    font: {
        type: ControlType.Font,
        title: "Font",
        defaultValue: { fontSize: "13px", variant: "Medium", letterSpacing: "0em", lineHeight: "1.4em" },
        controls: "extended",
        defaultFontType: "sans-serif",
    },
})
