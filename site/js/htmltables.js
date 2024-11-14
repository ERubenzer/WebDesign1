// Global utility functions
// Format a number into currency (USD)
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',    // Specify the style as currency
        currency: 'USD'       // Specify the currency as USD
    }).format(amount);        // Return the formatted amount
};

// Format a date string into a more readable date (e.g., Jan 1, 2024)
const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',      // Show the full year
        month: 'short',       // Show abbreviated month name (Jan, Feb, etc.)
        day: 'numeric'        // Show day as number
    });
};

// Format a number as a percentage (with one decimal place)
const formatPercentage = (value) => {
    return `${parseFloat(value).toFixed(1)}%`; // Convert to float and add a percentage sign
};

// Table functionality class that provides sorting and search functionality
class InteractiveTable {
    constructor(tableId) {
        this.table = document.getElementById(tableId); // Get the table element by ID
        this.tbody = this.table.querySelector('tbody'); // Get the tbody element of the table
        this.currentSortColumn = null;  // Keep track of the current sorted column
        this.sortDirection = 'asc';     // Default sorting direction is ascending
        
        this.initializeTable(); // Initialize table with sort functionality
    }

    // Initialize the table with sort listeners on headers and optional search input
    initializeTable() {
        // Add click listeners to each header for sorting
        this.table.querySelectorAll('thead th').forEach((header, index) => {
            header.addEventListener('click', () => this.sortTable(index)); // Sort on header click
            header.style.cursor = 'pointer'; // Change cursor to indicate clickable
        });

        // Initialize search if a search input exists for this table
        const searchInput = document.querySelector(`#${this.table.id}Search`);
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchTable(e.target.value)); // Search on input
        }
    }

    // Sort the table based on the clicked column header
    sortTable(columnIndex) {
        const rows = Array.from(this.tbody.querySelectorAll('tr')); // Get all table rows
        const headers = this.table.querySelectorAll('th'); // Get all table headers

        // Toggle the sort direction if the same column is clicked again
        if (this.currentSortColumn === columnIndex) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortDirection = 'asc'; // Reset to ascending if a new column is clicked
        }

        // Update the sort indicator class on the header
        headers.forEach(header => header.classList.remove('sort-asc', 'sort-desc')); // Remove previous sort classes
        headers[columnIndex].classList.add(`sort-${this.sortDirection}`); // Add the correct sort direction class

        // Sort the rows based on the selected column
        rows.sort((a, b) => {
            let aVal = a.cells[columnIndex].textContent.trim(); // Get the value of the cell in row a
            let bVal = b.cells[columnIndex].textContent.trim(); // Get the value of the cell in row b

            // Handle different data types (currency, percentage, date, number)
            if (aVal.startsWith('$')) {
                // Handle currency by removing the dollar sign and commas
                aVal = parseFloat(aVal.replace(/[$,]/g, ''));
                bVal = parseFloat(bVal.replace(/[$,]/g, ''));
            } else if (aVal.endsWith('%')) {
                // Handle percentage by converting to number
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            } else if (!isNaN(Date.parse(aVal))) {
                // Handle date by converting to date object
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            } else if (!isNaN(aVal)) {
                // Handle numbers by converting to float
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
            }
            // else string comparison if no special type

            // Compare aVal and bVal
            const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
            return this.sortDirection === 'asc' ? comparison : -comparison; // Return comparison based on sort direction
        });

        // Reorder rows in the tbody based on sorted order
        rows.forEach(row => this.tbody.appendChild(row));
        this.currentSortColumn = columnIndex; // Update the current sorted column index
    }

    // Filter the table rows based on search input
    searchTable(searchTerm) {
        const rows = this.tbody.querySelectorAll('tr'); // Get all rows
        const searchLower = searchTerm.toLowerCase(); // Convert the search term to lowercase

        // Loop through each row and hide those that don't match the search term
        rows.forEach(row => {
            const text = Array.from(row.cells) // Map through each cell
                .map(cell => cell.textContent.toLowerCase()) // Convert cell text to lowercase
                .join(' '); // Join all cell texts into a single string
            row.style.display = text.includes(searchLower) ? '' : 'none'; // Show or hide row based on match
        });
    }

    // Update a specific row with new data
    updateRow(rowIndex, data) {
        const row = this.tbody.rows[rowIndex]; // Get the row to update
        if (row) {
            // Loop through the provided data and update cells in the row
            Object.entries(data).forEach(([key, value]) => {
                const cellIndex = this.getCellIndexByHeader(key); // Find the column index by header name
                if (cellIndex !== -1) {
                    row.cells[cellIndex].textContent = value; // Update the cell content
                }
            });
        }
    }

    // Get the index of a column based on its header text
    getCellIndexByHeader(headerText) {
        const headers = Array.from(this.table.querySelectorAll('th')); // Get all headers
        return headers.findIndex(header => 
            header.textContent.toLowerCase() === headerText.toLowerCase() // Find the matching header
        );
    }
}

// Specific table enhancements for the Esports table
class EsportsTable extends InteractiveTable {
    constructor(tableId) {
        super(tableId); // Call the parent constructor
        this.initializeStatusUpdates(); // Initialize automatic status updates
    }

