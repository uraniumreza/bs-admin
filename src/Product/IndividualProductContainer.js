import React, { Component } from 'react';
import Modal from 'react-modal';
import api from '../Common/api';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80vh'
  }
};

class IndividualProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  componentDidMount() {
    const { id, name, image, price, discount, stock_count } = this.props.item;
    this.setState({
      id,
      name,
      image,
      price,
      discount,
      stock: stock_count
    });
  }

  addNotification() {
    this.notificationDOMRef.current.addNotification({
      title: 'Awesomeness',
      message: 'Awesome Notifications!',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  handleImageUpload = event => {
    const files = Array.from(event.target.files);
    this.setState({
      file: files[0]
    });
  };

  addSuccessNotification(notification) {
    this.notificationDOMRef.current.addNotification({
      title: 'Success',
      message: notification,
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  addFailureNotification() {
    this.notificationDOMRef.current.addNotification({
      title: 'Failure',
      message: 'API call failed!',
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  onCloudUploadImage = async () => {
    const { file } = this.state;
    let fd = new FormData();
    fd.append('image', file);
    this.setState({
      imageUploading: true
    });
    try {
      const response = await api.post('/media/upload', fd);
      if (response && response.url) {
        this.setState({
          image: response.url,
          imageUploading: false
        });
        this.addSuccessNotification('Image uploaded');
      } else {
        this.addFailureNotification('Upload Failed');
      }
      this.setState({
        imageUploading: false
      });
    } catch (err) {
      this.addFailureNotification('Upload Failed');
      this.setState({
        imageUploading: false
      });
    }
  };

  handleProductClick = async () => {
    await this.loadData();
    this.openModal();
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  loadData = async () => {
    this.setState({
      isLoading: true
    });
    const { id } = this.state;
    try {
      const response = await api.get(`/products/${id}`);
      if (response && response._id) {
        const { brand, category, description, active } = response;
        this.setState({
          brand,
          category,
          description,
          isLoading: false,
          active
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  closeModal(e) {
    e.stopPropagation();
    this.setState({ modalIsOpen: false });
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]:
        event.target.value === 'true' ? true : event.target.value === 'false' ? false : event.target.value
    });
  };

  handleProductEdit = async event => {
    const { id, name, price, discount, stock, brand, active, category, description, image } = this.state;
    this.setState({
      isLoading: true
    });
    try {
      const resposne = await api.patch(`products/${id}`, {
        name,
        price,
        discount,
        stock_count: stock,
        brand,
        active,
        category,
        description,
        image
      });
      console.log(resposne);
      this.setState({
        isLoading: false
      });
      this.addSuccessNotification('Product Updated!');
    } catch (error) {
      this.addFailureNotification('Not successfull!');
    }
  };

  handleProductDelete = async event => {
    const { id } = this.state;
    this.setState({
      isLoading: true
    });
    try {
      const response = await api.delete(`products/${id}`);
      console.log(response);
      this.setState({
        isLoading: false
      });
      this.addSuccessNotification('Product Deleted!');
    } catch (error) {
      this.addFailureNotification('Not successful');
    }
  };

  render() {
    const { id } = this.props;
    const {
      name,
      price,
      discount,
      stock,
      image,
      brand,
      active,
      category,
      description,
      isLoading,
      imageUploading
    } = this.state;
    return (
      <div className="individual-product-wrapper">
        <ReactNotification ref={this.notificationDOMRef} />
        <div onClick={() => this.handleProductClick(id)}>
          <img className="individual-product-image" src={image} alt="product" />
          <div className="product-name">
            <strong>Price: </strong>
            {price}
          </div>
          <div className="product-name">
            <strong>Name:</strong>
            {name}
          </div>
          <div className="product-name">
            <strong>Stock:</strong>
            {stock}
          </div>
          <div className="product-name">
            <strong>Discount:</strong> {discount}
          </div>
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="form-group" style={{ width: '500px' }}>
            <button
              style={{ marginTop: '20px' }}
              className={isLoading ? 'btn disabled' : 'btn btn-error'}
              onClick={this.handleProductDelete}
            >
              Delete Product
            </button>
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="name"
              placeholder="Name"
              onChange={this.handleOnChange}
              value={name}
            />
            <label className="form-label">Price</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="price"
              placeholder="Price"
              value={price}
              onChange={this.handleOnChange}
            />
            <label className="form-label">Discount</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="discount"
              placeholder="discount"
              value={discount}
              onChange={this.handleOnChange}
            />
            <label className="form-label">Brand</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="brand"
              placeholder="Brand"
              value={brand}
              onChange={this.handleOnChange}
            />
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              type="text"
              id="input-example-1"
              name="description"
              placeholder="Description"
              value={description}
              onChange={this.handleOnChange}
            />
            <label className="form-label">Category</label>
            <div className="form-group">
              <select name="category" value={category} className="form-select" onChange={this.handleOnChange}>
                <option value="Cosmetics">Cosmetics</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <label className="form-label">Active</label>
            <div className="form-group">
              <select name="active" value={active} className="form-select" onChange={this.handleOnChange}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <label className="form-label">Stock</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="stock"
              placeholder="Stock"
              value={stock}
              onChange={this.handleOnChange}
            />

            <label className="form-label">Image</label>
            <input
              className="form-input"
              type="file"
              id="input-example-1"
              name="image"
              placeholder="Image"
              onChange={this.handleImageUpload}
            />

            <div className="button-section">
              <button
                style={{ marginTop: '20px' }}
                className={imageUploading ? 'btn disabled' : 'btn btn-primary'}
                onClick={this.onCloudUploadImage}
              >
                Upload Image
              </button>
              <button
                style={{ marginTop: '20px' }}
                className={isLoading ? 'btn disabled' : 'btn btn-primary'}
                onClick={this.handleProductEdit}
              >
                Update Product Info
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default IndividualProductContainer;
