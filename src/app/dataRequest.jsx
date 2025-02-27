// "use client";
// import React, { useEffect, useState, useTransition } from "react";
// import { IoSend } from "react-icons/io5";
// import FetchData from "./FetchData";
// import ReactMarkdown from "react-markdown";

// function DataRequest() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");
//   const [isPending,startTransition]=useTransition()

//   function handleMessage(e) {
//     setMessage(e.target.value);
    
//   }
//   async function handleResponse(){
//     const data=await FetchData({message})
//     setResponse(String(data))
    

//   }

//   return (
//     <div className="">
//       {/* Scrollable response area */}
//       <div className="flex-grow  p-4">
//         <ReactMarkdown>{response}</ReactMarkdown>
//       </div>
  
//       {/* Fixed input field */}
//       <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
//         <div className="flex items-center border border-white shadow-md rounded-full px-4 bg-white">
//           <input
//             type="text"
//             placeholder="Ask Gemini"
//             className="flex-grow outline-none p-2"
//             value={message}
//             name="message"
//             onChange={handleMessage}
//           />
//           <IoSend className="text-black cursor-pointer text-2xl" onClick={handleResponse} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DataRequest;
// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { IoSend } from "react-icons/io5";
// // import FetchData from "./FetchData";

// // function DataRequest() {
// //   const [message, setMessage] = useState("");
// //   const [response, setResponse] = useState("");

// //   function handleMessage(e) {
// //     setMessage(e.target.value);
// //   }

// //   function handleResponse() {
// //     const data = FetchData({ message });
// //     setResponse(data);
// //   }

// //   return (
// //     <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
// //       {/* Container to keep input at the bottom and response above */}
// //       <div className="flex flex-col gap-2">
// //         {/* Response message will appear above the input */}
// //         {response && (
// //           <p className="bg-gray-200 p-3 rounded-lg text-black text-sm shadow-md">
// //             {response}
// //           </p>
// //         )}
        
// //         {/* Input Field */}
// //         <div className="flex items-center border border-white shadow-md rounded-full px-4 bg-white">
// //           <input
// //             type="text"
// //             placeholder="Ask Gemini"
// //             className="flex-grow outline-none p-2"
// //             value={message}
// //             name="message"
// //             onChange={handleMessage}
// //           />
// //           <IoSend className="text-black cursor-pointer text-2xl" onClick={handleResponse} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default DataRequest;
"use client";
import React, { useState, useTransition } from "react";
import { IoSend } from "react-icons/io5";
import FetchData from "./FetchData";
import ReactMarkdown from "react-markdown";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEdit, FaSave } from "react-icons/fa";

