import { useState } from 'react';
import { chatWithAI } from '../../services/api';
import { FaRobot, FaTimes, FaPaperPlane, FaSpinner } from 'react-icons/fa';

const ChatBot = ({ city }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I am WanderAI 🤖 Ask me anything about ${city || 'your destination'}!`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await chatWithAI({
        message: input,
        city,
        history: messages.slice(-6) // last 6 messages bhejo context ke liye
      });

      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: res.data.reply }
      ]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: 'Sorry, I am having trouble right now. Please try again!' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:bg-purple-700 transition z-50 flex items-center gap-2"
      >
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={20} />}
        {!isOpen && <span className="font-semibold">Ask AI</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-purple-100">
          {/* Header */}
          <div className="bg-purple-600 px-4 py-3 flex items-center gap-2">
            <FaRobot className="text-white text-xl" />
            <div>
              <h3 className="text-white font-bold">WanderAI Assistant</h3>
              <p className="text-purple-200 text-xs">Ask me about {city || 'any place'}!</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-2xl rounded-bl-none">
                  <FaSpinner className="animate-spin text-purple-600" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything..."
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;