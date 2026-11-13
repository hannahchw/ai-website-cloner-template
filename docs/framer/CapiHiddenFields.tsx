// clickTRUE: Meta CAPI hidden fields for Framer forms
// ------------------------------------------------------------
// Drop ONE instance of this component INSIDE a Framer form (next to the other fields).
// It adds invisible fields that are sent with every submission:
//   Source URL, fbp, fbc, fb_event_id, user-agent, ip-address
// Field names match the clickTRUE ops team's Formstack setup, and can be renamed in the right-hand panel.
//
// fb_event_id is also saved in the browser (sessionStorage key "ct_fb_event_id") so the
// Meta Pixel "Lead" event on the thank-you page can send the SAME id (Pixel + CAPI dedup).
// ip-address uses a free public lookup (api.ipify.org). Turn it off in the panel if your
// server-side setup (e.g. server GTM) already captures the IP.

import * as React from "react"
import { startTransition, useEffect, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

type Props = {
    sourceUrlName: string
    fbpName: string
    fbcName: string
    eventIdName: string
    userAgentName: string
    ipName: string
    includeIp: boolean
}

type Values = { url: string; fbp: string; fbc: string; eventId: string; ua: string; ip: string }

const EVENT_ID_KEY = "ct_fb_event_id"

function readCookie(name: string): string {
    if (typeof document === "undefined") return ""
    const parts = document.cookie ? document.cookie.split("; ") : []
    for (const part of parts) {
        const i = part.indexOf("=")
        if (i > -1 && part.slice(0, i) === name) return decodeURIComponent(part.slice(i + 1))
    }
    return ""
}

function makeEventId(): string {
    if (typeof crypto !== "undefined" && typeof (crypto as Crypto).randomUUID === "function") return (crypto as Crypto).randomUUID()
    return "ev-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10)
}

function buildFbc(): string {
    const existing = readCookie("_fbc")
    if (existing) return existing
    // No cookie yet: build it from ?fbclid= in the link (Meta's documented format).
    try {
        const fbclid = new URL(window.location.href).searchParams.get("fbclid")
        if (fbclid) return `fb.1.${Date.now()}.${fbclid}`
    } catch {}
    return ""
}

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 240
 * @framerIntrinsicHeight 32
 */
export default function CapiHiddenFields(props: Props) {
    const { sourceUrlName, fbpName, fbcName, eventIdName, userAgentName, ipName, includeIp } = props
    const onCanvas = RenderTarget.current() === RenderTarget.canvas
    const [v, setV] = useState<Values>({ url: "", fbp: "", fbc: "", eventId: "", ua: "", ip: "" })

    useEffect(() => {
        if (onCanvas || typeof window === "undefined") return
        let eventId = ""
        try {
            eventId = window.sessionStorage.getItem(EVENT_ID_KEY) || ""
            if (!eventId) {
                eventId = makeEventId()
                window.sessionStorage.setItem(EVENT_ID_KEY, eventId)
            }
        } catch {
            eventId = makeEventId()
        }
        const base = {
            url: window.location.href,
            fbp: readCookie("_fbp"),
            fbc: buildFbc(),
            eventId,
            ua: navigator.userAgent,
        }
        startTransition(() => setV((prev) => ({ ...prev, ...base })))

        // The Pixel may set _fbp a moment after page load, so re-check shortly after.
        const t = window.setTimeout(() => {
            const fbp = readCookie("_fbp")
            const fbc = buildFbc()
            startTransition(() => setV((prev) => ({ ...prev, fbp: fbp || prev.fbp, fbc: fbc || prev.fbc })))
        }, 2500)

        if (includeIp) {
            fetch("https://api.ipify.org?format=json")
                .then((r) => r.json())
                .then((d: { ip?: string }) => startTransition(() => setV((prev) => ({ ...prev, ip: d.ip || "" }))))
                .catch(() => {})
        }
        return () => window.clearTimeout(t)
    }, [onCanvas, includeIp])

    if (onCanvas) {
        return (
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px dashed #1aaae2",
                    borderRadius: 8,
                    color: "#154882",
                    font: '500 11px/1 Inter, "Inter Placeholder", system-ui, sans-serif',
                    background: "rgba(26,170,226,0.06)",
                }}
            >
                CAPI hidden fields ({includeIp ? 6 : 5}) · invisible on site
            </div>
        )
    }

    return (
        <div style={{ position: "relative", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
            <input type="hidden" name={sourceUrlName} value={v.url} readOnly />
            <input type="hidden" name={fbpName} value={v.fbp} readOnly />
            <input type="hidden" name={fbcName} value={v.fbc} readOnly />
            <input type="hidden" name={eventIdName} value={v.eventId} readOnly />
            <input type="hidden" name={userAgentName} value={v.ua} readOnly />
            {includeIp ? <input type="hidden" name={ipName} value={v.ip} readOnly /> : null}
        </div>
    )
}

CapiHiddenFields.displayName = "CAPI Hidden Fields"

addPropertyControls(CapiHiddenFields, {
    sourceUrlName: { type: ControlType.String, title: "Source URL name", defaultValue: "Source URL" },
    fbpName: { type: ControlType.String, title: "fbp name", defaultValue: "fbp" },
    fbcName: { type: ControlType.String, title: "fbc name", defaultValue: "fbc" },
    eventIdName: { type: ControlType.String, title: "Event ID name", defaultValue: "fb_event_id" },
    userAgentName: { type: ControlType.String, title: "User agent name", defaultValue: "user-agent" },
    includeIp: { type: ControlType.Boolean, title: "Include IP", defaultValue: true },
    ipName: {
        type: ControlType.String,
        title: "IP name",
        defaultValue: "ip-address",
        hidden: (p: Partial<Props>) => !p.includeIp,
    },
})
