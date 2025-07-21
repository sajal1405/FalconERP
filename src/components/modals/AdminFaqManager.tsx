// src/components/modals/AdminFaqManager.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { AiOutlinePlus, AiFillEdit, AiFillDelete } from 'react-icons/ai';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const AdminFaqManager: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: 0, question: '', answer: '' });
  const [editing, setEditing] = useState(false);

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      setFaqs(data);
    } catch {
      toast.error('Failed to load FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question || !form.answer) {
      toast.error('Both question and answer are required.');
      return;
    }

    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `/api/faqs/${form.id}` : '/api/faqs';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to save FAQ');

      toast.success(editing ? 'FAQ updated' : 'FAQ created');
      setForm({ id: 0, question: '', answer: '' });
      setEditing(false);
      fetchFaqs();
    } catch {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (faq: FAQ) => {
    setForm(faq);
    setEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      toast.success('FAQ deleted');
      fetchFaqs();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <motion.div
      key="admin-faq-manager"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 p-6 rounded-xl shadow-md w-full max-w-4xl mx-auto text-white border border-cyan-700"
    >
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Manage FAQs</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
        <input
          type="text"
          name="question"
          placeholder="Question"
          className="p-3 bg-gray-800 border border-cyan-600 rounded"
          value={form.question}
          onChange={handleChange}
        />
        <textarea
          name="answer"
          placeholder="Answer"
          className="p-3 bg-gray-800 border border-cyan-600 rounded resize-none"
          rows={4}
          value={form.answer}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-cyan-600 hover:bg-cyan-700 transition text-white font-bold py-2 px-4 rounded w-fit self-end"
        >
          {editing ? 'Update FAQ' : 'Create FAQ'} <AiOutlinePlus className="inline-block ml-2" />
        </button>
      </form>

      {loading ? (
        <p className="text-gray-400">Loading FAQs...</p>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex justify-between items-start gap-4"
            >
              <div>
                <h3 className="font-semibold text-cyan-300">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(faq)}
                  className="text-yellow-400 hover:text-yellow-500 transition"
                  title="Edit"
                >
                  <AiFillEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="text-red-400 hover:text-red-500 transition"
                  title="Delete"
                >
                  <AiFillDelete size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AdminFaqManager;