function DataRequest() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [editIndex, setEditIndex] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  function handleMessage(e) {
    setMessage(e.target.value);
  }

  function handleResponse() {
    if (!message.trim() || isPending) return;

    startTransition(async () => {
      const data = await FetchData({ message });
      setResponse((prev) => [...prev, { message, response: String(data) }]);
      setMessage("");
    });
  }

  function handleEdit(index, message) {
    setEditIndex(index);
    setEditMessage(message);
  }

  async function handleSaveEdit(index) {
    if (!editMessage.trim()) return;
  
    startTransition(async () => {
      const newData = await FetchData({ message: editMessage }); // Fetch updated data
      setResponse((prev) =>
        prev.map((item, i) =>
          i === index ? { message: editMessage, response: String(newData) } : item
        )
      );
      setEditIndex(null);
      setEditMessage("");
    });
  }
  

  return (
    <div className="flex flex-col items-center w-full h-full p-4 ">
      {/* Response Area */}
      <div className="w-full max-w-md p-3 space-y-3">
        {response.map((e, i) => (
          <div key={i} className="p-3 bg-gray-100 rounded-lg shadow-md">
            <div className="flex flex-row items-center gap-2 flex-wrap">
              {editIndex === i ? (
                <input
                  type="text"
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="border rounded p-1 flex-grow"
                />
              ) : (
                <h1 className="font-bold text-blue-60 break-words overflow-hidden">{e.message}</h1>
              )}
              {editIndex === i ? (
                <FaSave onClick={() => handleSaveEdit(i)} className="cursor-pointer text-green-500" />
              ) : (
                <FaEdit onClick={() => handleEdit(i, e.message)} className="cursor-pointer text-gray-500" />
              )}
            </div>
            <div className="mt-1 text-gray-700">
              <ReactMarkdown>{e.response}</ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <div className="flex items-center border border-gray-300 shadow-md rounded-full px-4 bg-white">
          <input
            type="text"
            placeholder="Ask Gemini"
            className="flex-grow outline-none p-2"
            value={message}
            name="message"
            onChange={handleMessage}
            onKeyDown={(e) => e.key === "Enter" && handleResponse()}
            disabled={isPending}
          />
          {isPending ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <IoSend
              className={`text-black text-2xl ${
                message.trim() ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleResponse}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DataRequest;


// "use client";
// import React, { useState, useTransition, useRef, useEffect } from "react";
// import { IoSend } from "react-icons/io5";
// import { IoMdPerson } from "react-icons/io";
// import { RiRobot2Fill } from "react-icons/ri";
// import FetchData from "./FetchData";
// import ReactMarkdown from "react-markdown";

// function DataRequest() {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isPending, startTransition] = useTransition();
//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);

//   // Auto-scroll to bottom when chat history updates
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatHistory]);

//   // Focus input on component mount
//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   function handleMessage(e) {
//     setMessage(e.target.value);
//   }

//   function handleResponse() {
//     if (!message.trim() || isPending) return;

//     // Add user message to chat history
//     const userMessage = message.trim();
//     setChatHistory([...chatHistory, { type: "user", content: userMessage, timestamp: new Date() }]);
//     setMessage(""); // Clear input field after sending

//     startTransition(async () => {
//       // Add loading message
//       setChatHistory(prev => [...prev, { 
//         type: "assistant", 
//         content: "Generating response...", 
//         isLoading: true,
//         timestamp: new Date()
//       }]);
      
//       try {
//         const data = await FetchData({ message: userMessage });
        
//         // Replace loading message with actual response
//         setChatHistory(prev => {
//           const newHistory = [...prev];
//           newHistory[newHistory.length - 1] = { 
//             type: "assistant", 
//             content: String(data) || "No response received.",
//             timestamp: new Date()
//           };
//           return newHistory;
//         });
//       } catch (error) {
//         // Handle error
//         setChatHistory(prev => {
//           const newHistory = [...prev];
//           newHistory[newHistory.length - 1] = { 
//             type: "assistant", 
//             content: "Sorry, I couldn't process your request. Please try again.",
//             error: true,
//             timestamp: new Date()
//           };
//           return newHistory;
//         });
//       }
//     });
//   }

//   // Format timestamp
//   const formatTime = (date) => {
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm">
//         <div className="max-w-4xl mx-auto flex items-center">
//           <RiRobot2Fill className="text-blue-600 text-2xl mr-2" />
//           <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
//         </div>
//       </header>
      
//       {/* Chat Container */}
//       <div className="flex-grow overflow-hidden flex justify-center">
//         <div className="w-full max-w-4xl flex flex-col h-full">
//           {/* Messages Area */}
//           <div className="flex-grow p-4 overflow-y-auto scrollbar-hide">
//             {chatHistory.length === 0 ? (
//               <div className="h-full flex items-center justify-center">
//                 <div className="text-center p-6 bg-white rounded-lg shadow-sm max-w-md">
//                   <RiRobot2Fill className="text-blue-500 text-4xl mx-auto mb-2" />
//                   <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome to AI Assistant</h2>
//                   <p className="text-gray-600">Ask me anything to get started.</p>
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {chatHistory.map((entry, index) => (
//                   <div 
//                     key={index} 
//                     className={`flex ${entry.type === "user" ? "justify-end" : "justify-start"}`}
//                   >
//                     <div 
//                       className={`max-w-3xl rounded-lg px-4 py-3 shadow-sm ${
//                         entry.type === "user" 
//                           ? "bg-blue-600 text-white" 
//                           : entry.error 
//                             ? "bg-red-50 text-red-800 border border-red-200" 
//                             : "bg-white text-gray-800 border border-gray-100"
//                       }`}
//                     >
//                       <div className="flex items-center mb-1">
//                         <span className="flex items-center font-medium">
//                           {entry.type === "user" ? (
//                             <>
//                               <span>You</span>
//                               <IoMdPerson className="ml-1 text-lg" />
//                             </>
//                           ) : (
//                             <>
//                               <span>Assistant</span>
//                               <RiRobot2Fill className="ml-1 text-lg" />
//                             </>
//                           )}
//                         </span>
//                         <span className="ml-2 text-xs opacity-70">
//                           {formatTime(entry.timestamp)}
//                         </span>
//                       </div>
                      
//                       <div className={`prose ${entry.type === "user" ? "prose-invert" : ""} max-w-none`}>
//                         {entry.isLoading ? (
//                           <div className="flex items-center space-x-2">
//                             <div className="animate-pulse flex space-x-1">
//                               <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
//                               <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
//                               <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
//                             </div>
//                             <span>Generating response</span>
//                           </div>
//                         ) : (
//                           <ReactMarkdown>{entry.content}</ReactMarkdown>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>
//             )}
//           </div>
          
//           {/* Input Area */}
//           <div className="p-4 bg-white border-t border-gray-200">
//             <div className="max-w-4xl mx-auto">
//               <div className="relative flex items-center">
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   placeholder="Type your message..."
//                   className="w-full p-3 pl-4 pr-12 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   value={message}
//                   onChange={handleMessage}
//                   onKeyDown={(e) => e.key === "Enter" && handleResponse()}
//                   disabled={isPending}
//                 />
//                 <button
//                   className={`absolute right-3 p-1.5 rounded-full ${
//                     message.trim() && !isPending
//                       ? "bg-blue-600 text-white cursor-pointer"
//                       : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   }`}
//                   onClick={handleResponse}
//                   disabled={!message.trim() || isPending}
//                 >
//                   <IoSend className="text-lg" />
//                 </button>
//               </div>
//               <div className="mt-1 text-xs text-gray-500 text-right px-2">
//                 {isPending ? "Processing..." : "Press Enter to send"}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Add this CSS to your global stylesheet
// const style = `
// .scrollbar-hide::-webkit-scrollbar {
//   display: none;
// }

// .scrollbar-hide {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }

// .prose {
//   font-size: 0.95rem;
//   line-height: 1.5;
// }

// .prose p {
//   margin-top: 0.5em;
//   margin-bottom: 0.5em;
// }

// .prose code {
//   font-size: 0.875em;
//   font-weight: 600;
//   padding: 0.2em 0.4em;
//   border-radius: 0.25em;
// }

// .prose-invert code {
//   background-color: rgba(255, 255, 255, 0.12);
//   color: white;
// }

// .prose code:not(.prose-invert code) {
//   background-color: rgba(0, 0, 0, 0.05);
//   color: #374151;
// }
// `;

// export default function DataRequestWithStyles() {
//   return (
//     <>
//       <style jsx global>{style}</style>
//       <DataRequest />
//     </>
//   );
// }
