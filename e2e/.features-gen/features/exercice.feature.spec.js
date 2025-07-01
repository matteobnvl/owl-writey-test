// Generated from: features\exercice.feature
import { test } from "playwright-bdd";

test.describe('Exercice page', () => {

  test('Create a new exercice', async ({ Given, page, When, Then }) => { 
    await Given('I am logged in as "pseudo"', null, { page }); 
    await When('I create a new exercice', null, { page }); 
    await Then('I should see the heading "Test e2e"', null, { page }); 
  });

  test('Jouer un exercice', async ({ Given, page, When, Then }) => { 
    await Given('I am logged in as "pseudo"', null, { page }); 
    await When('I play the exercice named "Test e2e" with content "il a fini par mourir dans un grand éclat de rire"', null, { page }); 
    await Then('I should see the text "il a fini par mourir dans un grand éclat de rire" in the details', null, { page }); 
  });

  test('Share and open an exercice', async ({ Given, page, When, Then, And }) => { 
    await Given('I am logged in as "pseudo"', null, { page }); 
    await When('I share the exercice "Test e2e"', null, { page }); 
    await Then('I should see a share link', null, { page }); 
    await When('I log out', null, { page }); 
    await And('I log in as "bob"', null, { page }); 
    await Then('I should see the heading "Mes Romans"', null, { page }); 
    await When('I open the shared link', null, { page }); 
    await Then('I should see the text "il a fini par mourir dans un grand éclat de rire"', null, { page }); 
  });

  test('Jouer un exercie avec un particpant', async ({ Given, page, When, Then }) => { 
    await Given('I am logged in as "bob"', null, { page }); 
    await When('I play the exercice named "Test e2e" with content "et tomba dans la rivière qui l\'emporta loin de sa ville natale"', null, { page }); 
    await Then('I should see the text "et tomba dans la rivière qui l\'emporta loin" in the details', null, { page }); 
  });

  test('Joueur Pseudo termine son exercice', async ({ Given, page, When, And, Then }) => { 
    await Given('I am logged in as "pseudo"', null, { page }); 
    await When('I play the exercice named "Test e2e"', null, { page }); 
    await And('I click on finish game', null, { page }); 
    await Then('I should not see the exercice named "Test e2e"', null, { page }); 
  });

  test('Delete an existing exercice', async ({ Given, page, When, Then }) => { 
    await Given('I am logged in as "pseudo"', null, { page }); 
    await When('I delete the exercice named "Test e2e"', null, { page }); 
    await Then('I should not see the exercice named "Test e2e"', null, { page }); 
  });

});

// == technical section ==

test.beforeAll('BeforeAll Hooks', ({ $runBeforeAllHooks }) => $runBeforeAllHooks(test, {  }, bddFileData));
test.afterAll('AfterAll Hooks', ({ $registerAfterAllHooks }) => $registerAfterAllHooks(test, {  }, bddFileData));
test.beforeEach('BeforeEach Hooks', ({ $beforeEach }) => {});
test.afterEach('AfterEach Hooks', ({ $afterEach }) => {});

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('features\\exercice.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"pseudo\"","stepMatchArguments":[{"group":{"start":18,"value":"\"pseudo\"","children":[{"start":19,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I create a new exercice","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then I should see the heading \"Test e2e\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Test e2e\"","children":[{"start":26,"value":"Test e2e","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":12,"pickleLine":8,"tags":[],"steps":[{"pwStepLine":13,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"pseudo\"","stepMatchArguments":[{"group":{"start":18,"value":"\"pseudo\"","children":[{"start":19,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I play the exercice named \"Test e2e\" with content \"il a fini par mourir dans un grand éclat de rire\"","stepMatchArguments":[{"group":{"start":26,"value":"\"Test e2e\"","children":[{"start":27,"value":"Test e2e","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":50,"value":"\"il a fini par mourir dans un grand éclat de rire\"","children":[{"start":51,"value":"il a fini par mourir dans un grand éclat de rire","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then I should see the text \"il a fini par mourir dans un grand éclat de rire\" in the details","stepMatchArguments":[{"group":{"start":22,"value":"\"il a fini par mourir dans un grand éclat de rire\"","children":[{"start":23,"value":"il a fini par mourir dans un grand éclat de rire","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":18,"pickleLine":13,"tags":[],"steps":[{"pwStepLine":19,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"pseudo\"","stepMatchArguments":[{"group":{"start":18,"value":"\"pseudo\"","children":[{"start":19,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When I share the exercice \"Test e2e\"","stepMatchArguments":[{"group":{"start":21,"value":"\"Test e2e\"","children":[{"start":22,"value":"Test e2e","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then I should see a share link","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"When I log out","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And I log in as \"bob\"","stepMatchArguments":[{"group":{"start":12,"value":"\"bob\"","children":[{"start":13,"value":"bob","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then I should see the heading \"Mes Romans\"","stepMatchArguments":[{"group":{"start":25,"value":"\"Mes Romans\"","children":[{"start":26,"value":"Mes Romans","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When I open the shared link","stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then I should see the text \"il a fini par mourir dans un grand éclat de rire\"","stepMatchArguments":[{"group":{"start":22,"value":"\"il a fini par mourir dans un grand éclat de rire\"","children":[{"start":23,"value":"il a fini par mourir dans un grand éclat de rire","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":29,"pickleLine":23,"tags":[],"steps":[{"pwStepLine":30,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"bob\"","stepMatchArguments":[{"group":{"start":18,"value":"\"bob\"","children":[{"start":19,"value":"bob","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When I play the exercice named \"Test e2e\" with content \"et tomba dans la rivière qui l'emporta loin de sa ville natale\"","stepMatchArguments":[{"group":{"start":26,"value":"\"Test e2e\"","children":[{"start":27,"value":"Test e2e","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":50,"value":"\"et tomba dans la rivière qui l'emporta loin de sa ville natale\"","children":[{"start":51,"value":"et tomba dans la rivière qui l'emporta loin de sa ville natale","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then I should see the text \"et tomba dans la rivière qui l'emporta loin\" in the details","stepMatchArguments":[{"group":{"start":22,"value":"\"et tomba dans la rivière qui l'emporta loin\"","children":[{"start":23,"value":"et tomba dans la rivière qui l'emporta loin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":35,"pickleLine":28,"tags":[],"steps":[{"pwStepLine":36,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"pseudo\"","stepMatchArguments":[{"group":{"start":18,"value":"\"pseudo\"","children":[{"start":19,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When I play the exercice named \"Test e2e\"","stepMatchArguments":[{"group":{"start":26,"value":"\"Test e2e\"","children":[{"start":27,"value":"Test e2e","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And I click on finish game","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then I should not see the exercice named \"Test e2e\"","stepMatchArguments":[{"group":{"start":36,"value":"\"Test e2e\"","children":[{"start":37,"value":"Test e2e","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":42,"pickleLine":34,"tags":[],"steps":[{"pwStepLine":43,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given I am logged in as \"pseudo\"","stepMatchArguments":[{"group":{"start":18,"value":"\"pseudo\"","children":[{"start":19,"value":"pseudo","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When I delete the exercice named \"Test e2e\"","stepMatchArguments":[{"group":{"start":28,"value":"\"Test e2e\"","children":[{"start":29,"value":"Test e2e","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then I should not see the exercice named \"Test e2e\"","stepMatchArguments":[{"group":{"start":36,"value":"\"Test e2e\"","children":[{"start":37,"value":"Test e2e","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end