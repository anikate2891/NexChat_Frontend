import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'
import { setCurrentChatId } from '../chat.slice'
import { useAuth } from '../../auth/hook/useAuth'


const Dashboard = () => {
  const chat = useChat()
  const auth = useAuth()
  const dispatch = useDispatch()
  const [chatInput, setChatInput] = useState('')
  const [isAiThinking, setIsAiThinking] = useState(false)
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  useEffect(() => {
    chat.initializeSocketConnection()
    chat.handleGetChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmitMessage = async (event) => {
    event.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return
    setIsAiThinking(true)
    try {
      await chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
      setChatInput('')
    } finally {
      setIsAiThinking(false)
    }
  }

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats)
  }

  const handleDeleteRecentChat = (event, chatId) => {
    event.stopPropagation()
    chat.handleDeleteChat(chatId, chats, currentChatId)
  }

  const handleNewChat = () => {
    dispatch(setCurrentChatId(null))
    setChatInput('')
  }

  const handleLogout = async () => {
    await auth.handleLogout()
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.65); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 80%, 100% { opacity: 0.35; transform: scale(0.75); }
          40% { opacity: 1; transform: scale(1); }
        }

        .db-root {
          min-height: 100vh;
          width: 100%;
          background: #0a0a0f;
          padding: 12px;
          font-family: 'DM Sans', sans-serif;
          color: #31b8c6;
        }
        @media (min-width: 768px) { .db-root { padding: 20px; } }

        .db-shell {
          position: relative;
          margin: 0 auto;
          display: flex;
          height: calc(100vh - 24px);
          width: 100%;
          gap: 14px;
          border-radius: 26px;
        }
        @media (min-width: 768px) { .db-shell { height: calc(100vh - 40px); gap: 20px; } }

        /* ─── SIDEBAR ─────────────────────────── */
        .db-sidebar {
          display: none;
          width: 266px;
          flex-shrink: 0;
          border-radius: 22px;
          background: linear-gradient(135deg, #0d1f22 0%, #091418 100%);
          border: 1px solid rgba(49,184,198,0.16);
          padding: 18px 12px;
          flex-direction: column;
          overflow: hidden;
        }
        @media (min-width: 768px) { .db-sidebar { display: flex; } }

        .db-logo {
          display: flex; align-items: center; gap: 10px;
          padding: 2px 6px 18px;
          border-bottom: 1px solid rgba(49,184,198,0.16);
          margin-bottom: 14px;
        }
        .db-logo-mark {
          width: 30px; height: 30px; border-radius: 8px;
          background: #31b8c6;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .db-logo-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800; font-size: 1.05rem;
          color: #f0fafb; letter-spacing: -0.02em;
        }

        .db-section-label {
          font-size: 0.66rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(49,184,198,0.45);
          padding: 0 6px 8px;
        }

        .db-chat-list {
          flex: 1; overflow-y: auto;
          display: flex; flex-direction: column; gap: 2px;
        }
        .db-chat-list::-webkit-scrollbar { width: 3px; }
        .db-chat-list::-webkit-scrollbar-track { background: transparent; }
        .db-chat-list::-webkit-scrollbar-thumb {
          background: rgba(49,184,198,0.2); border-radius: 4px;
        }

        .db-chat-btn {
          width: 100%; cursor: pointer;
          border-radius: 11px;
          border: 1px solid transparent;
          background: transparent;
          padding: 9px 12px;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem; font-weight: 500;
          color: rgba(240,250,251,0.6);
          transition: all 0.15s;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .db-chat-btn:hover {
          background: rgba(49,184,198,0.08);
          border-color: rgba(49,184,198,0.22);
          color: #f0fafb;
        }
        .db-chat-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .db-chat-item .db-chat-btn {
          flex: 1;
        }
        .db-chat-delete-btn {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          border: 1px solid rgba(49,184,198,0.2);
          background: transparent;
          color: rgba(240,250,251,0.45);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .db-chat-delete-btn:hover {
          color: #f0fafb;
          border-color: rgba(49,184,198,0.45);
          background: rgba(49,184,198,0.12);
        }

        .db-sidebar-footer {
          padding-top: 12px;
          border-top: 1px solid rgba(49,184,198,0.14);
          margin-top: 8px;
        }
        .db-new-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          padding: 9px 14px;
          background: rgba(49,184,198,0.08);
          border: 1px solid rgba(49,184,198,0.24);
          border-radius: 11px;
          color: #f0fafb;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem; font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
        .db-new-btn:hover {
          background: rgba(49,184,198,0.16);
          border-color: rgba(49,184,198,0.5);
        }

        /* ─── MAIN ────────────────────────────── */
        .db-main {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column;
          border-radius: 22px;
          background: linear-gradient(180deg, #0d1f22 0%, #091418 100%);
          border: 1px solid rgba(49,184,198,0.16);
          overflow: hidden;
          position: relative;
        }

        .db-topbar {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 18px;
          border-bottom: 1px solid rgba(49,184,198,0.14);
          background: rgba(10,10,15,0.7);
          backdrop-filter: blur(12px);
          flex-shrink: 0;
        }
        .db-status-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 11px;
          background: rgba(49,184,198,0.1);
          border: 1px solid rgba(49,184,198,0.24);
          border-radius: 100px;
          font-size: 0.73rem; font-weight: 500;
          color: #31b8c6;
        }
        .db-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #31b8c6;
          box-shadow: 0 0 7px rgba(49,184,198,0.85);
          animation: livePulse 2s ease-in-out infinite;
        }
        .db-chat-title {
          flex: 1;
          font-family: 'Syne', sans-serif;
          font-size: 0.88rem; font-weight: 700;
          color: rgba(240,250,251,0.5);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .db-logout-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 10px;
          border: 1px solid rgba(49,184,198,0.24);
          background: transparent;
          color: #f0fafb;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
        .db-logout-btn:hover {
          background: rgba(49,184,198,0.12);
          border-color: rgba(49,184,198,0.5);
        }

        /* messages area */
        .db-messages {
          flex: 1;
          overflow-y: auto;
          padding: 22px 18px 130px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .db-messages::-webkit-scrollbar { width: 4px; }
        .db-messages::-webkit-scrollbar-track { background: transparent; }
        .db-messages::-webkit-scrollbar-thumb {
          background: rgba(49,184,198,0.18); border-radius: 4px;
        }

        /* user bubble */
        .db-msg-user {
          max-width: 82%; width: fit-content;
          margin-left: auto;
          border-radius: 18px 18px 4px 18px;
          padding: 10px 15px;
          background: rgba(49,184,198,0.14);
          border: 1px solid rgba(49,184,198,0.28);
          color: #f0fafb;
          font-size: 0.91rem; line-height: 1.55;
          animation: fadeUp 0.25s ease both;
        }

        /* ai bubble */
        .db-msg-ai {
          max-width: 82%; width: fit-content;
          margin-right: auto;
          border-radius: 18px 18px 18px 4px;
          padding: 10px 15px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(49,184,198,0.16);
          color: rgba(240,250,251,0.9);
          font-size: 0.91rem; line-height: 1.65;
          animation: fadeUp 0.25s ease both;
        }
        .db-msg-ai p         { margin-bottom: 7px; }
        .db-msg-ai p:last-child { margin-bottom: 0; }
        .db-msg-ai ul        { margin-bottom: 7px; list-style: disc; padding-left: 18px; }
        .db-msg-ai ol        { margin-bottom: 7px; list-style: decimal; padding-left: 18px; }
        .db-msg-ai code      { background: rgba(49,184,198,0.12); border-radius: 4px; padding: 1px 5px; font-size: 0.85em; }
        .db-msg-ai pre       { background: rgba(0,0,0,0.35); border: 1px solid rgba(49,184,198,0.16); border-radius: 11px; padding: 12px; overflow-x: auto; margin-bottom: 7px; }
        .db-msg-ai pre code  { background: transparent; padding: 0; }

        .db-typing {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          max-width: fit-content;
          border-radius: 16px 16px 16px 4px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(49,184,198,0.16);
          color: rgba(240,250,251,0.7);
          font-size: 0.82rem;
          animation: fadeUp 0.25s ease both;
        }
        .db-typing-dots {
          display: inline-flex;
          gap: 4px;
        }
        .db-typing-dots span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #31b8c6;
          animation: dotPulse 1.25s infinite ease-in-out;
        }
        .db-typing-dots span:nth-child(2) { animation-delay: 0.18s; }
        .db-typing-dots span:nth-child(3) { animation-delay: 0.36s; }

        /* empty state */
        .db-empty {
          flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 14px; padding-bottom: 90px;
          animation: fadeUp 0.45s ease both;
        }
        .db-empty-icon {
          width: 50px; height: 50px; border-radius: 14px;
          background: rgba(49,184,198,0.1);
          border: 1px solid rgba(49,184,198,0.26);
          display: flex; align-items: center; justify-content: center;
        }
        .db-empty-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem; font-weight: 800;
          color: #f0fafb; letter-spacing: -0.02em;
        }
        .db-empty-sub {
          font-size: 0.83rem;
          color: rgba(240,250,251,0.55);
          text-align: center; max-width: 280px; line-height: 1.6;
        }

        /* footer */
        .db-footer {
          position: absolute;
          bottom: 12px; left: 12px; right: 12px;
          border-radius: 18px;
          background: rgba(10,10,15,0.92);
          border: 1px solid rgba(49,184,198,0.22);
          padding: 12px 14px;
          box-shadow: 0 -6px 28px rgba(0,0,0,0.45);
        }
        @media (min-width: 768px) { .db-footer { padding: 14px 18px; } }

        .db-form {
          display: flex; flex-direction: column; gap: 10px;
        }
        @media (min-width: 768px) { .db-form { flex-direction: row; align-items: center; } }

        .db-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(49,184,198,0.2);
          border-radius: 12px;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem;
          color: #f0fafb;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .db-input::placeholder { color: rgba(240,250,251,0.35); }
        .db-input:focus {
          border-color: rgba(49,184,198,0.5);
          box-shadow: 0 0 0 3px rgba(49,184,198,0.16);
        }

        .db-send-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 10px 22px;
          border-radius: 12px;
          border: none;
          background: #31b8c6;
          color: #0a0a0f;
          font-family: 'Syne', sans-serif;
          font-size: 0.87rem; font-weight: 700;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .db-send-btn:hover:not(:disabled) {
          background: #5dd2dd;
          box-shadow: 0 4px 18px rgba(49,184,198,0.35);
          transform: translateY(-1px);
        }
        .db-send-btn:active:not(:disabled) { transform: translateY(0); }
        .db-send-btn:disabled { opacity: 0.3; cursor: not-allowed; }
      `}</style>

      <main className="db-root">
        <section className="db-shell">

          {/* ── Sidebar ── */}
          <aside className="db-sidebar">
            <div className="db-logo">
              <div className="db-logo-mark">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" stroke="#0a0a0f" strokeWidth="2.2" strokeLinejoin="round"/>
                  <circle cx="10" cy="10" r="2.5" fill="#0a0a0f"/>
                </svg>
              </div>
              <span className="db-logo-name">NexChat</span>
            </div>

            <p className="db-section-label">Recent Chats</p>

            <div className="db-chat-list">
              {Object.values(chats).map((c) => (
                <div className="db-chat-item" key={c.id}>
                  <button
                    onClick={() => openChat(c.id)}
                    type="button"
                    className="db-chat-btn"
                  >
                    {c.title}
                  </button>
                  <button
                    type="button"
                    className="db-chat-delete-btn"
                    onClick={(event) => handleDeleteRecentChat(event, c.id)}
                    aria-label="Delete chat"
                    title="Delete chat"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="db-sidebar-footer">
              <button type="button" className="db-new-btn" onClick={handleNewChat}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                New Chat
              </button>
            </div>
          </aside>

          {/* ── Main Chat ── */}
          <section className="db-main">

            <div className="db-topbar">
              <span className="db-status-badge">
                <span className="db-status-dot" />
                AI Online
              </span>
              <span className="db-chat-title">
                {chats[currentChatId]?.title || 'New Conversation'}
              </span>
              <button type="button" className="db-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>

            <div className="db-messages">
              {!chats[currentChatId]?.messages?.length ? (
                <div className="db-empty">
                  <div className="db-empty-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#31b8c6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  </div>
                  <p className="db-empty-title">Ask me anything</p>
                  <p className="db-empty-sub">Start a conversation — I'm here to help you think, write, and explore ideas.</p>
                </div>
              ) : (
                chats[currentChatId].messages.map((message) => (
                  <div
                    key={message.id}
                    className={message.role === 'user' ? 'db-msg-user' : 'db-msg-ai'}
                  >
                    {message.role === 'user' ? (
                      <p>{message.content}</p>
                    ) : (
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p>{children}</p>,
                          ul: ({ children }) => <ul>{children}</ul>,
                          ol: ({ children }) => <ol>{children}</ol>,
                          code: ({ children }) => <code>{children}</code>,
                          pre: ({ children }) => <pre>{children}</pre>,
                        }}
                        remarkPlugins={[remarkGfm]}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                ))
              )}
              {isAiThinking && (
                <div className="db-typing">
                  AI is thinking
                  <span className="db-typing-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              )}
            </div>

            <footer className="db-footer">
              <form onSubmit={handleSubmitMessage} className="db-form">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  placeholder="Type your message..."
                  className="db-input"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isAiThinking}
                  className="db-send-btn"
                >
                  Send
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </form>
            </footer>

          </section>
        </section>
      </main>
    </>
  )
}

export default Dashboard
