// File: D:\FALCONERP\src\pages\api\faqs\index.ts
// Assuming this file exists and handles root /api/faqs, separate from cms/faqs.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        const faqs = await prisma.fAQ.findMany({ orderBy: { createdAt: 'desc' } }); // Changed to prisma.fAQ
        return res.status(200).json({ success: true, data: faqs });
      }

      case 'POST': {
        const { question, answer, category, isPublic } = req.body;

        if (!question || !answer) {
          return res.status(400).json({ success: false, message: 'Question and Answer are required.' });
        }

        const newFaq = await prisma.fAQ.create({ // Changed to prisma.fAQ
          data: {
            question,
            answer,
            category: category || null,
            isPublic: typeof isPublic === 'boolean' ? isPublic : true,
          },
        });

        return res.status(201).json({ success: true, data: newFaq });
      }

      default:
        return res.status(405).json({ success: false, message: 'Method not allowed.' });
    }
  } catch (error: unknown) {
    console.error('[API_ERROR]', error);
    if (error instanceof Error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: 'An unknown server error occurred.' });
  } finally {
    await prisma.$disconnect();
  }
}