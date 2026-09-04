import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Sparkles,
  Search,
  Filter,
  ArrowUpDown,
  LogOut,
  Eye,
  Trash2,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  X,
  AlertTriangle,
  Briefcase,
  RefreshCw,
  Bell
} from 'lucide-react';
import { auth } from '../services/firebase';
import {
  subscribeToLeads,
  updateLeadStatus,
  deleteLead,
  markLeadAsRead,
  markAllLeadsAsRead
} from '../services/leads';
import type { Lead, LeadStatus } from '../types/lead';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from '../components/ThemeToggle';
import { SEO } from '../components/SEO';
import whiteLogo from '../assets/whitelogo.png';
import blackLogo from '../assets/blacklogo.png';

export const Admin: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Notifications State
  const [toastLead, setToastLead] = useState<Lead | null>(null);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name' | 'status'>('newest');

  // Modals
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Web Audio chime for real-time notification
  const playChimeSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      // Audio playback quiet fallback
    }
  };

  // Browser Push Notification helper
  const triggerBrowserNotification = (lead: Lead) => {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('New Kevorch Lead', {
          body: `${lead.fullName} submitted a new project inquiry.`,
        });
      } else if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  };

  // 1. Subscribe to real-time Firestore leads
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToLeads(
      (fetchedLeads) => {
        setLeads(fetchedLeads);
        setLoading(false);
        setError(null);
      },
      (newLead) => {
        // Real-time new lead event
        setToastLead(newLead);
        playChimeSound();
        triggerBrowserNotification(newLead);
      },
      (err) => {
        console.error('Failed to subscribe to leads:', err);
        setError('Failed to load leads from Firestore. Ensure you are authorized.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Auto-dismiss toast notification after 8 seconds
  useEffect(() => {
    if (!toastLead) return;
    const timer = setTimeout(() => {
      setToastLead(null);
    }, 8000);
    return () => clearTimeout(timer);
  }, [toastLead]);

  // Unread Leads Computation
  const unreadLeads = useMemo(() => {
    return leads.filter((l) => !l.isRead);
  }, [leads]);

  const unreadCount = unreadLeads.length;

  const handleSelectLeadAndMarkRead = (lead: Lead) => {
    setSelectedLead(lead);
    if (lead.id && !lead.isRead) {
      markLeadAsRead(lead.id);
    }
  };

  const handleMarkAllRead = async () => {
    await markAllLeadsAsRead(leads);
  };

  // 2. Handle Logout
  const handleLogout = async () => {
    try {
      if (auth) await signOut(auth);
      navigate('/admin/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // 3. Status Badge Helper
  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return isDark
          ? 'bg-[#DE0918]/15 text-[#F87171] border-[#DE0918]/30'
          : 'bg-[#FDE7EA] text-[#DE0918] border-[#F7B8BE]';
      case 'Contacted':
        return isDark
          ? 'bg-[#2563EB]/15 text-[#60A5FA] border-[#2563EB]/30'
          : 'bg-[#EAF2FF] text-[#2563EB] border-[#BFDBFE]';
      case 'In Progress':
        return isDark
          ? 'bg-[#D97706]/15 text-[#FBBF24] border-[#D97706]/30'
          : 'bg-[#FFF7E6] text-[#D97706] border-[#FDE68A]';
      case 'Converted':
        return isDark
          ? 'bg-[#16A34A]/15 text-[#4ADE80] border-[#16A34A]/30'
          : 'bg-[#EAF8EF] text-[#16A34A] border-[#BBF7D0]';
      case 'Closed':
        return isDark
          ? 'bg-[#525252]/20 text-[#A3A3A3] border-[#525252]/40'
          : 'bg-[#F5F5F5] text-[#525252] border-[#D4D4D4]';
      default:
        return 'bg-stone-500/10 text-stone-400 border-stone-500/30';
    }
  };

  // 4. Update Lead Status
  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      setUpdatingId(leadId);
      await updateLeadStatus(leadId, newStatus);
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      alert('Failed to update lead status: ' + message);
    } finally {
      setUpdatingId(null);
    }
  };

  // 5. Confirm Delete Lead
  const confirmDelete = async () => {
    if (!leadToDelete || !leadToDelete.id) return;
    setIsDeleting(true);
    try {
      await deleteLead(leadToDelete.id);
      if (selectedLead && selectedLead.id === leadToDelete.id) {
        setSelectedLead(null);
      }
      setLeadToDelete(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      alert('Failed to delete lead: ' + message);
    } finally {
      setIsDeleting(false);
    }
  };

  // 6. Filtered & Sorted Leads Computation
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        // Status Filter
        if (statusFilter !== 'All' && lead.status !== statusFilter) return false;
        
        // Search Query
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          lead.fullName.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.mobile.toLowerCase().includes(q) ||
          (lead.companyName && lead.companyName.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        if (sortBy === 'newest') {
          return timeB - timeA;
        } else if (sortBy === 'oldest') {
          return timeA - timeB;
        } else if (sortBy === 'name') {
          return a.fullName.localeCompare(b.fullName);
        } else if (sortBy === 'status') {
          return a.status.localeCompare(b.status);
        }
        return 0;
      });
  }, [leads, statusFilter, searchQuery, sortBy]);

  // 7. Stat Cards Metrics
  const stats = useMemo(() => {
    return {
      total: leads.length,
      newLeads: leads.filter((l) => l.status === 'New').length,
      contacted: leads.filter((l) => l.status === 'Contacted').length,
      converted: leads.filter((l) => l.status === 'Converted').length,
    };
  }, [leads]);

  return (
    <div className={`min-h-screen transition-colors duration-400 font-['Inter',sans-serif] ${
      isDark ? 'bg-black text-white' : 'bg-stone-50 text-neutral-900'
    }`}>
      <SEO
        title="Admin Dashboard | Kevorch"
        description="Kevorch Admin Lead Management Dashboard"
        canonical="/admin"
      />

      {/* FLOATING REAL-TIME TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastLead && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            className={`fixed top-5 right-5 z-50 max-w-sm w-full p-4 rounded-2xl border shadow-2xl flex items-start gap-3.5 transition-colors ${
              isDark
                ? 'bg-[#141414] border-[#DE0918]/50 text-[#F5F5F5] shadow-red-950/30'
                : 'bg-white border-[#DE0918]/40 text-[#171717] shadow-stone-300/60'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-[#DE0918]/10 text-[#DE0918] shrink-0">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#DE0918] uppercase tracking-wider">NEW LEAD RECEIVED</span>
                <button
                  onClick={() => setToastLead(null)}
                  className={`p-1 rounded-lg transition-colors cursor-pointer ${
                    isDark ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-neutral-500 hover:text-black hover:bg-stone-200'
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm font-semibold">{toastLead.fullName}</p>
              <p className="text-xs text-neutral-400 truncate">
                {toastLead.services.join(', ') || 'New project inquiry submitted'}
              </p>
              <button
                onClick={() => {
                  handleSelectLeadAndMarkRead(toastLead);
                  setToastLead(null);
                }}
                className="mt-1.5 text-xs font-semibold text-[#DE0918] hover:underline flex items-center gap-1 cursor-pointer"
              >
                View Lead Details →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BAR */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark ? 'bg-black/80 border-neutral-800' : 'bg-white/90 border-stone-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={isDark ? whiteLogo : blackLogo}
              alt="Kevorch Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-red-600/10 text-red-500 border border-red-500/20 uppercase tracking-wide">
              ADMIN DASHBOARD
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* NOTIFICATION BELL & DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
                className={`relative p-2 rounded-xl border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-neutral-300'
                    : 'bg-stone-100 border-stone-300 hover:bg-stone-200 text-stone-700'
                }`}
                title="Notifications"
                aria-label="New lead notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DE0918] text-[9px] font-mono font-bold text-white shadow-sm animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* NOTIFICATION DROPDOWN MENU */}
              <AnimatePresence>
                {notificationMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl z-50 overflow-hidden transition-colors ${
                      isDark ? 'bg-[#141414] border-[#262626] text-[#F5F5F5]' : 'bg-white border-[#E7E5E4] text-[#171717]'
                    }`}
                  >
                    <div className={`p-4 border-b flex items-center justify-between ${
                      isDark ? 'border-[#262626]' : 'border-[#E7E5E4]'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-[#DE0918]" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider">NEW LEADS</span>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#DE0918]/10 text-[#DE0918] border border-[#DE0918]/20 font-bold">
                            {unreadCount} unread
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs font-medium text-[#DE0918] hover:underline cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className={`max-h-72 overflow-y-auto divide-y ${
                      isDark ? 'divide-[#262626]' : 'divide-[#E7E5E4]'
                    }`}>
                      {unreadLeads.length === 0 ? (
                        <div className="p-6 text-center text-xs text-neutral-400 font-medium">
                          No unread lead notifications.
                        </div>
                      ) : (
                        unreadLeads.map((lead) => (
                          <div
                            key={lead.id}
                            onClick={() => {
                              handleSelectLeadAndMarkRead(lead);
                              setNotificationMenuOpen(false);
                            }}
                            className={`p-3.5 flex items-start justify-between gap-3 cursor-pointer transition-colors ${
                              isDark ? 'hover:bg-[#1A1A1A]' : 'hover:bg-[#F7F7F5]'
                            }`}
                          >
                            <div className="space-y-1 min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#DE0918] shrink-0" />
                                <span className="text-xs font-semibold truncate">{lead.fullName}</span>
                              </div>
                              <div className="text-xs text-neutral-400 font-medium truncate">
                                {lead.services[0] || 'Project Consultation'}
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                              {lead.createdAt instanceof Date ? lead.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-neutral-400 border-r pr-4 border-neutral-800">
              <span>{auth?.currentUser?.email || 'Admin'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border transition-colors ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono font-bold tracking-wider">
              <span>TOTAL LEADS</span>
              <Users className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-3xl font-bold tracking-tight mt-2">{stats.total}</p>
          </div>

          <div className={`p-5 rounded-2xl border transition-colors ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono font-bold tracking-wider">
              <span>NEW LEADS</span>
              <Sparkles className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-3xl font-bold tracking-tight mt-2 text-red-500">{stats.newLeads}</p>
          </div>

          <div className={`p-5 rounded-2xl border transition-colors ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono font-bold tracking-wider">
              <span>CONTACTED</span>
              <MessageSquare className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-3xl font-bold tracking-tight mt-2 text-blue-500">{stats.contacted}</p>
          </div>

          <div className={`p-5 rounded-2xl border transition-colors ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono font-bold tracking-wider">
              <span>CONVERTED</span>
              <Briefcase className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold tracking-tight mt-2 text-emerald-500">{stats.converted}</p>
          </div>
        </div>

        {/* CONTROLS BAR: SEARCH, FILTER, SORT */}
        <div className={`p-4 rounded-2xl border flex flex-col md:flex-row gap-4 items-center justify-between ${
          isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
        }`}>
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, company..."
              className={`w-full pl-10 pr-4 py-2 text-xs font-medium rounded-xl border outline-none transition-colors ${
                isDark
                  ? 'bg-neutral-900 border-neutral-800 focus:border-red-500 text-white placeholder-neutral-500'
                  : 'bg-stone-100 border-stone-300 focus:border-red-600 text-stone-900 placeholder-stone-400'
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Filter */}
            <div className="flex items-center gap-2 text-xs font-medium">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`py-2 px-3 rounded-xl border outline-none text-xs font-semibold ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-800 text-white'
                    : 'bg-stone-100 border-stone-300 text-stone-900'
                }`}
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Converted">Converted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 text-xs font-medium">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'name' | 'status')}
                className={`py-2 px-3 rounded-xl border outline-none text-xs font-semibold ${
                  isDark
                    ? 'bg-neutral-900 border-neutral-800 text-white'
                    : 'bg-stone-100 border-stone-300 text-stone-900'
                }`}
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="name">Sort: Name</option>
                <option value="status">Sort: Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* ERROR STATE */}
        {error && (
          <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-500 text-xs font-medium flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* LOADING STATE */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-neutral-400">
            <RefreshCw className="w-8 h-8 animate-spin text-red-500" />
            <p className="text-xs font-mono">Loading Real-Time Leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          /* EMPTY STATE */
          <div className={`p-12 rounded-2xl border text-center space-y-3 ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-stone-200'
          }`}>
            <Users className="w-10 h-10 mx-auto text-neutral-500" />
            <h3 className="text-lg font-bold">No leads found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto font-medium">
              {searchQuery || statusFilter !== 'All'
                ? 'Try adjusting your search query or status filter.'
                : 'No consultation submissions received yet.'}
            </p>
          </div>
        ) : (
          /* LEADS TABLE / LIST */
          <div className={`rounded-2xl border overflow-hidden ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b text-[11px] font-mono uppercase tracking-wider ${
                    isDark ? 'border-neutral-800 bg-neutral-900/50 text-neutral-400' : 'border-stone-200 bg-stone-100 text-stone-600'
                  }`}>
                    <th className="py-3.5 px-4 font-bold">Name & Contact</th>
                    <th className="py-3.5 px-4 font-bold">Company / Web</th>
                    <th className="py-3.5 px-4 font-bold">Services & Budget</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold">Date</th>
                    <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y text-xs ${
                  isDark ? 'divide-neutral-800/60' : 'divide-stone-200'
                }`}>
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`transition-colors ${
                        !lead.isRead
                          ? isDark
                            ? 'bg-[#DE0918]/10 hover:bg-[#DE0918]/15'
                            : 'bg-[#FDE7EA]/50 hover:bg-[#FDE7EA]/80'
                          : isDark
                          ? 'hover:bg-neutral-900/40'
                          : 'hover:bg-stone-50'
                      }`}
                    >
                      {/* Name & Contact */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {!lead.isRead && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold bg-[#DE0918] text-white tracking-wider animate-pulse">
                              NEW
                            </span>
                          )}
                          <div className="font-bold text-sm text-[#171717] dark:text-[#F5F5F5]">{lead.fullName}</div>
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-400 text-xs font-normal mt-1">{lead.email}</div>
                        <div className="text-neutral-500 dark:text-neutral-400 text-xs font-normal">{lead.mobile}</div>
                      </td>

                      {/* Company & Website */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-xs">{lead.companyName || '—'}</div>
                        {lead.website && (
                          <a
                            href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#DE0918] hover:underline text-xs inline-flex items-center gap-1 mt-1 font-medium"
                          >
                            <Globe className="w-3.5 h-3.5" /> Website
                          </a>
                        )}
                      </td>

                      {/* Services & Budget */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                          {lead.services.map((svc) => (
                            <span key={svc} className="px-2 py-0.5 rounded-md text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20">
                              {svc}
                            </span>
                          ))}
                        </div>
                        <div className="text-neutral-400 text-xs font-semibold mt-1">{lead.budget}</div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => lead.id && handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          disabled={updatingId === lead.id}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold border outline-none cursor-pointer ${getStatusBadge(lead.status)}`}
                        >
                          <option value="New" className="bg-neutral-900 text-white">New</option>
                          <option value="Contacted" className="bg-neutral-900 text-white">Contacted</option>
                          <option value="In Progress" className="bg-neutral-900 text-white">In Progress</option>
                          <option value="Converted" className="bg-neutral-900 text-white">Converted</option>
                          <option value="Closed" className="bg-neutral-900 text-white">Closed</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-xs font-mono text-neutral-400 whitespace-nowrap">
                        {lead.createdAt instanceof Date
                          ? lead.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'Recent'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSelectLeadAndMarkRead(lead)}
                            title="View Full Details"
                            className="p-1.5 rounded-lg border transition-colors bg-neutral-800/40 border-neutral-700/50 hover:bg-neutral-800 text-neutral-300 hover:text-white cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setLeadToDelete(lead)}
                            title="Delete Lead"
                            className="p-1.5 rounded-lg border transition-colors bg-red-500/10 border-red-500/20 hover:bg-red-500/20 text-red-500 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* MODAL 1: LEAD PROFILE SHEET (CRM STYLE) */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-4xl max-h-[85vh] rounded-2xl border shadow-2xl overflow-hidden flex flex-col transition-colors duration-300 ${
                isDark ? 'bg-[#141414] border-[#262626] text-[#F5F5F5]' : 'bg-white border-[#E7E5E4] text-[#171717]'
              }`}
            >
              {/* INTERNAL SCROLLABLE BODY */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                
                {/* 1. HEADER */}
                <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b ${
                  isDark ? 'border-[#262626]' : 'border-[#E7E5E4]'
                }`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`text-[11px] font-mono tracking-widest font-bold uppercase ${
                        isDark ? 'text-[#737373]' : 'text-[#A3A3A3]'
                      }`}>
                        LEAD PROFILE
                      </span>
                      <select
                        value={selectedLead.status}
                        onChange={(e) => selectedLead.id && handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                        disabled={updatingId === selectedLead.id}
                        className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border outline-none cursor-pointer transition-colors ${getStatusBadge(selectedLead.status)}`}
                      >
                        <option value="New" className={isDark ? "bg-[#141414] text-[#F5F5F5]" : "bg-white text-[#171717]"}>New</option>
                        <option value="Contacted" className={isDark ? "bg-[#141414] text-[#F5F5F5]" : "bg-white text-[#171717]"}>Contacted</option>
                        <option value="In Progress" className={isDark ? "bg-[#141414] text-[#F5F5F5]" : "bg-white text-[#171717]"}>In Progress</option>
                        <option value="Converted" className={isDark ? "bg-[#141414] text-[#F5F5F5]" : "bg-white text-[#171717]"}>Converted</option>
                        <option value="Closed" className={isDark ? "bg-[#141414] text-[#F5F5F5]" : "bg-white text-[#171717]"}>Closed</option>
                      </select>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {selectedLead.fullName}
                    </h2>

                    <p className={`text-xs font-medium flex flex-wrap items-center gap-2 ${
                      isDark ? 'text-[#A3A3A3]' : 'text-[#6B6B6B]'
                    }`}>
                      <span>{selectedLead.email}</span>
                      <span className={isDark ? 'text-[#525252]' : 'text-[#D4D4D4]'}>•</span>
                      <span>{selectedLead.mobile}</span>
                    </p>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="text-left sm:text-right">
                      <div className={`text-[10px] font-mono uppercase tracking-wider ${
                        isDark ? 'text-[#737373]' : 'text-[#A3A3A3]'
                      }`}>SUBMITTED</div>
                      <div className={`text-xs font-mono mt-0.5 ${
                        isDark ? 'text-[#F5F5F5]' : 'text-[#171717]'
                      }`}>
                        {selectedLead.createdAt instanceof Date
                          ? selectedLead.createdAt.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                          : 'N/A'}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedLead(null)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-[#1A1A1A] border-[#262626] text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#262626]'
                          : 'bg-[#F7F7F5] border-[#E7E5E4] text-[#6B6B6B] hover:text-[#171717] hover:bg-[#E7E5E4]'
                      }`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 2. SNAPSHOT ROW */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b ${
                  isDark ? 'border-[#262626]' : 'border-[#E7E5E4]'
                }`}>
                  {/* CONTACT */}
                  <div className="space-y-2">
                    <div className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                      isDark ? 'text-[#A3A3A3]' : 'text-[#6B6B6B]'
                    }`}>
                      CONTACT
                    </div>
                    <div className="space-y-1.5 text-xs font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#737373]' : 'text-[#A3A3A3]'}`} />
                        <a href={`mailto:${selectedLead.email}`} className="hover:underline hover:text-[#DE0918] transition-colors truncate">
                          {selectedLead.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-[#737373]' : 'text-[#A3A3A3]'}`} />
                        <a href={`tel:${selectedLead.mobile}`} className="hover:underline hover:text-[#DE0918] transition-colors">
                          {selectedLead.mobile}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* COMPANY */}
                  <div className="space-y-2">
                    <div className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                      isDark ? 'text-[#A3A3A3]' : 'text-[#6B6B6B]'
                    }`}>
                      COMPANY
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="font-semibold text-sm">
                        {selectedLead.companyName || 'Not Specified'}
                      </div>
                      {selectedLead.website ? (
                        <a
                          href={selectedLead.website.startsWith('http') ? selectedLead.website : `https://${selectedLead.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#DE0918] hover:underline inline-flex items-center gap-1 text-xs truncate max-w-full font-medium"
                        >
                          <Globe className="w-3.5 h-3.5 shrink-0" /> {selectedLead.website}
                        </a>
                      ) : (
                        <div className={`text-xs font-medium ${isDark ? 'text-[#737373]' : 'text-[#A3A3A3]'}`}>
                          No website provided
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BUDGET */}
                  <div className="space-y-2">
                    <div className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                      isDark ? 'text-[#A3A3A3]' : 'text-[#6B6B6B]'
                    }`}>
                      BUDGET
                    </div>
                    <div className="text-sm font-semibold text-[#DE0918]">
                      {selectedLead.budget || 'Not Specified'}
                    </div>
                  </div>
                </div>

                {/* 3. REQUESTED SERVICES */}
                <div className={`space-y-3 pb-6 border-b ${
                  isDark ? 'border-[#262626]' : 'border-[#E7E5E4]'
                }`}>
                  <div className={`text-[11px] font-mono font-semibold tracking-wider uppercase ${
                    isDark ? 'text-[#A3A3A3]' : 'text-[#6B6B6B]'
                  }`}>
                    REQUESTED SERVICES ({selectedLead.services.length + (selectedLead.customService ? 1 : 0)})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedLead.services.map((service, index) => {
                      const formattedIndex = String(index + 1).padStart(2, '0');
                      return (
                        <div
                          key={service}
                          className={`flex items-center gap-3 p-3 rounded-xl border text-xs transition-colors ${
                            isDark
                              ? 'bg-[#1A1A1A] border-[#262626] text-[#F5F5F5]'
                              : 'bg-[#F7F7F5] border-[#E7E5E4] text-[#171717]'
                          }`}
                        >
                          <span className="font-mono text-[#DE0918] font-extrabold">{formattedIndex}</span>
                          <span className="font-medium">{service}</span>
                        </div>
                      );
                    })}
                    {selectedLead.customService && (
                      <div
                        className={`flex items-center gap-3 p-3 rounded-xl border text-xs transition-colors ${
                          isDark
                            ? 'bg-[#1A1A1A] border-[#262626] text-[#F5F5F5]'
                            : 'bg-[#F7F7F5] border-[#E7E5E4] text-[#171717]'
                        }`}
                      >
                        <span className="font-mono text-[#DE0918] font-extrabold">
                          {String(selectedLead.services.length + 1).padStart(2, '0')}
                        </span>
                        <span className="font-medium">Other: {selectedLead.customService}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. PROJECT GOAL */}
                <div className="space-y-3">
                  <div className={`text-[11px] font-mono font-semibold tracking-wider uppercase ${
                    isDark ? 'text-[#A3A3A3]' : 'text-[#6B6B6B]'
                  }`}>
                    PROJECT GOAL
                  </div>
                  <div className={`p-5 rounded-2xl border text-sm leading-relaxed whitespace-pre-wrap font-sans transition-colors ${
                    isDark
                      ? 'bg-[#1A1A1A] border-[#262626] text-[#F5F5F5]'
                      : 'bg-[#F7F7F5] border-[#E7E5E4] text-[#171717]'
                  }`}>
                    {selectedLead.goals || 'No detailed project requirements or goals provided.'}
                  </div>
                </div>

              </div>

              {/* 5. BOTTOM ACTION BAR */}
              <div className={`p-4 sm:px-8 border-t flex flex-wrap items-center justify-between gap-3 transition-colors ${
                isDark ? 'bg-[#111111] border-[#262626]' : 'bg-[#F7F7F5] border-[#E7E5E4]'
              }`}>
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#DE0918] hover:bg-[#C00714] text-white transition-colors cursor-pointer shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" /> Email Client
                  </a>
                  <a
                    href={`https://wa.me/${selectedLead.mobile.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#16A34A] hover:bg-[#15803D] text-white transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <a
                    href={`tel:${selectedLead.mobile}`}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-white transition-colors cursor-pointer ${
                      isDark ? 'bg-[#262626] hover:bg-[#333333]' : 'bg-[#171717] hover:bg-black'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Mobile
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLeadToDelete(selectedLead)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#DE0918]/10 border border-[#DE0918]/30 text-[#DE0918] dark:text-[#F87171] hover:bg-[#DE0918]/20 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Lead
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: DELETE CONFIRMATION */}
      <AnimatePresence>
        {leadToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl relative space-y-5 ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-stone-200 text-stone-900'
              }`}
            >
              <div className="flex items-center gap-3 text-red-500">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-heading font-extrabold">Confirm Lead Deletion</h3>
              </div>

              <p className="text-xs leading-relaxed text-neutral-400">
                Are you sure you want to permanently delete lead <strong className="text-white">{leadToDelete.fullName}</strong>? This action cannot be undone.
              </p>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  onClick={() => setLeadToDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl border text-xs font-medium bg-neutral-900 border-neutral-800 hover:bg-neutral-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Permanently'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Admin;
