// File: D:\FALCONERP\src\pages\api\cms\faqs.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        const faqs = await prisma.fAQ.findMany({ // Changed to prisma.fAQ
          orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json({ success: true, data: faqs });
      }

      case 'POST': {
        const { question, answer, category, isPublic } = req.body;

        if (!question || !answer) {
          return res.status(400).json({ success: false, message: 'Question and Answer are required.' });
        }

        const faq = await prisma.fAQ.create({ // Changed to prisma.fAQ
          data: {
            question,
            answer,
            category: category || null,
            isPublic: typeof isPublic === 'boolean' ? isPublic : true,
          },
        });

        return res.status(201).json({ success: true, data: faq });
      }

      case 'PUT': {
        const { id, question, answer, category, isPublic } = req.body;

        if (!id) return res.status(400).json({ success: false, message: 'FAQ ID is required.' });

        const updated = await prisma.fAQ.update({ // Changed to prisma.fAQ
          where: { id },
          data: {
            question,
            answer,
            category,
            isPublic,
          },
        });

        return res.status(200).json({ success: true, data: updated });
      }

      case 'DELETE': {
        const { id } = req.body;

        if (!id) return res.status(400).json({ success: false, message: 'FAQ ID is required.' });

        await prisma.fAQ.delete({ where: { id } }); // Changed to prisma.fAQ
        return res.status(200).json({ success: true, message: 'FAQ deleted.' });
      }

      default:
        return res.status(405).json({ success: false, message: 'Method not allowed.' });
    }
  } catch (error: unknown) {
    console.error('[FAQ_API_ERROR]', error);
    if (error instanceof Error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: 'An unknown server error occurred.' });
  } finally {
    await prisma.$disconnect();
  }
}