
import '../../styles/interview/systemCheck.scss';

const SystemCheck = () => {
  return (
    <div className="system-check">
      <h1 className="system-check__title">System Check</h1>
      <p className="system-check__description">
        Before you begin your async interview, please test your system to ensure everything is working properly.
      </p>

      <div className="system-check__section">
        <h2 className="system-check__section-title">🎥 Webcam Test</h2>
        <p className="system-check__section-description">
          You should see yourself in the video below. Make sure your face is well-lit and centered.
        </p>
        <video className="system-check__video" autoPlay muted></video>
      </div>

      <div className="system-check__section">
        <h2 className="system-check__section-title">🎙️ Microphone Test</h2>
        <p className="system-check__section-description">
          Speak out loud and check that your microphone is picking up sound.
        </p>
        <audio className="system-check__audio" controls></audio>
        <button className="system-check__button">Start Mic Test</button>
      </div>

      <div className="system-check__section">
        <h2 className="system-check__section-title">📹 Test Recording</h2>
        <p className="system-check__section-description">
          Record a 5-second clip to ensure your camera and mic are working together.
        </p>
        <button className="system-check__button">Record Test Clip</button>
      </div>

      <div className="system-check__warning">
        <h3 className="system-check__warning-title">⚠️ Proctoring Notice</h3>
        <p className="system-check__warning-text">
          This interview is monitored. Your webcam and mic must remain on at all times. If cheating or malpractice is detected — such as reading from another screen, receiving help, or leaving the frame — the session will be terminated immediately.
        </p>
        <p className="system-check__warning-text">
          Please complete your interview honestly and independently.
        </p>
      </div>

      <button className="system-check__proceed">Proceed to Interview</button>
    </div>
  );
};

export default SystemCheck;
