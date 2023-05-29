import { ChatBot, IConversation, ILeadDetails } from "@/services/ChatBot";
import clsx from "clsx";
import type { NextPage } from "next";
import React, { useState } from "react";

import {
  Input,
  MetaTags,
  Button,
} from "../components";
const Home: NextPage = () => {


  const [reply, setReply] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<IConversation[]>([]);

  const chatbot = ChatBot.create(
  );


  async function processNextMessage(message: string) {
    try {
      await chatbot.createNextMessage(message);
      let conversation: IConversation[] = ChatBot.conversation;
      setMessages(conversation);

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }
  const replyHandler = async () => {
    let newMessages = [
      ...messages,
      {
        author: "LEAD",
        message: reply,
      },
    ];
    setMessages(newMessages);
    setReply("");
    setLoading(true);
    await processNextMessage(reply);
  };



  const keyDownHandler = (e: any) => {
    if (e.key === "Enter") {
      replyHandler();
    }
  };

  return (
    <div className="flex h-screen flex-col py-4 pb-20 p-2 items-center gap-2 md:gap-6">
      <MetaTags title="App" />
      <h1 className="text-xl font-semibold">DIAGNOSE ME</h1>
      <div className="flex w-5/5 h-5/6 border-r-2 gap-10 flex-col md:flex-row md:w-3/5">
        <div className="flex flex-col bg-[#36152D] h-full w-full rounded-lg p-4 md:p-8 text-white text-sm justify-between">
          <div className="flex flex-col overflow-y-scroll h-full gap-4 scroll-smooth ">
            {[
              {
                author: "default",
                message: `🤖 I AM YOUR AI DOCTOR, TELL ME WHAT IS WRONG WITH YOU`,
                timestamp: 0,
              },
              ...messages,
            ]
              .filter((message) => message.author !== "SYSTEM")
              .map((message, i) => (
                <div className="flex flex-col gap-2" key={i}>
                  {message.author != "default" && (
                    <span className="text-xs opacity-30">
                      {message.author === "LEAD"
                        ? "Doctor"
                        : message.author === "USER"
                          ? "Me"
                          : ""}
                    </span>
                  )}
                  <div
                    className={clsx(
                      {
                        "bg-none border border-[#FFFFFF] p-2 border-opacity-20":
                          message.author === "LEAD",
                        "bg-[#43233A] p-4 ": message.author !== "LEAD",
                      },
                      "rounded-lg w-fit"
                    )}
                  >
                    {message.message}
                  </div>
                </div>
              ))}
            {loading && (
              <div className="bg-none border-opacity-20 bg-[#43233A] p-4 rounded-lg w-fit">
                The Doctor is Typing ...
              </div>
            )}
          </div>
          <div className="flex gap-2 pt-4 ">
            <Input
              placeholder="Enter reply"
              className=" border-[#FFFFFF] p-2 border-opacity-20 text-black"
              onChange={(e) => setReply(e.target.value)}
              value={reply}
              onKeyDown={keyDownHandler}
            />
            <Button onClick={replyHandler}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
