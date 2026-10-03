import { describe, expect, it } from "vitest";
import { parseVideoUrl } from "./video";

describe("parseVideoUrl", () => {
  it("reads Vimeo links", () => {
    expect(parseVideoUrl("https://vimeo.com/123456789")).toEqual({ kind: "vimeo", id: "123456789" });
    expect(parseVideoUrl("https://player.vimeo.com/video/987654")).toEqual({ kind: "vimeo", id: "987654" });
  });

  it("reads YouTube links in their common shapes", () => {
    expect(parseVideoUrl("https://www.youtube.com/watch?v=abcDEF12345")).toEqual({ kind: "youtube", id: "abcDEF12345" });
    expect(parseVideoUrl("https://youtu.be/abcDEF12345")).toEqual({ kind: "youtube", id: "abcDEF12345" });
    expect(parseVideoUrl("https://www.youtube.com/shorts/abcDEF12345")).toEqual({ kind: "youtube", id: "abcDEF12345" });
    expect(parseVideoUrl("https://m.youtube.com/watch?v=abcDEF12345")).toEqual({ kind: "youtube", id: "abcDEF12345" });
  });

  it("falls back to a plain link for anything else", () => {
    expect(parseVideoUrl("https://example.com/video.mp4")).toEqual({ kind: "other" });
    expect(parseVideoUrl("not a url")).toEqual({ kind: "other" });
  });
});
