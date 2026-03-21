import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="text-center max-w-md">
            <img src="/favicon.png" alt="" className="w-20 h-20 mx-auto mb-6 opacity-50 grayscale" />
            <h1 className="text-2xl font-bold text-foreground mb-3">
              אופס! משהו השתבש
            </h1>
            <p className="text-muted-foreground mb-8">
              הקרנף נתקל בבעיה בלתי צפויה. נסו לרענן את הדף.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
            >
              רענון הדף
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
