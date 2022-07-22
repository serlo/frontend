Feature: Landing Page

  Scenario: Visiting the landing page
    When I go to path '/'
    Then I should see the text 'Was möchtest du '
    Then I should see the text 'lernen ?'
