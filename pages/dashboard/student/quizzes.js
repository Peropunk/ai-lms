import { useState } from 'react';
import StudentLayout from '../../../components/layout/StudentLayout';

const mockQuizzesData = {
  pending: [
    { id: 1, title: 'Math Quiz 1', subject: 'Mathematics', dueDate: '2024-01-25', timeLimit: 60, questions: 20, difficulty: 'Medium' },
    { id: 2, title: 'Science Test', subject: 'Science', dueDate: '2024-01-26', timeLimit: 90, questions: 30, difficulty: 'Hard' }
  ],
  completed: [
    { id: 3, title: 'History Quiz', subject: 'History', completedDate: '2024-01-20', score: 85, totalMarks: 100, grade: 'A' },
    { id: 4, title: 'English Essay', subject: 'English', completedDate: '2024-01-18', score: 92, totalMarks: 100, grade: 'A+' }
  ],
  upcoming: [
    { id: 5, title: 'Final Exam - Math', subject: 'Mathematics', scheduledDate: '2024-02-15', timeLimit: 180, questions: 50, difficulty: 'Hard' }
  ]
};

export default function StudentQuizzes() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Quizzes & Tests</h1>
            <p className="text-gray-600">Manage your assessments and track your performance</p>
          </div>
          
          <div className="flex gap-2">
            {['pending', 'completed', 'upcoming'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {mockQuizzesData[activeTab].map((quiz) => (
            <div key={quiz.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Subject:</span>
                      <span className="ml-2 font-medium">{quiz.subject}</span>
                    </div>
                    {quiz.dueDate && (
                      <div>
                        <span className="text-gray-500">Due:</span>
                        <span className="ml-2 font-medium">{quiz.dueDate}</span>
                      </div>
                    )}
                    {quiz.score && (
                      <div>
                        <span className="text-gray-500">Score:</span>
                        <span className="ml-2 font-medium">{quiz.score}/{quiz.totalMarks}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Questions:</span>
                      <span className="ml-2 font-medium">{quiz.questions}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  {activeTab === 'pending' && (
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                      Start Quiz
                    </button>
                  )}
                  {activeTab === 'completed' && (
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      View Results
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  );
}
