"use client";

import React, { useState } from 'react';
import { 
  Sparkles, Compass, Plus, Search, Image as ImageIcon, Video, Copy, Wand2, Loader2 
} from 'lucide-react';
import Link from 'next/link';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AIAppPage() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOptimize = async () => {
    if (!userInput) return alert("Vui lòng nhập ý tưởng!");
    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const systemPrompt = "Bạn là chuyên gia Prompt Engineering. Hãy chuyển ý tưởng sau thành một Prompt tiếng Việt chuyên sâu cho AI tạo ảnh. Chỉ trả về nội dung Prompt: ";
      const res = await model.generateContent(systemPrompt + userInput);
      const text = res.response.text();
      setResult(text);
    } catch (error) {
      setResult("Lỗi kết nối AI. Hãy kiểm tra API Key hoặc mạng!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white overflow-hidden font-sans">
      
      {/* SIDEBAR - Giống hệt bên Store */}
      <aside className="w-64 flex-shrink-0 border-r border-white/10 flex flex-col p-4 bg-[#0d0d0d] z-20">
        <div className="flex items-center gap-2 mb-8 px-2 font-black text-2xl tracking-tighter">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">F</div>
          <span>FLOW</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/10 text-white font-bold shadow-lg transition-all">
            <Sparkles size={20} className="text-indigo-400" />
            AI Generator
          </Link>
          <Link href="/store" className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all">
            <Compass size={20} />
            Explore Store
          </Link>
          <button className="w-full mt-6 py-3 bg-[#deff9a] text-black font-extrabold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition">
            <Plus size={18} /> Create
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center"><Search size={16}/></div>
            <div className="flex-1"><p className="text-xs font-bold">Guest User</p></div>
            <button className="text-[10px] bg-white text-black px-2 py-1 rounded-lg">Log In</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT - Chế tác Prompt */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
        <div className="max-w-2xl w-full space-y-8">
          
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
              Chế tác Prompt
            </h1>
            <p className="text-slate-400 text-lg">Biến ý tưởng thành câu lệnh AI chuyên nghiệp</p>
          </div>

          {/* Ô Nhập liệu - Thiết kế Dark */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-[32px] p-6 shadow-2xl focus-within:border-indigo-500/50 transition-all">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ví dụ: Một phi hành gia đang cưỡi ngựa trên sao hỏa..."
              className="w-full bg-transparent border-none focus:ring-0 text-xl placeholder:text-slate-600 h-32 resize-none"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-bold hover:bg-white/10 transition">
                  <ImageIcon size={16} /> Ảnh
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-bold hover:bg-white/10 transition">
                  <Video size={16} /> Video
                </button>
              </div>
              <button 
                onClick={handleOptimize}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 size={18} />}
                {isLoading ? "Đang tối ưu..." : "Tối ưu ngay"}
              </button>
            </div>
          </div>

          {/* Kết quả */}
          {result && (
            <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[28px] p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-indigo-400">Kết quả tối ưu</span>
                <button 
                  onClick={() => {navigator.clipboard.writeText(result); alert("Đã copy!")}}
                  className="p-2 bg-indigo-500/20 rounded-lg hover:bg-indigo-500/40 transition"
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-lg leading-relaxed text-indigo-50 font-medium">{result}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}