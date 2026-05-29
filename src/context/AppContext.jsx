import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Pre-populated default mock database
const DEFAULT_USERS = [
  {
    email: "creator@creatoros.com",
    password: "password123",
    fullName: "Alex Rivera",
    plan: "Creator Pro",
    status: "active",
    signUpDate: "2026-04-12",
    platforms: ["youtube", "twitch", "tiktok", "instagram"],
    isBanned: false,
    goals: [
      { id: 1, title: "Hit 50,000 YouTube Subscribers", target: 50000, current: 48200, completed: false, platform: "youtube" },
      { id: 2, title: "Complete 15 streams on Twitch", target: 15, current: 12, completed: false, platform: "twitch" },
      { id: 3, title: "Reach 5% Average Engagement Rate", target: 5, current: 4.8, completed: false, platform: "tiktok" }
    ],
    streakCount: 5,
    milestones: [
      { id: 101, title: "First 10,000 Views", date: "2026-04-20", platform: "youtube" },
      { id: 102, title: "Twitch Affiliate Status", date: "2026-05-05", platform: "twitch" }
    ]
  },
  {
    email: "rookie@creatoros.com",
    password: "password123",
    fullName: "Sam Chen",
    plan: "Starter",
    status: "active",
    signUpDate: "2026-05-20",
    platforms: ["youtube"],
    isBanned: false,
    goals: [
      { id: 4, title: "First 1,000 Subscribers", target: 1000, current: 820, completed: false, platform: "youtube" }
    ],
    streakCount: 2,
    milestones: []
  },
  {
    email: "ninja@creatoros.com",
    password: "password123",
    fullName: "Tyler Blevins",
    plan: "Creator Elite",
    status: "active",
    signUpDate: "2025-11-02",
    platforms: ["youtube", "twitch", "tiktok", "kick", "discord", "twitter", "instagram"],
    isBanned: false,
    goals: [
      { id: 5, title: "Reach 1,000,000 YouTube Subscribers", target: 1000000, current: 980500, completed: false, platform: "youtube" },
      { id: 6, title: "100 hours streamed this month", target: 100, current: 88, completed: false, platform: "kick" }
    ],
    streakCount: 14,
    milestones: [
      { id: 103, title: "1 Million views in 24 hrs", date: "2026-01-15", platform: "youtube" },
      { id: 104, title: "10,000 active Twitch subs", date: "2026-03-01", platform: "twitch" }
    ]
  }
];

const DEFAULT_SPONSORSHIPS = [
  { id: 1, brand: "Apex Gaming Chairs", rate: 1200, status: "Active", startDate: "2026-05-01", endDate: "2026-06-01", platform: "twitch" },
  { id: 2, brand: "Nebula VPN", rate: 850, status: "Active", startDate: "2026-05-15", endDate: "2026-06-15", platform: "youtube" },
  { id: 3, brand: "G-Fuel Energy", rate: 2500, status: "Paid", startDate: "2026-04-01", endDate: "2026-05-01", platform: "youtube" },
  { id: 4, brand: "Razer Gear Studio", rate: 3000, status: "Pending", startDate: "2026-06-10", endDate: "2026-07-10", platform: "tiktok" }
];

const DEFAULT_ANNOUNCEMENTS = [
  { id: 1, title: "CreatorOS 2.0 Launch!", message: "We have fully overhauled the AI Growth Coach features. Enjoy smoother title recommendations and enhanced platform metrics reporting.", date: "2026-05-28", type: "info" }
];

