import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Log the transmission to the dev server console
        console.log('--- NEW PROJECT TRANSMISSION RECEIVED ---');
        console.log(`timestamp: ${new Date().toISOString()}`);
        console.log(`project: ${body.projectName}`);
        console.log(`category: ${body.category}`);
        console.log(`template: MOD_${body.templateId}`);
        console.log('----------------------------------------');

        // Here you would typically integrate with EmailJS, Formspree, or your DB
        // For this demonstration, we'll simulate a successful processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return NextResponse.json({
            status: 'LOCKED_AND_TRANSMITTED',
            message: 'Project parameters archived in dev_server.'
        });
    } catch (error) {
        return NextResponse.json({ error: 'TRANSMISSION_FAILED' }, { status: 500 });
    }
}
