import { useState } from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

// Mock data - to be replaced with Supabase queries
const mockClassesData = {
  todayClasses: [
    {
      id: 1,
      subject: 'Mathematics',
      teacher: 'Mr. Smith',
      time: '09:00 AM - 10:00 AM',
      room: 'Room 101',
      status: 'ongoing',
      description: 'Advanced Algebra - Quadratic Equations',
      meetingLink: 'https://meet.google.com/abc-xyz'
    },
    {
      id: 2,
      subject: 'Science',
      teacher: 'Ms. Johnson',
      time: '11:00 AM - 12:00 PM',
      room: 'Lab 201',
      status: 'upcoming',
      description: 'Physics - Laws of Motion',
      meetingLink: 'https://meet.google.com/def-uvw'
    },
    {
      id: 3,
      subject: 'English',
      teacher: 'Mrs. Davis',
      time: '02:00 PM - 03:00 PM',
      room: 'Room 105',
      status: 'upcoming',
      description: 'Literature - Shakespeare Studies',
      meetingLink: 'https://meet.google.com/ghi-rst'
    }
  ],
  weeklySchedule: [
    {
      day: 'Monday',
      classes: [
        { subject: 'Mathematics', time: '09:00 AM', teacher: 'Mr. Smith', room: 'Room 101' },
        { subject: 'Science', time: '11:00 AM', teacher: 'Ms. Johnson', room: 'Lab 201' },
        { subject: 'English', time: '02:00 PM', teacher: 'Mrs. Davis', room: 'Room 105' }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { subject: 'History', time: '09:00 AM', teacher: 'Mr. Brown', room: 'Room 102' },
        { subject: 'Mathematics', time: '10:30 AM', teacher: 'Mr. Smith', room: 'Room 101' },
        { subject: 'Physical Education', time: '03:00 PM', teacher: 'Coach Wilson', room: 'Gymnasium' }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        { subject: 'Science', time: '09:30 AM', teacher: 'Ms. Johnson', room: 'Lab 201' },
        { subject: 'Art', time: '11:00 AM', teacher: 'Ms. Garcia', room: 'Art Studio' },
        { subject: 'English', time: '01:00 PM', teacher: 'Mrs. Davis', room: 'Room 105' }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        { subject: 'Mathematics', time: '08:30 AM', teacher: 'Mr. Smith', room: 'Room 101' },
        { subject: 'History', time: '10:00 AM', teacher: 'Mr. Brown', room: 'Room 102' },
        { subject: 'Music', time: '02:30 PM', teacher: 'Ms. Taylor', room: 'Music Room' }
      ]
    },
    {
      day: 'Friday',
      classes: [
        { subject: 'Science', time: '09:00 AM', teacher: 'Ms. Johnson', room: 'Lab 201' },
        { subject: 'English', time: '11:30 AM', teacher: 'Mrs. Davis', room: 'Room 105' },
        { subject: 'Computer Science', time: '01:30 PM', teacher: 'Mr. Lee', room: 'Computer Lab' }
      ]
    }
  ],
  subjects: [
    {
      id: 1,
      name: 'Mathematics',
      teacher: 'Mr. Smith',
      credits: 4,
      progress: 75,
      nextClass: '2024-01-23 09:00:00',
      description: 'Advanced Mathematics covering Algebra, Geometry, and Calculus',
      totalClasses: 40,
      attendedClasses: 36
    },
    {
      id: 2,
      name: 'Science',
      teacher: 'Ms. Johnson',
      credits: 4,
      progress: 82,
      nextClass: '2024-01-23 11:00:00',
      description: 'Physics, Chemistry, and Biology fundamentals',
      totalClasses: 38,
      attendedClasses: 35
    },
    {
      id: 3,
      name: 'English',
      teacher: 'Mrs. Davis',
      credits: 3,
      progress: 88,
      nextClass: '2024-01-23 14:00:00',
      description: 'English Literature and Language Arts',
      totalClasses: 36,
      attendedClasses: 34
    },
    {
      id: 4,
      name: 'History',
      teacher: 'Mr. Brown',
      credits: 3,
      progress: 70,
      nextClass: '2024-01-24 09:00:00',
      description: 'World History and Social Studies',
      totalClasses: 32,
      attendedClasses: 28
    }
  ]
};

