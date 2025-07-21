import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // adjust if prisma client is elsewhere

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await prisma.$queryRawUnsafe(`
      SELECT
        TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YYYY') AS month,
        SUM(amount) AS total_revenue
      FROM "Invoice"
      GROUP BY 1
      ORDER BY MIN(created_at) DESC
      LIMIT 6
    `);

    res.status(200).json(result);
  } catch (error) {
    console.error('[API] /revenue:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
