import React, { Component } from 'react';
import Modal from 'react-modal';

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

const dataObject = {
  name: 'Hestia Goods Switch Carrying Case',
  price: '1669',
  brand: 'XXY',
  category: 'XXXU',
  stock: '5',
  imageURL: 'https://images-na.ssl-images-amazon.com/images/I/61H7IVw48tL._UL900_.jpg'
};

class IndividualProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      name: dataObject.name,
      price: dataObject.price,
      brand: dataObject.brand,
      category: dataObject.category,
      stock: dataObject.stock,
      imageURL: dataObject.imageURL
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

  handleProductClick = id => {
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
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    const { id } = this.props;
    const { name, price, brand, category, stock, imageURL } = this.state;
    return (
      <div className="individual-product-container" onClick={() => this.handleProductClick(id)}>
        <img className="individual-product-image" src={imageURL} alt="product" />
        <div className="product-name">
          <strong>Price: </strong>
          {price}
        </div>
        <div className="product-name">
          <strong>Name:</strong>
          {name}
        </div>
        <div className="product-name">
          <strong>Brand:</strong> {brand}
        </div>
        <div className="product-name">
          <strong>category:</strong> {category}
        </div>
        <div className="product-name">
          <strong>Stock:</strong> {stock}
        </div>

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
            <input className="form-input" type="file" id="input-example-1" name="image" placeholder="Image" />

            <button style={{ marginTop: '20px' }} className="btn btn-primary">
              Edit item
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default IndividualProductContainer;
