# 1. Install Playwright project
npm install<br>
npx playwright install (to install browsers)

# 2. Run tests
npx playwright test<br>
to run in a specific browser add the --project flag
   - npx playwright test --project chromium

# Integrating TestRail useing TestRail CLI Example
### I do not have an actual TestRail. This is just an example.

## 3. Install TestRail CLI
pip instal trcli

## 4. Upload test results
$ trcli -y \
>  -h https://INSERT-INSTANCE-NAME.testrail.io \
>  --project "My Project" \
>  --username INSERT-EMAIL \
>  --password INSERT-PASSWORD \
>  parse_junit \
>  --title "Playwright Automated Test Run" \
>  -f "./test-results/junit-report.xml"
$

# ** ADR **

## Context and Problem Statement
Create a robust test case that runs through the login and checkout process of a user.

## Decision
- Implement the Page Object Model
- Implement data-driven testing

## Rationale
- Maintainability: Can easily update selectors from one place insteas of several if there's a change. Test data can easily be updated from one centralized location as well. 
- Readability: Test logic will be easier to understand.
- Code Reusability: POM methods can be used across test scenarios eleminating the need for duplicate code

## Consequences
- Cost: The initial Page Objects takes some time to set up.
- Potential for Over-Engineering: If not properly managed, setting up a Page Object for every small component, could cause the tests to be less robust. (Only create POs for significant pages or components)
