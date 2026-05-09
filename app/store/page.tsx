"use client";

import React, { useState } from 'react';
import { 
  Compass, Trophy, Wallet, Users, Settings, Plus, 
  Search, Bell, ShoppingBag, Flame, Layers, Sparkles, X, ChevronRight, ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

// 1. DỮ LIỆU MẪU (Dựa trên hình của bạn)
const PROMPTS = [
  { id: 1, name: "NovelGPT Dark Anime V2", author: "AIGenius", price: 0, image: "https://images.unsplash.com/photo-1541562232579-512a21359920?w=500&q=80", category: "For You" },
  { id: 2, name: "ASK AI Astrologer", author: "ZodiacMaster", price: 15000, image: "https://images.unsplash.com/photo-1515940175183-6798529cb860?w=500&q=80", category: "For You" },
  { id: 3, name: "JUPT: Uncensored AI", author: "CyberSpace", price: 0, image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&q=80", category: "For You" },
  { id: 4, name: "GPT4-FREE Turbo", author: "DevCommunity", price: 0, image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80", category: "Trending" },
  { id: 5, name: "REAL CODING WIZARD", author: "CoderX", price: 25000, image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=500&q=80", category: "Business" },
  { id: 6, name: "Rewrite Like A Human", author: "WriterPro", price: 10000, image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&q=80", category: "Marketing" },
  { id: 7, name: "SaaS Startup Idea", author: "FounderGPT", price: 50000, image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&q=80", category: "Business" },
];

export default function StorePage() {
  const [activeMenu, setActiveMenu] = useState('Explore');

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white overflow-hidden font-sans">
      
      {/* SIDEBAR (BÊN TRÁI) */}
      <aside className="w-64 flex-shrink-0 border-r border-white/10 flex flex-col p-4 bg-[#0d0d0d] z-20">
        <div className="flex items-center gap-2 mb-8 px-2 font-black text-2xl tracking-tighter">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">F</div>
          <span>FLOW</span>
        </div>

        <nav className="flex-1 space-y-1">
  {/* Menu dẫn về trang công cụ AI */}
  <Link href="/">
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer text-slate-400 hover:bg-white/5 hover:text-white transition">
      <Sparkles size={20}/>
      <span className="font-bold text-sm">AI Generator</span>
    </div>
  </Link>

  {/* Menu hiện tại (Store) */}
  <Link href="/store">
    <div className="flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer bg-white/10 text-white shadow-lg">
      <Compass size={20}/>
      <span className="font-bold text-sm">Explore Store</span>
    </div>
  </Link>
  </nav>

        <div className="mt-auto space-y-6">
          <div className="px-2">
            <div className="flex gap-4 text-sm font-bold text-slate-400 mb-4 border-b border-white/5 pb-2">
              <span className="text-white border-b-2 border-indigo-500 pb-2">Following</span>
              <span>Chatted</span>
            </div>
            <div className="text-center py-4 text-xs text-slate-500">
              Explore and find more friends 😊
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
            <div className="w-10 h-10 bg-indigo-400 rounded-full"></div>
            <div className="flex-1 text-sm font-bold truncate">Tài khoản của tôi</div>
            <Link href="/"><button className="text-[10px] bg-white/10 px-2 py-1 rounded-md">Log In</button></Link>
          </div>
        </div>
      </aside>

      {/* MÀN HÌNH CHÍNH (BÊN PHẢI) */}
      <main className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar">
        
        {/* THANH SEARCH TRÊN CÙNG */}
        <header className="sticky top-0 z-30 px-8 py-4 bg-[#0d0d0d]/80 backdrop-blur-md">
          <div className="max-w-4xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search for anything..." 
              className="w-full bg-white/10 border-none rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500 transition outline-none"
            />
          </div>
        </header>

        <div className="px-8 pb-12 space-y-10">
          
          {/* BANNER PROMOTION SLIDER */}
          <section className="relative group overflow-hidden rounded-[32px] bg-gradient-to-br from-indigo-900 to-slate-900 border border-white/10 h-[380px] flex items-center px-12">
            <div className="z-10 max-w-lg space-y-6">
              <h2 className="text-5xl font-black leading-tight">Download <span className="text-indigo-400">Branches</span></h2>
              <p className="text-slate-300 text-lg">Interactive video stories with endless choices! Scan to experience on your phone.</p>
              <div className="w-24 h-24 bg-white p-2 rounded-xl">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FlowGPT" alt="QR Code" />
              </div>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full">
              <img 
                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80" 
                className="w-full h-full object-cover opacity-60 mask-gradient-left" 
                alt="Banner"
              />
            </div>
          </section>

          {/* BỘ LỌC (FILTERS) */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer"><option>Trending</option></select>
              <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer"><option>All style</option></select>
              <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer"><option>All gender</option></select>
            </div>
            <div className="flex gap-2 text-xs font-bold bg-white/5 p-1 rounded-xl">
              <span className="bg-indigo-600 px-4 py-2 rounded-lg">For you</span>
              <span className="px-4 py-2 hover:bg-white/5 rounded-lg transition cursor-pointer">Job Hunting</span>
              <span className="px-4 py-2 hover:bg-white/5 rounded-lg transition cursor-pointer">Academic</span>
            </div>
          </div>

          {/* DANH SÁCH PROMPT (GRID) */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Flame size={20} className="text-orange-500" /> For you
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {PROMPTS.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// THÀNH PHẦN MENU LINK
function MenuLink({ icon, label, active = false, onClick = () => {} }: any) {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
        active ? 'bg-white/10 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-bold text-sm">{label}</span>
    </div>
  );
}

// THÀNH PHẦN PROMPT CARD (VỚI HIỆU ỨNG HOVER PHÓNG TO)
function PromptCard({ prompt }: any) {
  return (
    <div className="group relative bg-[#1a1a1a] rounded-[24px] overflow-hidden border border-white/5 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-500/20 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={prompt.image} 
          alt={prompt.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay mờ phía dưới chân thumb */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4">
          <h4 className="text-sm font-black leading-tight group-hover:text-indigo-400 transition-colors">
            {prompt.name}
          </h4>
          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
             by {prompt.author}
          </p>
        </div>

        {/* Badge giá nếu có */}
        {prompt.price > 0 && (
          <div className="absolute top-3 right-3 bg-indigo-600 text-[10px] font-black px-2 py-1 rounded-md shadow-lg">
            {prompt.price.toLocaleString()}đ
          </div>
        )}
      </div>

      {/* Phần thông tin phụ hiện ra khi hover */}
      <div className="px-4 py-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-2">
            <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-[8px]"><Sparkles size={10}/></div>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{prompt.category}</span>
        </div>
        <button className="bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full hover:bg-indigo-500 hover:text-white transition">
           View
        </button>
      </div>
    </div>
  );
}