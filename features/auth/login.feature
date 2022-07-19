Feature: Login

  Scenario: User logs in successfully
    When I visit page '/'
    And I click on 'Anmelden'
    Then I should be on page '/auth/login'

    When I fill in 'identifier' with 'dev'
    And I fill in 'password' with '123456'
    And I click on the button 'Sign in'

    Then I should be on page '/auth/login-check'
    And I wait 3 seconds
    And I should see the text 'dev'

