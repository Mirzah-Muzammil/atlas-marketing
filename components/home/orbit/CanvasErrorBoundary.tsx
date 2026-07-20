"use client";

import { Component, type ReactNode } from "react";

type CanvasErrorBoundaryProps = { children: ReactNode };
type CanvasErrorBoundaryState = { failed: boolean };

export class CanvasErrorBoundary extends Component<CanvasErrorBoundaryProps, CanvasErrorBoundaryState> {
  state: CanvasErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): CanvasErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch() {
    // The semantic Orbit route remains visible when the decorative renderer fails.
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
