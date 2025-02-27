import React from 'react'

async function FetchData({message}) {
    // const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;   
    // const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${API_KEY}`,  
    //     },
    //     body: JSON.stringify({
    //       model: "gpt-3.5-turbo",  // or "gpt-4" if available
    //       messages: [{ role: "user", content: message }],
    //       temperature: 0.7,
    //     }),
    //   });
    //   const data=await response.json();
    //   console.log(data)
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const API_KEY=process.env.NEXT_PUBLIC_GEMINIAI_API_KEY
    const genAI = new GoogleGenerativeAI(`${API_KEY}`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    
    const result = await model.generateContent(message);
    const data=result.response.text();
    console.log(data)
    return data;
    
}

export default FetchData
