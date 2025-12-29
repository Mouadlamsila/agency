"use client"
import React, { useState, useEffect } from "react";
import { DataNode } from "@/components/ui/dashboard-with-collapsible-sidebar";
import { ProjectAssignment, TeamMember, Template } from "@/lib/types";
import {
    Plus,
    Search,
    Users as TeamIcon,
    Layers,
    X,
    UserPlus,
    Check,
    Mail,
    MoreVertical,
    Edit2,
    Briefcase
} from "lucide-react";

export default function TeamPage() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [assignments, setAssignments] = useState<ProjectAssignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    const [formData, setFormData] = useState<Partial<TeamMember>>({
        name: '',
        role: '',
        status: 'active',
        specialty: '',
        rank: '',
        bio: '',
        memberPhotos: []
    });
    const [selectedTemplateIds, setSelectedTemplateIds] = useState<string[]>([]);

    const fetchData = async () => {
        const [tRes, mRes, aRes] = await Promise.all([
            fetch('/api/templates'),
            fetch('/api/team'),
            fetch('/api/assignments')
        ]);
        setTemplates(await tRes.json());
        setTeam(await mRes.json());
        setAssignments(await aRes.json());
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openAddModal = () => {
        setModalMode('add');
        setFormData({ name: '', role: '', status: 'active', specialty: '', rank: '', bio: '', memberPhotos: [] });
        setSelectedTemplateIds([]);
        setShowModal(true);
    };

    const openEditModal = (member: TeamMember) => {
        setModalMode('edit');
        setSelectedMember(member);
        setFormData(member);
        const currentTemplateIds = assignments
            .filter(a => a.memberId === member.id)
            .map(a => a.templateId);
        setSelectedTemplateIds(currentTemplateIds);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.name) return;

        let memberId = selectedMember?.id;

        if (modalMode === 'add') {
            memberId = `MEM-${Date.now()}`;
            const avatar = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=200&h=200&auto=format&fit=crop`;
            await fetch('/api/team', {
                method: 'POST',
                body: JSON.stringify({ ...formData, id: memberId, avatar })
            });
        } else {
            await fetch('/api/team', {
                method: 'PUT',
                body: JSON.stringify({ ...formData, id: memberId })
            });
        }

        // Sync Assignments
        const currentTemplateIds = assignments.filter(a => a.memberId === memberId).map(a => a.templateId);

        const toAdd = selectedTemplateIds.filter(id => !currentTemplateIds.includes(id));
        const toRemove = currentTemplateIds.filter(id => !selectedTemplateIds.includes(id));

        for (const tid of toAdd) {
            await fetch('/api/assignments', {
                method: 'POST',
                body: JSON.stringify({ templateId: tid, memberId, roleInProject: 'Lead Operator' })
            });
        }

        for (const tid of toRemove) {
            await fetch(`/api/assignments?templateId=${tid}&memberId=${memberId}`, { method: 'DELETE' });
        }

        fetchData();
        setShowModal(false);
    };

    const toggleTemplateSelection = (id: string) => {
        setSelectedTemplateIds(prev =>
            prev.includes(id) ? prev.filter(tid => tid !== id) : [...prev, id]
        );
    };

    const getAssignedTemplates = (memberId: string) => {
        const templateIds = assignments
            .filter(a => a.memberId === memberId)
            .map(a => a.templateId);
        return templates.filter(t => templateIds.includes(t.id));
    };

    if (loading) return <div className="p-8 text-neutral-500 font-mono">SYNCHRONIZING OPERATORS...</div>;

    return (
        <div className="space-y-6 animate-fade-in relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-display uppercase tracking-tight">Operator Directory</h2>
                    <p className="text-neutral-500 text-sm mt-1">Manage studio specialists and workloads</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-xl hover:bg-blue-600 transition-all shadow-[0_4px_20px_rgba(46,92,255,0.3)]"
                >
                    <UserPlus className="size-4" />
                    <span className="font-bold text-xs uppercase tracking-widest">Onboard Operator</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => {
                    const assignedTemplates = getAssignedTemplates(member.id);
                    return (
                        <DataNode key={member.id} className="flex flex-col group/card border-neutral-800/40">
                            <div className="flex items-start justify-between mb-6">
                                <div className="relative">
                                    <div className="size-16 rounded-2xl bg-neutral-800 p-0.5 border border-neutral-700/50 overflow-hidden shadow-2xl transition-transform group-hover/card:scale-105">
                                        <img src={member.avatar} alt={member.name} className="size-full object-cover rounded-[14px]" />
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-brand-dark ${member.status === 'active' ? 'bg-emerald-500' : 'bg-orange-500'
                                        } shadow-[0_0_10px_rgba(16,185,129,0.3)]`} />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditModal(member)}
                                        className="size-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white transition-colors"
                                    >
                                        <Edit2 className="size-3.5" />
                                    </button>
                                    <button className="size-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white transition-colors">
                                        <MoreVertical className="size-3.5" />
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-white tracking-tight font-display">{member.name}</h3>
                                <p className="text-sm text-brand-blue font-medium mt-1 uppercase text-[9px] font-mono tracking-widest">{member.role}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <span className="text-[9px] text-neutral-500 font-mono uppercase border border-neutral-800 px-2 py-0.5 rounded bg-neutral-900/50">{member.rank}</span>
                                    <span className="text-[9px] text-neutral-500 font-mono uppercase bg-neutral-900/50 px-2 py-0.5 rounded border border-neutral-800">{member.specialty}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between">
                                    <p className="text-[9px] text-neutral-500 uppercase font-mono tracking-widest">Active Deployments</p>
                                    <span className="text-[9px] font-mono text-brand-blue">{assignedTemplates.length}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {assignedTemplates.map((template) => (
                                        <span key={template.id} className="px-2 py-1 bg-neutral-900/60 border border-neutral-800 rounded-lg text-[9px] text-neutral-400 font-mono transition-all hover:text-white hover:border-brand-blue/30 cursor-default">
                                            {template.codeName}
                                        </span>
                                    ))}
                                    {assignedTemplates.length === 0 && (
                                        <span className="text-[9px] text-neutral-600 italic font-mono uppercase py-1">Standby Mode</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-auto pt-6 flex items-center gap-3">
                                <button className="flex-1 h-10 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all">
                                    Dossier
                                </button>
                                <button className="h-10 px-3 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-all">
                                    <Mail className="size-3.5" />
                                </button>
                            </div>
                        </DataNode>
                    );
                })}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl" onClick={() => setShowModal(false)} />
                    <DataNode className="relative w-full max-w-2xl bg-[#0E0E0E] p-8! animate-slide-up border-neutral-700/50">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-brand-blue flex items-center justify-center">
                                    <UserPlus className="size-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-display uppercase tracking-tight">
                                        {modalMode === 'add' ? 'Onboard New Operator' : 'Profile Synchronization'}
                                    </h3>
                                    <p className="text-[10px] font-mono text-neutral-500 uppercase">Unit Status: Operational</p>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(false)} className="text-neutral-500 hover:text-white transition-colors">
                                <X className="size-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full h-12 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-sm focus:outline-none focus:border-brand-blue transition-all font-display"
                                        placeholder="e.g. Marcus Vane"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Rank</label>
                                        <input
                                            type="text"
                                            value={formData.rank}
                                            onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                                            className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-[11px] focus:outline-none focus:border-brand-blue transition-all font-mono"
                                            placeholder="Level-V"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Specialty</label>
                                        <input
                                            type="text"
                                            value={formData.specialty}
                                            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                            className="w-full h-11 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-[11px] focus:outline-none focus:border-brand-blue transition-all font-mono"
                                            placeholder="GSAP/GLSL"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Primary Objective</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full h-12 bg-neutral-900 border border-neutral-800 rounded-xl px-4 text-xs font-bold focus:outline-none focus:border-brand-blue transition-all appearance-none outline-none"
                                    >
                                        <option value="">Select Role</option>
                                        <option value="Lead Systems Architect">Lead Systems Architect</option>
                                        <option value="Motion Matrix Specialist">Motion Matrix Specialist</option>
                                        <option value="Core Interface Designer">Core Interface Designer</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Portfolio Assets (URL List)</label>
                                    <textarea
                                        value={formData.memberPhotos?.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, memberPhotos: e.target.value.split(',').map(s => s.trim()) })}
                                        className="w-full h-24 bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-[11px] focus:outline-none focus:border-brand-blue transition-all font-mono resize-none"
                                        placeholder="https://work1.jpg, https://work2.jpg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Blueprint Permissions</label>
                                    <span className="text-[9px] font-mono text-brand-blue">{selectedTemplateIds.length} Linked</span>
                                </div>
                                <div className="h-[240px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                                    {templates.map((template) => (
                                        <button
                                            key={template.id}
                                            onClick={() => toggleTemplateSelection(template.id)}
                                            className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 ${selectedTemplateIds.includes(template.id)
                                                ? 'bg-brand-blue/10 border-brand-blue/50 ring-1 ring-brand-blue/10'
                                                : 'bg-neutral-900/40 border-neutral-800/60 hover:border-neutral-700/80'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                                                    <Layers className="size-3.5 text-brand-blue" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-bold text-white tracking-tight leading-none">{template.codeName}</p>
                                                    <p className="text-[9px] text-neutral-500 mt-1 uppercase font-mono tracking-tighter">{template.category}</p>
                                                </div>
                                            </div>
                                            <div className={`size-5 rounded-full border flex items-center justify-center transition-all ${selectedTemplateIds.includes(template.id)
                                                ? 'bg-brand-blue border-brand-blue text-white shadow-[0_0_10px_rgba(46,92,255,0.4)]'
                                                : 'border-neutral-700'
                                                }`}>
                                                {selectedTemplateIds.includes(template.id) && <Check className="size-3" strokeWidth={3} />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 h-12 bg-neutral-900 text-neutral-500 rounded-xl font-bold hover:bg-neutral-800 hover:text-white transition-all uppercase tracking-widest text-[10px] border border-neutral-800"
                            >
                                Cancel Onboarding
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!formData.name}
                                className="flex-2 h-12 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-[0_4px_30px_rgba(46,92,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-[10px]"
                            >
                                {modalMode === 'add' ? 'Activate Operator' : 'Finalize Synchronization'}
                            </button>
                        </div>
                    </DataNode>
                </div>
            )}
        </div>
    );
}
