import Link from "next/link";
import TeacherLayout from "../../../components/layout/TeacherLayout";
import { useAuth } from "../../../utils/useAuth";

const teacherLinks = [
  { href: "/dashboard/teacher/attendance", label: "Attendance" },
  { href: "/dashboard/teacher/syllabus", label: "Syllabus" },
  { href: "/dashboard/teacher/quizzes", label: "Quizzes" },
  { href: "/dashboard/teacher/performance", label: "Performance" },
  { href: "/dashboard/teacher/leave", label: "Leave" },
  { href: "/dashboard/teacher/salary", label: "Salary" },
];

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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.full_name}!</h2>
        <p className="text-gray-600">Teacher Dashboard - {user.subject && `Subject: ${user.subject}`}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teacherLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition-all duration-200"
          >
            <div className="text-lg font-semibold text-gray-900 mb-2">{link.label}</div>
            <div className="text-sm text-gray-600">Manage {link.label.toLowerCase()}</div>
          </Link>
        ))}
      </div>
    </TeacherLayout>
  );
} 