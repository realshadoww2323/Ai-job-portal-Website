import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        reply: "To talk to me in real-time, please add a `GEMINI_API_KEY` to your `frontend/.env.local` file! Since I'm a real AI, I need an API key to think." 
      });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // System prompt instructing the AI how to behave
    const prompt = `You are a professional, highly intelligent AI Career Assistant for an advanced Job Portal. 
    A user is asking you for career advice, job scopes, interview tips, or course recommendations.
    Be concise, helpful, and speak directly to their question. Don't use markdown formatting like ** or *, just plain text.
    
    User's message: "${message}"`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { reply: "I'm sorry, my AI brain encountered an error processing that request. Please try again." }, 
      { status: 500 }
    );
  }
}