export const AppProvider = ({ children }) => {
  // DB State Persistent loading
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('creatoros_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('creatoros_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [sponsorships, setSponsorships] = useState(() => {
    const saved = localStorage.getItem('creatoros_sponsorships');
    return saved ? JSON.parse(saved) : DEFAULT_SPONSORSHIPS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    const saved = localStorage.getItem('creatoros_announcements');
    return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENTS;
  });

  const [notifications, setNotifications] = useState([]);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('creatoros_theme');
    return saved ? saved : 'dark';
  });

  // Keep track of general simulated platform stats (AI requests, server health)
  const [aiUsageCount, setAiUsageCount] = useState(() => {
    return parseInt(localStorage.getItem('creatoros_ai_usage') || '142');
  });

  // Track localStorage sync
  useEffect(() => {
    localStorage.setItem('creatoros_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('creatoros_session', JSON.stringify(currentUser));
      // Keep currentUser sync'd in users list
      setUsers(prev => prev.map(u => u.email === currentUser.email ? currentUser : u));
    } else {
      localStorage.removeItem('creatoros_session');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('creatoros_sponsorships', JSON.stringify(sponsorships));
  }, [sponsorships]);

  useEffect(() => {
    localStorage.setItem('creatoros_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('creatoros_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Handle Dynamic notifications load
  useEffect(() => {
    if (currentUser) {
      const basicNotifications = [
        { id: 1, title: "Optimal Upload Time predicted", content: "AI recommendation: Upload your next YouTube video at 7:00 PM for 32% more initial reach.", time: "10m ago", type: "ai", read: false },
        { id: 2, title: "Milestone achieved!", content: "Congratulations! Your TikTok clips hit a total of 150,000 views this week.", time: "2h ago", type: "milestone", read: false },
        { id: 3, title: "Revenue payout sent", content: "Sponsor G-Fuel completed payout of $2,500. View invoice details.", time: "1d ago", type: "revenue", read: true }
      ];
      setNotifications(basicNotifications);
    } else {
      setNotifications([]);
    }
  }, [currentUser]);

  // Auth Operations
  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, message: "Account does not exist." };
    }
    if (user.password !== password) {
      return { success: false, message: "Invalid password." };
    }
    if (user.isBanned) {
      return { success: false, message: "This account has been disabled. Please contact administrator support." };
    }
    setCurrentUser(user);
    return { success: true, user };
  };

  const signup = (email, password, fullName) => {
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: "Email is already registered." };
    }
    const newUser = {
      email: email,
      password: password,
      fullName: fullName,
      plan: "none", // Forces pricing plan setup
      status: "pending",
      signUpDate: new Date().toISOString().split('T')[0],
      platforms: [],
      isBanned: false,
      goals: [
        { id: Date.now() + 1, title: "Configure your connected accounts", target: 2, current: 0, completed: false, platform: "youtube" }
      ],
      streakCount: 1,
      milestones: []
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const selectPlan = (planName) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      plan: planName,
      status: planName === 'Starter' ? 'active' : 'active_premium'
    };
    setCurrentUser(updated);
    addNotification({
      title: `Plan Activated: ${planName}`,
      content: `Welcome to the ${planName} tier! Your creator capabilities have been successfully updated.`,
      type: "milestone"
    });
  };

  // Profile platform sync handlers
  const togglePlatform = (platformName) => {
    if (!currentUser) return;
    const platforms = [...currentUser.platforms];
    const index = platforms.indexOf(platformName);
    
    // starter limits
    if (index === -1 && currentUser.plan === "Starter" && platforms.length >= 2) {
      return { success: false, message: "Your Starter Plan is limited to a maximum of 2 connected platforms. Please upgrade to Pro or Elite to connect more!" };
    }
    // pro limits
    if (index === -1 && currentUser.plan === "Creator Pro" && platforms.length >= 6) {
      return { success: false, message: "Your Pro Plan is limited to a maximum of 6 connected platforms. Please upgrade to Elite to connect unlimited!" };
    }

    if (index > -1) {
      platforms.splice(index, 1);
      addNotification({
        title: `Disconnected ${platformName.toUpperCase()}`,
        content: `Your ${platformName} account has been disconnected from your unified feed.`,
        type: "info"
      });
    } else {
      platforms.push(platformName);
      addNotification({
        title: `Connected ${platformName.toUpperCase()}`,
        content: `Succesfully synced your ${platformName} analytics. The AI Growth Coach is processing data...`,
        type: "ai"
      });
    }

    setCurrentUser({
      ...currentUser,
      platforms
    });
    return { success: true };
  };

  // Notification Helpers
  const addNotification = ({ title, content, type }) => {
    const newNotif = {
      id: Date.now(),
      title,
      content,
      time: "Just now",
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Goal Helpers
  const addGoal = (title, target, platform = "youtube") => {
    if (!currentUser) return;
    const newGoal = {
      id: Date.now(),
      title,
      target,
      current: 0,
      completed: false,
      platform
    };
    setCurrentUser({
      ...currentUser,
      goals: [...(currentUser.goals || []), newGoal]
    });
  };

  const updateGoalProgress = (id, amount) => {
    if (!currentUser) return;
    const updatedGoals = (currentUser.goals || []).map(g => {
      if (g.id === id) {
        const nextVal = Math.min(g.target, g.current + amount);
        const comp = nextVal >= g.target;
        if (comp && !g.completed) {
          addNotification({
            title: "Goal Completed! 🏆",
            content: `Congratulations on completing your goal: "${g.title}"!`,
            type: "milestone"
          });
        }
        return { ...g, current: nextVal, completed: comp };
      }
      return g;
    });
    setCurrentUser({ ...currentUser, goals: updatedGoals });
  };

  const deleteGoal = (id) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      goals: (currentUser.goals || []).filter(g => g.id !== id)
    });
  };

  // Sponsorship Management
  const addSponsorProject = (brand, rate, platform) => {
    const newSponsor = {
      id: Date.now(),
      brand,
      rate: parseFloat(rate),
      status: "Pending",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      platform
    };
    setSponsorships(prev => [newSponsor, ...prev]);
    addNotification({
      title: "Sponsorship Created",
      content: `New pending campaign for ${brand} ($${rate}) was added.`,
      type: "revenue"
    });
  };

  const updateSponsorStatus = (id, nextStatus) => {
    setSponsorships(prev => prev.map(s => s.id === id ? { ...s, status: nextStatus } : s));
    addNotification({
      title: "Sponsorship Status Updated",
      content: `Campaign status changed to ${nextStatus}.`,
      type: "revenue"
    });
  };

  // Admin specific operations
  const adminToggleBan = (email) => {
    setUsers(prev => prev.map(u => {
      if (u.email === email) {
        const isBanned = !u.isBanned;
        // Log to simulated logs
        console.log(`Admin action: ${isBanned ? 'Banned' : 'Unbanned'} ${email}`);
        return { ...u, isBanned };
      }
      return u;
    }));
    // If the banned user is logged in right now, log them out
    if (currentUser && currentUser.email === email) {
      logout();
    }
  };

  const adminGrantPremium = (email, planName) => {
    setUsers(prev => prev.map(u => {
      if (u.email === email) {
        return { ...u, plan: planName, status: planName === 'Starter' ? 'active' : 'active_premium' };
      }
      return u;
    }));
    // If updating current active user, reflect in context immediately
    if (currentUser && currentUser.email === email) {
      setCurrentUser(prev => ({ ...prev, plan: planName, status: planName === 'Starter' ? 'active' : 'active_premium' }));
    }
  };

  const adminAddAnnouncement = (title, message, type = 'info') => {
    const newAnn = {
      id: Date.now(),
      title,
      message,
      date: new Date().toISOString().split('T')[0],
      type
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const triggerAIRequest = () => {
    const newCount = aiUsageCount + 1;
    setAiUsageCount(newCount);
    localStorage.setItem('creatoros_ai_usage', newCount.toString());
  };

  return (
    <AppContext.Provider value={{
      users,
      currentUser,
      sponsorships,
      announcements,
      notifications,
      theme,
      aiUsageCount,
      setTheme,
      login,
      signup,
      logout,
      selectPlan,
      togglePlatform,
      markAllRead,
      clearNotifications,
      addGoal,
      updateGoalProgress,
      deleteGoal,
      addSponsorProject,
      updateSponsorStatus,
      adminToggleBan,
      adminGrantPremium,
      adminAddAnnouncement,
      triggerAIRequest
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
