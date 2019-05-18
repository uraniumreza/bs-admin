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
    maxHeight: '80vh'
  }
};

class IndividualUserContainer extends Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      modalIsOpen: false,
      phone: user.phone,
      shopName: user.shopName,
      ownerName: user.ownerName,
      address: user.address,
      id: user.id,
      isLoading: false,
      role: user.role
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  addNotification(message, type) {
    this.notificationDOMRef.current.addNotification({
      title: 'User Notification',
      message: message,
      type: type,
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
    const { id, phone, shopName, ownerName, address } = this.state;
    this.setState({
      isLoading: true
    });
    try {
      const queryString = `users/${id}`;
      const response = await api.patch(queryString, {
        phone,
        shopName,
        ownerName,
        address
      });
      if (response.role) {
        this.addNotification('User info Updated', 'success');
      } else {
        this.addNotification("User info didn't update", 'danger');
      }
      this.setState({
        isLoading: false
      });
    } catch (err) {
      this.setState({
        isLoading: false
      });
      this.addNotification("User info didn't update", 'danger');
    }
  };

  render() {
    const { id, phone, shopName, ownerName, address, role, isLoading } = this.state;

    return (
      <div className="individual-product-wrapper" onClick={() => this.handleProductClick(id)}>
        <ReactNotification ref={this.notificationDOMRef} />
        <div className="product-name" style={{ marginTop: '20px' }}>
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

        <Modal
          isOpen={this.state.modalIsOpen}
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
            {/* <label className="form-label">Role</label>
            <div className="form-group">
              <select name="role" value={role} className="form-select" onChange={this.handleOnChange}>
                <option value="admin">Admin</option>
                <option value="sales">Sales Representative</option>
              </select>
            </div> */}
            <label className="form-label">Phone</label>

            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="phone"
              placeholder="phone"
              value={phone}
              onChange={this.handleOnChange}
            />
            <button
              style={{ marginTop: '20px' }}
              className={isLoading ? 'btn disabled' : 'btn btn-primary'}
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
