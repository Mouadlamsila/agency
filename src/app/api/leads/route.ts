import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data/leads.json');

export async function GET() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json([], { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, status } = await request.json();
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const leads = JSON.parse(data);

        const updatedLeads = leads.map((l: any) =>
            l.id === id ? { ...l, status } : l
        );

        await fs.writeFile(DATA_FILE, JSON.stringify(updatedLeads, null, 2));
        return NextResponse.json(updatedLeads);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const data = await fs.readFile(DATA_FILE, 'utf8');
        let leads = JSON.parse(data);

        leads = leads.filter((l: any) => l.id !== id);

        await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2));
        return NextResponse.json(leads);
    } catch (error) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
