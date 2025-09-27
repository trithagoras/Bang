"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faKey, faCopy } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function Home() {
  const [tab, setTab] = useState<"send" | "retrieve">("send");

  // send flow
  const [message, setMessage] = useState("");
  const [code, setCode] = useState<string | null>(null);

  // retrieve flow
  const [inputCode, setInputCode] = useState("");
  const [retrievedMessage, setRetrievedMessage] = useState<string | null>(null);

  async function handleSend() {
    setCode(null);
    const res = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    const data = await res.json();
    setCode(data.code);
  }

  async function handleRetrieve() {
    setRetrievedMessage(null);
    const res = await fetch(`/api/message/${inputCode}`);
    const data = await res.json();
    setRetrievedMessage(data.message ?? "(Not found or expired)");
  }

  const copyCode = () => {
    if (!code) {
      return;
    }
    navigator.clipboard.writeText(code);
    toast.success("Copied code");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-6 space-y-6 text-center">
        <h1 className="text-6xl text-blue-500 font-bold my-24">Bang!</h1>
        <div className="flex border-b">
          <button
            onClick={() => setTab("send")}
            className={`flex-1 py-2 text-center font-medium ${
              tab === "send"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Send
          </button>
          <button
            onClick={() => setTab("retrieve")}
            className={`flex-1 py-2 text-center font-medium ${
              tab === "retrieve"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Retrieve
          </button>
        </div>

        {tab === "send" && (
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
                  <span className="text-2xl font-mono tracking-widest">
                    {code}
                  </span>
                  <button
                    onClick={copyCode}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  Share this code with the recipient. The message will auto-delete after 10 minutes.
                </p>
              </div>
            )}
          </div>
        )}

        {tab === "retrieve" && (
          <div className="space-y-4">
            <input
              type="text"
              maxLength={5}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest font-mono text-lg"
              placeholder="Enter 5-digit code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
            />
            <button
              onClick={handleRetrieve}
              disabled={inputCode.length !== 5}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faKey} />
              Retrieve Message
            </button>

            {retrievedMessage !== null && (
              <textarea
                className="w-full p-3 border rounded-xl bg-gray-50 min-h-[150px]"
                readOnly
                value={retrievedMessage}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}
