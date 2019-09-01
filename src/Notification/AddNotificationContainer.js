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

class AddNotificationContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      message: '',
      isLoading: false,
      active: 'true',
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
      dismissable: { click: true },
    });
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
    const { message, image } = this.state;
    this.setState({
      isLoading: true,
    });
    try {
      const queryString = `notifications`;
      const response = await api.post(queryString, {
        message,
        image,
      });
      if (response.active) {
        this.addNotification('Notification created', 'success');
      } else {
        this.addNotification("Couldn't create Notification", 'danger');
      }
      this.setState({
        isLoading: false,
      });
    } catch (err) {
      this.setState({
        isLoading: false,
      });
      this.addNotification("Couldn't create notification", 'danger');
    }
  };

  handleAddNewUserClick = () => {
    this.openModal();
  };

  render() {
    const { message, isLoading, imageUploading } = this.state;

    return (
      <div className="add-product-container">
        <ReactNotification ref={this.notificationDOMRef} />
        Add a notification by clicking the button
        <button className="btn btn-primary" onClick={this.handleAddNewUserClick}>
          Add notification
        </button>
        Or click on the noification to edit the information
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
                Add notification
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddNotificationContainer;
