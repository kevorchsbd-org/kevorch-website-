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
  RefreshCw
} from 'lucide-react';
import { auth } from '../services/firebase';
import { subscribeToLeads, updateLeadStatus, deleteLead } from '../services/leads';
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

  // 1. Subscribe to real-time Firestore leads
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToLeads(
      (fetchedLeads) => {
        setLeads(fetchedLeads);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Failed to subscribe to leads:', err);
        setError('Failed to load leads from Firestore. Ensure you are authorized.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

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
        return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'Contacted':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'In Progress':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Converted':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Closed':
        return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30';
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
    <div className={`min-h-screen transition-colors duration-400 font-sans ${
      isDark ? 'bg-black text-white' : 'bg-stone-50 text-neutral-900'
    }`}>
      <SEO
        title="Admin Dashboard | Kevorch"
        description="Kevorch Admin Lead Management Dashboard"
        canonical="/admin"
      />

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
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-red-600/10 text-red-500 border border-red-500/20">
              ADMIN DASHBOARD
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-400 border-r pr-4 border-neutral-800">
              <span>{auth?.currentUser?.email || 'Admin'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
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
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>TOTAL LEADS</span>
              <Users className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-3xl font-heading font-extrabold mt-2">{stats.total}</p>
          </div>

          <div className={`p-5 rounded-2xl border transition-colors ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>NEW LEADS</span>
              <Sparkles className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-3xl font-heading font-extrabold mt-2 text-red-500">{stats.newLeads}</p>
          </div>

          <div className={`p-5 rounded-2xl border transition-colors ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>CONTACTED</span>
              <MessageSquare className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-3xl font-heading font-extrabold mt-2 text-blue-500">{stats.contacted}</p>
          </div>

          <div className={`p-5 rounded-2xl border transition-colors ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-stone-200 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-neutral-400 text-xs font-mono">
              <span>CONVERTED</span>
              <Briefcase className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-heading font-extrabold mt-2 text-emerald-500">{stats.converted}</p>
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
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border outline-none transition-colors ${
                isDark
                  ? 'bg-neutral-900 border-neutral-800 focus:border-red-500 text-white placeholder-neutral-500'
                  : 'bg-stone-100 border-stone-300 focus:border-red-600 text-stone-900 placeholder-stone-400'
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Filter */}
            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`py-2 px-3 rounded-xl border outline-none text-xs ${
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
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'name' | 'status')}
                className={`py-2 px-3 rounded-xl border outline-none text-xs ${
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
          <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-500 text-xs flex items-center gap-3">
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
            <h3 className="text-lg font-heading font-bold">No leads found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
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
                    <th className="py-3.5 px-4 font-semibold">Name & Contact</th>
                    <th className="py-3.5 px-4 font-semibold">Company / Web</th>
                    <th className="py-3.5 px-4 font-semibold">Services & Budget</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y text-xs ${
                  isDark ? 'divide-neutral-800/60' : 'divide-stone-200'
                }`}>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className={`transition-colors ${
                      isDark ? 'hover:bg-neutral-900/40' : 'hover:bg-stone-50'
                    }`}>
                      {/* Name & Contact */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-sm">{lead.fullName}</div>
                        <div className="text-neutral-400 text-[11px] mt-0.5">{lead.email}</div>
                        <div className="text-neutral-400 text-[11px]">{lead.mobile}</div>
                      </td>

                      {/* Company & Website */}
                      <td className="py-4 px-4">
                        <div className="font-medium">{lead.companyName || '—'}</div>
                        {lead.website && (
                          <a
                            href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:underline text-[11px] inline-flex items-center gap-1 mt-0.5"
                          >
                            <Globe className="w-3 h-3" /> Website
                          </a>
                        )}
                      </td>

                      {/* Services & Budget */}
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {lead.services.map((svc) => (
                            <span key={svc} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                              {svc}
                            </span>
                          ))}
                        </div>
                        <div className="text-neutral-400 text-[11px] mt-1 font-mono">{lead.budget}</div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => lead.id && handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          disabled={updatingId === lead.id}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-mono border outline-none font-semibold cursor-pointer ${getStatusBadge(lead.status)}`}
                        >
                          <option value="New" className="bg-neutral-900 text-white">New</option>
                          <option value="Contacted" className="bg-neutral-900 text-white">Contacted</option>
                          <option value="In Progress" className="bg-neutral-900 text-white">In Progress</option>
                          <option value="Converted" className="bg-neutral-900 text-white">Converted</option>
                          <option value="Closed" className="bg-neutral-900 text-white">Closed</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-[11px] font-mono text-neutral-400 whitespace-nowrap">
                        {lead.createdAt instanceof Date
                          ? lead.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'Recent'}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedLead(lead)}
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

      {/* MODAL 1: LEAD DETAILS VIEW */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border p-6 sm:p-8 shadow-2xl relative ${
                isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-white border-stone-200 text-stone-900'
              }`}
            >
              <button
                onClick={() => setSelectedLead(null)}
                className="absolute top-5 right-5 p-2 rounded-full border transition-colors bg-neutral-900 border-neutral-800 hover:bg-neutral-800 cursor-pointer"
              >
                <X className="w-4 h-4 text-neutral-400" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold border ${getStatusBadge(selectedLead.status)}`}>
                    {selectedLead.status}
                  </span>
                  <h2 className="text-2xl font-heading font-extrabold mt-3">{selectedLead.fullName}</h2>
                  <p className="text-xs text-neutral-400 font-mono">
                    Submitted: {selectedLead.createdAt instanceof Date ? selectedLead.createdAt.toLocaleString() : 'N/A'}
                  </p>
                </div>

                {/* QUICK ACTION BUTTONS */}
                <div className="flex flex-wrap items-center gap-3 pt-2 pb-4 border-b border-neutral-800">
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" /> Email Client
                  </a>
                  <a
                    href={`tel:${selectedLead.mobile}`}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Mobile
                  </a>
                  <a
                    href={`https://wa.me/${selectedLead.mobile.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  {selectedLead.website && (
                    <a
                      href={selectedLead.website.startsWith('http') ? selectedLead.website : `https://${selectedLead.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-neutral-800 text-white hover:bg-neutral-700 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" /> Visit Website
                    </a>
                  )}
                </div>

                {/* DETAILS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl border bg-neutral-900/40 border-neutral-800 space-y-1">
                    <div className="text-neutral-400 font-mono">COMPANY</div>
                    <div className="font-semibold text-sm">{selectedLead.companyName || 'Not specified'}</div>
                  </div>

                  <div className="p-3.5 rounded-xl border bg-neutral-900/40 border-neutral-800 space-y-1">
                    <div className="text-neutral-400 font-mono">BUDGET RANGE</div>
                    <div className="font-semibold text-sm font-mono text-red-400">{selectedLead.budget || 'Not specified'}</div>
                  </div>
                </div>

                {/* SERVICES */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-neutral-400">SELECTED SERVICES</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedLead.services.map((svc) => (
                      <span key={svc} className="px-3 py-1 rounded-lg text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                        {svc}
                      </span>
                    ))}
                    {selectedLead.customService && (
                      <span className="px-3 py-1 rounded-lg text-xs font-mono bg-neutral-800 text-neutral-300">
                        Other: {selectedLead.customService}
                      </span>
                    )}
                  </div>
                </div>

                {/* GOALS & PROJECT DETAILS */}
                <div className="space-y-2">
                  <div className="text-xs font-mono text-neutral-400">PROJECT GOALS & DETAILS</div>
                  <div className="p-4 rounded-xl border bg-neutral-900/60 border-neutral-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedLead.goals || 'No specific goals described.'}
                  </div>
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
