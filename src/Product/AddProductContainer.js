import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class AddProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      name: '',
      price: '',
      brand: '',
      category: '',
      stock: ''
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
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

  handleAddNewProductClick = id => {
    this.openModal();
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal(e) {
    e.stopPropagation();
    this.setState({ modalIsOpen: false });
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    // this.closeModal(event);
    this.addNotification();
  };

  handleImageUpload = event => {
    const files = Array.from(event.target.files);
    this.setState({
      file: files[0]
    });
  };

  render() {
    const { name, price, brand, category, stock } = this.state;
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
          contentLabel="Example Modal"
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
            <label className="form-label">Category</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="category"
              placeholder="Category"
              value={category}
              onChange={this.handleOnChange}
            />
            <label className="form-label">Stock</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="stock"
              placeholder="Category"
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

            <button style={{ marginTop: '20px' }} className="btn btn-primary" onClick={this.handleSubmit}>
              Add item
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddProductContainer;
