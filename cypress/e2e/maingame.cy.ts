describe('Pokemon Game - Cypress Tests', () => {
    beforeEach(() => {
        cy.visit('/'); // Visits the main page of the application
    });

    it('Should display the Start Game button on the initial screen', () => {
        cy.contains('button', 'Start Game').should('be.visible');
        cy.get('.score').should('not.exist'); // The game has not started yet
    });

    it('Should start the game when clicking Start Game', () => {
        cy.contains('button', 'Start Game').click();
        cy.get('.score').should('be.visible'); // The scoreboard should appear
        cy.get('.timer').should('be.visible'); // The timer should appear
    });

    it('Should load a Pokémon when the game starts', () => {
        cy.contains('button', 'Start Game').click();
        cy.get('.silhouette img', { timeout: 10000 }).should('be.visible');
    });

    it('Should display the answer options', () => {
        cy.contains('button', 'Start Game').click();
        cy.get('.options button', { timeout: 10000 }).should('have.length', 3); // There should be 3 option buttons
    });

    it('Should allow selecting an option and display the result', () => {
        cy.contains('button', 'Start Game').click();

        // Waits for options to load
        cy.get('.options button', { timeout: 10000 }).first().click();
        
        // Should show the correct or incorrect answer
        cy.get('.message').should('be.visible');
    });

    it('Should restart the game when the Restart button is pressed', () => {
        cy.contains('button', 'Start Game').click();

        // Wait for game elements to appear
        cy.get('.timer').should('be.visible');
        cy.get('.score').should('be.visible');

        // Simulate waiting for the game to end (adjust timing if needed)
        cy.wait(125000); // Waits longer than game duration (120s)

        // Ensure the game-over message appears
        cy.get('.game-over', { timeout: 10000 }).should('be.visible');

        // Click the Restart Game button
        cy.get('.game-over button').should('contain', 'Restart Game').click();

        // Ensure the game resets by checking that the score is 0
        cy.get('.score').should('contain', 'Score: 0');
    });
});
