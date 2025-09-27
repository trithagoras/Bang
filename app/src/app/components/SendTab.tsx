"use client";
import { faPaperPlane, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";

const SendTab = () => {
  const [message, setMessage] = useState("");
  const [code, setCode] = useState<string | null>(null);

  const handleSend = async () => {
    setCode(null);
    const res = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    const data = await res.json();
    setCode(data.code);
  };

  const copyCode = () => {
    if (!code) {
      return;
    }
    navigator.clipboard.writeText(code);
    toast.success("Copied code");
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[150px]"
        placeholder="Write your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        <FontAwesomeIcon icon={faPaperPlane} />
        Send
      </button>

      {code && (
        <div className="text-center space-y-2">
          <p className="font-medium">Your code:</p>
          <div className="flex justify-center items-center gap-3">
            <span className="text-2xl font-mono tracking-widest">{code}</span>
            <button
              onClick={copyCode}
              className="text-gray-600 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Share this code with the recipient. The message will auto-delete
            after 10 minutes.
          </p>
        </div>
      )}
    </div>
  );
};

export default SendTab;
