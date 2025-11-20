import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center mb-16 max-w-3xl">
          <h1 className="text-5xl font-semibold text-gray-900 mb-5 tracking-tight">
            Build Better Habits with Habit Stacking
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Use the power of habit stacking from James Clear's "Atomic Habits" to build new habits
            by linking them to existing actions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-5xl w-full">
          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group">
            <div className="text-3xl mb-4">🔗</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Stack Your Habits</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Link new habits to existing triggers: "After I [X], I will [Y]"
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group">
            <div className="text-3xl mb-4">🔥</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Track Streaks</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Build momentum with automatic streak tracking and visual feedback
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200 group">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">View Progress</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Monitor your habit completion rates and statistics over time
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-10 rounded-lg border border-gray-200 max-w-3xl mb-16 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">How It Works</h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="bg-blue-600 text-white rounded-md w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-medium">1</span>
              <p className="text-gray-700 leading-relaxed"><span className="font-medium text-gray-900">Identify a trigger:</span> Choose an existing habit or action (e.g., "drink morning coffee")</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="bg-blue-600 text-white rounded-md w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-medium">2</span>
              <p className="text-gray-700 leading-relaxed"><span className="font-medium text-gray-900">Add your new habit:</span> What you want to do after that trigger (e.g., "do 10 pushups")</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="bg-blue-600 text-white rounded-md w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-medium">3</span>
              <p className="text-gray-700 leading-relaxed"><span className="font-medium text-gray-900">Build chains:</span> Link multiple habits together to create powerful routines</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="bg-blue-600 text-white rounded-md w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-medium">4</span>
              <p className="text-gray-700 leading-relaxed"><span className="font-medium text-gray-900">Track daily:</span> Mark habits as complete and watch your streaks grow!</p>
            </div>
          </div>
        </div>

        <Link href="/habits">
          <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow">
            Get Started →
          </button>
        </Link>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 leading-relaxed">
            Example: After I <span className="font-medium text-gray-700">drink my morning coffee</span> → I will{' '}
            <span className="font-medium text-gray-700">do 10 pushups</span> → I will{' '}
            <span className="font-medium text-gray-700">meditate for 2 minutes</span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;