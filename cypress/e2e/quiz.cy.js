
import {Quiz } from '../types/quiz';

describe('Quiz Applic}ation E2E', () => {
  beforeEach(() => {
    cy.fixture('questions').then((mockQuestions) => {
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        body: mockQuestions
      }).as('getMockQuestions');
    });

    // Visit the app URL before each test
    cy.visit('/');
  });

  it('displays the start button and begins the quiz', () => {
    cy.contains('Start Quiz').should('be.visible');
    cy.contains('Start Quiz').click();
    cy.wait('@getMockQuestions');

    // Verify the first question appears
    cy.get('h2').should('contain', 'What is 2 + 2?');
  });

  it('allows the user to answer questions and shows the final score', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getMockQuestions');

    // Answer the first question correctly
    cy.contains('4').click();
    cy.get('h2').should('contain', 'What is 3 + 5?');

    // Answer the second question correctly
    cy.contains('8').click();
    cy.get('h2').should('contain', 'Quiz Completed');

    // Check the final score display
    cy.get('[data-cy="score"]').should('contain', 'Your score: 2/2');
  });

  it('allows the user to restart the quiz after completion', () => {
    cy.contains('Start Quiz').click();
    cy.wait('@getMockQuestions');

    // Complete the quiz
    cy.contains('4').click();
    cy.contains('8').click();

    // Restart the quiz
    cy.get('[data-cy="start-quiz"]').click();

    // Ensure we are back to the start screen
    cy.contains('Start Quiz').should('be.visible');
    cy.contains('Start Quiz').click();
    cy.wait('@getMockQuestions');

    // Verify the quiz restarts correctly
    cy.get('h2').should('contain', 'What is 2 + 2?');
  });
});
