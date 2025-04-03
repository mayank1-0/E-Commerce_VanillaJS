//--------------------------------Below is a syntax of Immediately Invoked Function Expression (IIFE)------------------------------------
var shoppingCart = (function () {

    cart = [];                                  // Created an array named cart

    function Item(name, price, count) {        // created a function named Item with 3 arguments name, price and count
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart function to store/set data in localStorage
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart function to load/retrieve data from localStorage
    function loadCart() {
        cart = JSON.parse(localStorage.getItem('shoppingCart'));
    }

    if (localStorage.getItem("shoppingCart") != null) {     // if localStorage is not empty we will run the loadCart function which loads the localStorage data into cart array
        loadCart();
    }


    var obj = {};       // We created a obj named object
                        // This line is defining a method called addItemToCart on the obj object. In JavaScript, functions can be properties of objects. So, here we are assigning a function to the property addItemToCart of the object obj.
    // Add to cart
    obj.addItemToCart = function (name, price, count) {            
        for (var item in cart) {                              // This is a for in loop where item is index stored in string format and cart is the array containing objects.
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart (Not used anywhere)
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));            // Returns number if in decimal number upto two decimal places
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {   // iterating through cart array of objects
            item = cart[i]; // item is object containing name, count and price key-value pairs
            itemCopy = {};
            for (p in item) {  // p is the key for e.x. name, price, quantity
                itemCopy[p] = item[p];  // item[p] is the value in key:value pair
            }
            itemCopy.total = Number(item.price * item.count).toFixed(0);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }
    return obj;
})();

//--------------------------------Above is a syntax of Immediately Invoked Function Expression (IIFE)------------------------------------

// Add item
$('.default-btn').click(function (event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);     // Here shoppingCart is the name of the IIFE/object and addItemToCart is the name of the function/key associated with shoppingCart object
    displayCart();
});

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});

function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>"
            + "<td>" + cartArray[i].name + "</td>"
            + "<td>(" + cartArray[i].price + ")</td>"
            + "<td><div class='input-group'>"
            + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
            + "</div></td>"
            + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + " >X</button></td>"
            + " = "
            + "<td> ₹" + cartArray[i].total + "</td>"
            + "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Above displayCart function fills the modal and also fill at the top-right, total-count of items

// Delete item button
$('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});
displayCart();

//////// ui script start /////////
// Tabs Single Page
$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
$('.tab ul.tabs li a').on('click', function (g) {
    var tab = $(this).closest('.tab'),
        index = $(this).closest('li').index();
    tab.find('ul.tabs > li').removeClass('current');
    $(this).closest('li').addClass('current');
    tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
    tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
    g.preventDefault();
});


