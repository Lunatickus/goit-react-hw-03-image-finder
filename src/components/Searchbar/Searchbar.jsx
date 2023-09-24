import { Component } from 'react';
import { ReactComponent as IconSearch } from '../../assets/images/search-outline.svg';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            {/* <span className="SearchForm-button-label">Search</span> */}
            <IconSearch width="20" />
          </button>

          <input
            onChange={this.handleChange}
            className="SearchForm-input"
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
          />
        </form>
      </header>
    );
  }
}
