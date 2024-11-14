import { openDB } from 'idb';
import CONFIG from '../data/config';

const FavoriteRestaurantIdb = {
  async getAllRestaurants() {
    const db = await this._openDb();
    const store = db.transaction(CONFIG.OBJECT_STORE_NAME, 'readonly').objectStore(CONFIG.OBJECT_STORE_NAME);
    return store.getAll();
  },

  async getRestaurant(id) {
    const db = await this._openDb();
    const store = db.transaction(CONFIG.OBJECT_STORE_NAME, 'readonly').objectStore(CONFIG.OBJECT_STORE_NAME);
    return store.get(id);
  },

  async putRestaurant(restaurant) {
    const db = await this._openDb();
    const store = db.transaction(CONFIG.OBJECT_STORE_NAME, 'readwrite').objectStore(CONFIG.OBJECT_STORE_NAME);
    await store.put(restaurant);
  },

  async deleteRestaurant(id) {
    const db = await this._openDb();
    const store = db.transaction(CONFIG.OBJECT_STORE_NAME, 'readwrite').objectStore(CONFIG.OBJECT_STORE_NAME);
    await store.delete(id);
  },

  async _openDb() {
    return openDB(CONFIG.DATABASE_NAME, CONFIG.DATABASE_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(CONFIG.OBJECT_STORE_NAME)) {
          db.createObjectStore(CONFIG.OBJECT_STORE_NAME, { keyPath: 'id' });
        }
      }
    });
  }
};

export default FavoriteRestaurantIdb;
