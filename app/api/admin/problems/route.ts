import { NextResponse } from 'next/server';
import { StoreService } from '@/lib/services/storeService';

export async function GET() {
  try {
    const problems = await StoreService.getProblemsAsync();
    return NextResponse.json({ success: true, data: problems });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, description, details, iconName, color, badgeColor } = body;

    if (!title || !category || !description) {
      return NextResponse.json({ success: false, error: 'Title, category, and description are required' }, { status: 400 });
    }

    const newStep = await StoreService.addProblemStepAsync({
      title,
      category,
      description,
      details: Array.isArray(details) ? details : undefined,
      iconName: iconName || 'AlertTriangle',
      color: color || 'from-blue-500 to-indigo-600',
      badgeColor: badgeColor || 'text-blue-400 border-blue-500/30 bg-blue-500/10'
    });

    return NextResponse.json({ success: true, data: newStep }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
