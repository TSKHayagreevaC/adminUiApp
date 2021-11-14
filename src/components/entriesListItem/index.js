import { Component } from "react";

import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";

import "./index.css";

class EntriesListItem extends Component {
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
            onChange={this.onChangeCheckBox}
          />
          <p className="list-item-text">{eachEntry.name}</p>
          <p className="list-item-text">{eachEntry.email}</p>
          <p className="list-item-text">{eachEntry.role}</p>
          <div className="list-item-icons">
            <AiOutlineForm size="18px" />
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
