Feature: Exercice Management
  
  Background:
    Given I am logged in as "pseudo"

  Scenario: Create a new exercice
    When I create a new exercice named "Creation Test"
    Then I should see the exercice titled "Creation Test"

  Scenario: Play an exercice with content
    When I create a new exercice named "Play Test bdd"
    And I play the exercice named "Play Test bdd" with content "il a fini par mourir dans un grand éclat de rire"
    Then I should see the text "il a fini par mourir dans un grand éclat de rire" in the details

  Scenario: Share exercice and play with different user
    When I create a new exercice named "Share Test bdd"
    And I share the exercice "Share Test bdd"
    Then I should see a share link
    When I log out
    And I reload the page
    And I log in as "bob"
    When I open the shared link
    Then I should see the exercice titled "Share Test bdd"
    When I play the exercice named "Share Test bdd" with content "je suis bob et je joue avec le test e2e"
    Then I should see the text "je suis bob et je joue avec le test e2e" in the details

  Scenario: Finish an exercice
    When I create a new exercice named "Finish Test bdd"
    And I navigate to the dashboard
    And I finish the exercice named "Finish Test bdd"
    Then the exercice named "Finish Test" should be finished

  Scenario: Delete an exercice
    When I delete the exercice named "Delete Test"
    Then I should not see the exercice named "Delete Test"