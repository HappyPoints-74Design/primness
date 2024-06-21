/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */

 const itemsList = document.getElementById('collection-filters__tags');
  let url = window.location.href ;
  var pathArray = window.location.pathname.split('/');
  var paramString = pathArray[3];
  var items = [];
  
  items.push(paramString);
  var lastItem;
  if (paramString) {
    if (paramString.includes('+')) {
      items = paramString.split('+');
    }
    else if (paramString.includes('?')) {
      items = paramString.split('?');
      items.splice(-1,1);
    }
  }

 function addItem(url) {
  var paramString = url.substr(url.lastIndexOf('/') + 1);
  if (paramString.includes('+')) {
    items = paramString.split('+');
  }
  else if (paramString.includes('?')) {
    items = paramString.split('?');
    items.splice(-1,1);
  }
  populateList(items, itemsList);
   
 }

 function removeItem(newUrl) {
  let tags_active = document.querySelectorAll('.collection-filters__tag');
  if (tags_active) {
    tags_active.forEach(element => {
      element.addEventListener('click', function() {
        var thisValue = [];
        if (history.replaceState) {
           thisValue = this.getAttribute('data-value');
        }
      });
    });
  }
}

 function populateList(content = [], platesList) {
  // thisColor = this.getAttribute('data-image-color');
  // console.log(thisColor);
   if (platesList != null) {
    platesList.innerHTML = content.map((item, i) => {
      if (item != '') {
        let item_dlc;
        if (item.includes('?')) {
          item_dlc = item.split('?');
          item = item_dlc[0];
        }
        if (item.includes('size_') || item.includes('SIZE_') ) {
          item_dlc = item.split('size_');
          item_dlc = item.split('SIZE_');
          item = item_dlc[1];
        }
     
        if (item.includes('COLOUR_') || item.includes('colour_')) {
          
          if (item.includes('COLOUR_')) {
            item_dlc = item.split('COLOUR_');
          }
          else if(item.includes('colour_')) {
            item_dlc = item.split('colour_');
          }
          item = item_dlc[1];
          var className = 'color';
        }
 
        if (item.includes('FABRICATION_') || item.includes('Fabrication_')) {
          item_dlc = item.split('Fabrication_');
          item_dlc = item.split('FABRICATION_');
          item = item_dlc[1];
          if (item.includes('_')) {
            item = item.replaceAll('_', ' ');
          }
          else if(item.includes('-')) {
            item = item.replaceAll('-', ' ');
          }
        }
        let allColor = document.querySelectorAll('.collection-filters__colors button');
        let imageColorUrl = '';
        let flag = false;
        allColor.forEach(function(color, index) {
          let dataTag = color.getAttribute('data-tag');
          if (dataTag.includes(item) ) {
            let currentColor = document.querySelector('.collection-filters__colors button[data-tag="'+ dataTag+'"]');
        
            imageColorUrl = currentColor.getAttribute('data-image-color');
            flag = true;
          }
        })
     
        return `
          <div class="collection-filters__tag is-active" data-value="${item}" data-key="${item}">
          <div class="product-page__color-swatch-container ${className}" style="
          ${flag ? 
            `background-image:url(${imageColorUrl});` 
           : `background-color:${item};`} " ></div>
          <span> ${item} </span>
          <button class="collection-filters__remove-filter" data-tag="${item}"  data-action="clear-tag"></button>
          </div>
        `;
      }

    }).join('');

   }

 }

if (document.querySelector('.collection-filters__toggle')) {
  document.querySelector('.collection-filters__toggle').addEventListener('click', function() {
    document.querySelector('.collection-filters__panels').classList.toggle('active');
    document.querySelector('.collection-sort__panels').classList.remove('active');
    this.classList.toggle('is-active');
    document.querySelector('.collection-sort__toggle').classList.remove('is-active');
  })
}

if (document.querySelector('.collection-sort__toggle')) {
  document.querySelector('.collection-sort__toggle').addEventListener('click', function() {
    document.querySelector('.collection-sort__panels').classList.toggle('active');
    document.querySelector('.collection-filters__panels').classList.remove('active');
    document.querySelector('.collection-filters__toggle').classList.remove('is-active');
    this.classList.toggle('is-active');
  })
}

document.addEventListener("DOMContentLoaded", function(){

  let collectionElm = document.querySelector('.ProductItem');
  if (collectionElm) {

    if (items != '') {
      populateList(items, itemsList);
    }

    let sizes = document.querySelectorAll('.ProductItem .ProductForm__Variants label.SizeSwatch:not(.disabled)');
    sizes.forEach(function(item) {
    
      item.addEventListener('click', function(e) {
        e.preventDefault();
        let formThis = this.closest('form');
        formThis.querySelectorAll('label.SizeSwatch');
        var options = formThis.querySelectorAll('label.SizeSwatch');
        options.forEach(function(i) {
          if (i.classList.contains("active-border")) {
            i.classList.remove('active-border')
          }
        })
        
        let currentVariant = this.getAttribute('data-variant-id');
        formThis.querySelector('[selected]').removeAttribute('selected');
        formThis.querySelector('option[value="'+currentVariant+'"]').setAttribute('selected', 'selected');
        this.classList.add('active-border');
        setTimeout(() => {
          formThis.querySelector('[data-action="add-to-cart"]').click();
        }, 500);

      })
    })

    customSort();
  }
 
});

function customSort() {
  let sortItem = document.querySelectorAll('.collection-sort__panels .Popover__Value');
  sortItem.forEach(function(item) {
    
    item.addEventListener('click', function(e) {
      let sortValue = this.getAttribute('data-value') ;
      document.querySelector('#collection-sort-popover button[data-value="'+ sortValue+'"]').click();
      document.querySelector('.collection-sort__panels').classList.remove('active');
    })
  })
}