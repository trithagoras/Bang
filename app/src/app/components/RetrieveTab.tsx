"use client"
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const RetrieveTab = () => {
    const [inputCode, setInputCode] = useState("");
    const [retrievedMessage, setRetrievedMessage] = useState<string | null>(null);

    const handleRetrieve = async () => {
        setRetrievedMessage(null);
        const res = await fetch(`/api/message/${inputCode}`);
        const data = await res.json();
        setRetrievedMessage(data.message ?? "(Not found or expired)");
    }

    return (
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
    );
};

export default RetrieveTab;
