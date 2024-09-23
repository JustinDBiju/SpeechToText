import "./App.css";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";
import logo from "./assests/logo.png"; // Update the path based on where you place the logo

const App = () => {
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, { successDuration: 1000 });

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="unsupported">
        <p>Your browser does not support speech recognition. Please try another one.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <img src={logo} alt="StemXpert Logo" className="logo" />
          <h1>StemXpert</h1>
          <h3>ROBO's Speech-to-Text Conversion</h3>
          <p>Click to listen and watch speech being converted to text!</p>
        </div>

        <div className="main-content" onClick={() => setTextToCopy(transcript)}>
          {transcript || <p className="placeholder">Speech transcript will appear here...</p>}
        </div>

        <div className="btn-container">
          <button className="btn-primary" onClick={startListening}>
            Start Listening
          </button>
          <button className="btn-secondary" onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
          <button className="btn-copy" onClick={setCopied}>
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </>
  );
};

export default App;

