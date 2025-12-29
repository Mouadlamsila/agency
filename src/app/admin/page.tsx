"use client"
import React, { useState, useEffect } from "react";
import { DataNode } from "@/components/ui/dashboard-with-collapsible-sidebar";
import {
    Layers,
    Users,
    Inbox,
    Zap,
    ArrowUpRight,
    Clock,
    Shield,
    Activity
} from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
    const [stats, setStats] = useState({
        totalTemplates: 0,
        activeTeam: 0,
        newLeads: 0,
        recentActivity: [] as any[]
    });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [tRes, mRes, lRes, aRes] = await Promise.all([
                fetch('/api/templates'),
                fetch('/api/team'),
                fetch('/api/leads'),
                fetch('/api/assignments')
            ]);

            const templates = await tRes.json();
            const members = await mRes.json();
            const leads = await lRes.json();
            const assignments = await aRes.json();

            // Create dynamic activity list
            const activity = [
                ...templates.slice(-2).map((t: any) => ({
                    id: `t-${t.id}`,
                    type: 'template',
                    action: 'System Evolution',
                    details: `New Blueprint: ${t.codeName}`,
                    time: 'Recent'
                })),
                ...leads.slice(-2).map((l: any) => ({
                    id: `l-${l.id}`,
                    type: 'lead',
                    action: 'Lead Incoming',
                    details: `Transmitted by ${l.clientName}`,
                    time: 'Recent'
                })),
                ...members.slice(-2).map((m: any) => ({
                    id: `m-${m.id}`,
                    type: 'team',
                    action: 'Node Activation',
                    details: `Operator ${m.name} Online`,
                    time: 'Recent'
                }))
            ].sort(() => Math.random() - 0.5).slice(0, 5);

            setStats({
                totalTemplates: templates.length,
                activeTeam: members.length,
                newLeads: leads.length,
                recentActivity: activity
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const statCards = [
        { label: "Total Templates", value: stats.totalTemplates, icon: Layers, color: "text-blue-500", trend: "Registry", href: "/admin/templates" },
        { label: "Active Team", value: stats.activeTeam, icon: Users, color: "text-purple-500", trend: "Operators", href: "/admin/team" },
        { label: "Incoming Leads", value: stats.newLeads, icon: Inbox, color: "text-emerald-500", trend: "Transmissions", href: "/admin/leads" },
    ];

    if (loading) return (
        <div className="h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Activity className="size-8 text-brand-blue animate-pulse" />
                <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em]">Synchronizing Master Node</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-display tracking-tight text-white uppercase">Command Center</h2>
                    <p className="text-neutral-500 text-sm mt-1 font-mono uppercase tracking-tighter">System Version 2.4.0-PRIME</p>
                </div>
                <div className="hidden md:flex items-center gap-3 p-1.5 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                    <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
                    <span className="text-[10px] font-mono text-neutral-400 uppercase pr-2">Neural Link Stable</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat, i) => (
                    <Link href={stat.href} key={i}>
                        <DataNode className="flex flex-col gap-4 group cursor-pointer hover:bg-neutral-900/80">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-lg bg-neutral-800/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                                    <stat.icon className="size-5" />
                                </div>
                                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest border border-neutral-800 px-2 py-0.5 rounded">{stat.trend}</span>
                            </div>
                            <div>
                                <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-wider">{stat.label}</p>
                                <h3 className="text-4xl font-bold font-display mt-1 tracking-tighter text-white">{stat.value}</h3>
                            </div>
                        </DataNode>
                    </Link>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <DataNode className="border-neutral-800/40">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Activity className="size-4 text-brand-blue" />
                            <h3 className="text-lg font-bold font-display uppercase tracking-tight">System Logs</h3>
                        </div>
                        <button className="text-[10px] font-mono text-neutral-500 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-widest bg-neutral-900 px-3 py-1 rounded-lg border border-neutral-800">
                            Live Stream <span className="flex size-1.5 rounded-full bg-brand-blue ml-1 animate-pulse" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {stats.recentActivity.map((activity: any) => (
                            <div key={activity.id} className="flex items-start gap-5 p-4 rounded-2xl bg-neutral-900/30 border border-neutral-800/20 hover:border-neutral-700/50 transition-all group">
                                <div className="mt-1 size-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:bg-brand-blue/10 group-hover:border-brand-blue/30 transition-colors">
                                    <Clock className="size-4 text-neutral-500 group-hover:text-brand-blue transition-colors" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[9px] font-mono text-brand-blue uppercase tracking-widest mb-1">{activity.action}</p>
                                    <p className="text-sm font-bold text-white tracking-tight">{activity.details}</p>
                                </div>
                                <span className="text-[9px] font-mono text-neutral-600 uppercase mt-1">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </DataNode>

                {/* System Status / Meta */}
                <div className="space-y-6">
                    <DataNode className="border-neutral-800/40">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Shield className="size-4 text-emerald-500" />
                                <h3 className="text-lg font-bold font-display uppercase tracking-tight text-white">Security Protocol</h3>
                            </div>
                            <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase tracking-widest">Active</span>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-mono uppercase text-neutral-500">
                                    <span>Firewall Integrity</span>
                                    <span className="text-emerald-400">99.2%</span>
                                </div>
                                <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[99.2%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-mono uppercase text-neutral-500">
                                    <span>Encryption Mesh</span>
                                    <span className="text-brand-blue">84.5%</span>
                                </div>
                                <div className="h-1 w-full bg-neutral-900 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-blue w-[84.5%] rounded-full shadow-[0_0_10px_rgba(46,92,255,0.3)]" />
                                </div>
                            </div>
                        </div>
                    </DataNode>

                    <DataNode className="border-neutral-800/40 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Zap className="size-24 text-brand-blue" />
                        </div>
                        <h3 className="text-lg font-bold font-display uppercase tracking-tight text-white mb-2">Neural Infrastructure</h3>
                        <p className="text-sm text-neutral-500 font-mono tracking-tighter leading-relaxed">
                            All cores operational. Data relay between Team and Templates is synchronized across 3 persistent JSON clusters.
                        </p>
                        <button className="mt-6 flex items-center gap-2 text-brand-blue text-[10px] font-bold uppercase tracking-widest hover:gap-3 transition-all">
                            Initialize Maintenance <ArrowUpRight className="size-3" />
                        </button>
                    </DataNode>
                </div>
            </div>
        </div>
    );
}
