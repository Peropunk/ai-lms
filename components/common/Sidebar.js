import Link from "next/link";
import { useRouter } from "next/router";

const linksByRole = {
  student: [
    { href: "/dashboard/student", label: "Dashboard Home", icon: "🏠" },
    { href: "/dashboard/student/classes", label: "Classes", icon: "📚" },
    { href: "/dashboard/student/attendance", label: "Attendance", icon: "✅" },
    { href: "/dashboard/student/quizzes", label: "Quizzes", icon: "📝" },
    { href: "/dashboard/student/wallet", label: "Wallet", icon: "💰" },
    { href: "/dashboard/student/store", label: "Store", icon: "🛍️" },
    { href: "/dashboard/student/announcements", label: "Announcements", icon: "📢" },
    { href: "/dashboard/student/parent-view", label: "Parent View", icon: "👪" },
  ],
  teacher: [
    { href: "/dashboard/teacher", label: "Dashboard Home", icon: "🏠" },
    { href: "/dashboard/teacher/attendance", label: "Attendance", icon: "✅" },
    { href: "/dashboard/teacher/syllabus", label: "Syllabus", icon: "📋" },
    { href: "/dashboard/teacher/quizzes", label: "Quizzes", icon: "📝" },
    { href: "/dashboard/teacher/performance", label: "Performance", icon: "📊" },
    { href: "/dashboard/teacher/leave", label: "Leave", icon: "🏖️" },
    { href: "/dashboard/teacher/salary", label: "Salary", icon: "💵" },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Dashboard Home", icon: "🏠" },
    { href: "/dashboard/admin/students", label: "Students", icon: "🎓" },
    { href: "/dashboard/admin/teachers", label: "Teachers", icon: "👩‍🏫" },
    { href: "/dashboard/admin/subjects", label: "Subjects", icon: "📖" },
    { href: "/dashboard/admin/classes", label: "Classes", icon: "🏫" },
    { href: "/dashboard/admin/timetable", label: "Timetable", icon: "⏰" },
    { href: "/dashboard/admin/fees", label: "Fees", icon: "💳" },
    { href: "/dashboard/admin/overview", label: "Overview", icon: "📈" },
    { href: "/dashboard/admin/announcements", label: "Announcements", icon: "📢" },
    { href: "/dashboard/admin/leaves", label: "Leaves", icon: "📅" },
  ],
};

const roleColors = {
  student: {
    bg: "bg-gradient-to-b from-purple-50 to-pink-50",
    border: "border-purple-200",
    active: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    hover: "hover:bg-purple-100",
    text: "text-purple-700"
  },
  teacher: {
    bg: "bg-gradient-to-b from-blue-50 to-indigo-50",
    border: "border-blue-200",
    active: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
    hover: "hover:bg-blue-100",
    text: "text-blue-700"
  },
  admin: {
    bg: "bg-gradient-to-b from-slate-50 to-gray-50",
    border: "border-slate-200",
    active: "bg-gradient-to-r from-slate-700 to-slate-900 text-white",
    hover: "hover:bg-slate-100",
    text: "text-slate-700"
  }
};

export default function Sidebar({ role = "student", onCloseSidebar }) {
  const router = useRouter();
  const links = linksByRole[role] || [];
  const colors = roleColors[role];

  const isActive = (href) => {
    if (href === `/dashboard/${role}`) {
      return router.pathname === href;
    }
    return router.pathname.startsWith(href);
  };

  const getRoleTitle = () => {
    return role.charAt(0).toUpperCase() + role.slice(1) + " Portal";
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (onCloseSidebar) {
      onCloseSidebar();
    }
  };

  return (
    <aside className={`w-72 min-h-screen ${colors.bg} ${colors.border} border-r`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${colors.active} rounded-lg flex items-center justify-center`}>
              <span className="text-xl">
                {role === 'student' ? '🎓' : role === 'teacher' ? '👩‍🏫' : '🔐'}
              </span>
            </div>
            <div>
              <h2 className={`font-bold text-lg ${colors.text}`}>AI LMS</h2>
              <p className="text-sm text-gray-600">{getRoleTitle()}</p>
            </div>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onCloseSidebar}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${active
                      ? colors.active
                      : `${colors.text} ${colors.hover}`
                    }
                  `}
                >
                  <span className={`text-lg ${active ? 'animate-bounce-gentle' : 'group-hover:scale-110 transition-transform'}`}>
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.label}</span>
                  {active && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-gray-200/50">
        <div className={`p-3 rounded-lg ${colors.hover} transition-colors`}>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>System Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
