import React, { useRef, useState } from 'react';
import './App.css';
import PathfindingCivilization from './PathfindingCivilization/PathfindingVisualizer';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

function App() {
  const recaptchaRef = useRef();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(true); // turn to false

  const handleCaptchaChange = async (token) => {
    if (token) {
      try {
        const response = await axios.post('http://localhost:5000/verify-captcha', { token }); // Update the URL if needed
        if (response.status === 200) {
          setIsCaptchaVerified(true);
        }
      } catch (error) {
        console.error('CAPTCHA verification failed:', error);
        // Handle error (e.g., show a message to the user)
      }
    }
  };

  return (
    <div id="container">
      <div id="header">
        <h1 id="header">Pathfinding Civilization</h1>
      </div>
      <div class="App">
          {!isCaptchaVerified ? (
            <div id="captcha">
              <h2>Please complete the CAPTCHA</h2>
              <ReCAPTCHA
                id="captchashadow"
                sitekey={process.env.REACT_APP_SITE_KEY}
                onChange={handleCaptchaChange}
                ref={recaptchaRef}
              />
            </div>
          ) : (
            <PathfindingCivilization />
          )}
      </div>
    </div>
  );
}

export default App;
