Feature: Exercice page

  Scenario: Create a new exercice
    Given I am logged in as "pseudo"
    When I create a new exercice
    Then I should see the heading "Test e2e"

  Scenario: Jouer un exercice
    Given I am logged in as "pseudo"
    When I play the exercice named "Test e2e" with content "il a fini par mourir dans un grand éclat de rire"
    Then I should see the text "il a fini par mourir dans un grand éclat de rire" in the details

  Scenario: Share and open an exercice
    Given I am logged in as "pseudo"
    When I share the exercice "Test e2e"
    Then I should see a share link
    When I log out
    And I log in as "bob"
    Then I should see the heading "Mes Romans"
    When I open the shared link
    Then I should see the text "il a fini par mourir dans un grand éclat de rire"

  Scenario: Jouer un exercie avec un particpant
    Given I am logged in as "bob"
    When I play the exercice named "Test e2e" with content "et tomba dans la rivière qui l'emporta loin de sa ville natale"
    Then I should see the text "et tomba dans la rivière qui l'emporta loin" in the details

  Scenario: Joueur Pseudo termine son exercice
    Given I am logged in as "pseudo"
    When I play the exercice named "Test e2e"
    And I click on finish game
    Then I should not see the exercice named "Test e2e"

  Scenario: Delete an existing exercice
    Given I am logged in as "pseudo"
    When I delete the exercice named "Test e2e"
    Then I should not see the exercice named "Test e2e"