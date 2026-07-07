import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./App";
// Self-hosted variable font (hebrew + latin subsets, all weights in one file
// per subset, loaded by unicode-range) — replaces render-blocking Google Fonts.
import "@fontsource-variable/rubik";
import "./index.css";

export const createRoot = ViteReactSSG({ routes });
