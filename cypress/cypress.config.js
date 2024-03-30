const { defineConfig } = require("cypress");

module.exports = defineConfig({

  defaultCommandTimeout: 6000,
  env:{
    url: "https://rahulshettyacademy.com",
  },
  retries: {
    runMode: 0,
    },

  projectId: "ebbmn2",

  e2e: {
    // specPattern: 'cypress/e2e/*.js'
  },
});