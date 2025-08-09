import { useState, useEffect } from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';
import { useAuth } from '../../../utils/useAuth';

// Mock calendar data
const generateCalendarData = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const attendanceData = {};
  // Generate random attendance data for the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateString = date.toISOString().split('T')[0];

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) {
      attendanceData[dateString] = { type: 'weekend', classes: [] };
      continue;
    }

    // Skip future dates
    if (date > currentDate) {
      attendanceData[dateString] = { type: 'future', classes: [] };
      continue;
    }

    // Generate attendance for school days
    const subjects = ['Mathematics', 'Science', 'English', 'History', 'PE'];
    const classes = subjects.map(subject => ({
      subject,
      time: ['09:00 AM', '11:00 AM', '02:00 PM', '03:30 PM'][Math.floor(Math.random() * 4)],
      status: Math.random() > 0.15 ? 'present' : 'absent' // 85% attendance rate
    }));

    const presentCount = classes.filter(c => c.status === 'present').length;
    const totalCount = classes.length;
    const percentage = Math.round((presentCount / totalCount) * 100);

    attendanceData[dateString] = {
      type: 'school',
      classes,
      summary: {
        present: presentCount,
        total: totalCount,
        percentage
      }
    };
  }

  return { year, month, daysInMonth, startingDayOfWeek, attendanceData };
};

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
  const { user, loading, logout } = useAuth('student');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeView, setActiveView] = useState('overview');
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarData, setCalendarData] = useState(null);

  useEffect(() => {
    setCalendarData(generateCalendarData());
  }, []);

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

  const getDayAttendanceColor = (dayData) => {
    if (!dayData || dayData.type !== 'school') return '';
    const percentage = dayData.summary.percentage;
    if (percentage === 100) return 'bg-green-500 text-white';
    if (percentage >= 80) return 'bg-green-200 text-green-800';
    if (percentage >= 60) return 'bg-yellow-200 text-yellow-800';
    return 'bg-red-200 text-red-800';
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <StudentLayout onLogout={logout}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Attendance Overview</h1>
            <p className="text-gray-600">Track your class attendance and performance {user.class && `- ${user.class}`}</p>
          </div>
          
          {/* View Toggle and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[{ id: 'overview', name: 'Overview', icon: '📊' }, { id: 'calendar', name: 'Calendar', icon: '📅' }].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeView === view.id
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{view.icon}</span>
                  {view.name}
                </button>
              ))}
            </div>
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

        {/* Content based on active view */}
        {activeView === 'overview' && (
          <>
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
          </>
        )}

        {/* Calendar View */}
        {activeView === 'calendar' && calendarData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {monthNames[calendarData.month]} {calendarData.year}
                </h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="text-gray-400">←</span>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <span className="text-gray-400">→</span>
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: calendarData.startingDayOfWeek }, (_, i) => (
                  <div key={`empty-${i}`} className="p-2 h-16"></div>
                ))}

                {/* Calendar days */}
                {Array.from({ length: calendarData.daysInMonth }, (_, i) => {
                  const day = i + 1;
                  const date = new Date(calendarData.year, calendarData.month, day);
                  const dateString = date.toISOString().split('T')[0];
                  const dayData = calendarData.attendanceData[dateString];
                  const isSelected = selectedDate === dateString;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(dateString)}
                      className={`p-2 h-16 rounded-lg border-2 transition-all hover:border-purple-300 ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-transparent'
                      } ${
                        dayData?.type === 'weekend'
                          ? 'bg-gray-100 text-gray-400'
                          : dayData?.type === 'future'
                          ? 'bg-gray-50 text-gray-300'
                          : getDayAttendanceColor(dayData)
                      }`}
                    >
                      <div className="text-sm font-medium">{day}</div>
                      {dayData?.type === 'school' && (
                        <div className="text-xs mt-1">
                          {dayData.summary.present}/{dayData.summary.total}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-600">Perfect Attendance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 rounded"></div>
                  <span className="text-gray-600">Good (80%+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                  <span className="text-gray-600">Average (60-79%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-200 rounded"></div>
                  <span className="text-gray-600">Poor (&lt;60%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded"></div>
                  <span className="text-gray-600">Weekend/Holiday</span>
                </div>
              </div>
            </div>

            {/* Selected Day Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedDate ? (
                  new Date(selectedDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })
                ) : (
                  'Select a Date'
                )}
              </h3>

              {selectedDate && calendarData.attendanceData[selectedDate] ? (
                <div className="space-y-4">
                  {calendarData.attendanceData[selectedDate].type === 'weekend' && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">🏖️</div>
                      <p className="text-gray-600">Weekend - No classes</p>
                    </div>
                  )}

                  {calendarData.attendanceData[selectedDate].type === 'future' && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">📅</div>
                      <p className="text-gray-600">Future date</p>
                    </div>
                  )}

                  {calendarData.attendanceData[selectedDate].type === 'school' && (
                    <>
                      {/* Day Summary */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-2xl font-bold text-green-600">
                              {calendarData.attendanceData[selectedDate].summary.present}
                            </p>
                            <p className="text-sm text-gray-600">Present</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900">
                              {calendarData.attendanceData[selectedDate].summary.percentage}%
                            </p>
                            <p className="text-sm text-gray-600">Attendance</p>
                          </div>
                        </div>
                      </div>

                      {/* Class Details */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Classes</h4>
                        {calendarData.attendanceData[selectedDate].classes.map((classItem, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{classItem.subject}</p>
                              <p className="text-sm text-gray-600">{classItem.time}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              classItem.status === 'present'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {classItem.status === 'present' ? 'Present' : 'Absent'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-gray-600">Click on a date to view attendance details</p>
                </div>
              )}
            </div>
          </div>
        )}
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
