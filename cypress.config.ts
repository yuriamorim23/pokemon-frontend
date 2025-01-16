import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.ts",
    defaultCommandTimeout: 10000, // increase time
    setupNodeEvents(on, config) {
      // Configuração de eventos, se necessário
    },
  },
});
