// Assignment: DOM Manipulation with JavaScript
document.addEventListener('DOMContentLoaded', function() {
// 1. Change the main title of the page
// Hint: Use getElementById and change the textContent
// document.getElementById('main-title').textContent = 'Welcome to Our Amazing Website';
    document.getElementById('main-title').textContent = 'Welcome to Our Amazing Website';
// 2. Add a new item to the navigation menu
// Hint: Use querySelector to select the ul, createElement to create a new li, and appendChild to add it
// const navList = document.querySelector('#nav-list');
// const newItem = document.createElement('li');
// newItem.innerHTML = '<a href="#services">Services</a>';
// navList.appendChild(newItem);
    const navList = document.querySelector('#nav-list');
    const newItem = document.createElement('li');
    newItem.innerHTML = '<a href="#services">Services</a>';
    navList.appendChild(newItem);
// 3. Modify the "About Us" text
// Hint: Use getElementById and change the textContent
    document.getElementById('about-us').textContent = 'This is edited text by none other than Emily Rubenzer.';
// 4. Add an event listener to the "Read More" button that shows an alert when clicked
// Hint: Use getElementById to select the button, then addEventListener to attach a click event
    document.getElementById('read-more-btn').addEventListener('click', function() {
        alert('You have clicked this button.');
    });
// 5. Change the background color of the header when the mouse hovers over it
// Hint: Use querySelector to select the header, then addEventListener for 'mouseover' and 'mouseout' events
    const header = document.querySelector('header');

    header.addEventListener('mouseover', function() {
        header.style.backgroundColor = 'lightgreen'
    });

    header.addEventListener('mouseout', function() {
        header.style.backgroundColor = '';
    });
// 6. Create a function that adds a new product to the product list
// Hint: This function should take a product name as a parameter, create a new li element, and append it to the product list
    function addProduct(productName) {
        const productList = document.getElementById('ul-list');
        const newListItem = document.createElement('li');
        newListItem.textContent = productName;
        productList.appendChild(newListItem);
    }

    addProduct('Product 4');
// 7. Use a loop to add three new products to the product list using the function from step 6
// Hint: Create an array of product names and use a for...of loop to add each one
    const newProducts = ['Product 5', 'Product 6', 'Product 7'];
    for (const product of newProducts) {
        addProduct(product);
    }
// 8. Implement the color change functionality for the "Change Color" button
// Hint: Use addEventListener and change the backgroundColor style of the color-box
// You can use this function to generate a random color:
// function getRandomColor() {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
    document.getElementById('change-color-btn').addEventListener('click', function() {
        const colorBox = document.getElementById('color-box');
        colorBox.style.backgroundColor = getRandomColor();
    });
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
// 9. Implement the counter functionality
// Hint: Use let to declare a count variable, then use event listeners on the increment and decrement buttons to change the count and update the text
    let count= 0;

    const countDisplay = document.getElementById('count');

    function updateDisplay() {
        countDisplay.textContent = count;
    }

    document.getElementById('increment-btn').addEventListener('click', function() {
        count++;
        updateDisplay();
    });
    document.getElementById('decrement-btn').addEventListener('click', function() {
        count--;
        updateDisplay();
    });
    updateDisplay();
// 10. Add a keyboard event listener that changes the background color of the body when a key is pressed
// Hint: Use document.addEventListener('keydown', function(event) { ... })
    document.addEventListener('keydown', function(event) {
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        document.body.style.backgroundColor = getRandomColor();
    });
// Bonus Challenge:
// Create a function that changes the text of all paragraphs to be uppercase when double-clicked
// Hint: Use querySelectorAll to select all paragraphs, then use forEach to add a dblclick event listener to each one
    function changeParagraphsToUpperCase() {
        const paragraphs = document.querySelectorAll('p');
        paragraphs.forEach(function(paragraph) {
            paragraph.addEventListener('dblclick', function() {
                paragraph.textContent = paragraph.textContent.toUpperCase();
            });
        });
    }   
    changeParagraphsToUpperCase();
});