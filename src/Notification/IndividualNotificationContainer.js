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

class IndividualNotificationContainer extends Component {
  constructor(props) {
    super(props);
    const { notification } = this.props;
    const { message, active, _id, image } = notification;
    this.state = {
      modalIsOpen: false,
      message: message,
      isLoading: false,
      active: active === true ? 'true' : 'false',
      schemaId: _id,
      image,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addNotification = this.addNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

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
          image: response.secure_url,
          imageUploading: false,
        });
        this.addNotification('Image uploaded', 'success');
      } else {
        this.addNotification('Upload Failed', 'danger');
      }
      this.setState({
        imageUploading: false,
      });
    } catch (err) {
      this.addNotification('Upload Failed', 'danger');
      this.setState({
        imageUploading: false,
      });
    }
  };

  handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    this.setState({
      file: files[0],
    });
  };

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
      dismissable: { click: true },
    });
  }

  handleProductClick = (id) => {
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
    const { message, active, schemaId, image } = this.state;
    this.setState({
      isLoading: true,
    });
    try {
      const queryString = `notifications/${schemaId}`;
      const response = await api.patch(queryString, {
        message,
        image,
        active: active === 'true' ? true : false,
      });
      if (response.message) {
        this.addNotification('Notification Edited', 'success');
      } else {
        this.addNotification("Couldn't edit Notification", 'danger');
      }
      this.setState({
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
      });
      this.addNotification("Couldn't edit notification", 'danger');
    }
  };

  handleNotificationEdit = () => {
    this.openModal();
  };

  render() {
    const { active, message, isLoading, imageUploading, image } = this.state;
    return (
      <div className="individual-product-wrapper" onClick={this.handleNotificationEdit}>
        <ReactNotification ref={this.notificationDOMRef} />
        <span style={{ textAlign: 'center' }} className={labelData.filter((l) => l.status === active)[0].label}>
          {active === 'true' ? 'Active' : 'Inactive'}
        </span>
        {image ? <img className="notification-image" src={image} alt="product" /> : null}
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
                onClick={(event) => this.handleSubmit(event)}
              >
                Edit notification
              </button>
            </div>
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
    label: 'label label-secondary',
  },
  {
    status: 'true',
    label: 'label label-success',
  },
];
