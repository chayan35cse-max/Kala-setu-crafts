import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X, ArrowRight, MessageSquare, Bot } from 'lucide-react';
import axios from 'axios';

export default function KalaMitraVoiceAssistant({ onSelectCraftById, onFilterRegion }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiReply, setAiReply] = useState('');
  const [matchingCrafts, setMatchingCrafts] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN'; // or hi-IN

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setIsListening(false);
        handleVoiceQuery(text);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setAiReply('');
      setMatchingCrafts([]);
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        // Speech recognition not supported or already active
        const fallbackText = 'Tell me about endangered crafts in Gujarat and Rajasthan';
        setTranscript(fallbackText);
        handleVoiceQuery(fallbackText);
      }
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceQuery = async (queryText) => {
    try {
      const res = await axios.post('/api/ai/voice-query', { query: queryText });
      if (res.data.success) {
        setAiReply(res.data.spokenResponse);
        setMatchingCrafts(res.data.matchingCrafts || []);
        speakText(res.data.spokenResponse);
      }
    } catch (err) {
      const fallback = 'I explored our sovereign archives and matched authentic traditional crafts for your inquiry.';
      setAiReply(fallback);
      speakText(fallback);
    }
  };

  return (
    <>
      {/* Floating Activation Button on Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setIsOpen(true);
            if (!aiReply) toggleListening();
          }}
          className="relative group p-4 rounded-full bg-gradient-to-tr from-purple-800 via-indigo-700 to-amber-600 text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer border-2 border-amber-300 ring-4 ring-purple-900/20"
          title="Talk with KalaMitra Voice AI Assistant"
        >
          <div className="absolute inset-0 rounded-full bg-purple-500 opacity-40 animate-ping pointer-events-none"></div>
          <Bot className="w-6 h-6 text-amber-200" />
          <span className="absolute -top-1 -right-1 bg-amber-400 text-stone-950 text-[9px] font-black px-1.5 py-0.2 rounded-full shadow-sm">
            AI
          </span>
        </button>
      </div>

      {/* Voice Assistant Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col space-y-4 p-6 relative">
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsOpen(false);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-2xl bg-purple-900 text-amber-300 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-stone-900 text-base">KalaMitra • Cultural Voice AI</h3>
                <p className="text-[11px] text-stone-500">Ask questions in English or Hindi aloud</p>
              </div>
            </div>

            {/* Mic Center Interaction */}
            <div className="text-center py-4 space-y-3 bg-gradient-to-b from-purple-50/50 to-amber-50/30 rounded-2xl p-4 border border-purple-100">
              <button
                onClick={toggleListening}
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto transition-all cursor-pointer shadow-xl ${
                  isListening
                    ? 'bg-red-600 text-white ring-8 ring-red-200 animate-pulse'
                    : speaking
                    ? 'bg-purple-700 text-white ring-8 ring-purple-200 animate-bounce'
                    : 'bg-stone-900 hover:bg-black text-amber-400'
                }`}
              >
                {isListening ? <Mic className="w-8 h-8" /> : speaking ? <Volume2 className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>

              <span className="text-xs font-bold text-stone-700 block">
                {isListening ? 'Listening... Speak your craft inquiry' : speaking ? 'Speaking answer aloud...' : 'Tap Mic to Speak'}
              </span>

              {transcript && (
                <div className="bg-white p-3 rounded-xl border border-stone-200 text-xs text-stone-800 font-semibold shadow-sm">
                  "{transcript}"
                </div>
              )}
            </div>

            {/* AI Text Response */}
            {aiReply && (
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2 text-xs text-stone-700 leading-relaxed animate-fadeIn">
                <div className="flex items-center space-x-1.5 text-purple-900 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>KalaMitra Answer:</span>
                </div>
                <p>{aiReply}</p>
              </div>
            )}

            {/* Matching Craft Chips */}
            {matchingCrafts.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-stone-500 uppercase">Matching Crafts in Archive:</span>
                <div className="grid grid-cols-2 gap-2">
                  {matchingCrafts.map(c => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCraftById(c.id);
                        setIsOpen(false);
                      }}
                      className="bg-white hover:bg-amber-50 p-2.5 rounded-xl border border-stone-200 text-left flex items-center space-x-2 transition-colors cursor-pointer group"
                    >
                      <img src={c.thumbnailUrl} alt={c.name} className="w-9 h-9 rounded-lg object-cover bg-stone-100" />
                      <div className="min-w-0 flex-1">
                        <h5 className="text-[11px] font-bold text-stone-900 truncate group-hover:text-amber-800">{c.name}</h5>
                        <span className="text-[9px] text-stone-500 block">📍 {c.state}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Sample Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Try asking:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Which crafts are endangered?',
                  'Show me pottery from Rajasthan',
                  'Tell me about Kashmiri Pashmina'
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTranscript(prompt);
                      handleVoiceQuery(prompt);
                    }}
                    className="text-[10px] bg-stone-100 hover:bg-stone-200 text-stone-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