export default function StudentClasses() {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01 ${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">My Classes</h1>
            <p className="text-gray-600">Manage your class schedule and subjects</p>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'today'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Weekly Schedule
            </button>
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'subjects'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Subjects
            </button>
          </div>
        </div>

        {/* Today's Classes */}
        {activeTab === 'today' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Today's Classes</h2>
              <p className="text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <div className="grid gap-4">
              {mockClassesData.todayClasses.map((classItem) => (
                <div key={classItem.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{classItem.subject}</h3>
                          <p className="text-gray-600">{classItem.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(classItem.status)}`}>
                          {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">👩‍🏫</span>
                          <span className="text-gray-700">{classItem.teacher}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">🕒</span>
                          <span className="text-gray-700">{classItem.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">📍</span>
                          <span className="text-gray-700">{classItem.room}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Join Class
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Schedule */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Weekly Schedule</h2>
              <p className="text-gray-600">Your complete class timetable</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockClassesData.weeklySchedule.map((day, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{day.day}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="grid gap-2">
                          {day.classes.map((classItem, classIndex) => (
                            <div key={classIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-purple-600">{classItem.time}</span>
                                <span className="text-sm font-medium text-gray-900">{classItem.subject}</span>
                                <span className="text-sm text-gray-600">{classItem.teacher}</span>
                              </div>
                              <span className="text-sm text-gray-500">{classItem.room}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* All Subjects */}
        {activeTab === 'subjects' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockClassesData.subjects.map((subject) => (
              <div key={subject.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{subject.name}</h3>
                    <p className="text-gray-600">{subject.teacher}</p>
                  </div>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {subject.credits} Credits
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">{subject.description}</p>
                
                <div className="space-y-3">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Course Progress</span>
                      <span className="text-sm font-medium text-gray-900">{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Attendance */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Attendance</span>
                    <span className="font-medium text-gray-900">
                      {subject.attendedClasses}/{subject.totalClasses} 
                      ({Math.round((subject.attendedClasses / subject.totalClasses) * 100)}%)
                    </span>
                  </div>
                  
                  {/* Next Class */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Next Class</span>
                    <span className="font-medium text-purple-600">
                      {new Date(subject.nextClass).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => setSelectedSubject(subject)}
                    className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                  >
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Resources
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">📅</span>
              <span className="text-sm font-medium text-gray-700">View Calendar</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">📚</span>
              <span className="text-sm font-medium text-gray-700">Study Materials</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">📝</span>
              <span className="text-sm font-medium text-gray-700">Assignments</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-2xl">🎥</span>
              <span className="text-sm font-medium text-gray-700">Recordings</span>
            </button>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

/*
Supabase Database Schema for Classes:

1. subjects table:
   - id: uuid (primary key)
   - name: varchar
   - description: text
   - credits: integer
   - teacher_id: uuid (foreign key to teachers table)
   - created_at: timestamp

2. class_schedules table:
   - id: uuid (primary key)
   - subject_id: uuid (foreign key to subjects table)
   - day_of_week: integer (0-6, Sunday to Saturday)
   - start_time: time
   - end_time: time
   - room: varchar
   - created_at: timestamp

3. class_sessions table:
   - id: uuid (primary key)
   - subject_id: uuid (foreign key to subjects table)
   - date: date
   - start_time: time
   - end_time: time
   - room: varchar
   - meeting_link: varchar
   - status: enum ('scheduled', 'ongoing', 'completed', 'cancelled')
   - description: text

Example Supabase queries:

const getTodayClasses = async (studentId) => {
  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase
    .from('class_sessions')
    .select('*, subjects(name, teachers(name))')
    .eq('date', today)
    .in('subject_id', studentSubjectIds)
    .order('start_time');
  return data;
};

const getWeeklySchedule = async (studentId) => {
  const { data } = await supabase
    .from('class_schedules')
    .select('*, subjects(name, teachers(name))')
    .in('subject_id', studentSubjectIds)
    .order('day_of_week, start_time');
  return data;
};

const getStudentSubjects = async (studentId) => {
  const { data } = await supabase
    .from('student_subjects')
    .select('*, subjects(*, teachers(name))')
    .eq('student_id', studentId);
  return data;
};
*/
