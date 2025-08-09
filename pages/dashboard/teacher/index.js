import TeacherLayout from "../../../components/layout/TeacherLayout";
import { useAuth } from "../../../utils/useAuth";

// Mock data for teacher dashboard
const mockData = {
  todayClasses: [
    { id: 1, subject: "Mathematics", time: "09:00 AM", class: "Grade 10A", students: 28, status: "Ongoing" },
    { id: 2, subject: "Mathematics", time: "11:00 AM", class: "Grade 10B", students: 25, status: "Upcoming" },
    { id: 3, subject: "Mathematics", time: "02:00 PM", class: "Grade 9A", students: 30, status: "Upcoming" },
  ],
  recentQuizzes: [
    { id: 1, title: "Algebra Quiz", class: "Grade 10A", submissions: 25, totalStudents: 28, avgScore: "78%", dueDate: "Today" },
    { id: 2, title: "Geometry Test", class: "Grade 10B", submissions: 20, totalStudents: 25, avgScore: "82%", dueDate: "Tomorrow" },
    { id: 3, title: "Basic Math Quiz", class: "Grade 9A", submissions: 30, totalStudents: 30, avgScore: "85%", dueDate: "Completed" },
  ],
  attendance: [
    { class: "Grade 10A", present: 25, total: 28, percentage: "89%" },
    { class: "Grade 10B", present: 23, total: 25, percentage: "92%" },
    { class: "Grade 9A", present: 28, total: 30, percentage: "93%" },
  ],
  announcements: [
    { id: 1, title: "Parent-Teacher Meeting Schedule", date: "2024-01-22", priority: "High", audience: "All Classes" },
    { id: 2, title: "Mid-term Exam Schedule Released", date: "2024-01-20", priority: "Medium", audience: "Grade 10" },
    { id: 3, title: "New Teaching Materials Available", date: "2024-01-18", priority: "Low", audience: "Math Department" },
  ],
  leaves: [
    { id: 1, date: "2024-01-25", type: "Sick Leave", status: "Approved", coverage: "Ms. Johnson" },
    { id: 2, date: "2024-02-05", type: "Personal Leave", status: "Pending", coverage: "TBD" },
    { id: 3, date: "2024-01-15", type: "Professional Development", status: "Approved", coverage: "Mr. Davis" },
  ],
  performance: {
    totalStudents: 83,
    averageAttendance: "91%",
    averageGrade: "82%",
    classesCompleted: 45,
    upcomingDeadlines: 3
  }
};

export default function TeacherDashboard() {
  const { user, loading, logout } = useAuth('teacher');

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
    return null; // Will redirect to login
  }

  return (
    <TeacherLayout onLogout={logout}>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.full_name}! 👨‍🏫</h1>
          <p className="text-gray-600">Here's your teaching dashboard overview {user.subject && `- ${user.subject} Department`}</p>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Today's Classes</p>
                <p className="text-2xl font-bold">{mockData.todayClasses.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">🏫</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Students</p>
                <p className="text-2xl font-bold">{mockData.performance.totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Active Quizzes</p>
                <p className="text-2xl font-bold">{mockData.recentQuizzes.filter(q => q.dueDate !== 'Completed').length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">📝</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Avg Attendance</p>
                <p className="text-2xl font-bold">{mockData.performance.averageAttendance}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">Avg Grade</p>
                <p className="text-2xl font-bold">{mockData.performance.averageGrade}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Classes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Classes</h3>
              <span className="text-sm text-green-600 font-medium cursor-pointer hover:text-green-800">View Schedule</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-600 font-medium py-2">Class</th>
                    <th className="text-left text-gray-600 font-medium py-2">Time</th>
                    <th className="text-left text-gray-600 font-medium py-2">Students</th>
                    <th className="text-left text-gray-600 font-medium py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.todayClasses.map((class_item) => (
                    <tr key={class_item.id} className="border-b border-gray-50">
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-gray-900">{class_item.class}</p>
                          <p className="text-gray-500 text-xs">{class_item.subject}</p>
                        </div>
                      </td>
                      <td className="py-3 text-gray-700">{class_item.time}</td>
                      <td className="py-3 text-gray-700">{class_item.students}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          class_item.status === 'Ongoing' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {class_item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Quizzes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quiz Management</h3>
              <span className="text-sm text-purple-600 font-medium cursor-pointer hover:text-purple-800">Manage Quizzes</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-600 font-medium py-2">Quiz</th>
                    <th className="text-left text-gray-600 font-medium py-2">Submissions</th>
                    <th className="text-left text-gray-600 font-medium py-2">Avg Score</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.recentQuizzes.map((quiz) => (
                    <tr key={quiz.id} className="border-b border-gray-50">
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-gray-900">{quiz.title}</p>
                          <p className="text-gray-500 text-xs">{quiz.class}</p>
                        </div>
                      </td>
                      <td className="py-3 text-gray-700">{quiz.submissions}/{quiz.totalStudents}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          parseInt(quiz.avgScore) >= 85 
                            ? 'bg-green-100 text-green-800' 
                            : parseInt(quiz.avgScore) >= 70
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {quiz.avgScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Class Attendance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
              <span className="text-sm text-orange-600 font-medium cursor-pointer hover:text-orange-800">Mark Attendance</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-600 font-medium py-2">Class</th>
                    <th className="text-left text-gray-600 font-medium py-2">Present/Total</th>
                    <th className="text-left text-gray-600 font-medium py-2">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.attendance.map((record, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-3 font-medium text-gray-900">{record.class}</td>
                      <td className="py-3 text-gray-700">{record.present}/{record.total}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          parseInt(record.percentage) >= 90 
                            ? 'bg-green-100 text-green-800' 
                            : parseInt(record.percentage) >= 75
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.percentage}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
              <span className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-800">Create New</span>
            </div>
            <div className="space-y-3">
              {mockData.announcements.map((announcement) => (
                <div key={announcement.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-2 h-2 rounded-full ${
                      announcement.priority === 'High' 
                        ? 'bg-red-400' 
                        : announcement.priority === 'Medium'
                        ? 'bg-yellow-400'
                        : 'bg-green-400'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{announcement.title}</p>
                    <p className="text-gray-500 text-xs">{announcement.date} • {announcement.audience}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leave Management Section */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Leave Management</h3>
            <span className="text-sm text-indigo-600 font-medium cursor-pointer hover:text-indigo-800">Apply for Leave</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-gray-600 font-medium py-2">Date</th>
                  <th className="text-left text-gray-600 font-medium py-2">Type</th>
                  <th className="text-left text-gray-600 font-medium py-2">Status</th>
                  <th className="text-left text-gray-600 font-medium py-2">Coverage</th>
                </tr>
              </thead>
              <tbody>
                {mockData.leaves.map((leave) => (
                  <tr key={leave.id} className="border-b border-gray-50">
                    <td className="py-3 font-medium text-gray-900">{leave.date}</td>
                    <td className="py-3 text-gray-700">{leave.type}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        leave.status === 'Approved' 
                          ? 'bg-green-100 text-green-800' 
                          : leave.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-700">{leave.coverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">✅</span>
              <span className="text-sm font-medium text-gray-700">Mark Attendance</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">📝</span>
              <span className="text-sm font-medium text-gray-700">Create Quiz</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">📊</span>
              <span className="text-sm font-medium text-gray-700">View Performance</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">📚</span>
              <span className="text-sm font-medium text-gray-700">Manage Syllabus</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🏠</span>
              <span className="text-sm font-medium text-gray-700">Apply Leave</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">💰</span>
              <span className="text-sm font-medium text-gray-700">View Salary</span>
            </button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
