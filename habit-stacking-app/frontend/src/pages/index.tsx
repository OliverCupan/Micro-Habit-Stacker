import React from 'react';
import Layout from '../components/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to Habit Stacking</h1>
        <p className="text-lg text-center mb-8">
          Build better habits by stacking them together. Start your journey today!
        </p>
        <a href="/habits" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Habits
        </a>
      </div>
    </Layout>
  );
};

export default Home;