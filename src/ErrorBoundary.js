import { Component } from "react/cjs/react.production.min";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // log to Azure Monitor, Sentry, etc
    console.error("Error Boundary caught an error", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => {
        this.setState((state) => ({ ...state, redirect: true }));
      }, 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          This route has an error. Click to{" "}
          <Link to="/">come back to homepage</Link> or wait 5 seconds
        </h2>
      );
    }
    return this.props.children; //We can render what is inside as children when no error
  }
}

export default ErrorBoundary;
