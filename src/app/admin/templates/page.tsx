"use client"
import React, { useState, useEffect } from "react";
import { DataNode } from "@/components/ui/dashboard-with-collapsible-sidebar";
import { ProjectAssignment, TeamMember, Template } from "@/lib/types";
import {
    Plus,
    Search,
    Layers,
    ArrowUpRight,
    X,
    UserPlus,
    Trash2,
    Check,
    Edit2
} from "lucide-react";

export default function TemplatesPage() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [assignments, setAssignments] = useState<ProjectAssignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState<Partial<Template>>({
        codeName: '',
        category: '',
        status: 'stable',
        coreModel: '',
        techStack: [],
        templateUrl: '',
        templatePhotos: []
    });
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>([]);

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
        setFormData({ codeName: '', category: '', status: 'stable', coreModel: '', techStack: [], templateUrl: '', templatePhotos: [] });
        setSelectedMemberIds([]);
        setShowModal(true);
    };

    const openEditModal = (template: Template) => {
        setModalMode('edit');
        setSelectedTemplate(template);
        setFormData(template);
        const currentMemberIds = assignments
            .filter(a => a.templateId === template.id)
            .map(a => a.memberId);
        setSelectedMemberIds(currentMemberIds);
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.codeName) return;

        let templateId = selectedTemplate?.id;

        if (modalMode === 'add') {
            templateId = `TMP-${Date.now()}`;
            const templateData = {
                ...formData,
                id: templateId,
                version: '1.0.0',
                performanceScore: 100,
                techStack: formData.techStack || [],
                templateUrl: formData.templateUrl || '',
                templatePhotos: formData.templatePhotos || []
            };
            await fetch('/api/templates', { method: 'POST', body: JSON.stringify(templateData) });
        } else {
            await fetch('/api/templates', { method: 'PUT', body: JSON.stringify({ ...formData, id: templateId }) });
        }

        // Sync Assignments
        const currentAssignmentIds = assignments.filter(a => a.templateId === templateId).map(a => a.memberId);

        // Members to add
        const toAdd = selectedMemberIds.filter(id => !currentAssignmentIds.includes(id));
        // Members to remove
        const toRemove = currentAssignmentIds.filter(id => !selectedMemberIds.includes(id));

        for (const mid of toAdd) {
            await fetch('/api/assignments', {
                method: 'POST',
                body: JSON.stringify({ templateId, memberId: mid, roleInProject: 'Contributor' })
            });
        }

        for (const mid of toRemove) {
            await fetch(`/api/assignments?templateId=${templateId}&memberId=${mid}`, { method: 'DELETE' });
        }

        fetchData();
        setShowModal(false);
    };

    const toggleMemberSelection = (id: string) => {
        setSelectedMemberIds(prev =>
            prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
        );
    };

    const getAssignedMembers = (templateId: string) => {
        const memberIds = assignments
            .filter(a => a.templateId === templateId)
            .map(a => a.memberId);
        return team.filter(m => memberIds.includes(m.id));
    };

    if (loading) return <div className="p-8 text-neutral-500 font-mono">SYNCHRONIZING BLUEPRINTS...</div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold font-display uppercase tracking-tight">System Blueprints</h2>
                    <p className="text-neutral-500 text-sm mt-1">Architecture and deployment assets</p>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-xl hover:bg-blue-600 transition-all shadow-[0_4px_20px_rgba(46,92,255,0.3)]"
                >
                    <Plus className="size-4" />
                    <span className="font-bold text-xs uppercase tracking-widest">Initialize Blueprint</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {templates.map((template) => {
                    const assignedMembers = getAssignedMembers(template.id);
                    return (
                        <DataNode key={template.id} className="flex flex-col h-full border-neutral-800/40">
                            <div className="flex items-start justify-between mb-4">
                                <div className="size-10 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center">
                                    <Layers className="size-5 text-brand-blue" />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openEditModal(template)}
                                        className="size-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white transition-colors"
                                    >
                                        <Edit2 className="size-3.5" />
                                    </button>
                                    <div className={`text-[9px] font-mono px-2 py-0.5 rounded border flex items-center ${template.status === 'deployed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue'
                                        }`}>
                                        {template.status.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-white leading-tight font-display tracking-tight">{template.codeName}</h3>
                                <p className="text-[10px] text-neutral-500 mt-1 font-mono uppercase tracking-tighter">{template.coreModel}</p>
                                <span className="inline-block px-2 py-0.5 bg-neutral-800/50 border border-neutral-700/50 rounded mt-4 text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                                    {template.category}
                                </span>
                            </div>

                            <div className="mt-8 pt-4 border-t border-neutral-800/50 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {assignedMembers.map((member) => (
                                        <div key={member.id} className="size-7 rounded-full border-2 border-brand-dark bg-neutral-800 overflow-hidden ring-1 ring-neutral-700/50">
                                            <img src={member.avatar} alt={member.name} title={member.name} className="size-full object-cover" />
                                        </div>
                                    ))}
                                    {assignedMembers.length === 0 && (
                                        <span className="text-[9px] text-neutral-600 uppercase font-mono italic">Offline</span>
                                    )}
                                </div>
                                <button className="text-[9px] font-bold text-brand-blue uppercase tracking-widest hover:underline flex items-center gap-1 group">
                                    DATA MESH <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </button>
                            </div>
                        </DataNode>
                    );
                })}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl" onClick={() => setShowModal(false)} />
                    <DataNode className="relative w-full max-w-2xl bg-[#0E0E0E] p-8! animate-slide-up border-neutral-700/50 shadow-[0_0_100px_rgba(0,0,0,1)]">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-xl bg-brand-blue flex items-center justify-center">
                                    <Plus className="size-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold font-display uppercase tracking-tight">
                                        {modalMode === 'add' ? 'New System Architecture' : 'Modify Core Blueprint'}
                                    </h3>
                                    <p className="text-[10px] font-mono text-neutral-500 uppercase">Status: {modalMode === 'add' ? 'Initializing' : 'Synchronizing'}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowModal(false)} className="text-neutral-500 hover:text-white transition-colors">
                                <X className="size-6" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Blueprint Code-Name</label>
                                    <input
                                        type="text"
                                        value={formData.codeName}
                                        onChange={(e) => setFormData({ ...formData, codeName: e.target.value })}
                                        className="w-full h-12 bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 text-sm focus:outline-none focus:border-brand-blue transition-all font-display tracking-tight"
                                        placeholder="e.g. VANGUARD-01"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Core Model</label>
                                    <input
                                        type="text"
                                        value={formData.coreModel}
                                        onChange={(e) => setFormData({ ...formData, coreModel: e.target.value })}
                                        className="w-full h-12 bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 text-sm focus:outline-none focus:border-brand-blue transition-all font-mono"
                                        placeholder="e.g. Next.js 15 / Turbopack"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Classification</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full h-12 bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 text-sm focus:outline-none focus:border-brand-blue transition-all appearance-none outline-none"
                                    >
                                        <option value="">Select Engine</option>
                                        <option value="Enterprise Engine">Enterprise Engine</option>
                                        <option value="Immersive Visualizer">Immersive Visualizer</option>
                                        <option value="Real-time SaaS">Real-time SaaS</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Tech Stack (Comma Separated)</label>
                                    <input
                                        type="text"
                                        value={formData.techStack?.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, techStack: e.target.value.split(',').map(s => s.trim()) })}
                                        className="w-full h-12 bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 text-sm focus:outline-none focus:border-brand-blue transition-all font-mono"
                                        placeholder="React, Tailwind, Three.js"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Deployment URL</label>
                                    <input
                                        type="text"
                                        value={formData.templateUrl}
                                        onChange={(e) => setFormData({ ...formData, templateUrl: e.target.value })}
                                        className="w-full h-12 bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 text-sm focus:outline-none focus:border-brand-blue transition-all font-mono text-brand-blue"
                                        placeholder="https://"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Visual Assets (URL List)</label>
                                    <textarea
                                        value={formData.templatePhotos?.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, templatePhotos: e.target.value.split(',').map(s => s.trim()) })}
                                        className="w-full h-24 bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-sm focus:outline-none focus:border-brand-blue transition-all font-mono resize-none"
                                        placeholder="https://image1.jpg, https://image2.jpg"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Operator Map</label>
                                    <span className="text-[9px] font-mono text-brand-blue">{selectedMemberIds.length} Nodes Selected</span>
                                </div>
                                <div className="h-[240px] overflow-y-auto pr-2 custom-scrollbar space-y-2.5">
                                    {team.map((member) => (
                                        <button
                                            key={member.id}
                                            onClick={() => toggleMemberSelection(member.id)}
                                            className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-300 ${selectedMemberIds.includes(member.id)
                                                ? 'bg-brand-blue/10 border-brand-blue/40 ring-1 ring-brand-blue/10'
                                                : 'bg-neutral-900/40 border-neutral-800/60 hover:border-neutral-700/80'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <div className="size-8 rounded-xl bg-neutral-800 overflow-hidden border border-neutral-700/50 group">
                                                    <img src={member.avatar} alt="" className="size-full object-cover transition-transform group-hover:scale-110" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-bold text-white leading-none tracking-tight">{member.name}</p>
                                                    <p className="text-[9px] text-neutral-500 mt-1 uppercase font-mono tracking-tighter">{member.rank}</p>
                                                </div>
                                            </div>
                                            <div className={`size-5 rounded-full border flex items-center justify-center transition-all ${selectedMemberIds.includes(member.id)
                                                ? 'bg-brand-blue border-brand-blue text-white'
                                                : 'border-neutral-700'
                                                }`}>
                                                {selectedMemberIds.includes(member.id) && <Check className="size-3" strokeWidth={3} />}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 h-12 bg-neutral-900 text-neutral-400 rounded-xl font-bold hover:bg-neutral-800 hover:text-white transition-all uppercase tracking-widest text-[10px] border border-neutral-800"
                            >
                                Abort Mission
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!formData.codeName}
                                className="flex-2 h-12 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-[0_4px_30px_rgba(46,92,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-[10px]"
                            >
                                {modalMode === 'add' ? 'Commit to Registry' : 'Overwrite Mainframe'}
                            </button>
                        </div>
                    </DataNode>
                </div>
            )}
        </div>
    );
}
