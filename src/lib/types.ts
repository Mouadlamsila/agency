export type MemberStatus = 'active' | 'standby' | 'deploying';
export type TemplateStatus = 'stable' | 'beta' | 'archived' | 'deployed';

// Team Member Schema - matches data/team.json
export interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
    status: MemberStatus;
    specialty: string;
    rank: string;
    bio: string;
    memberPhotos: string[];
}

// Template Schema - matches data/templates.json
export interface Template {
    id: string;
    codeName: string;
    coreModel: string;
    category: string;
    status: TemplateStatus;
    version: string;
    techStack: string[];
    performanceScore: number;
    templateUrl: string;
    templatePhotos: string[];
}

// Assignment Schema - matches data/assignments.json
export interface ProjectAssignment {
    id: string;
    templateId: string;
    memberId: string;
    roleInProject: string;
    joinedAt: string;
    contributionLevel: number; // 0-100
}

// Lead Schema - matches data/leads.json
export interface Lead {
    id: string;
    clientName: string;
    projectType: string;
    status: string;
    date: string;
    email?: string;
    message?: string;
}