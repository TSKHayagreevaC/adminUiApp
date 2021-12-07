import { Component, React } from "react";

import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

import "./index.css";

class EntriesListItem extends Component {
  state = {
    editEntryDetails: false,
    id: "",
    updatedName: "",
    updatedEmail: "",
    updatedRole: "",
  };

  // Function To Display Edit Entry Form, On Click Edit Entry Button...
  onClickEditEntryButton = () => {
    const { eachEntry } = this.props;
    const result = window.confirm(
      `Do You Want To Start Editing The Entry With The Name '${eachEntry.name}'...`
    );
    if (result) {
      this.setState({ editEntryDetails: true });
    }
  };

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
    const result = window.confirm(
      `Do You Want To Save The Changes To The Entry With Name: ${eachEntry.name}`
    );
    if (result) {
      onUpdateEntryDetails(eachEntry, updatedEntryDetails);
    }
    this.setState({ editEntryDetails: false });
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
    const result = window.confirm(
      `Do You Want To Delete Entry With Name: ${eachEntry.name}`
    );
    if (result) {
      deleteEntry(eachEntry.id);
    }
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

  // Render List Item With The Entry Details
  renderEntryItemEditForm = () => {
    const { eachEntry, selectedEntries } = this.props;
    const { updatedName, updatedEmail, updatedRole } = this.state;
    const isEntrySelected =
      selectedEntries.find((eachItem) => eachItem.id === eachEntry.id) !==
      undefined;
    const entryBackgroundColor = isEntrySelected
      ? "selected-entry-background-color"
      : "unselected-entry-background-color";
    return (
      <li className="entry-list-item">
        <form
          onSubmit={this.onSubmitEditEntryForm}
          className={`entry-edit-form ${entryBackgroundColor}`}
        >
          <input
            type="checkbox"
            className="list-item-form-checkbox-input"
            checked={isEntrySelected}
            onChange={this.onChangeCheckBox}
          />
          <input
            required
            autoFocus
            type="text"
            id="entryName"
            className="entry-edit-form-input-name"
            placeholder={eachEntry.name}
            value={updatedName}
            onChange={this.onChangeEntryName}
          />
          <input
            required
            type="email"
            id="entryEmail"
            className="entry-edit-form-input-email"
            placeholder={eachEntry.email}
            value={updatedEmail}
            onChange={this.onChangeEntryEmail}
          />
          <input
            required
            type="text"
            id="entryRole"
            className="entry-edit-form-input-role"
            placeholder={eachEntry.role}
            value={updatedRole}
            onChange={this.onChangeEntryRole}
          />
          <div className="list-item-form-icons">
            <button className="entry-edit-button" type="submit">
              <FiUpload size="22px" color="#064635" />
            </button>
            <button
              className="entry-delete-button"
              type="button"
              onClick={this.onClickDeleteButton}
            >
              <MdDeleteOutline size="22px" color="red" />
            </button>
          </div>
        </form>
        <hr className="entry-item-bottom-line" />
      </li>
    );
  };

  // Render Form To Update Any Entry
  renderEntryListItem = () => {
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
          <p className="list-item-text-name">{eachEntry.name}</p>
          <p className="list-item-text-email">{eachEntry.email}</p>
          <p className="list-item-text-role">{eachEntry.role}</p>
          <div className="list-item-icons">
            <button
              className="entry-edit-button"
              type="button"
              onClick={this.onClickEditEntryButton}
            >
              <AiOutlineForm size="18px" />
            </button>
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
  };

  // Render Each Entry Or Each Entry Form
  render() {
    const { editEntryDetails } = this.state;
    if (editEntryDetails) {
      return this.renderEntryItemEditForm();
    }
    return this.renderEntryListItem();
  }
}

export default EntriesListItem;
