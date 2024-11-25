import { getListOfRestaurants } from '../../data/restaurant-api';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const ContentItem = {
  async render() {

    try {
      const restaurantData = await getListOfRestaurants();

      return `
          <section class="content">
            <div class="explore">
              <h1 class="explore-label">Jelajahi Restoran</h1>
              <div class="posts">
                ${restaurantData.map((restaurant) => `
                  <div class="restaurant-item" tabindex="0">
                    <div class="rating">
                      <span class="star">⭐</span>
                      <span class="rating-number">${restaurant.rating}</span>
                    </div>
                    <img class="lazyload" data-src="https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}" alt="${restaurant.name}">
                    <div class="restaurant-item-content">
                      <p class="city">
                        <span class="mdi--location"></span> ${restaurant.city}
                      </p>
                      <h2>
                        <a href="#/restaurant/${restaurant.id}">${restaurant.name}</a>
                      </h2>
                      <p>${restaurant.description.length > 100
    ? `${restaurant.description.slice(0, 150)}...`
    : restaurant.description}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        `;
    } finally {
      // hideLoading();
    }
  },

  async afterRender() {
  }
};

export default ContentItem;
