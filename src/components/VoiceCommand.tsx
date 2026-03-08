import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff } from "lucide-react";

const commands: Record<string, string> = {
  "home": "/",
  "emergency": "/emergency",
  "guide": "/guide",
  "survival guide": "/guide",
  "morse": "/morse",
  "morse code": "/morse",
  "braille": "/braille",
  "compass": "/compass",
  "checklist": "/emergency-checklist",
  "emergency checklist": "/emergency-checklist",
  "sos": "/sos",
  "signals": "/sos",
  "notebook": "/notebook",
  "notes": "/notebook",
  "kit": "/edc",
  "backpack": "/edc",
  "edc": "/edc",
  "first aid": "/guide/first-aid-medical",
  "help": "/emergency",
};

const VoiceCommand = () => {
  const [listening, setListening] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
    }
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase().trim();
      setFeedback(`Heard: "${transcript}"`);

      // Find best matching command
      let matched = false;
      for (const [key, route] of Object.entries(commands)) {
        if (transcript.includes(key)) {
          navigate(route);
          setFeedback(`Going to ${key}`);
          matched = true;
          break;
        }
      }
      if (!matched) {
        setFeedback(`"${transcript}" — command not recognized`);
      }

      setTimeout(() => setFeedback(null), 3000);
      setListening(false);
    };

    recognition.onerror = () => {
      setFeedback("Could not hear. Try again.");
      setTimeout(() => setFeedback(null), 3000);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
    setFeedback("Listening...");
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
        aria-label={listening ? "Stop voice command" : "Start voice command"}
        title="Voice commands: say Emergency, Guide, Compass, SOS, Notebook, etc."
      >
        {listening ? (
          <MicOff className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Mic className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {feedback && (
        <div
          className="fixed bottom-36 right-4 z-50 bg-card border border-border rounded-lg px-4 py-2 text-sm shadow-lg max-w-[200px]"
          role="status"
          aria-live="polite"
        >
          {feedback}
        </div>
      )}
    </>
  );
};

export default VoiceCommand;
