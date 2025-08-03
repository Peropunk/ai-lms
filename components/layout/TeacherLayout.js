import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';

export default function TeacherLayout({ children, onLogout }) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar role="teacher" />
      <div className="flex-1 flex flex-col">
        <Navbar onLogout={onLogout} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
} 