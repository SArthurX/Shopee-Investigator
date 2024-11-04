# Shopee-Investigator

## Before Running the Script
1. **Search for Your Main Product**:
   - Login frist
   - Go to Shopee’s website and use the search bar to look up your main product.
   - The search results page should display listings related to this main product.

2. **Run the Script**:
   - Open your browser’s developer console (usually accessible by pressing `F12` or `Ctrl+Shift+J` on most browsers).
   > You may need to modify `let keywords = ['keyword1', 'keyword2', 'keyword3'];`
   - Copy and paste the script into the console and press `Enter` to run it.

   The script will go through each seller from the initial search results, checking if they offer other products you’re interested in (based on your specified keywords). This helps you find multiple items from the same seller, so you can purchase them together and save on shipping costs.

## How It Works
After running the script on the search results page, it will:
- Visit each seller’s store page linked in the search results.
- Search for each specified keyword within the store.
- Return to the main search page after checking each store, moving on to the next seller.

> By following these steps, you can quickly determine if any seller in your search results offers additional items that match your other needs, potentially allowing for a combined purchase with reduced shipping fees.