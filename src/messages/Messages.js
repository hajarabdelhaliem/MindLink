import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Messages() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('primary');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChat, setActiveChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [archivedChats, setArchivedChats] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);

  // Mock data for messages
  const messagesData = {
    primary: [
      { id: 1, name: 'Joya joy', lastMessage: 'Good Morning', time: '2h', avatar: '/logo192.png', isOnline: true },
      { id: 2, name: 'Alice Johnson', lastMessage: 'How are you?', time: '5h', avatar: '/logo192.png', isOnline: true },
      { id: 3, name: 'Bob Smith', lastMessage: 'See you soon!', time: '1d', avatar: '/logo192.png', isOnline: false },
      { id: 8, name: 'Grace Lee', lastMessage: 'Hey there!', time: '3h', avatar: '/logo192.png', isOnline: true },
      { id: 9, name: 'Henry Taylor', lastMessage: 'Thanks!', time: '4h', avatar: '/logo192.png', isOnline: false },
    ],
    general: [
      { id: 4, name: 'Carol Davis', lastMessage: 'Thanks for sharing', time: '3h', avatar: '/logo192.png', isOnline: true },
      { id: 5, name: 'David Wilson', lastMessage: 'Great post!', time: '6h', avatar: '/logo192.png', isOnline: false },
    ],
    requests: [
      { id: 6, name: 'Emma Brown', lastMessage: 'Wants to connect', time: '1h', avatar: '/logo192.png', isOnline: true },
      { id: 7, name: 'Frank Miller', lastMessage: 'New message request', time: '2h', avatar: '/logo192.png', isOnline: false },
    ],
    archived: []
  };

  const openChat = (contact) => {
    setActiveChat(contact);
    if (!chatMessages[contact.name]) {
      setChatMessages({
        ...chatMessages,
        [contact.name]: [
          { text: "Hello! How can I help you?", sender: contact.name, time: "Just now" }
        ]
      });
    }
  };

  const sendMessage = () => {
    if (inputValue.trim() && activeChat) {
      const newMessage = {
        text: inputValue.trim(),
        sender: "You",
        time: "Just now"
      };
      setChatMessages({
        ...chatMessages,
        [activeChat.name]: [...(chatMessages[activeChat.name] || []), newMessage]
      });
      setInputValue("");
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveChat(null);
  };

  const handleArchiveChat = (chatName) => {
    // Find the chat in the current category
    const allChats = [
      ...messagesData.primary,
      ...messagesData.general,
      ...messagesData.requests
    ];
    const chatToArchive = allChats.find(chat => chat.name === chatName);
    
    if (chatToArchive && !archivedChats.find(chat => chat.name === chatName)) {
      // Add to archived
      setArchivedChats([...archivedChats, chatToArchive]);
      // Close menu
      setShowChatMenu(false);
      // Close active chat if it's the one being archived
      if (activeChat?.name === chatName) {
        setActiveChat(null);
      }
    }
  };

  const handleUnarchiveChat = (chatName) => {
    // Remove from archived
    setArchivedChats(archivedChats.filter(chat => chat.name !== chatName));
    // Close active chat if it's the one being unarchived
    if (activeChat?.name === chatName) {
      setActiveChat(null);
    }
  };

  const getFilteredMessages = () => {
    if (activeCategory === 'archived') {
      return archivedChats.filter(message =>
        message.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return messagesData[activeCategory]?.filter(message =>
      message.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
  };

  const filteredMessages = getFilteredMessages();

  const handleReturnToFeed = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/feed';
    }
  };

  const emojiOptions = ['😀', '😂', '😍', '😭', '😡', '👍', '🎉', '🙏', '🥰', '🤗', '😎', '🤩'];

  const handleEmojiSelect = (emoji) => {
    setInputValue((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showChatMenu && !e.target.closest('.chat-menu-container')) {
        setShowChatMenu(false);
      }
    };

    if (showChatMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showChatMenu]);

  useEffect(() => {
    const handleClickOutsideEmoji = (e) => {
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(e.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('click', handleClickOutsideEmoji);
      return () => document.removeEventListener('click', handleClickOutsideEmoji);
    }
  }, [showEmojiPicker]);

  return (
    <div className="messages-section">
      {/* Left Side - Chat Window */}
      <div className="chat-window">
        {/* Floating Emojis */}
        <div className="floating-emojis">
          <span className="floating-emoji emoji-1">🍪</span>
          <span className="floating-emoji emoji-2">🧸</span>
          <span className="floating-emoji emoji-3">🎈</span>
          <span className="floating-emoji emoji-4">💗</span>
          <span className="floating-emoji emoji-5">🎀</span>
          <span className="floating-emoji emoji-6">🍪</span>
          <span className="floating-emoji emoji-7">💗</span>
          <span className="floating-emoji emoji-8">🎈</span>
        </div>
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-contact">
                <div className="profile-photo">
                  <img src={activeChat.avatar} alt={activeChat.name} />
                  {activeChat.isOnline && <div className="active-indicator"></div>}
                </div>
                <div className="contact-info">
                  <h4>{activeChat.name}</h4>
                  <span className="online-status">{activeChat.isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
              <div className="chat-actions">
                <button className="chat-action-btn">
                  <i className="uil uil-phone"></i>
                </button>
                <button className="chat-action-btn">
                  <i className="uil uil-video"></i>
                </button>
                <div className="chat-menu-container">
                  <button 
                    className="chat-action-btn"
                    onClick={() => setShowChatMenu(!showChatMenu)}
                  >
                    <i className="uil uil-ellipsis-v"></i>
                  </button>
                  {showChatMenu && (
                    <div className="chat-menu-dropdown">
                      <button 
                        className="chat-menu-item"
                        onClick={() => {
                          console.log('Share chat');
                          setShowChatMenu(false);
                        }}
                      >
                        <i className="uil uil-share-alt"></i>
                        <span>Share Chat</span>
                      </button>
                      <button 
                        className="chat-menu-item"
                        onClick={() => {
                          console.log('Request support');
                          setShowChatMenu(false);
                        }}
                      >
                        <i className="uil uil-heart-medical"></i>
                        <span>Request Support</span>
                      </button>
                      <button 
                        className="chat-menu-item"
                        onClick={() => {
                          console.log('Report concern');
                          setShowChatMenu(false);
                        }}
                      >
                        <i className="uil uil-exclamation-triangle"></i>
                        <span>Report Concern</span>
                      </button>
                      <button 
                        className="chat-menu-item"
                        onClick={() => {
                          console.log('Block user');
                          setShowChatMenu(false);
                        }}
                      >
                        <i className="uil uil-ban"></i>
                        <span>Block User</span>
                      </button>
                      {activeCategory === 'archived' ? (
                        <button 
                          className="chat-menu-item"
                          onClick={() => {
                            if (activeChat) {
                              handleUnarchiveChat(activeChat.name);
                            }
                          }}
                        >
                          <i className="uil uil-archive-alt"></i>
                          <span>Unarchive Chat</span>
                        </button>
                      ) : (
                        <button 
                          className="chat-menu-item"
                          onClick={() => {
                            if (activeChat) {
                              handleArchiveChat(activeChat.name);
                            }
                          }}
                        >
                          <i className="uil uil-archive"></i>
                          <span>Archive Chat</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages">
              {(chatMessages[activeChat.name] || []).map((message, msgIndex) => (
                <div
                  key={msgIndex}
                  className={`chat-message ${message.sender === 'You' ? 'sent' : 'received'}`}
                >
                  <div className="message-bubble">
                    <p>{message.text}</p>
                    <span className="message-timestamp">{message.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="chat-input-container">
              <div className="chat-input-wrapper">
                <button className="chat-attach-btn">
                  <i className="uil uil-paperclip"></i>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />
                <div className="chat-emoji-wrapper">
                  <button
                    className="chat-emoji-btn"
                    type="button"
                    ref={emojiButtonRef}
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    aria-label="Insert emoji"
                  >
                    <i className="uil uil-smile"></i>
                  </button>
                  {showEmojiPicker && (
                    <div className="emoji-picker" ref={emojiPickerRef}>
                      {emojiOptions.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          className="emoji-picker-item"
                          onClick={() => handleEmojiSelect(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button className="chat-send-btn" onClick={sendMessage}>
                  <i className="uil uil-message"></i>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-content">
              <i className="uil uil-comment-alt-message"></i>
              <h3>Select a conversation</h3>
              <p>Find people to relate with your Life Story!</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Conversations List */}
      <div className="messages-sidebar">
        <div className="messages-header">
          <h2>Messages</h2>
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <button 
              className="home-icon-btn" 
              onClick={() => navigate('/')}
              title="Back to Home"
              style={{ 
                background: 'linear-gradient(135deg, var(--color-aqua-teal), var(--color-mint))',
                color: 'white', 
                border: 'none', 
                padding: '0.6rem 0.6rem',
                borderRadius: '50%', 
                cursor: 'pointer', 
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.5rem',
                height: '2.5rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(115, 199, 199, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) rotate(-5deg)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(115, 199, 199, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(115, 199, 199, 0.3)';
              }}
            >
              <i className="uil uil-arrow-left"></i>
            </button>
            <button className="new-message-btn">
              <i className="uil uil-edit"></i>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="messages-search-bar">
          <i className="uil uil-search"></i>
          <input
            type="search"
            placeholder="Search messages"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Message Categories */}
        <div className="messages-category">
          <h6
            className={activeCategory === 'primary' ? 'active' : ''}
            onClick={() => handleCategoryChange('primary')}
          >
            Primary
          </h6>
          <h6
            className={activeCategory === 'general' ? 'active' : ''}
            onClick={() => handleCategoryChange('general')}
          >
            General
          </h6>
          <h6
            className={`message-requests ${activeCategory === 'requests' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('requests')}
          >
            Requests ({messagesData.requests.length})
          </h6>
          <h6
            className={activeCategory === 'archived' ? 'active' : ''}
            onClick={() => handleCategoryChange('archived')}
          >
            Archived ({archivedChats.length})
          </h6>
        </div>

        {/* Messages List */}
        <div className="messages-list">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`message-item ${activeChat?.id === message.id ? 'active' : ''}`}
              onClick={() => openChat(message)}
            >
              <div className="profile-photo">
                <img src={message.avatar} alt={message.name} />
                {message.isOnline && <div className="active-indicator"></div>}
              </div>
              <div className="message-body">
                <div className="message-header">
                  <h5>{message.name}</h5>
                  <span className="message-time">{message.time}</span>
                </div>
                <p className="text-muted">{message.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messages;

