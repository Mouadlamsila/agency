"use client"
import React, { useState, useEffect } from "react";
import { DataNode } from "@/components/ui/dashboard-with-collapsible-sidebar";
import {
    Inbox,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Plus,
    Layers,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    Trash2,
    Check
} from "lucide-react";

export default function LeadsPage() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchLeads = async () => {
        const res = await fetch('/api/leads');
        setLeads(await res.json());
        setLoading(false);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        const res = await fetch('/api/leads', {
            method: 'PUT',
            body: JSON.stringify({ id, status: newStatus })
        });
        if (res.ok) fetchLeads();
    };

    const deleteLead = async (id: string) => {
        if (!confirm("Are you sure you want to purge this transmission log?")) return;
        const res = await fetch(`/api/leads?id=${id}`, {
            method: 'DELETE'
        });
        if (res.ok) fetchLeads();
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'new': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'contacted': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
            case 'qualified': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            default: return 'text-neutral-400 bg-neutral-400/10 border-neutral-400/20';
        }
    };

    const filteredLeads = leads.filter((l: any) =>
        l.clientName.toLowerCase().includes(search.toLowerCase()) ||
        l.projectType.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div className="p-8 text-neutral-500 font-mono">DECRYPTING TRANSMISSIONS...</div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-display uppercase tracking-tight">Transmission Logs</h2>
                    <p className="text-neutral-500 text-sm mt-1">Incoming project inquiries and onboarding telemetry</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-lg">
                        Capacity: Optimal
                    </span>
                </div>
            </div>

            <div className="bg-neutral-900/10 border border-neutral-800/60 rounded-3xl overflow-hidden backdrop-blur-sm">
                <div className="p-5 border-b border-neutral-800/40 flex flex-col md:flex-row gap-4 items-center justify-between bg-neutral-900/20">
                    <div className="relative flex-1 w-full group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-neutral-600 group-focus-within:text-brand-blue transition-colors" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Filter transmissions by client or engine..."
                            className="w-full h-11 bg-neutral-900/50 border border-neutral-800 rounded-xl pl-11 pr-4 text-xs font-mono focus:outline-none focus:border-brand-blue transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-all hover:border-neutral-700">
                            Export Manifest
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-neutral-900/40">
                                <th className="px-6 py-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-800">Origin / Node</th>
                                <th className="px-6 py-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-800">Target Engine</th>
                                <th className="px-6 py-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-800">Current Status</th>
                                <th className="px-6 py-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-800">Timestamp</th>
                                <th className="px-6 py-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest border-b border-neutral-800"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/30">
                            {filteredLeads.map((lead: any) => (
                                <tr key={lead.id} className="group hover:bg-brand-blue/5 transition-colors duration-300">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-transform group-hover:scale-110">
                                                <Inbox className="size-4 text-neutral-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover:text-brand-blue transition-colors font-display tracking-tight">{lead.clientName}</p>
                                                <p className="text-[9px] text-neutral-500 font-mono mt-0.5 uppercase tracking-tighter">SIG-ID: {lead.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2.5 bg-neutral-900/50 px-3 py-1.5 rounded-lg border border-neutral-800/50 w-fit">
                                            <Layers className="size-3 text-brand-blue" />
                                            <span className="text-[10px] text-neutral-300 font-mono uppercase pr-1">{lead.projectType}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex gap-2">
                                            {['New', 'Contacted', 'Qualified'].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => updateStatus(lead.id, s)}
                                                    className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border transition-all ${lead.status === s
                                                            ? getStatusColor(s) + " border-current"
                                                            : 'text-neutral-600 border-neutral-800 hover:border-neutral-700'
                                                        }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-neutral-500 font-mono text-[10px]">
                                            <Clock className="size-3" />
                                            {new Date(lead.date).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-neutral-500 hover:text-white transition-colors bg-neutral-900 border border-neutral-800 rounded-lg">
                                                <Mail className="size-3.5" />
                                            </button>
                                            <button
                                                onClick={() => deleteLead(lead.id)}
                                                className="p-2 text-red-500 hover:text-red-400 transition-colors bg-red-500/10 border border-red-500/20 rounded-lg"
                                            >
                                                <Trash2 className="size-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredLeads.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-20 text-center">
                                        <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">No matching transmissions found in the registry</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
