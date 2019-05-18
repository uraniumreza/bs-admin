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
    transform: 'translate(-50%, -50%)'
  }
};

class AddProductContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      phone: '',
      shopName: '',
      ownerName: '',
      address: '',
      role: '',
      password: '',
      isLoading: false
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
    const { phone, shopName, ownerName, address, role, password } = this.state;
    this.setState({
      isLoading: true
    });
    try {
      const queryString = `auth/register`;
      const response = await api.post(queryString, {
        phone,
        shopName,
        ownerName,
        address,
        role,
        password
      });
      if (response.user) {
        this.addNotification('User successfully created', 'success');
      } else {
        this.addNotification("Couldn't create User", 'danger');
      }
      this.setState({
        isLoading: false
      });
    } catch (err) {
      this.setState({
        isLoading: false
      });
      this.addNotification("Couldn't create user", 'danger');
    }
  };

  handleAddNewUserClick = () => {
    this.openModal();
  };

  render() {
    const { phone, shopName, ownerName, address, role, isLoading, password } = this.state;

    return (
      <div className="add-product-container">
        <ReactNotification ref={this.notificationDOMRef} />
        Add an user by clicking the button
        <button className="btn btn-primary" onClick={this.handleAddNewUserClick}>
          Add an user
        </button>
        Or click on the user to edit the information
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="User Model"
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
              </select>
            </div>
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

            <label className="form-label">Password</label>

            <input
              className="form-input"
              type="text"
              id="input-example-1"
              name="password"
              placeholder="password"
              value={password}
              onChange={this.handleOnChange}
            />
            <button
              style={{ marginTop: '20px' }}
              className="btn btn-primary"
              onClick={event => this.handleSubmit(event)}
            >
              {isLoading ? 'Adding user' : 'Add user'}
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddProductContainer;
