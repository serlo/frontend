Feature: Registration
  @registration
  Scenario: User registers successfully
    When I go to path '/auth/login'
    And I click on 'Neuen Account registrieren' 

    Then I should be on path '/auth/registration'
    
    When I fill in input name 'traits.email' with value 'user@serlo.org'
    And I fill in input name 'password' with value '123456'
    And I fill in input name 'traits.username' with value 'serlouser'
    And I click on the button 'Sign up'

    When I click on 'Anmelden'
    And I wait 3 seconds
    And I fill in input name 'identifier' with value 'serlouser'
    And I fill in input name 'password' with value '123456'
    And I click on the button 'Sign in'

    Then I should be on path '/auth/login-check'
    And I wait 5 seconds
    And I should see the text 'serlouser'

  Scenario: User verfies email
    When I visit the site 'http://localhost:4436'
    And I click on link that contains 'Please verify your email address'
    And I click on link that contains 'http://localhost:4433/self-service/verification'

    Then I should be on path '/auth/login'

    When I fill in input name 'identifier' with value 'serlouser'
    And I fill in input name 'password' with value '123456'
    And I click on the button 'Sign in'

    Then I should be on path '/auth/login-check'
    And I wait 5 seconds
    And I should see the text 'serlouser'