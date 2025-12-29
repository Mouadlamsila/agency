import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { ProjectAssignment } from '@/lib/types';

const DATA_FILE = path.join(process.cwd(), 'data/assignments.json');

export async function GET() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newAssignment = await request.json(); // { templateId: string, memberId: string, ... }
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const assignments: ProjectAssignment[] = JSON.parse(data);

        // Prevent duplicates
        const exists = assignments.find(a => a.templateId === newAssignment.templateId && a.memberId === newAssignment.memberId);
        if (exists) return NextResponse.json(assignments);

        const updated = [...assignments, {
            ...newAssignment,
            id: `ASG-${Date.now()}`,
            joinedAt: new Date().toISOString(),
            contributionLevel: 0
        }];

        await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2));
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const templateId = searchParams.get('templateId');
        const memberId = searchParams.get('memberId');

        const data = await fs.readFile(DATA_FILE, 'utf8');
        let assignments: ProjectAssignment[] = JSON.parse(data);

        assignments = assignments.filter(a => !(a.templateId === templateId && a.memberId === memberId));

        await fs.writeFile(DATA_FILE, JSON.stringify(assignments, null, 2));
        return NextResponse.json(assignments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
