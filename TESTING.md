# Product Testing
* **DELETE** The purpose is to create two types of tests for your project:
## Project: ClassyBuffs
### Team Members:
* Gannon Faul (gannonfaul)
* D’Artagnan Wake (dawa6951)
* Kassi Butler (kassi-butler)
* Lucas Hayne (lhayne)
* Scott Ewing (scew5145)

### Vision statement: 
* A world where signing up for classes is user friendly.

### Automated Test Cases:
* **DELETE** Automated test cases
* **DELETE** Provide link to the tool you use to automate testing, or explain how to run the automated test cases, or schedule time with the TAs to demonstrate your automated tests.
* **DELETE** Provide a copy of the output showing the results of the automated test cases running.

### User-Acceptance Tests: 

#### Test 1: Verify Installation
* **Description:** Test that the chrome extension can be installed correctly from the Chrome Web Store.
* **Pre-conditions:** User has Google Chrome installed on their computer.
* **Test Steps:**
 1. Open Google Chrome
 2. Go to chrome://extensions
 3. Scroll to bottom of the page and press "Get More Extensions"
 4. Type "ClassyBuffs" in the search bar at the top left of the page
 5. Press the "+ Add to Chrome" button next to the ClassyBuffs logo and description
 6. Press"Add Extension" on the pop-up
* **Expected Results:** Pop-up verification that says "ClassyBuffs has been added to Chrome.".
* **Actual Result:** Extension is not yet published, so it cannot be installed outside of developer mode.
* **Status:** Fail
* **Notes:** Test should pass once extension is published, there is no known problem with this in the code.
* **Post-conditions:** User has extension installed and it will perform function with no further action.

#### Test 2: Verify Icon and Pop-up Description
* **Description:** Test that the extension icon and pop-up description function as desired.
* **Pre-conditions:** User has Google Chrome and the ClassyBuffs extension installed on their computer.
* **Test Steps:**
 1. Open Google Chrome
 2. View icons to the right of the search bar
 3. Verify that the CU Buffs icon is visible
 4. Hover over the CU Buffs icon with cursor and verify that title pop-up says "ClassyBuffs"
 5. Click CU Buffs icon to view extension description
* **Expected Results:** Small pop-up containing ClassyBuffs official description: "**ClassyBuffs** -- *for all your registration needs*".
* **Actual Result:** Small pop-up containing ClassyBuffs official description: "**ClassyBuffs** -- *for all your registration needs*".
* **Status:** Pass
* **Notes:** Test can currently only be executed in Developer Mode because the extension is not published.
* **Post-conditions:** N/A

#### Test 3: Verify Custom Hovertext for Class Registration
* **Description:** Test that the hover text in user's class registration shopping cart shows the correct information.
* **Pre-conditions:** User has Google Chrome and the ClassyBuffs extension installed on their computer. User is also enrolled in UC Boulder, has myCUinfo log-in credentials, and has added one or more classes to their shopping cart for Fall 2017 registration.
* **Test Steps:**
 1. Open Google Chrome
 2. Navigate to myCUinfo home page
 3. Login to myCUinfo using student credentials
 4. Click "Register for Classes" on the left side of the page
 5. Select "Fall 2017 UC Boulder" and click "Continue"
 6. Hover cursor over a course in the registration "Shopping Cart"
* **Expected Results:** Pop-up containing information on the course including pre-requisites and degree requirement satisfactions for the user.
* **Actual Result:** Pop-up containing the course department and course number.
* **Status:** Fail
* **Notes:** N/A
* **Post-conditions:** User has more information on their courses.

