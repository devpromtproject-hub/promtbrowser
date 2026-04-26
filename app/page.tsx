"use client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from 'react';
import { Copy, Sparkles, Settings2, Image as ImageIcon, Video, Check } from 'lucide-react';

export default function PromptEditor() {
  // 1. Quản lý dữ liệu (State)
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("Kết quả tối ưu sẽ hiện ở đây...");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // 2. Hàm xử lý tối ưu Prompt
  const handleOptimize = async () => {
  if (!userInput) return alert("Vui lòng nhập ý tưởng!");
  setIsLoading(true);

  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
    
    // Thử dùng tên model cơ bản nhất
    const model = genAI.getGenerativeModel({ 
      model: "gemini-flash-latest",
    });

    const systemPrompt = "Write a high-quality AI image prompt in Vietnamese for: ";
    
    // Thêm một chút tùy chỉnh để request nhẹ hơn
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: systemPrompt + userInput }] }],
    });

    const response = await result.response;
    setResult(response.text());
  } catch (error) {
    console.error("Lỗi chi tiết:", error);
    setResult("Lỗi kết nối. Thử lại sau 1 vài giây nhé!");
  } finally {
    setIsLoading(false);
  }
};

  // 3. Hàm xử lý Copy
  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hiển thị trạng thái đã copy trong 2 giây
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar - Tạm thời để trang trí */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 p-4 flex-col">
        <div className="flex items-center gap-2 mb-8 px-2 font-bold text-xl text-indigo-600">
          <Sparkles className="fill-indigo-600" />
          <span>Dự án Prompt</span>
        </div>
        <p className="text-xs font-semibold text-slate-400 uppercase mb-4 px-2 tracking-widest">Lịch sử</p>
        <div className="text-sm text-slate-400 px-2 italic">Chưa có lịch sử...</div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col items-center p-4 md:p-8 overflow-y-auto">
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Chế tác Prompt</h2>
            <p className="text-slate-500 text-sm">Biến ý tưởng thành câu lệnh AI chuyên nghiệp</p>
          </div>

          {/* Input */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <textarea 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ví dụ: Một phi hành gia đang cưỡi ngựa trên sao hỏa..."
              className="w-full h-32 p-4 border border-slate-100 rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition text-base"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium hover:bg-indigo-50 hover:text-indigo-600 transition">
                  <ImageIcon size={14} /> Ảnh
                </button>
                <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-medium hover:bg-indigo-50 hover:text-indigo-600 transition">
                  <Video size={14} /> Video
                </button>
              </div>
              <button 
                onClick={handleOptimize}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition shadow-lg shadow-indigo-100"
              >
                {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Sparkles size={18} />}
                {isLoading ? "Đang tạo..." : "Tối ưu Prompt"}
              </button>
            </div>
          </div>

          {/* Result Output */}
          <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl shadow-xl relative group">
            <div className="absolute top-4 right-4">
              <button 
                onClick={handleCopy}
                className="p-2 hover:bg-white/10 rounded-lg transition text-indigo-300"
                title="Sao chép"
              >
                {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
              </button>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">Prompt Kết Quả</p>
            <p className="text-lg font-medium leading-relaxed pr-10 text-indigo-50">
              {result}
            </p>
          </div>
        </div>
      </main>

      {/* Settings - Trang trí */}
      <aside className="hidden lg:block w-72 bg-white border-l border-slate-200 p-6 space-y-6">
        <div className="flex items-center gap-2 font-bold text-slate-700 border-b pb-4">
          <Settings2 size={18} />
          <span>Tùy chỉnh</span>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gợi ý phong cách</p>
          <div className="flex flex-wrap gap-2">
            {['Cinematic', 'Anime', 'Cyberpunk', 'Realistic', 'Oil Painting'].map(s => (
              <span key={s} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-xs text-slate-600 italic">#{s}</span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}