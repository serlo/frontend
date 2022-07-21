Feature: Registration
  @registration
  Scenario: User registers successfully
    When I visit page '/auth/login'
    And I click on 'Neuen Account registrieren' 

    Then I should be on page '/auth/registration'
    
    When I fill in 'traits.email' with 'user@serlo.org'
    And I fill in 'password' with '123456'
    And I fill in 'traits.username' with 'serlouser'
    And I click on the button 'Sign up'

    When I click on 'Anmelden'
    And I wait 3 seconds
    And I fill in 'identifier' with 'serlouser'
    And I fill in 'password' with '123456'
    And I click on the button 'Sign in'

    Then I should be on page '/auth/login-check'
    And I wait 5 seconds
    And I should see the text 'serlouser'