import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
export class App extends Component {
  state = {
    images: null,
    query: '',
    isLoading: false,
    page: 1,
    largeImageURL: '',
    totalImages: 0,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ isLoading: true, page: 1, images: null });
      try {
        const {hits, total} = await fetchImages(nextQuery, 1);
        this.setState({
          images: [...hits],
          totalImages: total,
        });
      } catch (err) {
        console.log(err);
        this.setState({error: err});
      } finally {
        this.setState({ isLoading: false });
      }
    } else if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ isLoading: true });
      try {
        const {hits} = await fetchImages(nextQuery, nextPage);
        this.setState({
          images: [...prevState.images, ...hits],
        });
      } catch (err) {
        console.log(err);
        this.setState({error: err});
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const searchedQuery = e.currentTarget.elements.searchQuery.value;

    if (searchedQuery.trim() === '') {
      return;
    }

    this.setState({
      query: searchedQuery,
    });

    e.currentTarget.reset();
  };

  incrementPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModalImage = url => {
    this.setState({
      largeImageURL: url,
    });
  };

  handleCloseModalImage = () => {
    this.setState({
      largeImageURL: '',
    });
  };

  render() {
    const { images, isLoading, largeImageURL, totalImages } = this.state;
    const showImages = Array.isArray(images) && images.length > 0;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {showImages && (
          <ImageGallery
            images={images}
            handleOpenModalImage={this.handleOpenModalImage}
          />
        )}
        {isLoading && <Loader />}
        {showImages && images.length < totalImages && (
          <Button incrementPage={this.incrementPage} />
        )}
        {largeImageURL !== '' && (
          <Modal
            onClose={this.handleCloseModalImage}
            largeImageURL={largeImageURL}
          />
        )}
      </div>
    );
  }
}
