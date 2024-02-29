import { BrowserRouter as Router } from 'react-router-dom';
import WebRouters from './routes/routes';
import ErrorBoundary from './components/General/ErrorBoundary/errorBoundary ';
import Loader from './components/General/loader/loader';
import { Suspense } from 'react';
window.global = window;
function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <WebRouters />
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
