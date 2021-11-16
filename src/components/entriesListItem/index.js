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

  onSubmitEditEntryForm = (event) => {
    event.preventDefault();
    const { onUpdateEntryDetails } = this.props;
    console.log("form need to be submitted");
    const { eachEntry } = this.props;
    const { updatedName, updatedEmail, updatedRole } = this.state;
    const updatedEntryDetails = {
      id: eachEntry.id,
      name: updatedName,
      email: updatedEmail,
      role: updatedRole,
    };
    onUpdateEntryDetails(eachEntry, updatedEntryDetails);
  };

  onChangeEntryName = (event) => {
    this.setState({ updatedName: event.target.value });
  };

  onChangeEntryEmail = (event) => {
    this.setState({ updatedEmail: event.target.value });
  };

  onChangeEntryRole = (event) => {
    this.setState({ updatedRole: event.target.value });
  };

  onClickDeleteButton = () => {
    const { eachEntry, deleteEntry } = this.props;
    deleteEntry(eachEntry.id);
  };

  onChangeCheckBox = (event) => {
    const { eachEntry, selectEntry, unselectEntry } = this.props;
    if (event.target.checked) {
      selectEntry(eachEntry);
    } else {
      unselectEntry(eachEntry.id);
    }
  };

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
            className="list-checkbox-input"
            checked={isEntrySelected}
            onChange={this.onChangeCheckBox}
          />
          <p className="list-item-text">{eachEntry.name}</p>
          <p className="list-item-text">{eachEntry.email}</p>
          <p className="list-item-text">{eachEntry.role}</p>
          <div className="list-item-icons">
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
                  <h1 className="update-entry-form-heading">
                    Enter Details Here
                  </h1>
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
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </Popup>
            <button
              className="entry-delete-button"
              type="button"
              onClick={this.onClickDeleteButton}
            >
              <MdDeleteOutline size="22px" color="red" />
            </button>
          </div>
        </div>
        <hr className="entry-item-bottom-line" />
      </li>
    );
  }
}

export default EntriesListItem;
