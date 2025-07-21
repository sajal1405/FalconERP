// File: D:\FALCONERP\src\pages\api\faqs.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET': {
        // Fetch all FAQs, ordered by creation date descending
        const faqs = await prisma.fAQ.findMany({ // Fixed: Changed 'faq' to 'fAQ'
          orderBy: { createdAt: 'desc' },
        });
        return res.status(200).json({ success: true, data: faqs });
      }

      case 'POST': {
        // Extract data from the request body
        const { question, answer, category, isPublic } = req.body;

        // Validate required fields
        if (!question || !answer) {
          return res.status(400).json({ success: false, message: 'Question and Answer are required.' });
        }

        // Create a new FAQ entry in the database
        const faq = await prisma.fAQ.create({ // Fixed: Changed 'faq' to 'fAQ'
          data: {
            question,
            answer,
            category: category || null, // Use null if category is not provided
            isPublic: typeof isPublic === 'boolean' ? isPublic : true, // Default to true if not provided
          },
        });

        return res.status(201).json({ success: true, data: faq });
      }

      // PUT and DELETE methods for /api/faqs are typically handled by /api/faqs/[id].ts
      // If this file is also intended to handle them for bulk operations or different logic,
      // ensure the logic is distinct from [id].ts.
      // For now, only GET and POST are explicitly handled as per typical API design for this path.
      // If you intend to have PUT/DELETE here, ensure they operate on a collection or different criteria.

      default:
        // Respond with Method Not Allowed for unsupported HTTP methods
        res.setHeader('Allow', ['GET', 'POST']); // Specify allowed methods
        return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
    }
  } catch (error: unknown) { // Use 'unknown' for better type safety in catch blocks
    console.error('[FAQ_API_ERROR]', error); // Log the error for debugging

    // Provide a more informative error message based on the error type
    if (error instanceof Error) {
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
    // Fallback for unknown error types
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: 'An unknown server error occurred.' });
  } finally {
    // Ensure Prisma client is disconnected after each request to prevent connection leaks
    await prisma.$disconnect();
  }
}
