const tableBody = document.querySelector("#wineTable tbody");

// Define the custom order of group titles
const groupTitleOrder = ["Sparkling", "White", "Rosé", "Red", "Sweet", "Fortified"];

// Function to sort data by custom group title order and then by subgroup title
function sortByGroupAndSubgroupTitle(data) {
    return data.sort((a, b) => {
        const groupComparison = groupTitleOrder.indexOf(a["Group Title"]) - groupTitleOrder.indexOf(b["Group Title"]);
        if (groupComparison !== 0) {
            return groupComparison;
        }
        return a["Subgroup Title"].localeCompare(b["Subgroup Title"]);
    });
}

// Function to populate the table
function populateTable(data) {
    // Sort data by custom group title order and then by subgroup title
    const sortedData = sortByGroupAndSubgroupTitle(data);

    let currentGroupTitle = ""; // Track the current group title
    let currentSubgroupTitle = ""; // Track the current subgroup title

    sortedData.forEach(wine => {
        // Check if the group title has changed
        if (wine["Group Title"] !== currentGroupTitle) {
            currentGroupTitle = wine["Group Title"];
            currentSubgroupTitle = ""; // Reset subgroup title when group changes

            // Insert a group title header row
            const groupTitleRow = document.createElement("tr");
            groupTitleRow.classList.add("group-title-row");

            const groupTitleCell = document.createElement("td");
            groupTitleCell.colSpan = 4; // Spans across all columns
            groupTitleCell.textContent = currentGroupTitle;

            groupTitleRow.appendChild(groupTitleCell);
            tableBody.appendChild(groupTitleRow);
        }

        // Check if the subgroup title has changed
        if (wine["Subgroup Title"] !== currentSubgroupTitle) {
            currentSubgroupTitle = wine["Subgroup Title"];

            // Insert a subgroup title header row
            const subgroupTitleRow = document.createElement("tr");
            subgroupTitleRow.classList.add("subgroup-title-row");

            const subgroupTitleCell = document.createElement("td");
            subgroupTitleCell.colSpan = 4; // Spans across all columns
            subgroupTitleCell.textContent = currentSubgroupTitle;

            subgroupTitleRow.appendChild(subgroupTitleCell);
            tableBody.appendChild(subgroupTitleRow);
        }

        // Create a row for the wine
        const row = document.createElement("tr");

        // Name column
        const nameCell = document.createElement("td");
        nameCell.textContent = wine.Wine;
        row.appendChild(nameCell);

        // Year column
        const yearCell = document.createElement("td");
        yearCell.textContent = wine.Vintage;
        row.appendChild(yearCell);

        // Price column
        const priceCell = document.createElement("td");
        priceCell.textContent = `£${wine.Price.toFixed(2)}`;
        row.appendChild(priceCell);

        tableBody.appendChild(row);
    });
}

// Fetch the wine data and populate the table
fetch('data/wines.json')
    .then(response => response.json())
    .then(data => populateTable(data))
    .catch(error => console.error('Error loading wine data:', error));
