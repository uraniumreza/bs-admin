import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactNotification from 'react-notifications-component';
import Select from 'react-select';
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

const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', disabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' }
];

const dataObject = {
  orderId: '1',
  shopName: 'BS trading',
  ownerName: 'Nayeem Reza',
  phone: '8801536239164',
  products: [
    {
      id: '1',
      name: 'The long name of the product',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61H7IVw48tL._UL900_.jpg',
      price: '10',
      status: 'active',
      quantity: 5
    },
    {
      id: '2',
      name: 'The long name of the product',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61H7IVw48tL._UL900_.jpg',
      price: '10',
      status: 'active',
      quantity: 5
    },
    {
      id: '3',
      name: 'The long name of the product',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61H7IVw48tL._UL900_.jpg',
      price: '10',
      status: 'active',
      quantity: 5
    },
    {
      id: '4',
      name: 'The long name of the product',
      image: 'https://images-na.ssl-images-amazon.com/images/I/61H7IVw48tL._UL900_.jpg',
      price: 10,
      status: 'active',
      quantity: 5
    }
  ],
  totalPrice: 100,
  forwardedTo: null,
  orderStatus: 'pending'
};

class IndividualOrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      orderId: dataObject.orderId,
      shopName: dataObject.shopName,
      ownerName: dataObject.ownerName,
      phone: dataObject.phone,
      products: dataObject.products,
      totalPrice: dataObject.totalPrice,
      forwardedTo: null,
      orderStatus: 'active'
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

  handleSubmit = event => {
    // this.closeModal(event);
    this.addNotification();
  };

  render() {
    const { id } = this.props;
    const { phone, shopName, ownerName, orderId, products } = this.state;

    return (
      <div className="individual-product-wrapper" onClick={() => this.handleProductClick(id)}>
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="product-name" style={{ marginTop: '20px' }}>
          <strong>Order # </strong>
          {id}
        </div>
        <div className="product-name">
          <strong>Shop Name: </strong>
          {shopName}
        </div>
        <div className="product-name">
          <strong>Owner Name:</strong>
          {ownerName}
        </div>
        <div className="product-name">
          <strong>Phone:</strong> {phone}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ marginBottom: '20px' }}>
            <strong>OrderId: {id}</strong>
          </div>

          <label className="form-label" style={{ marginBottom: '20px' }}>
            <strong>Select Sales Representative</strong>
          </label>
          <div className="sr-selection">
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={colourOptions[0]}
              isClearable={true}
              isSearchable={true}
              name="color"
              options={colourOptions}
            />
          </div>

          <div className="order-description-header">
            <div className="order-item-id">
              <strong>#</strong>
            </div>
            <div className="order-item-name">
              <strong>NAME</strong>
            </div>
            <div className="order-item-quantity">
              <strong>QUANTITY</strong>
              {/* <input type="number" className="form-input" value="1" /> */}
            </div>
            <div className="order-item-price">
              <strong>PRICE</strong>
            </div>
            <div className="order-item-cancel">
              <strong>REMOVE</strong>

              {/* <button className="btn btn-primary" onClick={event => this.handleSubmit(event)}>
                Cancel
              </button> */}
            </div>
          </div>
          {products.map(product => (
            <div className="order-description-header">
              <div className="order-item-id">{product.id}</div>
              <div className="order-item-name">{product.name}</div>
              <div className="order-item-quantity">
                <input
                  className="form-input"
                  type="text"
                  id="input-example-1"
                  name="stock"
                  placeholder="Category"
                  value={product.quantity}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="order-item-price">{product.price} </div>
              <div className="order-item-cancel">
                <button className="btn btn-error" onClick={event => this.handleSubmit(event)}>
                  Cancel
                </button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              className="btn btn-success"
              style={{ textAlign: 'center' }}
              onClick={event => this.handleSubmit(event)}
            >
              Forward to SR
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default IndividualOrderContainer;
