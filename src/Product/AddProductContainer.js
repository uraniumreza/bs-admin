import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import api from '../Common/api';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80vh',
  },
};

class AddProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      name: '',
      price: '',
      discount: '',
      brand: '',
      category: 'Cosmetics',
      color: '',
      stock: '',
      description: '',
      imageUploading: false,
      imageLink: '',
      productSaving: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addSuccessNotification = this.addSuccessNotification.bind(this);
    this.addFailureNotification = this.addFailureNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

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
      dismissable: { click: true },
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
      dismissable: { click: true },
    });
  }

  handleAddNewProductClick = (id) => {
    this.openModal();
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal(e) {
    e.stopPropagation();
    this.setState({ modalIsOpen: false });
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    const { name, brand, color, category, price, imageLink, description, stock } = this.state;
    this.setState({
      productSaving: true,
    });
    try {
      const response = await api.post('/products', {
        name,
        brand,
        color,
        category,
        price,
        image: imageLink,
        description,
        stock_count: stock,
      });
      if (response && response._id) {
        this.addSuccessNotification('Product added');
        this.setState({
          modalIsOpen: false,
          name: '',
          price: '',
          brand: '',
          category: 'Cosmetics',
          color: '',
          stock: '',
          description: '',
          imageUploading: false,
          imageLink: '',
          productSaving: false,
        });
      } else {
        this.addFailureNotification('Update failed');
      }
      this.closeModal(event);
    } catch (error) {
      this.addFailureNotification('Update failed');
    }
  };

  handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    this.setState({
      file: files[0],
    });
  };

  onCloudUploadImage = async () => {
    const { file } = this.state;
    let fd = new FormData();
    fd.append('image', file);
    this.setState({
      imageUploading: true,
    });
    try {
      const response = await api.post('/media/upload', fd);
      if (response && response.secure_url) {
        this.setState({
          imageLink: response.secure_url,
          imageUploading: false,
        });
        this.addSuccessNotification('Image uploaded');
      } else {
        this.addFailureNotification('Upload Failed');
      }
      this.setState({
        imageUploading: false,
      });
    } catch (err) {
      this.addFailureNotification('Upload Failed');
      this.setState({
        imageUploading: false,
      });
      this.addFailureNotification('Upload Failed');
    }
  };

  render() {
    const {
      name,
      price,
      brand,
      category,
      stock,
      imageUploading,
      imageLink,
      productSaving,
      color,
      description,
      discount,
    } = this.state;
    return (
      <div className="add-product-container">
        <ReactNotification ref={this.notificationDOMRef} />
        Add a product by clicking the button
        <button className="btn btn-primary" onClick={this.handleAddNewProductClick}>
          Add a product
        </button>
        Or click on the product to edit the information
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Product Label"
        >
          <div className="form-group" style={{ width: '500px' }}>
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
              placeholder="Discount"
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
            <label className="form-label">Color</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="color"
              placeholder="Color"
              value={color}
              onChange={this.handleOnChange}
            />
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              type="text"
              id="input-example-1"
              name="description"
              placeholder="description"
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
            {imageLink && imageLink.length > 0 ? null : (
              <div>
                <label className="form-label">Image</label>
                <input
                  className="form-input"
                  type="file"
                  id="input-example-1"
                  name="image"
                  placeholder="Image"
                  onChange={this.handleImageUpload}
                />
              </div>
            )}
            <div className="button-section">
              {imageLink && imageLink.length > 0 ? (
                <div style={{ marginTop: '10px' }}>
                  <strong>Image Uploaded.</strong>
                </div>
              ) : (
                <button
                  style={{ marginTop: '20px' }}
                  className={imageUploading ? 'btn disabled' : 'btn btn-primary'}
                  onClick={this.onCloudUploadImage}
                >
                  Upload Image
                </button>
              )}

              <button
                style={{ marginTop: '20px' }}
                className={productSaving ? 'btn disabled' : 'btn btn-primary'}
                onClick={this.handleSubmit}
              >
                Add item
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddProductContainer;
