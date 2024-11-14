import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    try {
      const isLiked = await this._isRestaurantExist(id);
      if (isLiked) {
        await this._renderLiked();
      } else {
        await this._renderLike();
      }
    } catch (error) {
      console.error('Error rendering button:', error);
    }
  },

  async _isRestaurantExist(id) {
    try {
      const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
      return !!restaurant;
    } catch (error) {
      console.error('Error checking restaurant existence:', error);
      return false; // Asumsikan restoran tidak ada jika terjadi error
    }
  },

  async _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();
    this._addLikeButtonEvent();
  },

  async _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate();
    this._addLikedButtonEvent();
  },

  _addLikeButtonEvent() {
    const likeButton = document.getElementById('likeButton');
    likeButton.addEventListener('click', async () => {
      try {
        await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
        this._renderLiked();
      } catch (error) {
        console.error('Error liking restaurant:', error);
      }
    });
  },

  _addLikedButtonEvent() {
    const likeButton = document.getElementById('likeButton');
    likeButton.addEventListener('click', async () => {
      try {
        // Hanya hapus restoran jika ada di database
        const restaurantExists = await this._isRestaurantExist(this._restaurant.id);
        if (restaurantExists) {
          await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
          this._renderLike();
        } else {
          console.error('Restoran belum disukai, tidak bisa membatalkan suka');
        }
      } catch (error) {
        console.error('Error unliking restaurant:', error);
      }
    });
  }
};

export default LikeButtonInitiator;