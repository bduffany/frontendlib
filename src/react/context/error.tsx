import React, {
  Component,
  useState,
  useCallback,
  createContext,
  useEffect,
} from 'react';
import useEventListener from '../hooks/useEventListener';

/** Represents an unhandled error. */
export interface UnhandledError {
  error: any;
  /** Imperatively clears the error field. */
  clearError: () => void;
}

const ErrorContext = createContext<UnhandledError | null>(null);

/**
 * Error boundary that catches synchronously thrown exceptions as well as unhandled promise
 * rejections.
 */
export default class ErrorContextProvider extends Component<{ children: any }> {
  state = { caughtException: null as any };

  onComponentDidCatch(e: any) {
    this.setState({ caughtException: e });
  }

  render() {
    return (
      <UnhandledRejectionContext.Consumer>
        {(unhandledRejection) => (
          <ErrorContextProviderInner
            rejection={unhandledRejection}
            exception={this.state.caughtException}
          >
            {this.props.children}
          </ErrorContextProviderInner>
        )}
      </UnhandledRejectionContext.Consumer>
    );
  }
}

function ErrorContextProviderInner({
  exception,
  rejection,
  children,
}: {
  exception: any;
  rejection: any;
  children: any;
}) {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(exception);
  }, [exception]);

  useEffect(() => {
    setError(rejection);
  }, [rejection]);

  return (
    <ErrorContext.Provider value={{ error, clearError: () => setError(null) }}>
      {children}
    </ErrorContext.Provider>
  );
}

export const UnhandledRejectionContext = createContext<any>(null);

/**
 * Allows accessing the last unhandled promise rejection via
 * UnhandledRejectionContext.
 *
 * This enables the capability of providing generic error handlers at the
 * top level of the app.
 */
export function UnhandledRejectionContextProvider({ children }: any) {
  const [unhandledRejection, setUnhandledRejection] = useState(null);

  const onUnhandledRejection = useCallback((e) => setUnhandledRejection(e), []);
  useEventListener(window, 'unhandledrejection', onUnhandledRejection);

  return (
    <UnhandledRejectionContext.Provider value={unhandledRejection}>
      {children}
    </UnhandledRejectionContext.Provider>
  );
}
