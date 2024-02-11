import { BrowserRouter as Router } from 'react-router-dom';
import WebRouters from './util/routes';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  return (
    <GoogleOAuthProvider clientId={'789696358541-g2m8o8ik8de7j8f662n3281rtbcec9uc.apps.googleusercontent.com'} >
      <Router>
        <WebRouters />
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
