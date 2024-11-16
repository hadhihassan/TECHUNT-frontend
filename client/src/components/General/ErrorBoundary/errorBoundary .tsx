/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, PropsWithChildren } from 'react';

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<PropsWithChildren<object>, ErrorBoundaryState> {
    constructor(props: PropsWithChildren<object>) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        console.error('Error Boundary:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen w-full   px-4 py-3 rounded-md my-4 flex items-center justify-center mt-auto" role="alert">
                    <p className="font-bold">Oops! Something went wrong.</p>
                    <p>We're sorry, but an error occurred while rendering this page.</p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
