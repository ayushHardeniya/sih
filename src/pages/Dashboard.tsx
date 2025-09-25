import React from 'react';
import { Users, UserPlus, CreditCard, Building, Home, Calendar } from 'lucide-react';
import { mockDashboardStats } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'New Admissions',
      value: stats.newAdmissions.toString(),
      icon: UserPlus,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Pending Fees',
      value: stats.pendingFees.toString(),
      icon: CreditCard,
      color: 'bg-yellow-500',
      change: '-5%'
    },
    {
      title: 'Occupied Rooms',
      value: stats.occupiedRooms.toString(),
      icon: Building,
      color: 'bg-purple-500',
      change: '+3%'
    },
    {
      title: 'Available Rooms',
      value: stats.availableRooms.toString(),
      icon: Home,
      color: 'bg-indigo-500',
      change: '0%'
    },
    {
      title: 'Upcoming Exams',
      value: stats.upcomingExams.toString(),
      icon: Calendar,
      color: 'bg-red-500',
      change: '+2'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Real-time overview of your institutional management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                  <p className="text-sm text-green-600 mt-1">{card.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full ${card.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Admissions</h2>
          <div className="space-y-3">
            {[
              { name: 'John Doe', program: 'Computer Science', date: '2023-08-15' },
              { name: 'Jane Smith', program: 'Mechanical Eng.', date: '2023-08-14' },
              { name: 'Mike Johnson', program: 'Electrical Eng.', date: '2023-08-13' },
            ].map((admission, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{admission.name}</p>
                  <p className="text-sm text-gray-600">{admission.program}</p>
                </div>
                <span className="text-sm text-gray-500">{admission.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Payments */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Payments</h2>
          <div className="space-y-3">
            {[
              { name: 'Alice Brown', amount: '₹25,000', dueDate: '2023-08-20' },
              { name: 'Bob Wilson', amount: '₹50,000', dueDate: '2023-08-22' },
              { name: 'Carol Davis', amount: '₹15,000', dueDate: '2023-08-25' },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">{payment.name}</p>
                  <p className="text-sm text-gray-600">Due: {payment.dueDate}</p>
                </div>
                <span className="font-semibold text-yellow-600">{payment.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn-primary text-center p-4">
            Add New Student
          </button>
          <button className="btn-secondary text-center p-4">
            Process Payment
          </button>
          <button className="btn-secondary text-center p-4">
            Allocate Room
          </button>
          <button className="btn-secondary text-center p-4">
            Schedule Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;