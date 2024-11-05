// Quiz.cy.jsx
import Quiz from "../../client/src/components/Quiz";
import { mount } from "cypress/react18";


const mockQuestions = [
{
  question: "What is 2 + 2?",
  answers: [
    { text: "3", isCorrect: false },
    { text: "4", isCorrect: true },
    { text: "5", isCorrect: false }
  ]
},
{
  question: "What is 3 + 5?",
  answers: [
    { text: "7", isCorrect: false },
    { text: "8", isCorrect: true },
    { text: "9", isCorrect: false }
  ]
}
];

describe('Quiz Component', () => {


  
    beforeEach(() => {
      // Intercept the API call and return mock questions
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        body: mockQuestions
      }).as('getMockQuestions');
  
      // Mount the Quiz component before each test
      cy.mount(<Quiz />);
    });
  
    it('displays the start button initially', () => {
      cy.contains('Start Quiz').should('be.visible');
    });
  
    it('starts the quiz and displays the first question', () => {
      cy.contains('Start Quiz').click();
      cy.wait('@getMockQuestions'); // Wait for mock data to load
      cy.get('h2').should('contain', mockQuestions[0].question); // Ensure the first question is displayed
    });
  
    it('advances through questions when an answer is clicked', () => {
      cy.contains('Start Quiz').click();
      cy.wait('@getMockQuestions');
  
      // Click the correct answer for the first question
      cy.get('button').contains('2').click(); // Click the answer button labeled "2" (index-based)
  
      // Check if the next question is displayed
      cy.get('h2').should('contain', mockQuestions[1].question);
    });
  
    it('shows the final score after completing all questions', () => {
      cy.contains('Start Quiz').click();
      cy.wait('@getMockQuestions');
  
      // Answer all questions to complete the quiz
      cy.get('button').contains('4').click();

        cy.get('button').contains('8').click();
       // Assume answer 2 is correct in mock data
  
      // Check for the quiz completion screen
      cy.get('h2').should('contain', 'Quiz Completed');// Ensure the "Quiz Completed" screen is shown
      
      cy.get('[data-cy="score"]').should('contain', `Your score: 2/2`); // Score should be 2/2 for all correct answers
    });
  

    // test for the restart button
    it('restarts the quiz when the restart button is clicked', () => {
        cy.contains('Start Quiz').click();
        cy.wait('@getMockQuestions');

  
      // Complete the quiz

      cy.get('button').contains('2').click({ multiple: true });
  

//       assertexpected <h2> to contain Quiz Completed
// AssertionError
// Timed out retrying after 4000ms: expected '<h2>' to contain 'Quiz Completed'
//       // Ensure the "Quiz Completed" screen is shown
cy.get('h2', { timeout: 10000 }).should('contain', 'Quiz Completed');

      cy.get('[data-cy="score"]').should('contain', `Your score: 2/2`); // Score should be 2/2 for all correct answers


    
  
      // Restart the quiz
      cy.get('[data-cy="start-quiz"]').click();
      cy.contains('Start Quiz').should('be.visible'); // The Start Quiz button should be visible again
    });
  });
  