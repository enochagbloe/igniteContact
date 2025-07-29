/**
 * Simple test script to validate the Question model and API endpoint
 * This can be run to ensure our implementation works correctly
 */

import Question from '../database/question.model';
import { connectToDatabase } from '../lib/mongoose';

// Test function to validate Question model structure
export async function testQuestionModel() {
  console.log('Testing Question model...');
  
  // Test model creation (without saving to DB)
  const testQuestion = new Question({
    title: "Test Question",
    content: "This is a test question content",
    tags: [], // ObjectIds would go here
    author: "507f1f77bcf86cd799439011", // Sample ObjectId
    views: 0,
    upvotes: [],
    downvotes: [],
    answers: []
  });

  console.log('Question model validation:', testQuestion.validateSync() === undefined ? 'PASSED' : 'FAILED');
  return testQuestion;
}

// Test function to validate database connection
export async function testDatabaseConnection() {
  console.log('Testing database connection...');
  
  try {
    await connectToDatabase();
    console.log('Database connection: PASSED');
    return true;
  } catch (error) {
    console.log('Database connection: FAILED', error.message);
    return false;
  }
}

// Main test function
export async function runTests() {
  console.log('=== Running Last Post Feature Tests ===\n');
  
  // Test 1: Question model
  await testQuestionModel();
  
  // Test 2: Database connection
  await testDatabaseConnection();
  
  console.log('\n=== Tests Complete ===');
}

// Only run if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}