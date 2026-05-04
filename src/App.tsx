import { lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import SharedLayout from "@/layouts/SharedLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";

const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticlePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PreviewDossier = lazy(() => import("./pages/preview/Dossier"));
const PreviewAtelier = lazy(() => import("./pages/preview/Atelier"));
const PreviewWorkshop = lazy(() => import("./pages/preview/Workshop"));
const PreviewV2 = lazy(() => import("./pages/preview/V2"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<SharedLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/course" element={<CoursePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/preview/dossier" element={<PreviewDossier />} />
              <Route path="/preview/atelier" element={<PreviewAtelier />} />
              <Route path="/preview/workshop" element={<PreviewWorkshop />} />
              <Route path="/preview/v2" element={<PreviewV2 />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  </ErrorBoundary>
);

export default App;
