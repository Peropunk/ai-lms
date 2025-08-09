import { useState, useEffect } from 'react';
import TeacherLayout from '../../../components/layout/TeacherLayout';
import { useAuth } from '../../../utils/useAuth';

// Mock data - to be replaced with Supabase queries
const mockData = {
  classes: [
    { id: 1, name: "Grade 10A", subject: "Mathematics", students: 28, schedule: "Mon, Wed, Fri - 09:00 AM" },
    { id: 2, name: "Grade 10B", subject: "Mathematics", students: 25, schedule: "Tue, Thu - 11:00 AM" },
    { id: 3, name: "Grade 9A", subject: "Mathematics", students: 30, schedule: "Mon, Wed, Fri - 02:00 PM" },
  ],
  students: [
    { id: 1, name: "John Smith", rollNumber: "2024001", class: "Grade 10A", attendance: 95, totalClasses: 40, present: 38, absent: 2 },
    { id: 2, name: "Emily Davis", rollNumber: "2024002", class: "Grade 10A", attendance: 87, totalClasses: 40, present: 35, absent: 5 },
    { id: 3, name: "Michael Johnson", rollNumber: "2024003", class: "Grade 10A", attendance: 72, totalClasses: 40, present: 29, absent: 11 },
    { id: 4, name: "Sarah Wilson", rollNumber: "2024004", class: "Grade 10B", attendance: 98, totalClasses: 30, present: 29, absent: 1 },
    { id: 5, name: "David Brown", rollNumber: "2024005", class: "Grade 10B", attendance: 83, totalClasses: 30, present: 25, absent: 5 },
    { id: 6, name: "Lisa Anderson", rollNumber: "2024006", class: "Grade 9A", attendance: 91, totalClasses: 35, present: 32, absent: 3 },
  ],
  todayAttendance: [
    { studentId: 1, name: "John Smith", rollNumber: "2024001", status: "present", markedAt: "09:05 AM" },
    { studentId: 2, name: "Emily Davis", rollNumber: "2024002", status: "present", markedAt: "09:03 AM" },
    { studentId: 3, name: "Michael Johnson", rollNumber: "2024003", status: "absent", markedAt: null },
    { studentId: 4, name: "Sarah Wilson", rollNumber: "2024004", status: "present", markedAt: "11:02 AM" },
    { studentId: 5, name: "David Brown", rollNumber: "2024005", status: "late", markedAt: "11:15 AM" },
  ],
  analytics: {
    averageAttendance: 87.5,
    totalStudents: 83,
    presentToday: 68,
    absentToday: 15,
    bestAttendanceStudent: { name: "Sarah Wilson", percentage: 98 },
    mostAbsentStudent: { name: "Michael Johnson", percentage: 72 },
    classWiseAverage: [
      { class: "Grade 10A", average: 84.7, totalStudents: 28 },
      { class: "Grade 10B", average: 90.5, totalStudents: 25 },
      { class: "Grade 9A", average: 91.0, totalStudents: 30 },
    ]
  }
};

