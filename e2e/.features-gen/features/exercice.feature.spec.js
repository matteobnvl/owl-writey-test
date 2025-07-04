// Generated from: features\exercice.feature
import { test } from "playwright-bdd";

test.describe('Exercice Management', () => {

  test.beforeEach('Background', async ({ Given, page }) => {
    await Given('I am logged in as "pseudo"', null, { page }); 
  });
  
  test('Create a new exercice', async ({ When, page, Then }) => { 
    await When('I create a new exercice named "Creation Test"', null, { page }); 
    await Then('I should see the exercice titled "Creation Test"', null, { page }); 
  });

  test('Play an exercice with content', async ({ When, page, And, Then }) => { 
    await When('I create a new exercice named "Play Test bdd"', null, { page }); 
    await And('I play the exercice named "Play Test bdd" with content "il a fini par mourir dans un grand éclat de rire"', null, { page }); 
    await Then('I should see the text "il a fini par mourir dans un grand éclat de rire" in the details', null, { page }); 
  });

  test('Share exercice and play with different user', async ({ When, page, And, Then }) => { 
    await When('I create a new exercice named "Share Test bdd"', null, { page }); 
    await And('I share the exercice "Share Test bdd"', null, { page }); 
    await Then('I should see a share link', null, { page }); 
    await When('I log out', null, { page }); 
    await And('I reload the page', null, { page }); 
    await And('I log in as "bob"', null, { page }); 
    await When('I open the shared link', null, { page }); 
    await Then('I should see the exercice titled "Share Test bdd"', null, { page }); 
    await When('I play the exercice named "Share Test bdd" with content "je suis bob et je joue avec le test e2e"', null, { page }); 
    await Then('I should see the text "je suis bob et je joue avec le test e2e" in the details', null, { page }); 
  });

  test('Finish an exercice', async ({ When, page, And, Then }) => { 
    await When('I create a new exercice named "Finish Test bdd"', null, { page }); 
    await And('I navigate to the dashboard', null, { page }); 
    await And('I finish the exercice named "Finish Test bdd"', null, { page }); 
    await Then('the exercice named "Finish Test" should be finished', null, { page }); 
  });

  test('Delete an exercice', async ({ When, page, Then }) => { 
    await When('I delete the exercice named "Delete Test"', null, { page }); 
    await Then('I should not see the exercice named "Delete Test"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features\\exercice.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"pseudo\"","isBg":true,"stepMatchArguments":[{"group":{"start":18,"value":"\"pseudo\"","children":[{"start":19,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I create a new exercice named \"Creation Test\"","stepMatchArguments":[{"group":{"start":30,"value":"\"Creation Test\"","children":[{"start":31,"value":"Creation Test","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then I should see the exercice titled \"Creation Test\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Creation Test\"","children":[{"start":34,"value":"Creation Test","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":15,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"pseudo\"","isBg":true,"stepMatchArguments":[{"group":{"start":18,"value":"\"pseudo\"","children":[{"start":19,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When I create a new exercice named \"Play Test bdd\"","stepMatchArguments":[{"group":{"start":30,"value":"\"Play Test bdd\"","children":[{"start":31,"value":"Play Test bdd","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I play the exercice named \"Play Test bdd\" with content \"il a fini par mourir dans un grand éclat de rire\"","stepMatchArguments":[{"group":{"start":26,"value":"\"Play Test bdd\"","children":[{"start":27,"value":"Play Test bdd","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":55,"value":"\"il a fini par mourir dans un grand éclat de rire\"","children":[{"start":56,"value":"il a fini par mourir dans un grand éclat de rire","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then I should see the text \"il a fini par mourir dans un grand éclat de rire\" in the details","stepMatchArguments":[{"group":{"start":22,"value":"\"il a fini par mourir dans un grand éclat de rire\"","children":[{"start":23,"value":"il a fini par mourir dans un grand éclat de rire","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":21,"pickleLine":15,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"pseudo\"","isBg":true,"stepMatchArguments":[{"group":{"start":18,"value":"\"pseudo\"","children":[{"start":19,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"When I create a new exercice named \"Share Test bdd\"","stepMatchArguments":[{"group":{"start":30,"value":"\"Share Test bdd\"","children":[{"start":31,"value":"Share Test bdd","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And I share the exercice \"Share Test bdd\"","stepMatchArguments":[{"group":{"start":21,"value":"\"Share Test bdd\"","children":[{"start":22,"value":"Share Test bdd","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"Then I should see a share link","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When I log out","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I reload the page","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"And I log in as \"bob\"","stepMatchArguments":[{"group":{"start":12,"value":"\"bob\"","children":[{"start":13,"value":"bob","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"When I open the shared link","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then I should see the exercice titled \"Share Test bdd\"","stepMatchArguments":[{"group":{"start":33,"value":"\"Share Test bdd\"","children":[{"start":34,"value":"Share Test bdd","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When I play the exercice named \"Share Test bdd\" with content \"je suis bob et je joue avec le test e2e\"","stepMatchArguments":[{"group":{"start":26,"value":"\"Share Test bdd\"","children":[{"start":27,"value":"Share Test bdd","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":56,"value":"\"je suis bob et je joue avec le test e2e\"","children":[{"start":57,"value":"je suis bob et je joue avec le test e2e","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then I should see the text \"je suis bob et je joue avec le test e2e\" in the details","stepMatchArguments":[{"group":{"start":22,"value":"\"je suis bob et je joue avec le test e2e\"","children":[{"start":23,"value":"je suis bob et je joue avec le test e2e","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":34,"pickleLine":27,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"pseudo\"","isBg":true,"stepMatchArguments":[{"group":{"start":18,"value":"\"pseudo\"","children":[{"start":19,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When I create a new exercice named \"Finish Test bdd\"","stepMatchArguments":[{"group":{"start":30,"value":"\"Finish Test bdd\"","children":[{"start":31,"value":"Finish Test bdd","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And I navigate to the dashboard","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"And I finish the exercice named \"Finish Test bdd\"","stepMatchArguments":[{"group":{"start":28,"value":"\"Finish Test bdd\"","children":[{"start":29,"value":"Finish Test bdd","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then the exercice named \"Finish Test\" should be finished","stepMatchArguments":[{"group":{"start":19,"value":"\"Finish Test\"","children":[{"start":20,"value":"Finish Test","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":41,"pickleLine":33,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"pseudo\"","isBg":true,"stepMatchArguments":[{"group":{"start":18,"value":"\"pseudo\"","children":[{"start":19,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":42,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When I delete the exercice named \"Delete Test\"","stepMatchArguments":[{"group":{"start":28,"value":"\"Delete Test\"","children":[{"start":29,"value":"Delete Test","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":43,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then I should not see the exercice named \"Delete Test\"","stepMatchArguments":[{"group":{"start":36,"value":"\"Delete Test\"","children":[{"start":37,"value":"Delete Test","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end