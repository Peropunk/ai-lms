import { useState } from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

// Mock data - to be replaced with Supabase queries
const mockAttendanceData = {
  overview: {
    totalClasses: 180,
    attendedClasses: 162,
    percentage: 90,
    status: 'Good'
  },
  monthlyData: [
    { month: 'January', present: 18, absent: 2, total: 20, percentage: 90 },
    { month: 'February', present: 19, absent: 1, total: 20, percentage: 95 },
    { month: 'March', present: 17, absent: 3, total: 20, percentage: 85 },
    { month: 'April', present: 16, absent: 4, total: 20, percentage: 80 },
    { month: 'May', present: 19, absent: 1, total: 20, percentage: 95 },
    { month: 'June', present: 18, absent: 2, total: 20, percentage: 90 },
  ],
  recentRecords: [
    { id: 1, date: '2024-01-22', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
    { id: 2, date: '2024-01-22', subject: 'Science', status: 'Present', time: '11:00 AM' },
    { id: 3, date: '2024-01-21', subject: 'English', status: 'Present', time: '02:00 PM' },
    { id: 4, date: '2024-01-21', subject: 'History', status: 'Absent', time: '03:30 PM' },
    { id: 5, date: '2024-01-20', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
    { id: 6, date: '2024-01-20', subject: 'Physical Education', status: 'Present', time: '10:30 AM' },
    { id: 7, date: '2024-01-19', subject: 'Science', status: 'Present', time: '11:00 AM' },
    { id: 8, date: '2024-01-19', subject: 'Art', status: 'Absent', time: '01:00 PM' },
  ],
  subjectWiseAttendance: [
    { subject: 'Mathematics', attended: 28, total: 30, percentage: 93.3 },
    { subject: 'Science', attended: 26, total: 30, percentage: 86.7 },
    { subject: 'English', attended: 29, total: 30, percentage: 96.7 },
    { subject: 'History', attended: 25, total: 30, percentage: 83.3 },
    { subject: 'Physical Education', attended: 27, total: 30, percentage: 90.0 },
    { subject: 'Art', attended: 24, total: 30, percentage: 80.0 },
  ]
};

export default function StudentAttendance() {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600 bg-green-100';
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getAttendanceStatusBadge = (status) => {
    return status === 'Present' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Attendance Overview</h1>
            <p className="text-gray-600">Track your class attendance and performance</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="current-month">Current Month</option>
              <option value="last-month">Last Month</option>
              <option value="current-year">Current Year</option>
              <option value="custom">Custom Range</option>
            </select>
            
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="science">Science</option>
              <option value="english">English</option>
              <option value="history">History</option>
            </select>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{mockAttendanceData.overview.totalClasses}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Attended</p>
                <p className="text-2xl font-bold text-green-600">{mockAttendanceData.overview.attendedClasses}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                <p className="text-2xl font-bold text-purple-600">{mockAttendanceData.overview.percentage}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className={`text-2xl font-bold ${
                  mockAttendanceData.overview.percentage >= 90 ? 'text-green-600' : 
                  mockAttendanceData.overview.percentage >= 75 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {mockAttendanceData.overview.status}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Attendance */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Trend</h3>
            <div className="space-y-3">
              {mockAttendanceData.monthlyData.map((month, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">{month.month}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{month.present}/{month.total}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(month.percentage)}`}>
                      {month.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject-wise Attendance */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject-wise Attendance</h3>
            <div className="space-y-3">
              {mockAttendanceData.subjectWiseAttendance.map((subject, index) => (
                <div key={index} className="p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{subject.subject}</span>
                    <span className="text-sm text-gray-600">{subject.attended}/{subject.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${subject.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">Attendance Rate</span>
                    <span className={`text-xs font-medium ${getStatusColor(subject.percentage)}`}>
                      {subject.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Attendance Records */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Attendance Records</h3>
            <p className="text-sm text-gray-600">Your latest class attendance history</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockAttendanceData.recentRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {record.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAttendanceStatusBadge(record.status)}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance Goals */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Attendance Goals</h3>
              <p className="text-gray-600">Maintain at least 90% attendance to stay on track</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600">Current Target</p>
                <p className="text-xl font-bold text-purple-600">90%</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600">Classes Needed</p>
                <p className="text-xl font-bold text-green-600">2 more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

/*
Supabase Database Schema for Attendance:

1. attendance_records table:
   - id: uuid (primary key)
   - student_id: uuid (foreign key to students table)
   - subject_id: uuid (foreign key to subjects table)
   - class_date: date
   - class_time: time
   - status: enum ('present', 'absent', 'late', 'excused')
   - created_at: timestamp
   - updated_at: timestamp

2. Example Supabase queries to replace mock data:

// Get student attendance overview
const getAttendanceOverview = async (studentId, startDate, endDate) => {
  const { data: attendanceOverview } = await supabase
    .from('attendance_records')
    .select('status')
    .eq('student_id', studentId)
    .gte('class_date', startDate)
    .lte('class_date', endDate);
  return attendanceOverview;
};

// Get monthly attendance data
const getMonthlyAttendance = async (studentId, startOfYear) => {
  const { data: monthlyAttendance } = await supabase
    .from('attendance_records')
    .select('class_date, status')
    .eq('student_id', studentId)
    .gte('class_date', startOfYear)
    .order('class_date', { ascending: true });
  return monthlyAttendance;
};

// Get subject-wise attendance
const getSubjectAttendance = async (studentId, startDate) => {
  const { data: subjectAttendance } = await supabase
    .from('attendance_records')
    .select('status, subjects(name)')
    .eq('student_id', studentId)
    .gte('class_date', startDate);
  return subjectAttendance;
};

// Get recent attendance records
const getRecentRecords = async (studentId) => {
  const { data: recentRecords } = await supabase
    .from('attendance_records')
    .select('*, subjects(name)')
    .eq('student_id', studentId)
    .order('class_date', { ascending: false })
    .limit(10);
  return recentRecords;
};
*/
