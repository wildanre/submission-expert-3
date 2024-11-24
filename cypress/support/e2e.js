describe('Like and Unlike Restaurant', () => {
  const restaurantId = 'rqdv5juczeskfw1e867';

  beforeEach(() => {
    // Intercept API request untuk detail restoran (opsional jika respons API lambat)
    cy.intercept('GET', `https://restaurant-api.dicoding.dev/detail/${restaurantId}`, {
      fixture: 'restaurant-detail.json', // Buat file fixture berisi respons detail restoran
    }).as('getRestaurantDetail');

    // Kunjungi halaman detail restoran
    cy.visit(`http://localhost:9000/#/restaurant/${restaurantId}`);

    // Tunggu data selesai dimuat
    cy.wait('@getRestaurantDetail');
  });

  it('should like a restaurant', () => {
    // Pastikan tombol Like muncul
    cy.get('#likeButtonContainer').should('be.visible').and('contain', 'Like');

    // Klik tombol Like
    cy.get('#likeButton').click();

    // Pastikan tombol berubah menjadi Liked
    cy.get('#likeButtonContainer').should('contain', 'Liked');

    // Verifikasi data restoran tersimpan di IndexedDB
    cy.window().then(async (win) => {
      const db = await win.indexedDB.open('favorite-restaurant-database');
      const tx = db.transaction('favorite-restaurant', 'readonly');
      const store = tx.objectStore('favorite-restaurant');
      const restaurant = await store.get(restaurantId);

      expect(restaurant).to.exist;
      expect(restaurant).to.have.property('id', restaurantId);
    });
  });

  it('should unlike a restaurant', () => {
    // Pastikan tombol Liked muncul
    cy.get('#likeButtonContainer').should('be.visible').and('contain', 'Liked');

    // Klik tombol Liked
    cy.get('#likeButton').click();

    // Pastikan tombol berubah menjadi Like
    cy.get('#likeButtonContainer').should('contain', 'Like');

    // Verifikasi data restoran dihapus dari IndexedDB
    cy.window().then(async (win) => {
      const db = await win.indexedDB.open('favorite-restaurant-database');
      const tx = db.transaction('favorite-restaurant', 'readonly');
      const store = tx.objectStore('favorite-restaurant');
      const restaurant = await store.get(restaurantId);

      expect(restaurant).to.be.undefined;
    });
  });
});
