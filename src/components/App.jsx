import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { RotatingLines } from 'react-loader-spinner';
import { getImages } from 'services/getImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
export class App extends Component {
  state = {
    images: [],
    query: '',
    isLoading: false,
    page: 1,
    largeImageURL: '',
    totalImages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ isLoading: true, page: 1, images: [] });
      try {
        const resp = await getImages(nextQuery, 1);
        this.setState({
          images: [...resp.hits],
          totalImages: resp.total,
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.setState({ isLoading: false });
      }
    } else if (prevPage !== nextPage && nextPage !== 1) {
      this.setState({ isLoading: true });
      try {
        const resp = await getImages(nextQuery, nextPage);
        this.setState({
          images: [...prevState.images, ...resp.hits],
        });
      } catch (err) {
        console.log(err);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = value => {
    this.setState({
      query: value,
    });
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

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmit} />
        {images.length !== 0 && (
          <ImageGallery
            images={images}
            handleOpenModalImage={this.handleOpenModalImage}
          />
        )}
        {isLoading && (
          <div className="Loader">
            <RotatingLines />
          </div>
        )}
        {images.length < totalImages && (
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
