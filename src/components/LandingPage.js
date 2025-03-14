import React from 'react';
import { CheckCircle, ListChecks } from 'lucide-react';

function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-blue-700 text-white p-6 sm:p-8">
      <div className="text-center max-w-3xl px-6 sm:px-8">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Stay Productive, Stay Organized</h1>
        <p className="text-lg mb-8">
          Manage your to-dos, track progress, and achieve your goals efficiently with our powerful task management platform.
        </p>

        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 shadow-lg">
            <CheckCircle className="text-green-400 w-8 h-8" />
            <p className="text-lg">Add, Edit, and Manage Tasks</p>
          </div>

          <div className="flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 shadow-lg">
            <ListChecks className="text-yellow-400 w-8 h-8" />
            <p className="text-lg">Organize Projects with Sub-tasks</p>
          </div>
        </div>

        <div className="mt-10">
          {/* <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg shadow-md transition-all">
            Get Started
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;