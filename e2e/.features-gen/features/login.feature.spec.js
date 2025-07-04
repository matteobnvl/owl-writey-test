// Generated from: features\login.feature
import { test } from "playwright-bdd";

test.describe('Login page', () => {

  test('Connexion with valid credentials', async ({ Given, page, When, Then }) => { 
    await Given('I am on the login page', null, { page }); 
    await When('I log in with user "pseudo"', null, { page }); 
    await Then('I should see the heading "Mes Romans"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features\\login.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am on the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I log in with user \"pseudo\"","stepMatchArguments":[{"group":{"start":19,"value":"\"pseudo\"","children":[{"start":20,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the heading \"Mes Romans\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Mes Romans\"","children":[{"start":26,"value":"Mes Romans","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end