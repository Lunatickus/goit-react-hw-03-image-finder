import { ReactComponent as IconSearch } from '../../assets/images/search-outline.svg';

export const Searchbar = ({ onSubmit }) => {
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <IconSearch width="20" />
        </button>

        <input
          className="SearchForm-input"
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
