import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Build Better Habits with Habit Stacking
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Use the power of habit stacking from James Clear's "Atomic Habits" to build new habits
            by linking them to existing actions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-5xl">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Stack Your Habits</h3>
            <p className="text-gray-700">
              Link new habits to existing triggers: "After I [X], I will [Y]"
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-4">🔥</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Track Streaks</h3>
            <p className="text-gray-700">
              Build momentum with automatic streak tracking and visual feedback
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">View Progress</h3>
            <p className="text-gray-700">
              Monitor your habit completion rates and statistics over time
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg max-w-3xl mb-12">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">How It Works</h2>
          <div className="space-y-4 text-gray-800">
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">1</span>
              <p><strong className="text-gray-900">Identify a trigger:</strong> Choose an existing habit or action (e.g., "drink morning coffee")</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">2</span>
              <p><strong className="text-gray-900">Add your new habit:</strong> What you want to do after that trigger (e.g., "do 10 pushups")</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">3</span>
              <p><strong className="text-gray-900">Build chains:</strong> Link multiple habits together to create powerful routines</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">4</span>
              <p><strong className="text-gray-900">Track daily:</strong> Mark habits as complete and watch your streaks grow!</p>
            </div>
          </div>
        </div>

        <Link href="/habits">
          <button className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Get Started →
          </button>
        </Link>

        <div className="mt-12 text-center text-gray-700">
          <p className="text-sm">
            Example: After I <span className="font-semibold text-gray-900">drink my morning coffee</span> → I will{' '}
            <span className="font-semibold text-gray-900">do 10 pushups</span> → I will{' '}
            <span className="font-semibold text-gray-900">meditate for 2 minutes</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;