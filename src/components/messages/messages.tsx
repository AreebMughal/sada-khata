"use client";

import React, { useState, useRef } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

// Type Definitions
type UserName =
  | "Henry Boyd"
  | "Marta Curtis"
  | "Philip Tucker"
  | "Christine Reid"
  | "Jerry Guzman";

interface Message {
  from: string;
  message: string;
  attachment?: File | null;
}

// Mock Data
const conversations: Record<UserName, Message[]> = {
  "Henry Boyd": [{ from: "Henry", message: "Hey, how are you today? 🌞" }],
  "Marta Curtis": [
    { from: "Marta", message: "Hi! Are you coming to the meeting? 📅" },
    { from: "You", message: "Yes, I’ll be there. 👍" },
  ],
  "Philip Tucker": [{ from: "Philip", message: "Let’s catch up soon! 🤝" }],
  "Christine Reid": [{ from: "Christine", message: "Good morning! ☀️" }],
  "Jerry Guzman": [{ from: "Jerry", message: "Any updates on the project? 💻" }],
};

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState<UserName | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState(conversations);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(false); // Controls sidebar visibility
  const emojiInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
    if (selectedUser && inputMessage.trim()) {
      const newMessage: Message = { from: "You", message: inputMessage, attachment: selectedFile };
      setChatHistory((prev) => ({
        ...prev,
        [selectedUser]: [...prev[selectedUser], newMessage],
      }));
      setInputMessage("");
      setSelectedFile(null);
      setShowEmojiPicker(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage();
      e.preventDefault();
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setInputMessage((prev) => prev + emojiData.emoji);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUserSelection = (name: UserName) => {
    setSelectedUser(name);
    setShowSidebar(false); // Close sidebar on small screens
  };

  return (
    <div className="h-screen flex flex-col text-gray-800">
      {/* Icons for Small Screens */}
      <div className="flex justify-between p-4 bg-indigo-600 text-white md:hidden">
        <button onClick={() => setShowSidebar((prev) => !prev)}>
          <span className="material-icons">account_circle</span> {/* Profile Icon */}
        </button>
        <span className="font-bold">QuickChat</span>
        <button onClick={() => setSelectedUser(null)}>
          <span className="material-icons">chat</span> {/* Chat Icon */}
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div
          className={`absolute md:relative w-64 bg-white p-6 transition-transform transform ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <div className="text-center font-bold text-2xl italic mb-8">QuickChat</div>
          <div className="text-xs font-bold mb-4">Active Conversations</div>

          <div className="space-y-2">
            {Object.keys(conversations).map((name) => (
              <button
                key={name}
                onClick={() => handleUserSelection(name as UserName)}
                className="w-full flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center">
                  {name[0]}
                </div>
                <span className="text-sm font-medium">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 p-6">
          {selectedUser ? (
            <div className="h-full flex flex-col bg-gray-100 rounded-lg p-4">
              <div className="text-xl font-semibold mb-4">{selectedUser}</div>
              <div className="flex-grow overflow-y-auto space-y-4 pr-4">
                {chatHistory[selectedUser].map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.from === "You" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md p-3 rounded-lg shadow ${
                        msg.from === "You" ? "bg-indigo-100" : "bg-white"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.message}</p>
                      {msg.attachment && (
                        <a
                          href={URL.createObjectURL(msg.attachment)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 underline mt-2 block"
                        >
                          {msg.attachment.name}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Field */}
              <div className="relative flex items-center mt-4">
                <textarea
                  ref={emojiInputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="w-full h-10 resize-none rounded-lg p-2 border focus:outline-none focus:border-indigo-300"
                />
                <button onClick={() => setShowEmojiPicker((prev) => !prev)} className="ml-2">
                  😊
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-16 left-0 z-10">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
                <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer ml-2">
                  📎
                </label>
                <button onClick={handleSendMessage} className="ml-2 text-indigo-600">
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
