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

class IndividualNotificationContainer extends Component {
  constructor(props) {
    super(props);
    const { notification } = this.props;
    const { message, active, _id } = notification;
    this.state = {
      modalIsOpen: false,
      message: message,
      isLoading: false,
      active: active === true ? 'true' : 'false',
      schemaId: _id
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
    const { message, active, schemaId } = this.state;
    this.setState({
      isLoading: true
    });
    try {
      const queryString = `notifications/${schemaId}`;
      const response = await api.patch(queryString, {
        message,
        active: active === 'true' ? true : false
      });
      if (response.message) {
        this.addNotification('Notification Edited', 'success');
      } else {
        this.addNotification("Couldn't edit Notification", 'danger');
      }
      this.setState({
        isLoading: false
      });
    } catch (err) {
      this.setState({
        isLoading: false
      });
      this.addNotification("Couldn't edit notification", 'danger');
    }
  };

  handleNotificationEdit = () => {
    this.openModal();
  };

  render() {
    const { active, message, isLoading } = this.state;
    return (
      <div className="individual-product-wrapper" onClick={this.handleNotificationEdit}>
        <ReactNotification ref={this.notificationDOMRef} />
        <span style={{ textAlign: 'center' }} className={labelData.filter(l => l.status === active)[0].label}>
          {active === 'true' ? 'Active' : 'Inactive'}
        </span>
        <div className="product-name" style={{ marginTop: '20px' }}>
          <strong>Message: </strong>
          {message}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Notificaiton Model"
        >
          <div className="form-group" style={{ width: '500px' }}>
            <label className="form-label">Message</label>
            <textarea
              className="form-input"
              type="text"
              id="input-example-1"
              name="message"
              placeholder="Message"
              onChange={this.handleOnChange}
              value={message}
            />

            <label className="form-label">Active Status:</label>
            <div className="form-group">
              <select name="active" value={active} className="form-select" onChange={this.handleOnChange}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <button
              style={{ marginTop: '20px' }}
              className={isLoading ? 'btn disabled' : 'btn btn-primary'}
              onClick={event => this.handleSubmit(event)}
            >
              Edit notification
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default IndividualNotificationContainer;

const labelData = [
  {
    status: 'false',
    label: 'label label-secondary'
  },
  {
    status: 'true',
    label: 'label label-success'
  }
];
