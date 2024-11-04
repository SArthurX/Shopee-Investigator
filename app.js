async function goToMultipleStoresAndSearch(keywords, maxStores = 5) {
  let initialSearchValue = document.querySelector('.shopee-searchbar-input__input').value;
  let storeItems = document.querySelectorAll('.row.shopee-search-item-result__items a.contents'); //URL
  let storesToSearch = Array.from(storeItems).slice(0, maxStores); 

  for (let i = 0; i < storesToSearch.length; i++) {
      let storeItems = document.querySelectorAll('.row.shopee-search-item-result__items a.contents'); //URL
      let storesToSearch = Array.from(storeItems).slice(0, maxStores); 
      await searchStore(storesToSearch[i], keywords, initialSearchValue);
  }
}


async function searchStore(storeLink, keywords, initialSearchValue) {
  return new Promise((resolve) => {
    storeLink.click();

    setTimeout(() => {
      let storePageLink = document.querySelector('a.Z6yFUs');
      if (!storePageLink) return resolve();

      storePageLink.click();

      setTimeout(async () => {
        await searchInStoreForKeywords(keywords);
        await returnToInitialSearchPage(initialSearchValue);
        resolve();
      }, 5000);

    }, 5000);
  });
}

async function searchInStoreForKeywords(keywords) {
  for (let i = 0; i < keywords.length; i++) {
    let keyword = keywords[i];
    let searchBox = document.querySelector('.shopee-searchbar-input__input');
    if (!searchBox) return;

    simulateInput(searchBox, keyword);

    // 點擊搜尋按鈕
    let searchButton = document.querySelector('.shopee-searchbar__search-button');
    if (searchButton) {
      searchButton.click();
    } else {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 5000));

    let results = [];
    let items = document.querySelectorAll('a.contents');
    items.forEach(item => {
      if (!item.closest('.shopee-header-section--simple')) {
        let url = item.getAttribute('href');
        let fullUrl = `https://shopee.tw${url}`;
        results.push(fullUrl);
      }
    });

    console.log(`Results for "${keyword}":`);
    console.table(results);
  }
}


async function returnToInitialSearchPage(initialSearchValue) {
  return new Promise((resolve) => {
    let searchBox = document.querySelector('.shopee-searchbar-input__input');
    simulateInput(searchBox, initialSearchValue);

    let dropdownTrigger = document.querySelector('.shopee-searchbar-selector__trigger');
    if (dropdownTrigger) {
      dropdownTrigger.click();
    }

    setTimeout(() => {
      let selectElement = document.querySelector('select');
      if (selectElement) {
        selectElement.value = '在蝦皮購物';
        let event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
      }

      let searchButton = document.querySelector('.shopee-searchbar__search-button');
      if (searchButton) {
        searchButton.click();
      }

      setTimeout(() => {
        resolve();
      }, 5000);

    }, 500);
  });
}

function simulateInput(element, value) {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
  nativeInputValueSetter.call(element, value);
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

let keywords = ['keyword1', 'keyword2', 'keyword3'];
goToMultipleStoresAndSearch(keywords);
