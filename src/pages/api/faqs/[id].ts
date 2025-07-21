// File: D:\FALCONERP\src\pages\api\faqs\[id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Ensure id is a string and exists
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, message: 'FAQ ID is required.' });
  }

  try {
    switch (req.method) {
      case 'GET': {
        const faq = await prisma.fAQ.findUnique({
          where: { id: id }, // Changed from parseInt(id) to id
        });
        if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found.' });
        return res.status(200).json({ success: true, data: faq });
      }

      case 'PUT': {
        const { question, answer, category, isPublic } = req.body;

        const updated = await prisma.fAQ.update({
          where: { id: id }, // Changed from parseInt(id) to id
          data: {
            question,
            answer,
            category,
            isPublic: typeof isPublic === 'boolean' ? isPublic : undefined, // Allow partial updates
          },
        });

        return res.status(200).json({ success: true, data: updated });
      }

      case 'DELETE': {
        await prisma.fAQ.delete({ where: { id: id } }); // Changed from parseInt(id) to id
        return res.status(200).json({ success: true, message: 'FAQ deleted.' });
      }

      default:
        return res.status(405).json({ success: false, message: 'Method not allowed.' });
    }
  } catch (error: unknown) {
    console.error('[API_ERROR_ID]', error);
    if (error instanceof Error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: 'An unknown server error occurred.' });
  } finally {
    await prisma.$disconnect();
  }
}