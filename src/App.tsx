import { lazy } from "react";
import { Outlet } from "react-router-dom";
import type { RouteRecord } from "vite-react-ssg";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SharedLayout from "@/layouts/SharedLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import { articles } from "@/data/articles";

const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticlePage"));
const ProgramPage = lazy(() => import("./pages/ProgramPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/**
 * RootProviders wraps the entire route tree with the global providers.
 * vite-react-ssg renders the routes data array, so providers move from
 * JSX-around-Routes to the root layout of the route tree. <Head> from
 * vite-react-ssg manages document-head tags (no HelmetProvider needed).
 */
const RootProviders = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Outlet />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export const routes: RouteRecord[] = [
  {
    element: <RootProviders />,
    children: [
      {
        // Standalone hidden landing page — no site nav/footer, noindex,
        // excluded from sitemap. Reachable only via direct link (/program).
        path: "program",
        element: <ProgramPage />,
        entry: "src/pages/ProgramPage.tsx",
      },
      {
        element: <SharedLayout />,
        children: [
          {
            index: true,
            element: <Index />,
            entry: "src/pages/Index.tsx",
          },
          {
            path: "services",
            element: <ServicesPage />,
            entry: "src/pages/ServicesPage.tsx",
          },
          {
            path: "course",
            element: <CoursePage />,
            entry: "src/pages/CoursePage.tsx",
          },
          {
            path: "about",
            element: <AboutPage />,
            entry: "src/pages/AboutPage.tsx",
          },
          {
            path: "testimonials",
            element: <TestimonialsPage />,
            entry: "src/pages/TestimonialsPage.tsx",
          },
          {
            path: "contact",
            element: <ContactPage />,
            entry: "src/pages/ContactPage.tsx",
          },
          {
            path: "blog",
            element: <BlogPage />,
            entry: "src/pages/BlogPage.tsx",
          },
          {
            path: "blog/:slug",
            element: <BlogArticlePage />,
            entry: "src/pages/BlogArticlePage.tsx",
            getStaticPaths: () => articles.map((a) => `blog/${a.slug}`),
          },
          {
            path: "*",
            element: <NotFound />,
            entry: "src/pages/NotFound.tsx",
          },
        ],
      },
    ],
  },
];

export default routes;
