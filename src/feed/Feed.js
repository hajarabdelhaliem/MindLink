import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Feed() {
  const navigate = useNavigate();
  const [openChats, setOpenChats] = useState([]);
  const [chatMessages, setChatMessages] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [openCommentWindows, setOpenCommentWindows] = useState([]);
  const [commentsByPost, setCommentsByPost] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [activeMessageCategory, setActiveMessageCategory] = useState('primary');
  const [showLikersModal, setShowLikersModal] = useState(false);
  const [currentPostLikers, setCurrentPostLikers] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});

  // Mock data for likers
  const likersData = {
    'post-1': [
      { name: 'Joy is crazy', avatar: '/logo192.png' },
      { name: 'Alice Johnson', avatar: '/logo192.png' },
      { name: 'Bob Smith', avatar: '/logo192.png' },
      { name: 'Carol Davis', avatar: '/logo192.png' },
      { name: 'David Wilson', avatar: '/logo192.png' },
      { name: 'Emma Brown', avatar: '/logo192.png' },
      { name: 'Frank Miller', avatar: '/logo192.png' },
      { name: 'Grace Lee', avatar: '/logo192.png' },
      { name: 'Henry Taylor', avatar: '/logo192.png' },
      { name: 'Ivy Chen', avatar: '/logo192.png' }
    ],
    'post-2': [
      { name: 'Joy is crazy', avatar: '/logo192.png' },
      { name: 'Jack Wilson', avatar: '/logo192.png' },
      { name: 'Kate Brown', avatar: '/logo192.png' },
      { name: 'Liam Davis', avatar: '/logo192.png' }
    ],
    'post-3': [
      { name: 'Joy is crazy', avatar: '/logo192.png' },
      { name: 'Maya Patel', avatar: '/logo192.png' },
      { name: 'Noah Singh', avatar: '/logo192.png' }
    ],
    'post-4': [
      { name: 'Joy is crazy', avatar: '/logo192.png' },
      { name: 'Olivia Kim', avatar: '/logo192.png' },
      { name: 'Paul Rodriguez', avatar: '/logo192.png' },
      { name: 'Quinn Martinez', avatar: '/logo192.png' },
      { name: 'Rachel Green', avatar: '/logo192.png' }
    ],
    'post-5': [
      { name: 'Joy is crazy', avatar: '/logo192.png' },
      { name: 'Sam Thompson', avatar: '/logo192.png' }
    ],
    'post-6': [
      { name: 'Joy is crazy', avatar: '/logo192.png' },
      { name: 'Tina Wang', avatar: '/logo192.png' },
      { name: 'Uma Sharma', avatar: '/logo192.png' },
      { name: 'Victor Lopez', avatar: '/logo192.png' },
      { name: 'Wendy Zhang', avatar: '/logo192.png' },
      { name: 'Xavier Liu', avatar: '/logo192.png' }
    ],
    'post-7': [
      { name: 'Joy is crazy', avatar: '/logo192.png' },
      { name: 'Yara Ahmed', avatar: '/logo192.png' },
      { name: 'Zoe Johnson', avatar: '/logo192.png' }
    ],
    'post-8': [
      { name: 'Joy is crazy', avatar: '/logo192.png' },
      { name: 'Alex Turner', avatar: '/logo192.png' },
      { name: 'Bella Swift', avatar: '/logo192.png' },
      { name: 'Charlie Brown', avatar: '/logo192.png' },
      { name: 'Diana Prince', avatar: '/logo192.png' }
    ]
  };

  // Mock data for posts (initially 8 posts)
  const [postsData, setPostsData] = useState([
    {
      id: 'post-1',
      userName: 'Joya joyzy',
      time: '20 MINUTES AGO',
      caption: 'Hello I am getting crazy. #Joyiscrazy',
      image: '/logo512.png',
      likes: 999,
    },
    {
      id: 'post-2',
      userName: 'Joya joyzy',
      time: '1 HOUR AGO',
      caption: 'Another great day! #MindLink',
      image: '/logo512.png',
      likes: 500,
    },
    {
      id: 'post-3',
      userName: 'Joya joyzy',
      time: '2 HOURS AGO',
      caption: 'Loving this weather. #Happy',
      image: '/logo512.png',
      likes: 200,
    },
    {
      id: 'post-4',
      userName: 'Joya joyzy',
      time: '3 HOURS AGO',
      caption: 'New adventures await! #Explore',
      image: '/logo512.png',
      likes: 150,
    },
    {
      id: 'post-5',
      userName: 'Joya joyzy',
      time: '4 HOURS AGO',
      caption: 'Coding all night. #DeveloperLife',
      image: '/logo512.png',
      likes: 100,
    },
    {
      id: 'post-6',
      userName: 'Joya joyzy',
      time: '5 HOURS AGO',
      caption: 'Time for a break. #CoffeeTime',
      image: '/logo512.png',
      likes: 80,
    },
    {
      id: 'post-7',
      userName: 'Joya joyzy',
      time: '6 HOURS AGO',
      caption: 'Learning something new everyday. #Knowledge',
      image: '/logo512.png',
      likes: 120,
    },
    {
      id: 'post-8',
      userName: 'Joya joyzy',
      time: '7 HOURS AGO',
      caption: 'Weekend vibes. #Relax',
      image: '/logo512.png',
      likes: 70,
    },
  ]);

  const showLikers = (postId) => {
    setCurrentPostLikers(likersData[postId] || []);
    setShowLikersModal(true);
  };

  const closeLikersModal = () => {
    setShowLikersModal(false);
    setCurrentPostLikers([]);
  };

  const openChat = (contactName) => {
    if (!openChats.includes(contactName)) {
      setOpenChats([...openChats, contactName]);
      if (!chatMessages[contactName]) {
        setChatMessages({
          ...chatMessages,
          [contactName]: [
            { text: "Hello! How can I help you?", sender: contactName, time: "Just now" }
          ]
        });
      }
    }
  };

  const closeChat = (contactName) => {
    setOpenChats(openChats.filter(chat => chat !== contactName));
  };

  const sendMessage = (contactName, message) => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: "You",
        time: "Just now"
      };
      setChatMessages({
        ...chatMessages,
        [contactName]: [...(chatMessages[contactName] || []), newMessage]
      });
      // Clear the input after sending
      setInputValues({
        ...inputValues,
        [contactName]: ""
      });
    }
  };

  const handleInputChange = (contactName, value) => {
    setInputValues({
      ...inputValues,
      [contactName]: value
    });
  };

  const handleCreatePost = () => {
    if (postContent.trim() || postImage) {
      // Here you would typically send the post to your backend
      console.log('Creating post:', { content: postContent, image: postImage });
      
      const newPost = {
        id: `post-${postsData.length + 1}`,
        userName: 'Joya joyzy',
        time: 'JUST NOW',
        caption: postContent,
        image: postImage ? URL.createObjectURL(postImage) : null,
        likes: 0,
      };

      setPostsData([newPost, ...postsData]);
      setLikedPosts((prev) => ({ ...prev, [newPost.id]: false }));
      setSavedPosts((prev) => ({ ...prev, [newPost.id]: false }));
      setCommentsByPost((prev) => ({ ...prev, [newPost.id]: [] }));
      // Reset form and close modal
      setPostContent('');
      setPostImage(null);
      setShowCreatePost(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(file);
    }
  };

  const openComments = (postId) => {
    // Toggle expanded comments instead of opening popup
    setExpandedComments({
      ...expandedComments,
      [postId]: !expandedComments[postId]
    });
    
    // Initialize comments if not already done
    if (!commentsByPost[postId]) {
      setCommentsByPost({
        ...commentsByPost,
        [postId]: [
          { text: 'Nice post!', author: 'Alice', time: '1m' },
          { text: 'Love this!', author: 'Bob', time: '3m' },
          { text: 'Amazing content!', author: 'Charlie', time: '5m' },
          { text: 'Thanks for sharing!', author: 'Diana', time: '7m' }
        ]
      });
    }
  };

  const closeComments = (postId) => {
    setOpenCommentWindows(openCommentWindows.filter((id) => id !== postId));
  };

  const addComment = (postId, text) => {
    if (!text || !text.trim()) return;
    const newComment = { text: text.trim(), author: 'You', time: 'Just now' };
    setCommentsByPost({
      ...commentsByPost,
      [postId]: [...(commentsByPost[postId] || []), newComment]
    });
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleSaved = (postId) => {
    const isCurrentlySaved = savedPosts[postId];
    setSavedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    
    // Show notification
    setNotificationMessage(isCurrentlySaved ? 'Post removed from saved' : 'Post saved successfully!');
    setNotificationType(isCurrentlySaved ? 'info' : 'success');
    setShowNotification(true);
    
    // Simulate haptic feedback (vibration) if supported
    if (navigator.vibrate) {
      navigator.vibrate(isCurrentlySaved ? [50] : [100, 50, 100]);
    }
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleMessageCategoryChange = (category) => {
    setActiveMessageCategory(category);
  };



  return (
    <div className="App">
      {/* Navigation */}
      <nav>
        <div className="container navbar">
          {/* Logo */}
          <h2 className="log">MindLink</h2>

          {/* Search Bar */}
          <div className="search-bar">
            <i className="uil uil-search"></i>
            <input type="search" placeholder="Search for doctors, cases, and explore yourself" />
          </div>

          {/* Create Button + Profile Icon */}
          <div className="create-profile">
                         <button className="btn btn-primary" onClick={() => setShowCreatePost(true)}>
              <i className="uil uil-plus-circle"></i> Create
             </button>

            <div className="profile-photo">
              <label htmlFor="profile-upload">
                <i className="uil uil-user"></i>
              </label>
              <input type="file" id="profile-upload" hidden />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <div className="container">
          {/* Left Sidebar */}
          <div className="left">
            {/* Profile */}
            <div className="profile">
              <div className="profile-photo">
                <img src="/logo192.png" alt="Profile" />
              </div>
              <div className="handle">
                <h4>Joy is dead</h4>
                <p className="text-muted">@joyzy</p>
              </div>
            </div>

            {/* Sidebar Menu */}
            <div className="sidebar">
              <a className="menu-item active">
                <span><i className="uil uil-home"></i></span>
                <h3>Home</h3>
              </a>
              <a className="menu-item">
                <span><i className="uil uil-compass"></i></span>
                <h3>Explore</h3>
              </a>
              <a className="menu-item" id="notifications">
                <span>
                  <i className="uil uil-bell">
                    <small className="notifications-count">+9</small>
                  </i>
                </span>
                <h3>Notifications</h3>

                {/* Notifications Popup */}
                <div className="notifications-popup">
                  <div>
                    <div className="profile-photo">
                      <img src="/logo192.png" alt="Profile" />
                    </div>
                    <div className="notification-body">
                      <b>Joy is cool</b> accepted your friend request
                      <small className="text-muted">2 Hours ago</small>
                    </div>
                  </div>

                  <div>
                    <div className="profile-photo">
                      <img src="/logo192.png" alt="Profile" />
                    </div>
                    <div className="notification-body">
                      <b>Joy is cool</b> commented on your dumb status
                      <small className="text-muted">2 Days ago</small>
                    </div>
                  </div>

                  <div>
                    <div className="profile-photo">
                      <img src="/logo192.png" alt="Profile" />
                    </div>
                    <div className="notification-body">
                      <b>Joy is cool</b> blocked you
                      <small className="text-muted">4 Days ago</small>
                    </div>
                  </div>

                  <div>
                    <div className="profile-photo">
                      <img src="/logo192.png" alt="Profile" />
                    </div>
                    <div className="notification-body">
                      <b>Joy is cool</b> sent you another friend request
                      <small className="text-muted">2 Seconds ago</small>
                    </div>
                  </div>
                </div>
                {/* End Notifications Popup */}
              </a>

              <a className="menu-item" id="messages-notifications" onClick={() => navigate('/messages')} style={{ cursor: 'pointer' }}>
                <span>
                  <i className="uil uil-envelope">
                    <small className="notifications-count">6</small>
                  </i>
                </span>
                <h3>Messages</h3>
              </a>
                              <a className="menu-item">
                  <span>
                    <i className="uil uil-bookmark"></i>
                  </span>
                  <h3>Saved</h3>
                </a>
              <a className="menu-item">
                <span><i className="uil uil-chart-line"></i></span>
                <h3>Analytics</h3>
              </a>
              <a className="menu-item">
                <span><i className="uil uil-palette"></i></span>
                <h3>Theme</h3>
              </a>
              <a className="menu-item">
                <span><i className="uil uil-setting"></i></span>
                <h3>Settings</h3>
              </a>
            </div>
            {/* End Sidebar */}
          </div>
          {/* End Left Sidebar */}

          {/* Middle Content */}
          <div className="middle">
            {/* Stories */}
            <div className="stories">
              <div className="story">
                <div className="profile-photo"><img src="/logo192.png" alt="Story 1" /></div>
                <p className="name">Your Story</p>
              </div>
              <div className="story">
                <div className="profile-photo"><img src="/logo192.png" alt="Story 2" /></div>
                <p className="name">Joy is not dead</p>
              </div>
              <div className="story">
                <div className="profile-photo"><img src="/logo192.png" alt="Story 3" /></div>
                <p className="name">Joy is cool</p>
              </div>
              <div className="story">
                <div className="profile-photo"><img src="/logo192.png" alt="Story 4" /></div>
                <p className="name">cool is joy</p>
              </div>
              <div className="story">
                <div className="profile-photo"><img src="/logo192.png" alt="Story 5" /></div>
                <p className="name">joy stuff</p>
              </div>
              <div className="story">
                <div className="profile-photo"><img src="/logo192.png" alt="Story 6" /></div>
                <p className="name">stuff is joy</p>
              </div>
            </div>
            {/* End Stories */}

            {/* Create Post */}
             <div className="create-post" onClick={() => setShowCreatePost(true)}>
              <div className="profile-photo">
                <img src="/logo192.png" alt="profile" />
              </div>
               <input type="text" placeholder="What's on your mind, Joy?" readOnly />
               <button type="button" className="btn btn-primary">Post</button>
             </div>

            {/* Feeds */}
            <div className="feeds">
              {/* Feed Template */}
              {postsData.map((post) => (
                <div className="feed" key={post.id}>
                  <div className="head">
                    <div className="user">
                      <div className="profile-photo">
                        <img src="/logo192.png" alt="User profile" />
                      </div>
                      <div className="info">
                        <h3>{post.userName}</h3>
                        <small>Egypt, {post.time}</small>
                      </div>
                    </div>
                    <span className="edit">
                      <i className="uil uil-ellipsis-h"></i>
                    </span>
                  </div>

                  <div className="photo">
                    <img src={post.image} alt="Post image" />
                  </div>

                  <div className="action-button">
                    <div className="interaction-buttons">
                      <div className="left-buttons">
                        <span
                          className={`like-btn ${likedPosts[post.id] ? 'liked' : ''}`}
                          onClick={() => toggleLike(post.id)}
                        >
                          {likedPosts[post.id] ? (
                            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                              <path
                                fill="currentColor"
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.56C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                              />
                            </svg>
                          ) : (
                            <i className="uil uil-heart"></i>
                          )}
                        </span>
                        <span className="comment-btn" onClick={() => openComments(post.id)}>
                          <i className="uil uil-comment-dots"></i>
                        </span>
                        <span className="share-btn">
                          <i className="uil uil-share-alt"></i>
                        </span>
                      </div>
                      <span
                        className={`bookmark-btn ${savedPosts[post.id] ? 'saved' : ''}`}
                        onClick={() => toggleSaved(post.id)}
                        title={savedPosts[post.id] ? 'Remove from saved' : 'Save post'}
                      >
                        {savedPosts[post.id] ? (
                          <i className="uil uil-bookmark-full"></i>
                        ) : (
                          <i className="uil uil-bookmark"></i>
                        )}
                      </span>
                    </div>
                    <p>
                      Liked by <b>Joy is crazy</b> and{' '}
                      <span
                        style={{ cursor: 'pointer', color: 'var(--color-aqua-teal)' }}
                        onClick={() => showLikers(post.id)}
                      >
                        <b>{post.likes} others</b>
                      </span>
                    </p>
                  </div>

                  <div className="caption">
                    <p>
                      <b>{post.userName}</b> {post.caption}
                    </p>
                  </div>

                  <div className="comments-section">
                    <div className="comments-toggle" onClick={() => openComments(post.id)}>
                      <span className="text-muted">
                        {expandedComments[post.id] ? 'Hide comments' : `View all ${(commentsByPost[post.id] || []).length} comments`}
                      </span>
                    </div>

                    {expandedComments[post.id] && (
                      <div className="inline-comments">
                        <div className="comments-list">
                          {(commentsByPost[post.id] || []).map((comment, idx) => (
                            <div key={idx} className="comment-item">
                              <div className="comment-avatar">
                                <img src="/logo192.png" alt={comment.author} />
                              </div>
                              <div className="comment-content">
                                <div className="comment-header">
                                  <span className="comment-author">{comment.author}</span>
                                  <span className="comment-time">{comment.time}</span>
                                </div>
                                <p className="comment-text">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="comment-input-section">
                          <div className="comment-input">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              value={commentInputs[post.id] || ''}
                              onChange={(e) =>
                                setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') addComment(post.id, commentInputs[post.id] || '');
                              }}
                            />
                            <button
                              className="comment-submit-btn"
                              onClick={() => addComment(post.id, commentInputs[post.id] || '')}
                            >
                              <i className="uil uil-message"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {/* END OF FEED */}
            </div>
            {/* End Middle */}
          </div>

          {/* Right Sidebar */}
          <div className="right">
            {/* Messages */}
            <div className="messages">
              <div className="heading">
                <h4>Messages</h4>
                <i className="uil uil-edit"></i>
              </div>

              {/* Search Bar */}
              <div className="search-bar">
                <i className="uil uil-search"></i>
                <input type="search" placeholder="Search messages" id="messages-search" />
              </div>

              {/* Message Categories */}
              <div className="category">
                <h6 
                  className={activeMessageCategory === 'primary' ? 'active' : ''} 
                  onClick={() => handleMessageCategoryChange('primary')}
                  style={{ cursor: 'pointer' }}
                >
                  Primary
                </h6>
                <h6 
                  className={activeMessageCategory === 'general' ? 'active' : ''} 
                  onClick={() => handleMessageCategoryChange('general')}
                  style={{ cursor: 'pointer' }}
                >
                  General
                </h6>
                <h6 
                  className={`message-requests ${activeMessageCategory === 'requests' ? 'active' : ''}`} 
                  onClick={() => handleMessageCategoryChange('requests')}
                  style={{ cursor: 'pointer' }}
                >
                  Requests (7)
                </h6>
              </div>

              {/* MESSAGE */}
              <div className="message" onClick={() => openChat("Joya joy")}>
                <div className="profile-photo">
                  <img src="/logo192.png" alt="User photo" />
                  <div className="active-indicator"></div>
                </div>
                <div className="message-body">
                  <h5>Joya joy</h5>
                  <p className="text-muted">Good Morning</p>
                </div>
              </div>
              {/* MESSAGE */}
              <div className="message" onClick={() => openChat("Joya joy")}>
                <div className="profile-photo">
                  <img src="/logo192.png" alt="User photo" />
                  <div className="active-indicator"></div>
                </div>
                <div className="message-body">
                  <h5>Joya joy</h5>
                  <p className="text-muted">Good Morning</p>
                </div>
              </div>
              {/* MESSAGE */}
              <div className="message" onClick={() => openChat("Joya joy")}>
                <div className="profile-photo">
                  <img src="/logo192.png" alt="User photo" />
                  <div className="active-indicator"></div>
                </div>
                <div className="message-body">
                  <h5>Joya joy</h5>
                  <p className="text-muted">Good Morning</p>
                </div>
              </div>
              {/* MESSAGE */}
              <div className="message" onClick={() => openChat("Joya joy")}>
                <div className="profile-photo">
                  <img src="/logo192.png" alt="User photo" />
                  <div className="active-indicator"></div>
                </div>
                <div className="message-body">
                  <h5>Joya joy</h5>
                  <p className="text-muted">Good Morning</p>
                </div>
              </div>
              {/* MESSAGE */}
              <div className="message" onClick={() => openChat("Joya joy")}>
                <div className="profile-photo">
                  <img src="/logo192.png" alt="User photo" />
                  <div className="active-indicator"></div>
                </div>
                <div className="message-body">
                  <h5>Joya joy</h5>
                  <p className="text-muted">Good Morning</p>
                </div>
              </div>
            </div>
            {/* END Messages */}

            {/* Friend Requests */}
            <div className="friend-requests">
              <h4>Requests (12)</h4>
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>Hajoora</h5>
                  <p className="text-muted">8 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>اميرة الامورة</h5>
                  <p className="text-muted">15 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>اميرة مجنونة</h5>
                  <p className="text-muted">3 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>بيلا قطت اميرة</h5>
                  <p className="text-muted">22 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>David Chen</h5>
                  <p className="text-muted">7 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>Lisa Brown</h5>
                  <p className="text-muted">11 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>Alex Rodriguez</h5>
                  <p className="text-muted">5 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>Maria Garcia</h5>
                  <p className="text-muted">18 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>James Miller</h5>
                  <p className="text-muted">9 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>Sophie Taylor</h5>
                  <p className="text-muted">14 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>Ryan Thompson</h5>
                  <p className="text-muted">6 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
              
              <div className="request">
                <div className="info">
                  <div className="profile-photo">
                    <img src="/logo192.png" alt="Request photo" />
                  </div>
                </div>
                <div>
                  <h5>Nina Patel</h5>
                  <p className="text-muted">12 mutual connections</p>
                  <div className="action">
                    <button className="btn btn-primary">Accept</button>
                    <button className="btn">Decline</button>
                  </div>
                </div>
              </div>
            </div>
            {/* END Friend Requests */}
          </div>
          {/* END Right Sidebar */}
        </div>
      </main>

      {/* Mini Chat Windows */}
      {openChats.map((contactName, index) => (
        <div 
          key={contactName} 
          className="mini-chat-window"
          style={{
            right: `${1 + (index * 0.5)}rem`,
            bottom: `${1 + (index * 0.5)}rem`
          }}
        >
                      <div className="mini-chat-header">
              <div className="mini-chat-contact">
                <div className="profile-photo">
                  <img src="/logo192.png" alt="Contact" />
                  <div className="active-indicator"></div>
                </div>
                <h5>{contactName}</h5>
              </div>
            <button 
              className="mini-chat-close" 
              onClick={() => closeChat(contactName)}
            >
              <i className="uil uil-times"></i>
            </button>
          </div>
          
          <div className="mini-chat-messages">
            {(chatMessages[contactName] || []).map((message, index) => (
              <div 
                key={index} 
                className={`mini-chat-message ${message.sender === 'You' ? 'sent' : 'received'}`}
              >
                <p>{message.text}</p>
                <small>{message.time}</small>
              </div>
            ))}
          </div>
          
          <div className="mini-chat-input">
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={inputValues[contactName] || ""}
              onChange={(e) => handleInputChange(contactName, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage(contactName, inputValues[contactName] || "");
                }
              }}
            />
            <button onClick={() => {
              sendMessage(contactName, inputValues[contactName] || "");
            }}>
              <i className="uil uil-message"></i>
            </button>
          </div>
        </div>
      ))}

      {/* Mini Comment Windows */}
      {openCommentWindows.map((postId) => (
        <div key={postId} className="mini-comment-window">
          <div className="mini-comment-header">
            <div className="mini-comment-title">
              <i className="uil uil-comment-dots"></i>
              <h5>Comments</h5>
            </div>
            <button className="mini-comment-close" onClick={() => closeComments(postId)}>
              <i className="uil uil-times"></i>
            </button>
          </div>
          <div className="mini-comment-list">
            {(commentsByPost[postId] || []).map((c, idx) => (
              <div key={idx} className={`mini-comment-item ${c.author === 'You' ? 'mine' : ''}`}>
                <div className="mini-comment-avatar">
                  <img src="/logo192.png" alt={c.author} />
                  {c.author !== 'You' && <div className="active-indicator"></div>}
                </div>
                <div className="mini-comment-body">
                  <div className="mini-comment-meta">
                    <b>{c.author}</b>
                    <small>{c.time}</small>
                  </div>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mini-comment-input">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentInputs[postId] || ''}
              onChange={(e) => setCommentInputs({ ...commentInputs, [postId]: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addComment(postId, commentInputs[postId] || '');
              }}
            />
            <button onClick={() => addComment(postId, commentInputs[postId] || '')}>
              <i className="uil uil-message"></i>
            </button>
          </div>
        </div>
      ))}

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="create-post-modal">
          <div className="modal-overlay" onClick={() => setShowCreatePost(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Create Post</h3>
              <button 
                className="modal-close" 
                onClick={() => setShowCreatePost(false)}
              >
                <i className="uil uil-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="post-user-info">
                <div className="profile-photo">
                  <img src="/logo192.png" alt="Profile" />
                </div>
                <div>
                  <h4>Joy is dead</h4>
                  <small>@joyzy</small>
                </div>
              </div>
              
              <textarea
                placeholder="What's on your mind, Joy?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows="4"
              />
              
              {postImage && (
                <div className="image-preview">
                  <img src={URL.createObjectURL(postImage)} alt="Preview" />
                  <button 
                    className="remove-image" 
                    onClick={() => setPostImage(null)}
                  >
                    <i className="uil uil-times"></i>
                  </button>
                </div>
              )}
              
              <div className="post-actions">
                <label className="add-to-post">
                  <i className="uil uil-image-plus"></i>
                  <span>Add to your post</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    hidden 
                  />
                </label>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-primary post-btn" 
                onClick={handleCreatePost}
                disabled={!postContent.trim() && !postImage}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Likers Modal */}
      {showLikersModal && (
        <div className="likers-modal">
          <div className="modal-overlay" onClick={closeLikersModal}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Liked by</h3>
              <button 
                className="modal-close" 
                onClick={closeLikersModal}
              >
                <i className="uil uil-times"></i>
              </button>
            </div>
            <div className="likers-list">
              {currentPostLikers.map((liker, index) => (
                <div key={index} className="liker-item">
                  <div className="liker-avatar">
                    <img src={liker.avatar} alt={liker.name} />
                  </div>
                  <div className="liker-info">
                    <h4>{liker.name}</h4>
                    <p>@{liker.name.toLowerCase().replace(/\s+/g, '')}</p>
                  </div>
                  <button className="follow-btn">Follow</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

        {/* Notification System */}
        {showNotification && (
          <div className={`notification ${notificationType}`}>
            {notificationMessage}
          </div>
        )}
    </div>
  );
}

export default Feed;
