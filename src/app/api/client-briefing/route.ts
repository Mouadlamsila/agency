import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        
        // Extract form fields
        const briefingData = {
            productName: formData.get('productName'),
            brandDescription: formData.get('brandDescription'),
            projectType: formData.get('projectType'),
            style: formData.get('style'),
            animation: formData.get('animation'),
            preferredFonts: formData.get('preferredFonts'),
            targetAudience: formData.get('targetAudience'),
            contentReady: formData.get('contentReady'),
            referenceWebsites: formData.get('referenceWebsites'),
            specialRequirements: formData.get('specialRequirements'),
            integrations: formData.get('integrations'),
            preferredTimeline: formData.get('preferredTimeline'),
            additionalNotes: formData.get('additionalNotes'),
            selectedColors: JSON.parse(formData.get('selectedColors') as string || '[]'),
            customColors: JSON.parse(formData.get('customColors') as string || '[]'),
            timestamp: new Date().toISOString(),
        };

        // Handle logo upload if present
        const logoFile = formData.get('logo') as File | null;
        let logoPath = null;
        
        if (logoFile && logoFile.size > 0) {
            const bytes = await logoFile.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            // Save to public/uploads directory
            const filename = `logo_${Date.now()}_${logoFile.name}`;
            const uploadsDir = join(process.cwd(), 'public', 'uploads');
            logoPath = `/uploads/${filename}`;
            
            // In production, you'd want to use a proper file storage service
            // For now, we'll just log it
            console.log(`Logo file received: ${filename}, size: ${logoFile.size} bytes`);
        }

        // Log the briefing data
        console.log('--- CLIENT BRIEFING RECEIVED ---');
        console.log(`timestamp: ${briefingData.timestamp}`);
        console.log(`productName: ${briefingData.productName}`);
        console.log(`projectType: ${briefingData.projectType}`);
        console.log(`style: ${briefingData.style}`);
        console.log(`animation: ${briefingData.animation}`);
        console.log(`selectedColors:`, briefingData.selectedColors);
        console.log(`customColors:`, briefingData.customColors);
        console.log(`logoPath: ${logoPath || 'No logo uploaded'}`);
        console.log('Full briefing data:', briefingData);
        console.log('----------------------------------------');

        // Here you would typically:
        // 1. Save to database
        // 2. Send email notification
        // 3. Store logo in cloud storage (S3, Cloudinary, etc.)
        // 4. Create project record

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return NextResponse.json({
            status: 'SUCCESS',
            message: 'Client briefing submitted successfully.',
            data: {
                ...briefingData,
                logoPath
            }
        });
    } catch (error) {
        console.error('CLIENT_BRIEFING_ERROR:', error);
        return NextResponse.json(
            { error: 'BRIEFING_SUBMISSION_FAILED', message: 'Failed to process briefing submission.' },
            { status: 500 }
        );
    }
}
