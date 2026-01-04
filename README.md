# Mini E-Commerce Store

Hey! This is a React-based shopping app. It's got all the usual e-commerce features you'd expect - product browsing, filtering, and a working shopping cart.

## What It Does

The app pulls products from the FakeStore API and lets you browse them like you would on any online store. Here's what I included:

**Product Browsing**
- Products are displayed in a nice grid that adjusts based on your screen size
- Each card shows the product image, name, price, and category
- There's a stock indicator so you know if something's available
- Can't add out-of-stock items to your cart (the button gets disabled)

**Search and Filters**
- Type in the search box to find products by name
- Filter by category using the dropdown
- Sort by price - either cheap to expensive or the other way around
- Clear all filters with one click if you want to start over

**Shopping Cart**
- Click "Add to Cart" and it goes straight into your cart on the right
- Change quantities with the +/- buttons
- Remove items you don't want anymore
- See your running total as you shop
- Your cart saves to localStorage so it's still there if you refresh the page

**Extra Stuff**
- Click on any product to see more details in a popup modal
- Search has a small delay (debouncing) so it's not searching while you're still typing
- Works on phones, tablets, whatever - I made sure it's responsive
- Shows helpful messages when your cart is empty or no products match your search

## How to Run This Thing

You'll need Node.js installed (I used v18 but anything above v14 should work).

```bash
# Install everything
npm install

# Start it up
npm start
```

Then just open http://localhost:3000 in your browser and you're good to go.

If you want to build it for production:
```bash
npm run build
```

## Tech Stack

I kept it pretty simple:
- React 18 (just functional components, no class components)
- Plain CSS (no Bootstrap or Material UI or anything like that)
- FakeStore API for the product data
- localStorage to remember your cart

## Project Organization

```
src/
├── components/
│   ├── Cart.js              // Shopping cart sidebar
│   ├── CartItem.js          // Individual cart item
│   ├── FilterBar.js         // Search and filter controls
│   ├── ProductCard.js       // Single product card
│   ├── ProductList.js       // Grid of products
│   └── ProductModal.js      // Product detail popup
├── App.js                   // Main component
└── index.js                 // Entry point
```

Each component has its own CSS file to keep things organized.

## Things I Focused On

- **Clean Code**: Tried to keep everything readable and well-organized
- **Performance**: Used React.memo and useMemo to avoid unnecessary re-renders
- **User Experience**: Added loading states, empty states, and smooth transitions
- **Responsive**: Actually tested it on different screen sizes
- **No Console Errors**: Made sure there are no warnings or errors in the console

## Could Add Later

If I had more time, would be cool to add:
- User accounts and login
- Actual checkout and payment
- Wishlist feature
- Product reviews
- Order history
- Better product images (the API ones are hit or miss)
