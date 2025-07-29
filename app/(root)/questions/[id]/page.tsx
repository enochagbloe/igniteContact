import React from 'react';
import { notFound } from 'next/navigation';

interface QuestionPageProps {
  params: Promise<{
    id: string;
  }>;
}

const QuestionPage = async ({ params }: QuestionPageProps) => {
  // This is a placeholder page for individual question viewing
  // For now, it will just show the question ID
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Question Details</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Question ID: {id}
        </p>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          This is a placeholder page for viewing individual questions. 
          The question details functionality will be implemented in future updates.
        </p>
      </div>
    </div>
  );
};

export default QuestionPage;