Feature: Login and Logout
  # The way the scenarios are written right are too imperative and so do not correspond
  # to cucumbers best practices (see https://cucumber.io/docs/bdd/better-gherkin/).
  # For purposes of refactoring the new authentication it is good enough though, but
  # we would do better writting something like:
  #   Scenario: User logs in successfully
  #     When I visit 'login' page
  #     And I log in as 'dev'
  #     Then I should be on 'login-check' page
  #     And I should see the text 'dev'
  # On the other side, such imperative way of writting would allow some stakeholders to
  # write testing by their own.
  Scenario: User logs in and out successfully
    When I visit page '/'
    And I click on 'Anmelden'
    Then I should be on page '/auth/login'

    When I fill in 'identifier' with 'dev'
    And I fill in 'password' with '123456'
    And I click on the button 'Sign in'

    Then I should be on page '/auth/login-check'
    And I wait 4 seconds
    And I should see the text 'dev'

    When I put mouse over 'img.rounded-full'
    And I click on 'Abmelden'

    Then I should be on page '/auth/login-check'
    And I wait 3 seconds
    And I should see the text 'Gast'
