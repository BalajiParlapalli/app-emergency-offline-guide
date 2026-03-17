import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff } from "lucide-react";
import { commands, findCommand } from "@/lib/voice-commands";

const VoiceCommand = () => {
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
    }
  }, []);

  const startListening = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let matched = false;

      // Check all alternatives
      for (let a = 0; a < event.results[0].length && !matched; a++) {
        const transcript = event.results[0][a].transcript;
        const key = findCommand(transcript);

        if (key) {
          const route = commands[key];
          navigate(route);
          setFeedback(`Heard: "${event.results[0][0].transcript}" → Going to ${key}`);
          matched = true;
        }
      }

      if (!matched) {
        const heard = event.results[0][0].transcript;
        setFeedback(`"${heard}" — not recognized. Try saying: Emergency, Guide, SOS, Compass, Notebook`);
      }

      setTimeout(() => setFeedback(null), 4000);
      setListening(false);
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error === "no-speech") {
        setFeedback("No speech detected. Tap and speak clearly.");
      } else if (e.error === "not-allowed") {
        setFeedback("Microphone access denied. Allow in browser settings.");
      } else {
        setFeedback("Could not hear. Try again.");
      }
      setTimeout(() => setFeedback(null), 4000);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setFeedback("🎤 Listening... say a command like 'open compass' or 'go to emergency'");
  }, [navigate]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
    setFeedback(null);
  }, []);

  if (!supported) return null;

  return (
    <>
      <button
        onClick={listening ? stopListening : startListening}
        className={`touch-target fixed bottom-20 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all ${
          listening
            ? "bg-destructive text-destructive-foreground animate-pulse"
            : "bg-primary text-primary-foreground"
        }`}
        aria-label={listening ? "Stop voice command" : "Start voice command — say Emergency, Guide, Compass, SOS, Notebook"}
        title="Voice commands: say Emergency, Guide, Compass, SOS, Notebook, etc."
      >
        {listening ? (
          <MicOff className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Mic className="h-6 w-6" aria-hidden="true" />
        )}
        <span className="sr-only">{listening ? "Stop voice command" : "Voice command"}</span>
      </button>

      {feedback && (
        <div
          className="fixed bottom-36 right-4 z-50 bg-card border border-border rounded-lg px-4 py-3 text-sm shadow-lg max-w-[240px]"
          role="status"
          aria-live="assertive"
        >
          {feedback}
        </div>
      )}
    </>
  );
};

export default VoiceCommand;
