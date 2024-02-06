import { NextRequest, NextResponse } from 'next/server';
import { findCandidates } from '@/services/users';
import { findJobs } from '@/services/jobs';
import { startOfDay } from 'date-fns';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const model = searchParams.get('model');

  const search = searchParams.get('search') ?? '';

  if (model === 'candidate') {
    const results = await findCandidates({
      take: 5,
      where: { name: { contains: search, mode: 'insensitive' } },
    });

    return NextResponse.json(results);
  }

  if (model === 'job') {
    const expired = searchParams.get('expired');

    const results = await findJobs({
      take: 5,
      where: {
        expiredAt: expired === 'true' ? {} : { gte: startOfDay(new Date()) },
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
        ],
      },
    });

    console.log('### results: ', { results });
    return NextResponse.json(results);
  }

  return NextResponse.json(null);
}
