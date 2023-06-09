//REMEMBER  THE MODEL VIEW CONTROLLER!!!


//____________________MODEL___________________________//

//we are importing the products array from the data/products.js file


//_________________VIEW___________________________//

let productsHTML = [];

//iterate through the products array, generate the html code for each one
products.forEach( (product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>
      
      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});
//DATA ATRIBUTES: ALWAYS START WITH: DATA- and in kebab case

//Put the generated html on the page with innerHTML
document.querySelector('.js-products-grid').innerHTML = productsHTML;


//________________________CONTROLLER________________________//

//querySelectorAll gets all items with this js-class, iterate them waiting for a click, then put them in the cart
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    let addedMessageTimeoutId;
    const productId = button.dataset.productId;

    //Add a class to make the added tick appear on screen, set a lopp for the timeOut ID
    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

    addedMessage.classList.add('added-to-cart-appear');
    
      // Check if a previous timeoutId exists. If it does,
      // we will stop it.
      if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-to-cart-appear');
      }, 2000);
      

      // Save the timeoutId so we can stop it later.
      addedMessageTimeoutId = timeoutId;
    

    const itemQuantity = document.querySelector(`.js-quantity-selector-${productId}`).value;
    //console.log(document.querySelector(`.js-quantity-selector`));

    //check if the item is already there, and if true, add one to the quantitylet matchingItem;
    let matchingItem;
    cart.forEach( (item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += Number(itemQuantity);
    } else {
      //if false, add the item to the cart
      cart.push({
        productId: productId,
        quantity: Number(itemQuantity)
      });
    }
    //we need to update the cart number in the header too, so iterate throught the cart to count all products
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    console.log(cart);
    //Update the cart quantity number in the header
    document.querySelector('.js-cart-quantity').innerText = cartQuantity;
  });
});
