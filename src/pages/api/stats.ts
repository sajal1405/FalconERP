import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const total = await prisma.fAQ.count();
    const latestEntry = await prisma.fAQ.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { createdAt: true },
    });

    return res.status(200).json({
      total,
      latest: latestEntry?.createdAt ?? null,
    });
  } catch (err) {
    console.error('[FAQ STATS API]', err);
    res.status(500).json({ error: 'Failed to fetch FAQ stats' });
  }
}
