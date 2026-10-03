export type ParsedVideo =
  | { kind: "vimeo"; id: string }
  | { kind: "youtube"; id: string }
  | { kind: "other" };

/** Vimeo and YouTube links in their common shapes; anything else is a plain link. */
export function parseVideoUrl(url: string): ParsedVideo {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = u.pathname.split("/").find((part) => /^\d+$/.test(part));
      if (id) return { kind: "vimeo", id };
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      if (id) return { kind: "youtube", id };
    }
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      const v = u.searchParams.get("v");
      if (v) return { kind: "youtube", id: v };
      const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{6,})/);
      if (m) return { kind: "youtube", id: m[1] };
    }
  } catch {
    // Not a URL — fall through to a plain link.
  }
  return { kind: "other" };
}
