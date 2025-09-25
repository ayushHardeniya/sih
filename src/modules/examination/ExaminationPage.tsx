import React, { useState } from 'react';
import { GraduationCap, Search, Filter, Plus, Calendar, Award, FileText } from 'lucide-react';
import { mockGrades, mockStudents } from '../../utils/mockData';
import { Grade } from '../../types';

const ExaminationPage: React.FC = () => {
  const [grades] = useState<Grade[]>(mockGrades);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterExamType, setFilterExamType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grades' | 'schedule' | 'reports'>('grades');

  const getStudentName = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student ? student.name : 'Unknown Student';
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': case 'A+': return 'text-green-600 bg-green-100';
      case 'B': case 'B+': return 'text-blue-600 bg-blue-100';
      case 'C': case 'C+': return 'text-yellow-600 bg-yellow-100';
      case 'D': return 'text-orange-600 bg-orange-100';
      case 'F': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getExamTypeColor = (type: string) => {
    switch (type) {
      case 'final': return 'text-purple-600 bg-purple-100';
      case 'mid_term': return 'text-blue-600 bg-blue-100';
      case 'assignment': return 'text-green-600 bg-green-100';
      case 'quiz': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredGrades = grades.filter(grade => {
    const student = mockStudents.find(s => s.id === grade.studentId);
    const matchesSearch = student?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterExamType === 'all' || grade.examType === filterExamType;
    return matchesSearch && matchesFilter;
  });

  // Mock data for upcoming exams
  const upcomingExams = [
    {
      id: '1',
      subject: 'Data Structures',
      code: 'CS201',
      date: '2023-11-15',
      time: '10:00 AM',
      duration: '3 hours',
      type: 'final',
      room: 'Hall A-101'
    },
    {
      id: '2',
      subject: 'Mathematics',
      code: 'MATH101',
      date: '2023-11-18',
      time: '2:00 PM',
      duration: '2 hours',
      type: 'mid_term',
      room: 'Hall B-201'
    },
    {
      id: '3',
      subject: 'Physics',
      code: 'PHY101',
      date: '2023-11-20',
      time: '9:00 AM',
      duration: '3 hours',
      type: 'final',
      room: 'Hall C-301'
    }
  ];

  const totalGrades = grades.length;
  const averageMarks = grades.length > 0 ? 
    Math.round(grades.reduce((sum, grade) => sum + grade.marks, 0) / grades.length) : 0;
  const passCount = grades.filter(grade => grade.marks >= 40).length;
  const passRate = grades.length > 0 ? Math.round((passCount / grades.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Examination Management</h1>
          <p className="text-gray-600 mt-2">
            Manage exams, grades, and academic performance tracking
          </p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button className="btn-secondary">
            <FileText size={20} className="mr-2" />
            Generate Report
          </button>
          <button className="btn-primary">
            <Plus size={20} className="mr-2" />
            Schedule Exam
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Grades</p>
              <p className="text-2xl font-bold text-gray-900">{totalGrades}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Average Marks</p>
              <p className="text-2xl font-bold text-gray-900">{averageMarks}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-gray-900">{passRate}%</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Upcoming Exams</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingExams.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grades')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grades'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Grades
            </button>
            <button
              onClick={() => setViewMode('schedule')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'schedule'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Exam Schedule
            </button>
            <button
              onClick={() => setViewMode('reports')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'reports'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Reports
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {viewMode === 'grades' && (
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={filterExamType}
                  onChange={(e) => setFilterExamType(e.target.value)}
                >
                  <option value="all">All Exam Types</option>
                  <option value="final">Final Exam</option>
                  <option value="mid_term">Mid Term</option>
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'grades' && (
        /* Grades Table */
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredGrades.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getStudentName(grade.studentId)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Data Structures</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getExamTypeColor(grade.examType)}`}>
                        {grade.examType.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {grade.marks}/{grade.maxMarks}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{grade.examDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        Edit
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewMode === 'schedule' && (
        /* Exam Schedule */
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Examinations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingExams.map((exam) => (
                  <tr key={exam.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{exam.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.duration}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{exam.room}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getExamTypeColor(exam.type)}`}>
                        {exam.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {viewMode === 'reports' && (
        /* Academic Reports */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Analytics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Grade A (90-100%)</span>
                <span className="text-sm font-medium text-gray-900">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Grade B (80-89%)</span>
                <span className="text-sm font-medium text-gray-900">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '40%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Grade C (70-79%)</span>
                <span className="text-sm font-medium text-gray-900">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-yellow-600 h-3 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Grade D & F (Below 70%)</span>
                <span className="text-sm font-medium text-gray-900">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-red-600 h-3 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Reports</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-900">Class Performance Report</div>
                <div className="text-sm text-gray-600">Detailed analysis by subject and class</div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-900">Individual Student Report</div>
                <div className="text-sm text-gray-600">Personal academic progress tracking</div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-900">Grade Distribution</div>
                <div className="text-sm text-gray-600">Statistical grade analysis</div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-gray-900">Attendance vs Performance</div>
                <div className="text-sm text-gray-600">Correlation analysis report</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExaminationPage;