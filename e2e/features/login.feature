Feature: Login page

  Scenario: Connexion with valid credentials
    Given I am on the login page
    When I log in with user "pseudo"
    Then I should see the heading "Mes Romans"
