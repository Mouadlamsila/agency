"use client"
import React, { useState } from "react";
import { DataNode } from "@/components/ui/dashboard-with-collapsible-sidebar";
import {
    Settings as SettingsIcon,
    Shield,
    Database,
    Bell,
    Globe,
    Zap,
    Save,
    RotateCcw
} from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 animate-fade-in max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold font-display tracking-tight text-white uppercase">System Matrix Configuration</h2>
                <p className="text-neutral-500 text-sm mt-1 font-mono uppercase tracking-tighter">Modify core parameters and synchronization protocols</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* General Settings */}
                <DataNode className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Globe className="size-5 text-brand-blue" />
                        <h3 className="text-lg font-bold font-display uppercase tracking-tight">Node Environment</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Master Node Name</label>
                            <input
                                type="text"
                                defaultValue="Codsilla Central Mainframe"
                                className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs font-mono text-white focus:border-brand-blue outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Timezone Synchronization</label>
                            <select className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs font-mono text-white focus:border-brand-blue outline-none appearance-none">
                                <option>UTC / Greenwich Standard</option>
                                <option>EST / Eastern Standard</option>
                                <option>PST / Pacific Standard</option>
                            </select>
                        </div>
                    </div>
                </DataNode>

                {/* Security Settings */}
                <DataNode className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Shield className="size-5 text-emerald-500" />
                        <h3 className="text-lg font-bold font-display uppercase tracking-tight">Security Protocol</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border border-neutral-800">
                            <div>
                                <p className="text-xs font-bold text-white">Neural Fingerprint</p>
                                <p className="text-[10px] text-neutral-500 font-mono">Biometric multi-factor auth</p>
                            </div>
                            <div className="size-5 rounded bg-emerald-500 flex items-center justify-center">
                                <Zap className="size-3 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border border-neutral-800">
                            <div>
                                <p className="text-xs font-bold text-white">Quantum Encryption</p>
                                <p className="text-[10px] text-neutral-500 font-mono">AES-512 Matrix enabled</p>
                            </div>
                            <div className="size-5 rounded bg-neutral-800 flex items-center justify-center" />
                        </div>
                    </div>
                </DataNode>

                {/* Data Persistence */}
                <DataNode className="md:col-span-2 space-y-6 border-brand-blue/20">
                    <div className="flex items-center gap-3 mb-2">
                        <Database className="size-5 text-brand-blue" />
                        <h3 className="text-lg font-bold font-display uppercase tracking-tight text-white">JSON Cluster Management</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center text-center gap-2">
                            <p className="text-[9px] font-mono text-neutral-500 uppercase">Team Cluster</p>
                            <p className="text-xs font-bold text-white">Active / Linked</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center text-center gap-2">
                            <p className="text-[9px] font-mono text-neutral-500 uppercase">Blueprint Cluster</p>
                            <p className="text-xs font-bold text-white">Active / Linked</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col items-center text-center gap-2">
                            <p className="text-[9px] font-mono text-neutral-500 uppercase">Assignment Mesh</p>
                            <p className="text-xs font-bold text-white">34 Relational Links</p>
                        </div>
                    </div>
                </DataNode>
            </div>

            <div className="flex items-center gap-4 pt-4">
                <button className="flex-1 h-12 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-[0_4px_30px_rgba(46,92,255,0.4)] uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                    <Save className="size-4" /> Save Core Configuration
                </button>
                <button className="h-12 px-6 bg-neutral-900 text-neutral-500 border border-neutral-800 rounded-xl font-bold hover:bg-neutral-800 hover:text-white transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2">
                    <RotateCcw className="size-4" /> Reset Mesh
                </button>
            </div>
        </div>
    );
}
