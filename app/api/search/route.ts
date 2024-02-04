import { NextRequest, NextResponse } from 'next/server';
import { findCandidates } from '@/services/users';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const model = searchParams.get('model');

  if (model === 'candidate') {
    const search = searchParams.get('search');

    const results = await findCandidates({
      take: 5,
      where: { name: { contains: search ?? '' } },
    });

    return NextResponse.json(results);
  }

  return NextResponse.json(null);
}
