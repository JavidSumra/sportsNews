import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

const LiveScore = React.lazy(() => import("./LiveScore"));

const LiveMatch = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <LiveScore />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default LiveMatch;
