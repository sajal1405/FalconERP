import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title, // Added Title for chart title
  Tooltip,
  Legend, // Added Legend for dataset labels
  TooltipItem // Already imported for tooltip callback
} from 'chart.js';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

// Register Chart.js components required for a bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title, // Register Title
  Tooltip,
  Legend // Register Legend
);

interface RevenueRecord {
  month: string;
  total_revenue: number;
}

const RevenueChartCard: React.FC = () => {
  const [data, setData] = useState<RevenueRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        // Assuming your API returns data in the format:
        // [{ month: "Jan", total_revenue: 10000 }, { month: "Feb", total_revenue: 12000 }]
        const res = await axios.get('/api/revenue');
        setData(res.data || []);
      } catch (error) {
        console.error("Failed to fetch revenue data:", error);
        toast.error('Failed to load revenue data');
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, []); // Empty dependency array means this effect runs once on mount

  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: 'Revenue (AED)',
        data: data.map((d) => d.total_revenue),
        backgroundColor: 'rgba(34,211,238,0.7)', // Tailwind 'cyan-400' with opacity
        borderColor: 'rgba(34,211,238,1)',
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 30, // Fixed bar width
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container without fixed aspect ratio
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis from zero
        ticks: {
          color: '#94a3b8', // Tailwind 'gray-400'
          // Fix: Correctly type the 'value' parameter as string | number
          callback: (value: string | number) => `AED ${Number(value).toLocaleString()}`,
        },
        grid: {
          color: '#1e293b', // Tailwind 'slate-800'
          drawBorder: false, // Do not draw the axis border
        },
      },
      x: {
        ticks: {
          color: '#94a3b8', // Tailwind 'gray-400'
        },
        grid: {
          color: '#1e293b', // Tailwind 'slate-800'
          drawBorder: false, // Do not draw the axis border
        },
      },
    },
    plugins: {
      tooltip: {
        // Customize tooltip appearance
        backgroundColor: 'rgba(12,17,37,0.9)', // Dark background for tooltip
        titleColor: '#fff',
        bodyColor: '#e2e8f0', // Light gray for body text
        borderColor: '#00174F', // Border color
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true, // Show color box for dataset
        callbacks: {
          // Fix: Use TooltipItem<'bar'> for strong typing
          label: (ctx: TooltipItem<'bar'>) => {
            let label = ctx.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (ctx.parsed.y !== null) {
              label += `AED ${ctx.parsed.y.toLocaleString()}`;
            }
            return label;
          },
        },
      },
      legend: {
        display: true,
        position: 'top' as const, // Position the legend at the top
        labels: {
          color: '#e2e8f0', // Light gray color for legend text
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Monthly Revenue Overview',
        color: '#e2e8f0', // Light gray color for title
        font: {
          size: 18,
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  };

  return (
    <motion.div
      className="col-span-2 bg-[#0C1125] border border-blue-900 rounded-xl p-4 shadow-md
                 hover:shadow-cyan-800/30 hover:-translate-y-1 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="text-cyan-400 w-5 h-5" />
        <h2 className="text-white text-lg font-semibold">Monthly Revenue</h2>
      </div>

      {loading ? (
        <p className="text-gray-400 text-sm animate-pulse">Loading chart data...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-sm">No revenue data available.</p>
      ) : (
        <div className="relative h-64 md:h-80"> {/* Responsive container for the chart */}
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </motion.div>
  );
};

export default RevenueChartCard;
