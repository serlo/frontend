Feature: Login and Logout
  # The way the scenarios are written right now are too imperative and so does not correspond
  # to cucumber's best practices (see https://cucumber.io/docs/bdd/better-gherkin/).
  # For purposes of refactoring the new authentication it is good enough, but
  # we would do better writting something like:
  #   Scenario: User logs in successfully
  #     When I visit 'login' page
  #     And I provide valid credentials for user 'yolobird'
  #     Then I should be logged in as user 'yolobird'
  # On the other side, such imperative way of writting would allow some stakeholders to
  # write testing by their own.
  Scenario: User logs in and out successfully
    When I go to path '/'
    And I click on 'Anmelden'
    Then I should be on path '/auth/login'

    When I fill in input name 'identifier' with value 'dev'
    And I fill in input name 'password' with value '123456'
    And I click on the button 'Sign in'

    Then I should be on path '/auth/login-check'
    And I wait 5 seconds
    And I should see the text 'dev'

    When I put mouse over 'img.rounded-full'
    And I click on 'Abmelden'

    Then I should be on path '/auth/login-check'
    And I wait 4 seconds
    And I should see the text 'Gast'
