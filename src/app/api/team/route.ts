import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data/team.json');

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
        const newItem = await request.json();
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const items = JSON.parse(data);

        const updatedItems = [...items, { ...newItem, id: Date.now().toString() }];
        await fs.writeFile(DATA_FILE, JSON.stringify(updatedItems, null, 2));

        return NextResponse.json(updatedItems);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { id, ...updates } = await request.json();
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const items = JSON.parse(data);

        const updatedItems = items.map((item: any) =>
            item.id === id ? { ...item, ...updates } : item
        );

        await fs.writeFile(DATA_FILE, JSON.stringify(updatedItems, null, 2));
        return NextResponse.json(updatedItems);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}