export default function TeacherAttendance() {
  const { user, loading, logout } = useAuth('teacher');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState({});
  const [isMarkingAttendance, setIsMarkingAttendance] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Initialize attendance data for selected class and date
    const initData = {};
    mockData.students
      .filter(student => selectedClass === 'all' || student.class === selectedClass)
      .forEach(student => {
        const todayRecord = mockData.todayAttendance.find(record => record.studentId === student.id);
        initData[student.id] = todayRecord?.status || 'unmarked';
      });
    setAttendanceData(initData);
  }, [selectedClass, selectedDate]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmitAttendance = async () => {
    setIsMarkingAttendance(true);
    try {
      // API call to save attendance
      console.log('Submitting attendance:', { selectedClass, selectedDate, attendanceData });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Attendance marked successfully!');
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Error saving attendance. Please try again.');
    } finally {
      setIsMarkingAttendance(false);
    }
  };

  const getAttendanceStats = () => {
    const filteredStudents = mockData.students.filter(student => 
      selectedClass === 'all' || student.class === selectedClass
    );
    
    const present = Object.values(attendanceData).filter(status => status === 'present').length;
    const absent = Object.values(attendanceData).filter(status => status === 'absent').length;
    const late = Object.values(attendanceData).filter(status => status === 'late').length;
    const unmarked = Object.values(attendanceData).filter(status => status === 'unmarked').length;
    
    return { present, absent, late, unmarked, total: filteredStudents.length };
  };

  const stats = getAttendanceStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <TeacherLayout onLogout={logout}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="text-gray-600">Mark and track student attendance across all your classes</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Classes</option>
              {mockData.classes.map(classItem => (
                <option key={classItem.id} value={classItem.name}>{classItem.name}</option>
              ))}
            </select>
            
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: '📊' },
                { id: 'mark-attendance', name: 'Mark Attendance', icon: '✅' },
                { id: 'analytics', name: 'Analytics', icon: '📈' },
                { id: 'reports', name: 'Reports', icon: '📋' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Average Attendance</p>
                        <p className="text-2xl font-bold">{mockData.analytics.averageAttendance}%</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl">📊</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Total Students</p>
                        <p className="text-2xl font-bold">{mockData.analytics.totalStudents}</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl">👥</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Present Today</p>
                        <p className="text-2xl font-bold">{mockData.analytics.presentToday}</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl">✅</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-100 text-sm font-medium">Absent Today</p>
                        <p className="text-2xl font-bold">{mockData.analytics.absentToday}</p>
                      </div>
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-xl">❌</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Class-wise Performance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Class-wise Average</h3>
                    <div className="space-y-4">
                      {mockData.analytics.classWiseAverage.map((classData, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{classData.class}</p>
                            <p className="text-sm text-gray-600">{classData.totalStudents} students</p>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${
                              classData.average >= 90 ? 'text-green-600' : 
                              classData.average >= 75 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {classData.average}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Highlights</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600">🏆</span>
                          </div>
                          <div>
                            <p className="text-sm text-green-600 font-medium">Best Attendance</p>
                            <p className="font-semibold text-gray-900">{mockData.analytics.bestAttendanceStudent.name}</p>
                            <p className="text-sm text-gray-600">{mockData.analytics.bestAttendanceStudent.percentage}% attendance</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600">⚠️</span>
                          </div>
                          <div>
                            <p className="text-sm text-red-600 font-medium">Needs Attention</p>
                            <p className="font-semibold text-gray-900">{mockData.analytics.mostAbsentStudent.name}</p>
                            <p className="text-sm text-gray-600">{mockData.analytics.mostAbsentStudent.percentage}% attendance</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mark Attendance Tab */}
            {activeTab === 'mark-attendance' && (
              <div className="space-y-6">
                {/* Today's Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                    <p className="text-sm text-gray-600">Present</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                    <p className="text-sm text-gray-600">Absent</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{stats.late}</p>
                    <p className="text-sm text-gray-600">Late</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-600">{stats.unmarked}</p>
                    <p className="text-sm text-gray-600">Unmarked</p>
                  </div>
                </div>

                {/* Student List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Student List - {selectedDate} {selectedClass !== 'all' && `(${selectedClass})`}
                    </h3>
                    <button
                      onClick={handleSubmitAttendance}
                      disabled={isMarkingAttendance || stats.unmarked > 0}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isMarkingAttendance ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Saving...
                        </>
                      ) : (
                        'Save Attendance'
                      )}
                    </button>
                  </div>

                  {stats.unmarked > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <p className="text-yellow-800">
                        <span className="font-medium">{stats.unmarked} students</span> haven't been marked yet. Please mark all students before saving.
                      </p>
                    </div>
                  )}

                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll Number</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {mockData.students
                          .filter(student => selectedClass === 'all' || student.class === selectedClass)
                          .map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-medium text-gray-600">
                                      {student.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{student.name}</p>
                                    <p className="text-sm text-gray-500">{student.attendance}% overall attendance</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">{student.rollNumber}</td>
                              <td className="px-6 py-4 text-sm text-gray-900">{student.class}</td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  {['present', 'absent', 'late'].map((status) => (
                                    <button
                                      key={status}
                                      onClick={() => handleAttendanceChange(student.id, status)}
                                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-colors ${
                                        attendanceData[student.id] === status
                                          ? status === 'present' ? 'bg-green-600 text-white' :
                                            status === 'absent' ? 'bg-red-600 text-white' :
                                            'bg-yellow-600 text-white'
                                          : status === 'present' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                            status === 'absent' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                                            'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                                      }`}
                                    >
                                      {status}
                                    </button>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Student Performance Ranking */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Attendance Ranking</h3>
                    <div className="space-y-3">
                      {mockData.students
                        .sort((a, b) => b.attendance - a.attendance)
                        .slice(0, 10)
                        .map((student, index) => (
                          <div key={student.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0 ? 'bg-yellow-100 text-yellow-800' :
                                index === 1 ? 'bg-gray-100 text-gray-800' :
                                index === 2 ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-50 text-gray-600'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{student.name}</p>
                                <p className="text-sm text-gray-600">{student.class}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${
                                student.attendance >= 90 ? 'text-green-600' : 
                                student.attendance >= 75 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {student.attendance}%
                              </p>
                              <p className="text-xs text-gray-500">{student.present}/{student.totalClasses}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Low Attendance Students */}
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-red-600">⚠️</span>
                      Students Needing Attention
                    </h3>
                    <div className="space-y-3">
                      {mockData.students
                        .filter(student => student.attendance < 80)
                        .sort((a, b) => a.attendance - b.attendance)
                        .map((student) => (
                          <div key={student.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-sm text-gray-600">{student.class} • {student.rollNumber}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-red-600">{student.attendance}%</p>
                              <p className="text-xs text-gray-500">{student.absent} absences</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button className="p-6 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">📊</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Monthly Report</h3>
                      <p className="text-sm text-gray-600">Generate monthly attendance summary</p>
                    </div>
                  </button>

                  <button className="p-6 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">👥</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Student Report</h3>
                      <p className="text-sm text-gray-600">Individual student attendance report</p>
                    </div>
                  </button>

                  <button className="p-6 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <span className="text-xl">📈</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Trend Analysis</h3>
                      <p className="text-sm text-gray-600">Attendance trends and patterns</p>
                    </div>
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option>Select Date Range</option>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Current Month</option>
                      <option>Custom Range</option>
                    </select>
                    
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option>All Classes</option>
                      {mockData.classes.map(classItem => (
                        <option key={classItem.id}>{classItem.name}</option>
                      ))}
                    </select>
                    
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                      <option>All Students</option>
                      <option>Low Attendance (&lt;75%)</option>
                      <option>Good Attendance (75-90%)</option>
                      <option>Excellent Attendance (&gt;90%)</option>
                    </select>
                    
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}

/*
Supabase Database Schema for Teacher Attendance Management:

1. attendance_records table:
   - id: uuid (primary key)
   - student_id: uuid (foreign key to students table)
   - teacher_id: uuid (foreign key to teachers table)
   - class_id: uuid (foreign key to classes table)
   - subject_id: uuid (foreign key to subjects table)
   - attendance_date: date
   - class_time: time
   - status: enum ('present', 'absent', 'late', 'excused')
   - marked_at: timestamp
   - created_at: timestamp
   - updated_at: timestamp

2. classes table:
   - id: uuid (primary key)
   - name: varchar (e.g., "Grade 10A")
   - teacher_id: uuid (foreign key)
   - subject_id: uuid (foreign key)
   - schedule: jsonb (days and times)
   - total_students: integer
   - created_at: timestamp

3. Example API endpoints structure:

// GET /api/teacher/attendance/overview
// Returns overall statistics for teacher's classes

// POST /api/teacher/attendance/mark
// Saves attendance for a specific date and class
{
  "class_id": "uuid",
  "attendance_date": "2024-01-22",
  "attendance_records": [
    {"student_id": "uuid", "status": "present"},
    {"student_id": "uuid", "status": "absent"}
  ]
}

// GET /api/teacher/attendance/analytics
// Returns detailed analytics and reports

// GET /api/teacher/students?class_id=uuid
// Returns students for a specific class

// GET /api/teacher/attendance/history?date_range=7&class_id=uuid
// Returns historical attendance data
*/
