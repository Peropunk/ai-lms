import { useState } from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

const mockAnnouncementsData = [
  {
    id: 1,
    title: 'Winter Break Notice',
    content: 'School will be closed from December 25th to January 2nd for winter break.',
    date: '2024-01-15',
    priority: 'High',
    category: 'General',
    author: 'Principal Johnson'
  },
  {
    id: 2,
    title: 'Sports Day Registration',
    content: 'Registration for annual sports day is now open. Please register by January 30th.',
    date: '2024-01-18',
    priority: 'Medium',
    category: 'Sports',
    author: 'Coach Wilson'
  },
  {
    id: 3,
    title: 'Library Hours Update',
    content: 'Library hours have been extended. Now open until 8 PM on weekdays.',
    date: '2024-01-20',
    priority: 'Low',
    category: 'Academic',
    author: 'Librarian Smith'
  }
];

export default function StudentAnnouncements() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'General', 'Academic', 'Sports', 'Events'];

  const filteredAnnouncements = selectedCategory === 'All' 
    ? mockAnnouncementsData 
    : mockAnnouncementsData.filter(announcement => announcement.category === selectedCategory);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600">Stay updated with school news and important notices</p>
          </div>
          
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 mt-1">
                      <span className={`inline-block w-3 h-3 rounded-full ${
                        announcement.priority === 'High' ? 'bg-red-400' :
                        announcement.priority === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
                      }`}></span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                      <p className="text-gray-700 mb-3">{announcement.content}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span>📅 {announcement.date}</span>
                        <span>👤 {announcement.author}</span>
                        <span>📂 {announcement.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(announcement.priority)}`}>
                  {announcement.priority} Priority
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
