import { Component, React } from "react";
import Popup from "reactjs-popup";

import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";

import "./index.css";

class EntriesListItem extends Component {
  state = {
    id: "",
    updatedName: "",
    updatedEmail: "",
    updatedRole: "",
  };

  // Render Form To Update Any Entry - As A popup
  renderPopup = () => (
    <Popup
      className="popup-content"
      position="left center"
      trigger={
        <button className="entry-edit-button" type="button">
          <AiOutlineForm size="18px" />
        </button>
      }
    >
      {(close) => (
        <form
          onSubmit={this.onSubmitEditEntryForm}
          className="entry-edit-form-container"
        >
          <h1 className="update-entry-form-heading">Enter Details Here</h1>
          <label htmlFor="entryName" className="entry-edit-form-label">
            NAME
          </label>
          <input
            type="text"
            id="entryName"
            className="entry-edit-form-input"
            onChange={this.onChangeEntryName}
          />
          <label htmlFor="entryEmail" className="entry-edit-form-label">
            EMAIL
          </label>
          <input
            type="email"
            id="entryEmail"
            className="entry-edit-form-input"
            onChange={this.onChangeEntryEmail}
          />
          <label htmlFor="entryRole" className="entry-edit-form-label">
            ROLE
          </label>
          <input
            type="text"
            id="entryRole"
            className="entry-edit-form-input"
            onChange={this.onChangeEntryRole}
          />
          <div className="popup-buttons-container">
            <button type="submit" className="update-entry-button">
              Update Entry
            </button>
            <button
              type="button"
              className="popup-cancel-button"
              onClick={close}
            >
              Close
            </button>
          </div>
        </form>
      )}
    </Popup>
  );

  // Edit The Entry By User - Storing Input Values Into State
  onSubmitEditEntryForm = (event) => {
    event.preventDefault();
    const { onUpdateEntryDetails, eachEntry } = this.props;
    const { updatedName, updatedEmail, updatedRole } = this.state;
    const updatedEntryDetails = {
      id: eachEntry.id,
      name: updatedName,
      email: updatedEmail,
      role: updatedRole,
    };
    onUpdateEntryDetails(eachEntry, updatedEntryDetails);
  };

  // Storing User Entered Name Into State
  onChangeEntryName = (event) => {
    this.setState({ updatedName: event.target.value });
  };

  // Storing User Entered Email Into State
  onChangeEntryEmail = (event) => {
    this.setState({ updatedEmail: event.target.value });
  };

  // Storing User Entered Role Into State
  onChangeEntryRole = (event) => {
    this.setState({ updatedRole: event.target.value });
  };

  // Delete Specific Entry By Clicking  The Delete Icon
  onClickDeleteButton = () => {
    const { eachEntry, deleteEntry } = this.props;
    alert(`Do You Want To Delete Entry With Name: ${eachEntry.name}`);
    deleteEntry(eachEntry.id);
  };

  // Select Or Unselect The Entry By Check Input By User
  onChangeCheckBox = (event) => {
    const { eachEntry, selectEntry, unselectEntry } = this.props;
    if (event.target.checked) {
      selectEntry(eachEntry);
    } else {
      unselectEntry(eachEntry.id);
    }
  };

  // Render Each Entry
  render() {
    const { eachEntry, selectedEntries } = this.props;
    const isEntrySelected =
      selectedEntries.find((eachItem) => eachItem.id === eachEntry.id) !==
      undefined;
    const entryBackgroundColor = isEntrySelected
      ? "selected-entry-background-color"
      : "unselected-entry-background-color";
    return (
      <li className={`entries-list-item ${entryBackgroundColor}`}>
        <div className="list-item-container ">
          <input
            type="checkbox"
            className="list-item-checkbox-input"
            checked={isEntrySelected}
            onChange={this.onChangeCheckBox}
          />
          <p className="list-item-text">{eachEntry.name}</p>
          <p className="list-item-text list-email-item">{eachEntry.email}</p>
          <p className="list-item-text">{eachEntry.role}</p>
          <div className="list-item-icons">
            {this.renderPopup()}
            <button
              className="entry-delete-button"
              type="button"
              onClick={this.onClickDeleteButton}
            >
              <MdDeleteOutline size="22px" color="red" />
            </button>
          </div>
        </div>
        <p className="small-bottom-email">
          Email:{" "}
          <span className="small-bottom-email-span">{eachEntry.email}</span>
        </p>
        <hr className="entry-item-bottom-line" />
      </li>
    );
  }
}

export default EntriesListItem;
