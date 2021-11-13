import { Component } from "react";

import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";

import "./index.css";

class EntriesListItem extends Component {
  render() {
    const { eachEntry } = this.props;
    return (
      <li className="entries-list-item">
        <div className="list-item-container">
          <input type="checkbox" className="list-checkbox-input" />
          <p className="list-item-text">{eachEntry.name}</p>
          <p className="list-item-text">{eachEntry.email}</p>
          <p className="list-item-text">{eachEntry.role}</p>
          <div className="list-item-icons">
            <AiOutlineForm size="18px" />
            <button className="entry-delete-button">
              <MdDeleteOutline size="22px" color="red" />
            </button>
          </div>
        </div>
        <hr className="entry-head-bottom-line" />
      </li>
    );
  }
}

export default EntriesListItem;
