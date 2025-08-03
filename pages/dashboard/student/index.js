import StudentLayout from "../../../components/layout/StudentLayout";
import { useAuth } from "../../../utils/useAuth";

// Mock data for dashboard snippets
const mockData = {
  recentClasses: [
    { id: 1, subject: "Mathematics", time: "09:00 AM", status: "Ongoing", teacher: "Mr. Smith" },
    { id: 2, subject: "Science", time: "11:00 AM", status: "Upcoming", teacher: "Ms. Johnson" },
    { id: 3, subject: "English", time: "02:00 PM", status: "Upcoming", teacher: "Mrs. Davis" },
  ],
  recentQuizzes: [
    { id: 1, subject: "Math Quiz 1", dueDate: "Today", status: "Pending", score: "-" },
    { id: 2, subject: "Science Test", dueDate: "Tomorrow", status: "Available", score: "-" },
    { id: 3, subject: "History Quiz", dueDate: "Completed", status: "Completed", score: "85%" },
  ],
  attendance: [
    { month: "January", present: 18, total: 20, percentage: "90%" },
    { month: "February", present: 19, total: 20, percentage: "95%" },
    { month: "March", present: 17, total: 20, percentage: "85%" },
  ],
  announcements: [
    { id: 1, title: "Winter Break Notice", date: "2024-01-15", priority: "High" },
    { id: 2, title: "Sports Day Registration", date: "2024-01-18", priority: "Medium" },
    { id: 3, title: "Library Hours Update", date: "2024-01-20", priority: "Low" },
  ],
  wallet: {
    balance: 1250,
    lastTransaction: "Lunch Payment - $15",
    recentTransactions: [
      { id: 1, description: "Lunch Payment", amount: -15, date: "Today" },
      { id: 2, description: "Book Purchase", amount: -45, date: "Yesterday" },
      { id: 3, description: "Top-up", amount: 100, date: "Jan 18" },
    ]
  }
};

export default function StudentDashboard() {
  const { user, loading, logout } = useAuth('student');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <StudentLayout onLogout={logout}>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.full_name}! 👋</h1>
          <p className="text-gray-600">Here's your learning dashboard overview {user.class && `- ${user.class}`}</p>
        </div>

        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Today's Classes</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Attendance</p>
                <p className="text-2xl font-bold">90%</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Pending Quizzes</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">📝</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Wallet Balance</p>
                <p className="text-2xl font-bold">${mockData.wallet.balance}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">💰</span>
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
              <span className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-800">View All</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-600 font-medium py-2">Subject</th>
                    <th className="text-left text-gray-600 font-medium py-2">Time</th>
                    <th className="text-left text-gray-600 font-medium py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.recentClasses.map((class_item) => (
                    <tr key={class_item.id} className="border-b border-gray-50">
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-gray-900">{class_item.subject}</p>
                          <p className="text-gray-500 text-xs">{class_item.teacher}</p>
                        </div>
                      </td>
                      <td className="py-3 text-gray-700">{class_item.time}</td>
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
              <h3 className="text-lg font-semibold text-gray-900">Recent Quizzes</h3>
              <span className="text-sm text-purple-600 font-medium cursor-pointer hover:text-purple-800">View All</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-600 font-medium py-2">Quiz</th>
                    <th className="text-left text-gray-600 font-medium py-2">Due</th>
                    <th className="text-left text-gray-600 font-medium py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.recentQuizzes.map((quiz) => (
                    <tr key={quiz.id} className="border-b border-gray-50">
                      <td className="py-3">
                        <p className="font-medium text-gray-900">{quiz.subject}</p>
                      </td>
                      <td className="py-3 text-gray-700">{quiz.dueDate}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          quiz.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : quiz.status === 'Pending'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {quiz.score !== '-' ? quiz.score : quiz.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Attendance Overview</h3>
              <span className="text-sm text-green-600 font-medium cursor-pointer hover:text-green-800">View Details</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-600 font-medium py-2">Month</th>
                    <th className="text-left text-gray-600 font-medium py-2">Present/Total</th>
                    <th className="text-left text-gray-600 font-medium py-2">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.attendance.map((record, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="py-3 font-medium text-gray-900">{record.month}</td>
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

          {/* Recent Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Announcements</h3>
              <span className="text-sm text-orange-600 font-medium cursor-pointer hover:text-orange-800">View All</span>
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
                    <p className="text-gray-500 text-xs">{announcement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">📚</span>
              <span className="text-sm font-medium text-gray-700">View Classes</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">📝</span>
              <span className="text-sm font-medium text-gray-700">Take Quiz</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">💰</span>
              <span className="text-sm font-medium text-gray-700">Check Wallet</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">📊</span>
              <span className="text-sm font-medium text-gray-700">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
