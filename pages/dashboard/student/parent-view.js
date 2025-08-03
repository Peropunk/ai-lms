import { useState } from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

const mockParentData = {
  student: {
    name: 'John Doe',
    grade: '10th Grade',
    section: 'A',
    rollNumber: '2024001'
  },
  overview: {
    attendance: 90,
    averageGrade: 'A',
    totalSubjects: 6,
    pendingAssignments: 3
  },
  recentGrades: [
    { subject: 'Mathematics', grade: 'A+', marks: '95/100', date: '2024-01-20' },
    { subject: 'Science', grade: 'A', marks: '88/100', date: '2024-01-18' },
    { subject: 'English', grade: 'A+', marks: '92/100', date: '2024-01-15' }
  ],
  attendanceData: [
    { month: 'January', present: 18, total: 20, percentage: 90 },
    { month: 'December', present: 19, total: 20, percentage: 95 },
    { month: 'November', present: 17, total: 20, percentage: 85 }
  ],
  teacherComments: [
    {
      teacher: 'Ms. Johnson (Science)',
      comment: 'John shows excellent understanding of scientific concepts.',
      date: '2024-01-20'
    },
    {
      teacher: 'Mr. Smith (Mathematics)',
      comment: 'Great improvement in problem-solving skills.',
      date: '2024-01-15'
    }
  ]
};

export default function ParentView() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Parent Dashboard</h1>
          <p className="text-gray-600 mb-4">Monitor your child's academic progress and school activities</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Student</p>
              <p className="font-semibold text-gray-900">{mockParentData.student.name}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Grade</p>
              <p className="font-semibold text-gray-900">{mockParentData.student.grade}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Section</p>
              <p className="font-semibold text-gray-900">{mockParentData.student.section}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600">Roll Number</p>
              <p className="font-semibold text-gray-900">{mockParentData.student.rollNumber}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          {['overview', 'grades', 'attendance', 'comments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap capitalize ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                  <p className="text-2xl font-bold text-green-600">{mockParentData.overview.attendance}%</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Grade</p>
                  <p className="text-2xl font-bold text-blue-600">{mockParentData.overview.averageGrade}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                  <p className="text-2xl font-bold text-purple-600">{mockParentData.overview.totalSubjects}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📚</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                  <p className="text-2xl font-bold text-orange-600">{mockParentData.overview.pendingAssignments}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📝</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grades Tab */}
        {activeTab === 'grades' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Grades</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {mockParentData.recentGrades.map((grade, index) => (
                <div key={index} className="p-6 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{grade.subject}</p>
                    <p className="text-sm text-gray-600">{grade.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-green-600">{grade.grade}</p>
                    <p className="text-sm text-gray-600">{grade.marks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Attendance</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockParentData.attendanceData.map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{month.month}</p>
                      <p className="text-sm text-gray-600">{month.present} days present out of {month.total}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      month.percentage >= 90 ? 'bg-green-100 text-green-800' :
                      month.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {month.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Teacher Comments</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {mockParentData.teacherComments.map((comment, index) => (
                <div key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">👩‍🏫</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">{comment.teacher}</p>
                      <p className="text-gray-700 mb-2">{comment.comment}</p>
                      <p className="text-sm text-gray-500">{comment.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Teachers */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Need to Connect?</h3>
          <p className="text-gray-600 mb-4">Schedule a meeting with your child's teachers</p>
          <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            Schedule Parent-Teacher Meeting
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}
