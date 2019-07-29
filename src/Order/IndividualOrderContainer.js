// TODO: Order/user pagination
// TODO: Add discounts on products
// TODO: Add search on user by phone number

import React, { Component } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
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
    height: '80vh'
  }
};
class IndividualOrderContainer extends Component {
  constructor(props) {
    super(props);
    const { order } = this.props;
    const { user } = order;
    const { SRS } = this.props;
    this.state = {
      modalIsOpen: false,
      orderId: order.order_id,
      shopName: user.shopName ? user.shopName : null,
      ownerName: user.ownerName,
      phone: user.phone,
      products: order.products,
      totalPrice: order.total_price,
      srID: order.sr_id ? order.sr_id : null,
      orderStatus: order.state,
      schemaId: order.id,
      SROptions: SRS.map(SR => ({
        value: SR.id,
        label: SR.ownerName + ', Address: ' + SR.address
      })),
      isLoading: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  addNotification(notification, type) {
    this.notificationDOMRef.current.addNotification({
      title: 'Order Status',
      message: notification,
      type: type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'fadeOut'],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  handleProductClick = () => {
    this.openModal();
  };

  openModal() {
    this.setState({ modalIsOpen: true });
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

  handleSubmit = async event => {
    const { srID, schemaId } = this.state;
    if (srID === null) {
      this.addNotification('First select the SR', 'danger');
      return;
    }
    try {
      const queryString = `orders/${schemaId}`;
      const response = await api.patch(queryString, {
        sr_id: srID
      });
      if (!response.status) {
        this.addNotification(response.message, 'success');
      } else {
        this.addNotification(response.message, 'danger');
      }
    } catch (err) {
      this.addNotification('SR Updating error', 'danger');
    }
  };

  handleOnQuantityUpdate = (event, idx) => {
    let products = [...this.state.products];
    let product = { ...products[idx] };
    product.final_quantity = Number(event.target.value);
    products[idx] = product;
    this.setState({ products });
  };

  handleOnSelect = SR => {
    this.setState({
      srID: SR.value
    });
  };

  onRequestQuantityChange = async event => {
    const { products, schemaId } = this.state;
    try {
      const queryString = `orders/${schemaId}`;
      const response = await api.patch(queryString, {
        products
      });
      if (!response.status) {
        this.addNotification(response.message, 'success');
      } else {
        this.addNotification(response.message, 'danger');
      }
    } catch (err) {
      this.addNotification('Product Update Failed', 'danger');
    }
  };

  onCancelOrder = async event => {
    const { schemaId } = this.state;
    try {
      const queryString = `orders/${schemaId}`;
      const response = await api.patch(queryString, {
        state: 'Cancelled',
        modalIsOpen: false
      });
      if (!response.status) {
        this.addNotification(response.message, 'success');
        this.closeModal(event);
      } else {
        this.addNotification(response.message, 'danger');
      }
    } catch (error) {
      this.addNotification('Cancelling order failed', 'danger');
    }
  };

  render() {
    const { phone, shopName, ownerName, orderId, products, SROptions, isLoading, orderStatus, srID } = this.state;

    return (
      <div className="individual-product-wrapper" onClick={() => this.handleProductClick()}>
        <span style={{ textAlign: 'center' }} className={labelData.filter(l => l.status === orderStatus)[0].label}>
          {orderStatus}
        </span>
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="product-name" style={{ marginTop: '20px' }}>
          <strong>Order # </strong>
          {orderId}
        </div>
        <div className="product-name">
          <strong>Shop Name: </strong>
          {shopName}
        </div>
        <div className="product-name">
          <strong>Owner Name: </strong>
          {ownerName}
        </div>
        <div className="product-name">
          <strong>Phone: </strong> {phone}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div>
              <strong>Order Number: {orderId}</strong>
            </div>
            <div>
              <strong>Shop Name: </strong>
              {shopName}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div>
              <strong>Phone: </strong> {phone}
            </div>
            <div>
              <strong>Owner Name: </strong>
              {ownerName}
            </div>
          </div>

          <label className="form-label" style={{ marginBottom: '20px' }}>
            <strong> {srID ? '✅ Sales Representative' : 'Sales Representative'}</strong>
          </label>
          <div className="sr-selection">
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={SROptions.filter(SR => SR.value === this.state.srID)[0]}
              isClearable={true}
              isSearchable={true}
              name="srID"
              options={SROptions}
              onChange={this.handleOnSelect}
            />
          </div>
          <div className="order-description-header">
            <div className="order-item-image-container">
              <strong>IMAGE</strong>
            </div>
            <div className="order-item-name">
              <strong>NAME</strong>
            </div>

            <div className="order-item-price">
              <strong>PRICE</strong>
            </div>
            <div className="order-item-quantity">
              <strong>STOCK</strong>
            </div>
            <div className="order-item-quantity">
              <strong>ORDERED QTY</strong>
            </div>
            <div className="order-item-quantity">
              <strong>FINAL QTY</strong>
            </div>
          </div>
          {products.map((product, idx) => (
            <div key={idx} className="order-description-header">
              <div className="order-item-image-container">
                <img style={{ width: '50px', height: '50px' }} src={product.image} alt="product_image" />
              </div>
              <div className="order-item-name">{product.name}</div>
              <div className="order-item-price">{product.price} </div>
              <div className="order-item-quantity">{product.stock_count}</div>
              <div className="order-item-quantity">{product.ordered_quantity}</div>

              <div className="order-item-quantity">
                {orderStatus === 'Pending' ? (
                  <input
                    className="form-input"
                    type="number"
                    id="input-example-1"
                    name="final_quantity"
                    placeholder="quantity"
                    value={product.final_quantity}
                    onChange={e => this.handleOnQuantityUpdate(e, idx)}
                  />
                ) : (
                  <div>{product.final_quantity}</div>
                )}
              </div>
            </div>
          ))}
          <div style={{ marginTop: '50px' }}>
            {orderStatus === 'Pending' ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '10%' }}>
                  <button
                    disabled={isLoading}
                    className={isLoading ? 'btn disabled' : 'btn btn-error'}
                    onClick={event => this.onCancelOrder(event)}
                  >
                    Cancel Order
                  </button>
                </div>
                <div style={{ width: '40%', display: 'flex', justifyContent: 'space-around' }}>
                  <button
                    className={isLoading ? 'btn disabled' : 'btn btn-success'}
                    onClick={event => this.onRequestQuantityChange(event)}
                  >
                    Update quantity
                  </button>
                  <button
                    className={isLoading ? 'btn disabled' : 'btn btn-success'}
                    style={{ textAlign: 'center', marginLeft: '10px' }}
                    onClick={event => this.handleSubmit(event)}
                  >
                    Forward to SR
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </Modal>
      </div>
    );
  }
}

export default IndividualOrderContainer;

const labelData = [
  {
    status: 'Pending',
    label: 'label label-secondary'
  },
  {
    status: 'Processing',
    label: 'label label-warning'
  },
  {
    status: 'Delivered',
    label: 'label label-success'
  },
  {
    status: 'Cancelled',
    label: 'label label-error'
  }
];
