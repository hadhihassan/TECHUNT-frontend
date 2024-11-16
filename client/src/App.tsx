import { BrowserRouter as Router } from 'react-router-dom';
import WebRouters from './routes/route/routes';
import ErrorBoundary from './components/General/ErrorBoundary/errorBoundary ';
import Loader from './components/General/loader/loader';
import { Suspense } from 'react';
import { SocketContextProvider } from './context/socketContext.tsx'

window.global = window;
function App() {

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <SocketContextProvider>
          <Router>
            <WebRouters />
          </Router>
        </SocketContextProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
