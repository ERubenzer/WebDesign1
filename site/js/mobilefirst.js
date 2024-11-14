// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get the menu toggle button and the main navigation element
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // Add click event listener to the menu toggle button
    menuToggle.addEventListener('click', function() {
        // Toggle the 'show' class on the main navigation to show/hide the menu
        mainNav.classList.toggle('show');
    });


// TODO: Create an array of menu items for your restaurant
const menuItems = [ 
    { category: 'Appetizers', items: [
        { name: 'Cheese Curds', description: 'Our favorite cheesy snack deef fried. Comes with ketchup or ranch.', price: 4.39, image: '../images/restaurant/cheesecurds.jpg' },
        { name: 'Mozzarella Sticks', description: "Gooey mozzarella baked with a crunchy breaded crust. Served with marinara.", price: 6.99, image: '../images/restaurant/mozzarellasticks.jpg '},
        { name: 'Stuffed Mushrooms', description: "Juicy mushrooms filled with a savory mixture of cheese and herbs.", price: 9.49, image: '../images/restaurant/suffedmushrooms.jpg' }
    ]},
    { category: 'Main Courses', items: [
        { name: "Shrimp Alfredo", description: "Tender shrimp tossed in a creamy alfredo sauce, served with fettucine.", price: 24.99, image: '../images/restaurant/shrimpalfredo.jpg' },
        { name: "Spaghetti and Meatballs", description: "Italian meatballs swimming in a red sauce served over spaghetti.", price: 18.99, image: '../images/restaurant/spaghettimeatballs.jpg' },
        { name: "Chickpea Kale Salad", description: "Carrots, pecans, and raisins tossed with kale and Italian dressing.", price: 7.50, image: '../images/restaurant/chickkalesalad.jpg'}
    ]},
    { category: 'Desserts', items: [
        { name: "Chocolate Mousse Cake", description: 'Layered cake with rich, velvety chocolate mousse encased in a light, airy chocolate sponge. Topped with ganache.', price: 11.50, image: "../images/restaurant/chocolatemoussecake.jpg"},
        { name: "Ice Cream Sundae", description: 'Vanilla ice cream topped with a hot gooey fudge and a scrumptious cherry on top.', price: 7.69, image: "../images/restaurant/icecreamsundae.jpg"},
        { name: "Lemon Cheesecake", description: "A creamy and rich lemon-flavored cake topped with a lemon curd.", price: 9.50, image: "../images/restaurant/lemoncheesecake.jpg"}
    ]}
];

// Function to create menu category sections
function createMenuCategories() {
    const menuCategoriesSection = document.getElementById('menu-categories');

    // Iterate through each category and add the items to the corresponding section
    menuItems.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.className = 'menu-category';
        categorySection.id = category.category.toLowerCase().replace(' ', '-');
        
        // Add the category title
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category.category;
        categorySection.appendChild(categoryTitle);
        
        // Add each item within the category
        category.items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="menu-item-details">
                    <div class="menu-item-name">${item.name}</div>
                    <div class="menu-item-description">${item.description}</div>
                </div>
                <div class="menu-item-price">$${item.price.toFixed(2)}</div>
            `;
            categorySection.appendChild(menuItem);
        });
        
        // Append the category section to the menu categories section
        menuCategoriesSection.appendChild(categorySection);
    });
}

// Call the function to create menu categories
createMenuCategories();

// Function to handle responsive image updates based on screen size
function handleResponsiveImages() {
    const featuredImg = document.getElementById(featured-img);

    //Check the viewport width and set the appropriate image source
    function setImageSource() {
        if (window.innerWidth < 601) {
            featuredImg.src = '../images/restaurant/featured-dish-small.jpg';
        } else if (window.innerWidth < 901) {
            featuredImg.src = '../images/restaurant/featured-dish-medium.jpg';
        } else {
            featuredImg.src = '../images/restaurant/featured-dish-large.jpg';
        }
    }

    // Set initial image source
    setImageSource();

    // Update image source on window resize.
    window.addEventListener('resize', setImageSource);
}

    // Call the function to handle responsive images for the featured dish
    handleResponsiveImages();
});
    