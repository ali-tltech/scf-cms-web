// AnalyticsDashboard.js
import React, { useState, useEffect } from 'react';
import { getAnalyticsData } from './ga-api-utils';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Calendar, Users, Eye, Clock, Mouse, ArrowDown, ArrowUp, Globe } from 'lucide-react';


const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('last7Days');
  const [compareData, setCompareData] = useState(null);

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch current period data
      const currentData = await getAnalyticsData(dateRange);
      
      // Fetch previous period data for comparison
      const previousRange = getPreviousDateRange(dateRange);
      const previousData = await getAnalyticsData(previousRange);

      // Calculate percentage changes
      const comparisonData = calculateComparisons(currentData, previousData);

      setData(currentData);
      setCompareData(comparisonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when date range changes
  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  // Helper function to get previous date range
  const getPreviousDateRange = (currentRange) => {
    switch (currentRange) {
      case 'last7Days':
        return { startDate: '-14days', endDate: '-7days' };
      case 'last30Days':
        return { startDate: '-60days', endDate: '-30days' };
      case 'last3Months':
        return { startDate: '-6months', endDate: '-3months' };
      case 'lastYear':
        return { startDate: '-2years', endDate: '-1year' };
      default:
        return { startDate: '-14days', endDate: '-7days' };
    }
  };

  // Calculate percentage changes
  const calculateComparisons = (current, previous) => {
    return {
      users: calculatePercentageChange(
        current.metrics.totalUsers,
        previous.metrics.totalUsers
      ),
      sessions: calculatePercentageChange(
        current.metrics.sessions,
        previous.metrics.sessions
      ),
      bounceRate: calculatePercentageChange(
        current.metrics.bounceRate,
        previous.metrics.bounceRate
      ),
      duration: calculatePercentageChange(
        current.metrics.avgSessionDuration,
        previous.metrics.avgSessionDuration
      ),
    };
  };

  // Helper function to calculate percentage change
  const calculatePercentageChange = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (error) {
    return (
     alert("hbjshfjehrjhfehjrf")
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500">
            Showing data for: {formatDateRangeLabel(dateRange)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="last7Days">Last 7 Days</option>
            <option value="last30Days">Last 30 Days</option>
            <option value="last3Months">Last 3 Months</option>
            <option value="lastYear">Last Year</option>
          </select>
          <button
            onClick={fetchAnalyticsData}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : data ? (
        <>
          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Users"
              value={data.metrics.totalUsers}
              change={compareData.users}
              icon={<Users className="w-5 h-5 text-blue-500" />}
            />
            <MetricCard
              title="Sessions"
              value={data.metrics.sessions}
              change={compareData.sessions}
              icon={<Mouse className="w-5 h-5 text-purple-500" />}
            />
            <MetricCard
              title="Bounce Rate"
              value={`${data.metrics.bounceRate.toFixed(1)}%`}
              change={compareData.bounceRate}
              icon={<Globe className="w-5 h-5 text-green-500" />}
              invertChange
            />
            <MetricCard
              title="Avg. Duration"
              value={formatDuration(data.metrics.avgSessionDuration)}
              change={compareData.duration}
              icon={<Clock className="w-5 h-5 text-orange-500" />}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Page Views Over Time">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.pageViews}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="User Demographics">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.demographics}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Device Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.devices}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <TopPagesTable data={data.topPages} />
          </div>
        </>
      ) : null}
    </div>
  );
};

// Helper Components
const MetricCard = ({ title, value, change, icon, invertChange = false }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        {icon}
        <h3 className="text-sm font-medium text-gray-500 ml-2">{title}</h3>
      </div>
      <PercentageChange value={change} invert={invertChange} />
    </div>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const PercentageChange = ({ value, invert = false }) => {
  const isPositive = invert ? value < 0 : value > 0;
  return (
    <span className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
};

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-6">{title}</h3>
    {children}
  </div>
);

const TopPagesTable = ({ data }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Pages</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Page</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Views</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Avg. Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((page, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-3 px-4 text-sm text-gray-800">{page.path}</td>
              <td className="text-right py-3 px-4 text-sm text-gray-600">
                {page.pageviews.toLocaleString()}
              </td>
              <td className="text-right py-3 px-4 text-sm text-gray-600">
                {formatDuration(page.avgTimeOnPage)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const formatDateRangeLabel = (range) => {
  const now = new Date();
  switch (range) {
    case 'last7Days':
      return `Last 7 Days (${formatDate(new Date(now - 7 * 24 * 60 * 60 * 1000))} - ${formatDate(now)})`;
    case 'last30Days':
      return `Last 30 Days (${formatDate(new Date(now - 30 * 24 * 60 * 60 * 1000))} - ${formatDate(now)})`;
    case 'last3Months':
      return `Last 3 Months (${formatDate(new Date(now.setMonth(now.getMonth() - 3)))} - ${formatDate(new Date())})`;
    case 'lastYear':
      return `Last Year (${formatDate(new Date(now.setFullYear(now.getFullYear() - 1)))} - ${formatDate(new Date())})`;
    default:
      return range;
  }
};

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default AnalyticsDashboard;