    // Simulate live updates of status and win rate
    initializeStatusUpdates() {
        setInterval(() => {
            const randomRow = Math.floor(Math.random() * this.tbody.rows.length); // Random row index
            const statusStates = ['Active', 'Inactive', 'Pending']; // Possible status values
            const newStatus = statusStates[Math.floor(Math.random() * statusStates.length)]; // Random status

            // Update the row with new status and a random win rate
            this.updateRow(randomRow, {
                'status': newStatus,
                'win rate': `${Math.floor(Math.random() * 30 + 60)}%`
            });

            this.updateStatusStyle(this.tbody.rows[randomRow]); // Update the row's status style
        }, 5000); // Run the update every 5 seconds
    }

    // Update the status style based on the status value
    updateStatusStyle(row) {
        const statusCell = row.querySelector('td:last-child'); // Get the last cell (status column)
        statusCell.className = ''; // Remove any existing classes
        const status = statusCell.textContent.toLowerCase(); // Get the status text (e.g., 'active')
        statusCell.classList.add(`status-${status}`); // Add the correct status class (e.g., 'status-active')
    }
}

// Specific table enhancements for the Festival table
class FestivalTable extends InteractiveTable {
    constructor(tableId) {
        super(tableId); // Call the parent constructor
        this.initializeFilters(); // Initialize genre filters
    }

    // Initialize genre filters for the festival table
    initializeFilters() {
        const genres = new Set(); // Set to hold unique genres

        // Loop through all rows and collect genres from the 6th column (index 5)
        Array.from(this.tbody.rows).forEach(row => {
            genres.add(row.cells[5].textContent); // Assuming genre is in the 6th column
        });

        // Create a filter container and genre dropdown
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-container';
        
        const genreSelect = document.createElement('select');
        genreSelect.innerHTML = '<option value="">All Genres</option>';
        genres.forEach(genre => {
            genreSelect.innerHTML += `<option value="${genre}">${genre}</option>`; // Add each genre as an option
        });

        genreSelect.addEventListener('change', (e) => this.filterByGenre(e.target.value)); // Filter by genre
        filterContainer.appendChild(genreSelect); // Append the genre select to the filter container
        this.table.parentNode.insertBefore(filterContainer, this.table); // Insert the filter container above the table
    }

    // Filter rows based on selected genre
    filterByGenre(genre) {
        Array.from(this.tbody.rows).forEach(row => {
            const rowGenre = row.cells[5].textContent; // Get the genre from the 6th column (index 5)
            row.style.display = genre === '' || rowGenre === genre ? '' : 'none'; // Show or hide the row based on genre
        });
    }
}

// Specific table enhancements for the Startup table
class StartupTable extends InteractiveTable {
    constructor(tableId) {
        super(tableId); // Call the parent constructor
        this.initializeMultiSort(); // Initialize multi-column sorting
    }

    // Initialize multi-sort functionality with shift key
    initializeMultiSort() {
        let sortKeys = []; // Array to hold multiple sort criteria
        
        // Add click listeners to each header
        this.table.querySelectorAll('th').forEach((header, index) => {
            header.addEventListener('click', (e) => {
                if (e.shiftKey) {
                    // If shift key is held, add to multi-sort
                    const existingIndex = sortKeys.findIndex(sk => sk.column === index);
                    if (existingIndex === -1) {
                        sortKeys.push({ column: index, direction: 'asc' }); // Add new sort key
                    } else {
                        // Toggle direction for existing sort key
                        sortKeys[existingIndex].direction = 
                            sortKeys[existingIndex].direction === 'asc' ? 'desc' : 'asc';
                    }
                } else {
                    // Single column sort (reset multi-sort)
                    sortKeys = [{ column: index, direction: 'asc' }];
                }
                
                this.multiColumnSort(sortKeys); // Perform multi-column sort
            });
        });
    }

    // Perform multi-column sorting
    multiColumnSort(sortKeys) {
        const rows = Array.from(this.tbody.querySelectorAll('tr')); // Get all rows
        
        rows.sort((a, b) => {
            // Loop through each sorting key and compare corresponding columns
            for (const sort of sortKeys) {
                const comparison = this.compareCells(
                    a.cells[sort.column], 
                    b.cells[sort.column]
                );
                if (comparison !== 0) {
                    return sort.direction === 'asc' ? comparison : -comparison;
                }
            }
            return 0;
        });

        rows.forEach(row => this.tbody.appendChild(row)); // Reorder rows
    }

    // Compare values from two table cells
    compareCells(cellA, cellB) {
        const aVal = cellA.textContent.trim();
        const bVal = cellB.textContent.trim();

        if (aVal.startsWith('$')) {
            return this.compareCurrency(aVal, bVal); // Compare as currency
        } else if (aVal.endsWith('%')) {
            return this.comparePercentage(aVal, bVal); // Compare as percentage
        }
        return aVal.localeCompare(bVal); // Default string comparison
    }

    // Compare currency values (without symbols and commas)
    compareCurrency(a, b) {
        return parseFloat(a.replace(/[$,]/g, '')) - parseFloat(b.replace(/[$,]/g, ''));
    }

    // Compare percentage values (parse as float)
    comparePercentage(a, b) {
        return parseFloat(a) - parseFloat(b);
    }
}

// Initialize tables when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const esportsTable = new EsportsTable('esportsTable'); // Initialize Esports table
    const festivalTable = new FestivalTable('festivalTable'); // Initialize Festival table
    const startupTable = new StartupTable('startupTable'); // Initialize Startup table

    // Example of how to trigger table updates from elsewhere
    window.updateTable = {
        esports: (rowIndex, data) => esportsTable.updateRow(rowIndex, data),
        festival: (rowIndex, data) => festivalTable.updateRow(rowIndex, data),
        startup: (rowIndex, data) => startupTable.updateRow(rowIndex, data)
    };
});
