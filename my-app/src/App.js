import React, { useRef, useState } from 'react';
import './App.css';
import PathfindingCivilization from './PathfindingCivilization/PathfindingVisualizer';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

function App() {
  const recaptchaRef = useRef();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

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
    <div className="App">
      {!isCaptchaVerified ? (
        <div>
          <h2>Please complete the CAPTCHA</h2>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            onChange={handleCaptchaChange}
            ref={recaptchaRef}
          />
        </div>
      ) : (
        <PathfindingCivilization />
      )}
    </div>
  );
}

export default App;
