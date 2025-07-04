// Generated from: features\home.feature
import { test } from "playwright-bdd";

test.describe('Home page', () => {

  test('Display home page', async ({ When, page, Then }) => { 
    await When('I go to "home" page', null, { page }); 
    await Then('I should see the home page displayed', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features\\home.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Action","textWithKeyword":"When I go to \"home\" page","stepMatchArguments":[{"group":{"start":8,"value":"\"home\"","children":[{"start":9,"value":"home","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Outcome","textWithKeyword":"Then I should see the home page displayed","stepMatchArguments":[]}]},
]; // bdd-data-end