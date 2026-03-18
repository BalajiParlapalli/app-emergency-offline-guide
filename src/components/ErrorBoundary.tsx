import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            background: "#141414",
            color: "#fff",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>⚠️ Something went wrong</h1>
          <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 24 }}>
            The app crashed. Use the buttons below for help.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="tel:112"
              style={{
                padding: "14px 28px",
                background: "#dc2626",
                color: "#fff",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 18,
                textDecoration: "none",
              }}
            >
              📞 Call 112
            </a>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "14px 28px",
                background: "#e8720c",
                color: "#fff",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 16,
                border: "none",
                cursor: "pointer",
              }}
            >
              🔄 Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
