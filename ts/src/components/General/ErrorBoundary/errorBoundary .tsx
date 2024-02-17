import React, { PropsWithChildren, useState } from 'react';

const ErrorBoundary:React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    const componentDidCatch = (error: any, info: any) => {
        setHasError(true);
        console.error('Error Boundary:', error, info);
    };

    if (hasError) {
        return <div>Error occurred. Please try again later.</div>;
    }

    return children;
};

export default ErrorBoundary;