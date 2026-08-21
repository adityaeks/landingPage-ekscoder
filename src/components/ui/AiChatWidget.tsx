"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import {
  Bot,
  Send,
  X,
  Sparkles,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  CornerDownLeft,
  ArrowUpRight,
} from "lucide-react";
import {
  AiCsConfig,
  AiChatMessage,
  fetchAiCsConfig,
  sendAiChatMessage,
  getOrCreateSessionId,
  loadLocalChatHistory,
  saveLocalChatHistory,
  isTeaserDismissed,
  setTeaserDismissed,
} from "@/services/aiCsService";

const WHATSAPP_PHONE = "6281230508019";
const DEFAULT_WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Halo Tim Ekscoder, saya ingin konsultasi seputar layanan pembuatan website / bot AI / server VPS."
)}`;

export const AiChatWidget: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [config, setConfig] = useState<AiCsConfig | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showTeaser, setShowTeaser] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isLimitReached, setIsLimitReached] = useState<boolean>(false);

  const chatFeedRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Format current local time HH:mm
  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Scroll smoothly to the bottom of the chat feed
  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    }
  }, []);

  // Fetch initial config from backend
  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      const data = await fetchAiCsConfig();
      if (!isMounted) return;

      if (data) {
        setConfig(data);
        setIsActive(data.is_active !== false);

        // Load existing chat history or initialize with welcome message
        const savedHistory = loadLocalChatHistory();
        if (savedHistory.length > 0) {
          setMessages(savedHistory);
          // Check if any message flagged limit_reached
          const hasLimit = savedHistory.some((m) => m.limit_reached);
          if (hasLimit) setIsLimitReached(true);
        } else if (data.welcome_message) {
          const initialWelcomeMsg: AiChatMessage = {
            id: `welcome_${Date.now()}`,
            sender: "assistant",
            text: data.welcome_message,
            timestamp: getCurrentTime(),
          };
          setMessages([initialWelcomeMsg]);
          saveLocalChatHistory([initialWelcomeMsg]);
        }
      } else {
        // Fallback default config if backend is momentarily unreachable
        const fallbackConfig: AiCsConfig = {
          is_active: true,
          welcome_message:
            "Halo! 👋 Selamat datang di Ekscoder. Ada yang bisa kami bantu seputar pembuatan website, bot otomatisasi AI, atau setup server VPS?",
          quick_prompts: [
            "Berapa biaya buat website?",
            "Bisa buat Bot WhatsApp / AI?",
            "Konsultasi UI/UX",
            "Cara order proyek di Ekscoder",
          ],
        };
        setConfig(fallbackConfig);
        setIsActive(true);

        const savedHistory = loadLocalChatHistory();
        if (savedHistory.length > 0) {
          setMessages(savedHistory);
        } else {
          const initialWelcomeMsg: AiChatMessage = {
            id: `welcome_${Date.now()}`,
            sender: "assistant",
            text: fallbackConfig.welcome_message,
            timestamp: getCurrentTime(),
          };
          setMessages([initialWelcomeMsg]);
          saveLocalChatHistory([initialWelcomeMsg]);
        }
      }

      // Show teaser bubble if not dismissed previously
      if (!isTeaserDismissed()) {
        const timer = setTimeout(() => {
          if (isMounted) setShowTeaser(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    }

    loadConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-scroll when messages or loading state changes
  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
    }
  }, [messages, isLoading, isOpen, scrollToBottom]);

  // Adjust textarea height dynamically
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const nextHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${Math.max(44, nextHeight)}px`;
    }
  };

  const handleDismissTeaser = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTeaser(false);
    setTeaserDismissed();
  };

  const handleOpenWidget = () => {
    setIsOpen(true);
    setShowTeaser(false);
    setTeaserDismissed();
    setTimeout(() => {
      textareaRef.current?.focus();
      scrollToBottom(false);
    }, 200);
  };

  const handleCloseWidget = () => {
    setIsOpen(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || inputMessage).trim();
    if (!messageText || isLoading) return;

    const userMessage: AiChatMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: getCurrentTime(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    saveLocalChatHistory(updatedMessages);
    setInputMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "44px";
    }

    setIsLoading(true);
    const sessionId = getOrCreateSessionId();

    try {
      const response = await sendAiChatMessage(messageText, sessionId);

      if (response && response.response) {
        const assistantMessage: AiChatMessage = {
          id: `ai_${Date.now()}`,
          sender: "assistant",
          text: response.response,
          timestamp: getCurrentTime(),
          limit_reached: response.limit_reached || false,
        };

        const newHistory = [...updatedMessages, assistantMessage];
        setMessages(newHistory);
        saveLocalChatHistory(newHistory);

        if (response.limit_reached) {
          setIsLimitReached(true);
        }
      } else {
        // Fallback error message if backend response is invalid
        const errorMessage: AiChatMessage = {
          id: `err_${Date.now()}`,
          sender: "assistant",
          text:
            "Mohon maaf, saat ini sistem AI kami sedang sibuk atau sedang dalam perbaikan berkala. Kakak dapat langsung menghubungi tim kami melalui WhatsApp untuk konsultasi instan!",
          timestamp: getCurrentTime(),
          limit_reached: true,
        };
        const newHistory = [...updatedMessages, errorMessage];
        setMessages(newHistory);
        saveLocalChatHistory(newHistory);
        setIsLimitReached(true);
      }
    } catch {
      const errorMessage: AiChatMessage = {
        id: `err_${Date.now()}`,
        sender: "assistant",
        text:
          "Koneksi terputus. Silakan periksa jaringan Anda atau hubungi kami langsung via WhatsApp.",
        timestamp: getCurrentTime(),
        limit_reached: true,
      };
      const newHistory = [...updatedMessages, errorMessage];
      setMessages(newHistory);
      saveLocalChatHistory(newHistory);
      setIsLimitReached(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // If backend sets is_active: false, do not render the widget
  if (!isActive) {
    return null;
  }

  const quickPrompts = config?.quick_prompts || [
    "Berapa biaya buat website?",
    "Bisa buat Bot WhatsApp / AI?",
    "Konsultasi UI/UX",
    "Cara order proyek di Ekscoder",
  ];

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TEASER PROMPT CARD (Minimalist developer/tech studio micro card) */}
      {/* ========================================================================= */}
      {showTeaser && !isOpen && (
        <div
          role="dialog"
          aria-label="Notifikasi Asisten AI"
          className="fixed bottom-22 right-6 z-[9975] max-w-[270px] sm:max-w-[290px] animate-in fade-in slide-in-from-bottom-3 duration-300"
        >
          <div
            onClick={handleOpenWidget}
            className="group relative cursor-pointer rounded-xl bg-[#111111]/95 backdrop-blur-xl border border-neutral-800 hover:border-neutral-700 p-3.5 shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Top metadata row */}
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/5">
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF00] animate-pulse" />
                AI Assistant // Online
              </span>
              <button
                type="button"
                onClick={handleDismissTeaser}
                className="p-0.5 text-neutral-500 hover:text-neutral-300 rounded transition-colors"
                aria-label="Tutup notifikasi"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Teaser content */}
            <p className="text-xs text-neutral-200 leading-relaxed font-normal">
              Konsultasi estimasi biaya, fitur web, atau sistem bot AI Anda di sini.
            </p>

            <div className="mt-2.5 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-[#B8FF00] group-hover:text-[#d4ff4d] inline-flex items-center gap-1 transition-colors">
                Mulai Tanya <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="text-[10px] font-mono text-neutral-600">Tekan untuk buka</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FLOATING ACTION BUTTON (FAB) */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-[9980]">
        <button
          type="button"
          onClick={isOpen ? handleCloseWidget : handleOpenWidget}
          aria-label={isOpen ? "Tutup Chat AI" : "Buka Chat Asisten AI Ekscoder"}
          className={`relative group flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#B8FF00]/50 ${
            isOpen
              ? "bg-neutral-900 border border-neutral-700 text-white rotate-90 scale-95 hover:bg-neutral-800"
              : "bg-gradient-to-tr from-emerald-600 via-emerald-500 to-[#B8FF00] text-black hover:scale-105 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
          }`}
        >
          {/* Animated pulsing halo aura when closed */}
          {!isOpen && (
            <>
              <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-500 to-[#B8FF00] opacity-40 blur-md animate-pulse group-hover:opacity-75 duration-1000" />
              <span className="absolute -inset-2 rounded-full border border-emerald-500/30 animate-ping duration-1000 opacity-60" />
            </>
          )}

          {/* Button Icon */}
          <div className="relative z-10 flex items-center justify-center">
            {isOpen ? (
              <X className="w-6 h-6 text-neutral-300 group-hover:text-white transition-colors" />
            ) : (
              <Bot className="w-6 h-6 text-black group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. POPOVER CHAT WINDOW (Modal Drawer / Desktop Card) */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Jendela Chat Asisten AI"
          className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[9985] flex flex-col sm:w-[400px] sm:h-[600px] sm:max-h-[85vh] bg-[#0c0c0c]/98 sm:rounded-2xl border border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
        >
          {/* ----------------- CHAT HEADER ----------------- */}
          <div className="relative px-4 py-3.5 bg-[#121212] border-b border-neutral-800 flex items-center justify-between shrink-0">
            {/* Bot Profile Info */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-neutral-200" />
                </div>
                {/* Status Indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#121212] flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Asisten AI Ekscoder
                  </h3>
                  {/* <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-[#B8FF00]/15 text-[#B8FF00] border border-[#B8FF00]/30">
                    24/7
                  </span> */}
                </div>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online • Respons Cepat
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center">
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseWidget}
                title="Tutup Chat"
                aria-label="Tutup jendela chat"
                className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ----------------- CHAT FEED AREA ----------------- */}
          <div
            ref={chatFeedRef}
            data-lenis-prevent
            className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scroll-smooth custom-scrollbar select-text"
          >
            {/* Welcome banner info */}
            <div className="text-center my-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-400 font-mono">
                <Sparkles className="w-3 h-3 text-[#B8FF00]" />
                Didukung oleh Ekscoder Intelligence AI
              </div>
            </div>

            {/* Render message list */}
            {messages.map((msg) => {
              const isUser = msg.sender === "user";

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"} group/msg`}
                >
                  <div
                    className={`max-w-[86%] sm:max-w-[82%] relative rounded-2xl p-3.5 text-[13px] leading-relaxed transition-all shadow-md ${
                      isUser
                        ? "bg-gradient-to-tr from-[#B8FF00] to-[#9deb00] text-black font-medium rounded-tr-none shadow-[0_4px_15px_rgba(184,255,0,0.15)]"
                        : "bg-[#181818] border border-white/10 text-neutral-200 rounded-tl-none"
                    }`}
                  >
                    {/* Assistant Tag & Copy Button */}
                    {!isUser && (
                      <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-white/5">
                        <span className="text-[10px] font-mono font-semibold text-emerald-400 flex items-center gap-1">
                          <Bot className="w-3 h-3" /> Ekscoder AI
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText(msg.id, msg.text)}
                          title="Salin jawaban"
                          className="opacity-60 hover:opacity-100 p-0.5 rounded text-neutral-400 hover:text-white transition-opacity"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Message Body with Markdown formatting & whitespace preservation */}
                    {isUser ? (
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                    ) : (
                      <div className="prose prose-invert prose-xs max-w-none space-y-2 text-neutral-200">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="whitespace-pre-wrap break-words mb-2 leading-relaxed">
                                {children}
                              </p>
                            ),
                            ul: ({ children }) => (
                              <ul className="list-disc pl-4 space-y-1 my-2 text-neutral-300">
                                {children}
                              </ul>
                            ),
                            ol: ({ children }) => (
                              <ol className="list-decimal pl-4 space-y-1 my-2 text-neutral-300">
                                {children}
                              </ol>
                            ),
                            li: ({ children }) => <li className="leading-snug">{children}</li>,
                            strong: ({ children }) => (
                              <strong className="font-bold text-white">{children}</strong>
                            ),
                            code: ({ children }) => (
                              <code className="px-1.5 py-0.5 rounded bg-black/50 text-[#B8FF00] font-mono text-[11px] border border-white/10">
                                {children}
                              </code>
                            ),
                            a: ({ href, children }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:text-emerald-300 underline font-medium"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    )}

                    {/* Timestamp */}
                    <div
                      className={`text-[10px] mt-1.5 flex items-center justify-end font-mono ${
                        isUser ? "text-neutral-800" : "text-neutral-500"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-[#181818] border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            {/* Quick Prompts Container (Available when few messages or user wants quick suggestions) */}
            {quickPrompts.length > 0 && !isLimitReached && (
              <div className="pt-2">
                <p className="text-[11px] font-medium text-neutral-400 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#B8FF00]" /> Pertanyaan Populer:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleSendMessage(prompt)}
                      className="text-left text-xs px-3 py-1.5 rounded-full bg-[#161616] hover:bg-[#222222] border border-neutral-800 hover:border-emerald-500/40 text-neutral-300 hover:text-[#B8FF00] transition-all duration-200 disabled:opacity-50 hover:shadow-[0_0_10px_rgba(34,197,94,0.1)] active:scale-95 cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} className="h-1" />
          </div>

          {/* ----------------- INPUT BAR AREA ----------------- */}
          <div className="p-3 bg-[#111111] border-t border-white/10 shrink-0">
            {isLimitReached ? (
              <div className="text-center py-1">
                <a
                  href={DEFAULT_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-[#B8FF00] text-black font-bold text-xs shadow-lg hover:brightness-110 transition-all active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Chat Tim via WhatsApp
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            ) : (
              <div className="relative flex items-end gap-2 bg-[#181818] border border-neutral-800 focus-within:border-emerald-500/60 rounded-2xl p-1.5 transition-colors">
                <textarea
                  ref={textareaRef}
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ketik pertanyaan Anda..."
                  rows={1}
                  disabled={isLoading}
                  className="w-full bg-transparent text-sm text-neutral-100 placeholder-neutral-500 px-2.5 py-1.5 resize-none focus:outline-none custom-scrollbar max-h-[120px] min-h-[36px]"
                />

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label="Kirim pesan"
                  className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 shrink-0 ${
                    inputMessage.trim() && !isLoading
                      ? "bg-[#B8FF00] hover:bg-[#a6e600] text-black shadow-[0_0_12px_rgba(184,255,0,0.3)] scale-100 active:scale-95"
                      : "bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-50"
                  }`}
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}

            {/* Bottom micro footer hint */}
            <div className="flex items-center justify-center px-1 mt-2 text-[10px] text-neutral-500">
              {isLimitReached ? (
                <span className="text-emerald-400/80 font-mono">
                  Batas sesi tanya jawab AI tercapai • Tim siap bantu 24/7
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <CornerDownLeft className="w-3 h-3 text-neutral-600" />
                  Tekan Enter untuk kirim • Shift+Enter baris baru
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
