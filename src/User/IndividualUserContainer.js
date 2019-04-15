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

const dataObject = {
  phone: '8801536239164',
  shopName: 'BS Trading',
  ownerName: 'XXX',
  address: 'XXXU, XXX, XXX, XX',
  role: 'sales',
  password: 'xxxx'
};

class IndividualUserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      phone: dataObject.phone,
      shopName: dataObject.shopName,
      ownerName: dataObject.ownerName,
      address: dataObject.address,
      role: dataObject.role,
      password: dataObject.password
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
    const { phone, shopName, ownerName, address, role, password } = this.state;

    return (
      <div className="individual-product-container" onClick={() => this.handleProductClick(id)}>
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="product-name" style={{ marginTop: '20px' }}>
          <strong>User # </strong>
          {id}
        </div>
        <div className="product-name">
          <strong>Phone: </strong>
          {phone}
        </div>
        <div className="product-name">
          <strong>Shop Name:</strong>
          {shopName}
        </div>
        <div className="product-name">
          <strong>Owner Name:</strong> {ownerName}
        </div>
        <div className="product-name">
          <strong>Address:</strong> {address}
        </div>
        <div className="product-name">
          <strong>Role:</strong> {role}
        </div>
        <div className="product-name">
          <strong>Password:</strong> {password}
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="form-group" style={{ width: '500px' }}>
            <label className="form-label">Shop Name</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="shopName"
              placeholder="Shop Name"
              onChange={this.handleOnChange}
              value={shopName}
            />
            <label className="form-label">Owner Name</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="ownerName"
              placeholder="Owner Name"
              value={ownerName}
              onChange={this.handleOnChange}
            />
            <label className="form-label">Address</label>
            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="address"
              placeholder="Adress"
              value={address}
              onChange={this.handleOnChange}
            />
            <label className="form-label">Role</label>
            <div className="form-group">
              <select name="role" value={role} className="form-select" onChange={this.handleOnChange}>
                <option value="admin">Admin</option>
                <option value="sales">Sales Representative</option>
                <option value="shopper">Shopper</option>
              </select>
            </div>
            <label className="form-label">Password</label>

            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleOnChange}
            />
            <button
              style={{ marginTop: '20px' }}
              className="btn btn-primary"
              onClick={event => this.handleSubmit(event)}
            >
              Edit user
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default IndividualUserContainer;
