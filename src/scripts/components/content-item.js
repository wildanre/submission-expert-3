class ContentItem extends HTMLElement {
  set content(restaurant) {
    this.innerHTML = `
      <div class="restaurant-item tabindex="0" ">
        <div class="rating">
          <span class="star">⭐</span>
          <span class="rating-number">${restaurant.rating}</span>
        </div>
        <img src="${restaurant.pictureId}" alt="${restaurant.name}">
        <div class="restaurant-item-content"> 
                  <p class="city">
            <span class="mdi--location"></span> ${restaurant.city}
          </p>
          <h2>
          <a href="#">${restaurant.name}</a>
          </h2>
          <p>${restaurant.description}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('content-item', ContentItem);
