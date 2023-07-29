import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 9000,
  e2e: {
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
