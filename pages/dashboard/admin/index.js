import Link from "next/link";
import AdminLayout from "../../../components/layout/AdminLayout";
import { useAuth } from "../../../utils/useAuth";

const adminLinks = [
  { href: "/dashboard/admin/students", label: "Students" },
  { href: "/dashboard/admin/teachers", label: "Teachers" },
  { href: "/dashboard/admin/subjects", label: "Subjects" },
  { href: "/dashboard/admin/classes", label: "Classes" },
  { href: "/dashboard/admin/timetable", label: "Timetable" },
  { href: "/dashboard/admin/fees", label: "Fees" },
  { href: "/dashboard/admin/overview", label: "Overview" },
  { href: "/dashboard/admin/announcements", label: "Announcements" },
  { href: "/dashboard/admin/leaves", label: "Leaves" },
];

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth('admin');

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
    <AdminLayout onLogout={logout}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.full_name}!</h2>
        <p className="text-gray-600">Admin Dashboard - Manage your learning management system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-yellow-300 transition-all duration-200"
          >
            <div className="text-lg font-semibold text-gray-900 mb-2">{link.label}</div>
            <div className="text-sm text-gray-600">Manage {link.label.toLowerCase()}</div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
} 