const SearchBar = {
  render() {
    return `
        <div class="search-bar">
          <input type="text" id="searchInputBar" placeholder="Search restaurants...">
        </div>
      `;
  },

  afterRender() {
    const searchInputBar = document.getElementById('searchInputBar');

    searchInputBar.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const query = searchInputBar.value.trim();
        if (query) {
          window.location.hash = `#/search?q=${query}`;
        }
      }
    });
  },
};

export default SearchBar;
