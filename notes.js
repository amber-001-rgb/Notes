const inputbox = document.getElementById("inputbox");
const entryList = document.getElementById("entry-list");

function addEntry() {
    if (inputbox.value === "") {
        alert("Your journal entry cannot be empty.");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        entryList.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        setupEntryListener(li); // Add click listener for editing
    }
    inputbox.value = "";
    saveData();
}

function setupEntryListener(entry) {
    entry.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            editEntry(entry);
        } else if (e.target.tagName === "SPAN") {
            entry.remove();
            saveData();
        }
    }, false);
}

function editEntry(entry) {
    let updatedText = prompt("Edit your journal entry:", entry.textContent.replace('•', '').trim()); // Removing bullet before editing
    if (updatedText !== null) {
        entry.innerHTML = `<span>\u00d7</span> ${updatedText}`;  
        let deleteButton = entry.querySelector("span");
        deleteButton.onclick = function() {
            entry.remove();
            saveData();
        };
        saveData();
    }
}



function saveData() {
    localStorage.setItem("journalData", entryList.innerHTML);
}

function showEntries() {
    entryList.innerHTML = localStorage.getItem("journalData");
    const entries = entryList.querySelectorAll("li");
    entries.forEach(entry => {
        setupEntryListener(entry);

        // Reattach event listener for 'Edit' button
        let editButton = entry.querySelector("button");
        editButton.onclick = function() {
            editEntry(entry);
        };

        // Reattach event listener for 'x' button
        let deleteButton = entry.querySelector("span");
        deleteButton.onclick = function() {
            entry.remove();
            saveData();
        };
    });
}


showEntries();
// const inputbox = document.getElementById("inputbox");
// const entryList = document.getElementById("entry-list");

// function addEntry() {
//     if (inputbox.value === "") {
//         alert("Your journal entry cannot be empty.");
//     } else {
//         let li = document.createElement("li");
//         li.textContent = inputbox.value;
//         entryList.appendChild(li);
//         let span = document.createElement("span");
//         span.innerHTML = "\u00d7";
//         li.appendChild(span);
//         setupDeleteListener(li); // Add click listener for deleting
//     }
//     inputbox.value = "";
//     saveData();
// }

// function setupDeleteListener(entry) {
//     let deleteButton = entry.querySelector("span");
//     deleteButton.onclick = function() {
//         entry.remove();
//         saveData();
//     };
// }

// function saveData() {
//     localStorage.setItem("journalData", entryList.innerHTML);
// }

// function showEntries() {
//     entryList.innerHTML = localStorage.getItem("journalData");
//     const entries = entryList.querySelectorAll("li");
//     entries.forEach(entry => {
//         setupDeleteListener(entry);
//     });
// }

// showEntries();
