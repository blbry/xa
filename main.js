// Function to insert label
function insertLabel() {
    console.log('insertLabel called');
    // Query all elements with data-testid="User-Name"
    const usernameElements = document.querySelectorAll('[data-testid="User-Name"]');
    
    // Loop through each username element
    for (const usernameElement of usernameElements) {
        // Check if label already exists
        const existingLabel = usernameElement.querySelector('.userLabel');
        
        // Get username from href attribute
        const usernameLink = usernameElement.querySelector('a[href^="/"]');
        const username = usernameLink ? usernameLink.getAttribute('href').substring(1) : null;
        
        // Retrieve label for username from local storage
        const label = localStorage.getItem(username) || '';
        
        console.log('Username:', username);
        console.log('Label from localStorage:', label);
        
        // If label already exists, check if it matches the stored label
        if (existingLabel) {
            const existingLabelText = existingLabel.textContent.trim().substring(2);
            if (existingLabelText === label) {
                continue;
            } else {
                existingLabel.remove();
            }
        }

        // If label is empty, continue to the next username element
        if (label === '') {
            continue;
        }
        
        // Create label element
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('userLabel');
        
        // Add "·" before the label
        labelDiv.innerHTML = `&nbsp;· ${label}`;
        
        // Apply styles
        labelDiv.style.fontFamily = '"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
        
        // Set text color based on background color
        const backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
        if (backgroundColor === 'rgb(255, 255, 255)') {
            labelDiv.style.color = '#566370';
        } else if (backgroundColor === 'rgb(0, 0, 0)') {
            labelDiv.style.color = '#72767a';
        } else {
            labelDiv.style.color = '#8d98a4';
        }
        
        console.log('Appending label to username element');
        // Insert label next to username
        usernameElement.appendChild(labelDiv);
    }
}

// Function to handle DOM mutations
function handleMutations() {
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Check if new nodes are added or existing nodes are removed
            if (mutation.addedNodes.length || mutation.removedNodes.length) {
                insertLabel();
            }
        });
    });
    
    // Start observing the document for configured mutations
    observer.observe(document, {
        childList: true,
        subtree: true,
    });
}

// Function to add label setting option to Dropdown menu
function addLabelSettingOption() {
    // Query all Dropdown menus
    const dropdownMenus = document.querySelectorAll('[data-testid="Dropdown"]');
    
    // Loop through each Dropdown menu
    for (const dropdownMenu of dropdownMenus) {
        // Check if label setting option already exists
        if (dropdownMenu.querySelector('.setLabelOption')) {
            continue;
        }

        // Check if the dropdown is the settings menu
        if (dropdownMenu.textContent.includes('Monetization')) {
            continue;  // Skip settings menu
        }
        
        // Manually increase the height of the Dropdown menu
        const currentHeight = parseInt(window.getComputedStyle(dropdownMenu).height, 10);
        dropdownMenu.style.height = (currentHeight + 44) + 'px';
        
        // Create label setting option
        const labelSettingOption = document.createElement('span');
        labelSettingOption.classList.add('setLabelOption');
        
        // Add icon and text to label setting option
        labelSettingOption.innerHTML = `
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 512 512">
                <path id="labelIconPath" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/>
                </svg>          
            </span>
            <span class="text">Add/Edit Label</span>`;
        
        // Apply styles
        labelSettingOption.style.fontFamily = '"TwitterChirp",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
        labelSettingOption.style.fontWeight = '700';
        labelSettingOption.style.padding = '12px 16px';
        labelSettingOption.style.cursor = 'pointer'; // Add cursor pointer on hover
        
        // Set text color based on background color
        const backgroundColor = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
        if (backgroundColor === 'rgb(255, 255, 255)') {
            labelSettingOption.style.color = '#101419';
        } else if (backgroundColor === 'rgb(0, 0, 0)') {
            labelSettingOption.style.color = '#e7e9ea';
        } else {
            labelSettingOption.style.color = '#f7f9f9';
        }

        // Set SVG fill color dynamically
        const iconPath = labelSettingOption.querySelector('#labelIconPath');
        iconPath.setAttribute('fill', labelSettingOption.style.color);
        
        // Adjust spacing between icon and text
        const iconElement = labelSettingOption.querySelector('.icon');
        iconElement.style.marginRight = '10px';
        iconElement.style.marginLeft = '2px';
        
        labelSettingOption.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            
            console.log('Label setting option clicked!');
        
            // Get username from the second menu option
            const followOption = dropdownMenu.children[1];
            const usernameSpan = followOption.querySelector('div span');
            const usernameText = usernameSpan ? usernameSpan.textContent : '';
            const usernameMatch = usernameText.match(/@(\w+)/);
            const username = usernameMatch ? usernameMatch[1] : null;
        
            console.log('Username:', username);
        
            if (username) {
                // Prompt user for label
                const label = prompt('Enter label for ' + username + ':');
        
                console.log('Label:', label);
        
                if (label !== null) {
                    // Store label locally
                    localStorage.setItem(username, label);
        
                    // Update label next to username
                    insertLabel();  // This should update the DOM with the new label immediately

                    // Close the dropdown
                    const dropdownCloseElement = document.evaluate('//*[@id="layers"]/div[2]/div/div/div/div[2]/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    dropdownCloseElement.click();
                }
            }
        }, true);                                
        
        // Insert label setting option into Dropdown menu
        dropdownMenu.appendChild(labelSettingOption);
    }
}

// Function to handle mutations for Dropdown menu
function handleDropdownMutations() {
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Check if new nodes are added or existing nodes are removed
            if (mutation.addedNodes.length || mutation.removedNodes.length) {
                addLabelSettingOption();
            }
        });
    });
    
    // Start observing the document for configured mutations
    observer.observe(document, {
        childList: true,
        subtree: true,
    });
}

// Run the functions
insertLabel();
handleMutations();
addLabelSettingOption();
handleDropdownMutations();
