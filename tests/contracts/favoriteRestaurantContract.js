const itActsAsFavoriteRestaurantModel = (FavoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    await FavoriteRestaurant.putRestaurant({ id: 1 });
    await FavoriteRestaurant.putRestaurant({ id: 2 });

    expect(await FavoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
    expect(await FavoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
    expect(await FavoriteRestaurant.getRestaurant(3)).toEqual(undefined);
  });


  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    FavoriteRestaurant.putRestaurant({ aProperty: 'property' });

    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    FavoriteRestaurant.putRestaurant({ id: 1 });
    FavoriteRestaurant.putRestaurant({ id: 2 });

    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite restaurant', async () => {
    FavoriteRestaurant.putRestaurant({ id: 1 });
    FavoriteRestaurant.putRestaurant({ id: 2 });
    FavoriteRestaurant.putRestaurant({ id: 3 });

    await FavoriteRestaurant.deleteRestaurant(1);

    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    FavoriteRestaurant.putRestaurant({ id: 1 });
    FavoriteRestaurant.putRestaurant({ id: 2 });
    FavoriteRestaurant.putRestaurant({ id: 3 });

    await FavoriteRestaurant.deleteRestaurant(4);

    expect(await FavoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it('should be able to search for restaurants', async () => {
    FavoriteRestaurant.putRestaurant({ id: 1, title: 'restaurant a' });
    FavoriteRestaurant.putRestaurant({ id: 2, title: 'restaurant b' });
    FavoriteRestaurant.putRestaurant({ id: 3, title: 'restaurant abc' });
    FavoriteRestaurant.putRestaurant({ id: 4, title: 'ini mah restaurant abcd' });

    expect(await FavoriteRestaurant.searchRestaurants('restaurant a')).toEqual([
      { id: 1, title: 'restaurant a' },
      { id: 3, title: 'restaurant abc' },
      { id: 4, title: 'ini mah restaurant abcd' },
    ]);
  });
};


export { itActsAsFavoriteRestaurantModel };