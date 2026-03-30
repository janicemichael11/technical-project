// frontend/src/components/PriceHistoryChart.tsx

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/formatCurrency';

interface PriceEntry {
  price: number;
  timestamp: number;
}

interface ProductHistory {
  productId: string;
  title: string;
  prices: PriceEntry[];
}

interface PriceHistoryChartProps {
  history: ProductHistory | null;
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ history }) => {
  if (!history || history.prices.length === 0) {
    return <div className="text-gray-500 text-center py-4">No price history available</div>;
  }

  // Prepare data for chart
  const data = history.prices.map(entry => ({
    time: new Date(entry.timestamp).toLocaleDateString(),
    price: entry.price,
    fullTime: new Date(entry.timestamp).toLocaleString()
  }));

  // Calculate min and max prices
  const prices = history.prices.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div className="price-history-chart">
      <h3 className="text-lg font-semibold mb-2">{history.title}</h3>
      <div className="mb-4">
        <span className="text-sm text-gray-600">
          Lowest: {formatCurrency(minPrice)} | Highest: {formatCurrency(maxPrice)}
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip
            labelFormatter={(label, payload) => {
              if (payload && payload[0]) {
                return payload[0].payload.fullTime;
              }
              return label;
            }}
<<<<<<< HEAD
            formatter={(value) => {
              if (typeof value === 'number') {
                return [`$${value.toFixed(2)}`, 'Price'];
              }
              return ['', 'Price'];
            }}
=======
            formatter={(value: number) => [formatCurrency(value), 'Price']}
>>>>>>> 4f034b8eb2ba024d741ca75bae8b51e0c200cf43
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceHistoryChart;