"use client"
import { useState } from "react";
import RetrieveTab from "./RetrieveTab";
import SendTab from "./SendTab";

const TabView = () => {
    const [tab, setTab] = useState<"send" | "retrieve">("send");

    return <>
        <div className="flex border-b">
          <button
            onClick={() => setTab("send")}
            className={`flex-1 py-2 text-center font-medium ${
              tab === "send"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-300"
            }`}
          >
            Send
          </button>
          <button
            onClick={() => setTab("retrieve")}
            className={`flex-1 py-2 text-center font-medium ${
              tab === "retrieve"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-300"
            }`}
          >
            Retrieve
          </button>
        </div>

        {tab === "send" && <SendTab />}
        {tab === "retrieve" && <RetrieveTab />}
    </>
};

export default TabView;
