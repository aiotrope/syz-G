import { defineConfig } from 'cypress'
import mongo from 'cypress-mongodb'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      mongo.configurePlugin(on)
    },
  },
  env: {
    mongodb: {
      uri: 'mongodb://127.0.0.1:27017',
    },
    baseUrl: 'http://localhost:5173',
  },
})
