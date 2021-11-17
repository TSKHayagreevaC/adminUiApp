import { Component } from "react";
import Loader from "react-loader-spinner";

import { CgDanger } from "react-icons/cg";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

import EntriesListItem from "../entriesListItem";

import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Home extends Component {
  state = {
    apiStatus: apiConstants.initial,
    entriesData: [],
    searchedDisplayEntries: [],
    selectedEntries: [],
    searchInput: "",
    itemsRange: 10,
    startItemNumber: 0,
    endItemNumber: 10,
    currentPageNumber: 1,
    headInputCheckedStatus: false,
  };

  componentDidMount() {
    this.getEntriesDataFromApi();
  }

  // Fetching Data
  getEntriesDataFromApi = async () => {
    this.setState({ apiStatus: apiConstants.inProgress });
    const dataUrl =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const options = {
      method: "GET",
    };
    const dataResponse = await fetch(dataUrl, options);
    if (dataResponse.ok) {
      const formattedData = await dataResponse.json();
      this.setState({
        entriesData: formattedData,
        apiStatus: apiConstants.success,
      });
    } else {
      this.setState({ apiStatus: apiConstants.failure });
    }
  };

  // Pagination Previous Page Button
  displayPreviousPage = () => {
    const { currentPageNumber, itemsRange } = this.state;
    if (currentPageNumber > 1) {
      this.setState((prevState) => ({
        startItemNumber: prevState.startItemNumber - itemsRange,
        endItemNumber: prevState.endItemNumber - itemsRange,
        currentPageNumber: prevState.currentPageNumber - 1,
        headInputCheckedStatus: false,
      }));
    }
  };

  // Pagination Next Page Button
  displayNextPage = () => {
    const {
      entriesData,
      searchedDisplayEntries,
      searchInput,
      itemsRange,
      currentPageNumber,
    } = this.state;
    const isUserSearching = searchInput.length !== 0;
    const entriesListToBePaginated = isUserSearching
      ? searchedDisplayEntries
      : entriesData;
    const entriesDataLength = entriesListToBePaginated.length;
    const totalPagesNumber = Math.ceil(entriesDataLength / itemsRange);
    let totalPagesNumberToBeDisplayed = 1;
    if (totalPagesNumber !== 0) {
      totalPagesNumberToBeDisplayed = totalPagesNumber;
    }
    if (currentPageNumber < totalPagesNumberToBeDisplayed) {
      this.setState((prevState) => ({
        startItemNumber: prevState.startItemNumber + itemsRange,
        endItemNumber: prevState.endItemNumber + itemsRange,
        currentPageNumber: prevState.currentPageNumber + 1,
        headInputCheckedStatus: false,
      }));
    }
  };

  // Search Input
  onChangeSearchInput = (event) => {
    const { entriesData } = this.state;
    const searchedEntriesData = [];
    entriesData.map((eachItem) => {
      if (
        eachItem.name.toLowerCase().includes(event.target.value) ||
        eachItem.email.toLowerCase().includes(event.target.value) ||
        eachItem.role.toLowerCase().includes(event.target.value)
      ) {
        searchedEntriesData.push(eachItem);
      }
      return null;
    });
    this.setState({
      searchInput: event.target.value,
      searchedDisplayEntries: searchedEntriesData,
    });
  };

  // Delete Single Entry From The Data On Click Delete Button
  deleteEntry = (id) => {
    const { entriesData, searchedDisplayEntries } = this.state;
    const filteredEntriesData = entriesData.filter(
      (eachItem) => eachItem.id !== id
    );
    const filteredSearchedDisplayEntries = searchedDisplayEntries.filter(
      (eachItem) => eachItem.id !== id
    );
    this.setState({
      entriesData: filteredEntriesData,
      searchedDisplayEntries: filteredSearchedDisplayEntries,
    });
  };

  // Selecting Items
  selectEntry = (selectedEntry) => {
    this.setState((prevState) => ({
      selectedEntries: [...prevState.selectedEntries, selectedEntry],
    }));
  };

  // Unselect The Item
  unselectEntry = (id) => {
    const { selectedEntries } = this.state;
    const updatedSelectedEntries = selectedEntries.filter(
      (eachItem) => eachItem.id !== id
    );
    this.setState({ selectedEntries: updatedSelectedEntries });
  };

  // Delete Selected Items On Click Delete Items Button
  deleteSelectedItems = () => {
    alert("Selected Entries Will Be Deleted From The Entries List...");
    const { entriesData, searchedDisplayEntries, selectedEntries } = this.state;
    const pseudoEntriesData = entriesData;
    selectedEntries.map((eachItem) => {
      const index = pseudoEntriesData.indexOf(eachItem);
      pseudoEntriesData.splice(index, 1);
      return null;
    });
    const pseudoSearchDisplayEntries = searchedDisplayEntries;
    selectedEntries.map((eachItem) => {
      const index = pseudoSearchDisplayEntries.indexOf(eachItem);
      pseudoSearchDisplayEntries.splice(index, 1);
      return null;
    });
    this.setState({
      entriesData: pseudoEntriesData,
      searchedDisplayEntries: pseudoSearchDisplayEntries,
      selectedEntries: [],
      headInputCheckedStatus: false,
    });
  };

  // Select Group Of Entries From Head Input
  onCheckHeadInput = (event) => {
    const {
      searchInput,
      entriesData,
      searchedDisplayEntries,
      selectedEntries,
      startItemNumber,
      endItemNumber,
    } = this.state;
    const isHeadInputChecked = event.target.checked;
    const isUserSearching = searchInput.length !== 0;
    const entiresToBeDisplayed = isUserSearching
      ? searchedDisplayEntries
      : entriesData;
    const thisPageList = entiresToBeDisplayed.slice(
      startItemNumber,
      endItemNumber
    );
    if (isHeadInputChecked) {
      this.setState((prevState) => ({
        selectedEntries: [...prevState.selectedEntries, ...thisPageList],
        headInputCheckedStatus: true,
      }));
    } else {
      const pseudoSelectedEntriesList = selectedEntries;
      let updatedPseudoSelectedEntriesList = [];
      pseudoSelectedEntriesList.map((eachItem) => {
        const index = pseudoSelectedEntriesList.indexOf(eachItem);
        updatedPseudoSelectedEntriesList = pseudoSelectedEntriesList.slice(
          index,
          1
        );
        return null;
      });
      this.setState({
        selectedEntries: updatedPseudoSelectedEntriesList,
        headInputCheckedStatus: false,
      });
    }
  };

  // Update The Entry Data Using The Edit Button
  onUpdateEntryDetails = (existingEntry, updatedEntry) => {
    const { entriesData, searchedDisplayEntries } = this.state;
    const trialEntriesData = entriesData;
    const entryIndex = trialEntriesData.indexOf(existingEntry);
    trialEntriesData.splice(entryIndex, 1, updatedEntry);
    const trialSearchedDisplayEntriesData = searchedDisplayEntries;
    const searchedIndex = trialSearchedDisplayEntriesData.indexOf(
      existingEntry
    );
    trialSearchedDisplayEntriesData.splice(searchedIndex, 1, updatedEntry);

    this.setState({
      entriesData: trialEntriesData,
      searchedDisplayEntries: trialSearchedDisplayEntriesData,
    });
  };

  // Render Loader While Entries Data Is Being Fetched
  renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#000000" height={80} width={80} />
    </div>
  );

  // Pagination Buttons And Content Container At The Bottom Of Each Page
  renderPaginationContainer = () => {
    const {
      entriesData,
      searchedDisplayEntries,
      searchInput,
      itemsRange,
      currentPageNumber,
    } = this.state;
    const isUserSearching = searchInput.length !== 0;
    const entriesListToBePaginated = isUserSearching
      ? searchedDisplayEntries
      : entriesData;
    const entriesDataLength = entriesListToBePaginated.length;
    const totalPagesNumber = Math.ceil(entriesDataLength / itemsRange);
    let totalPagesNumberToBeDisplayed = 1;
    if (totalPagesNumber !== 0) {
      totalPagesNumberToBeDisplayed = totalPagesNumber;
    }
    return (
      <div className="home-pagination-buttons-container">
        <button
          className="pagination-button"
          type="button"
          onClick={this.displayPreviousPage}
        >
          <BsArrowLeftCircle size="30px" />
        </button>
        <p className="current-page-number">{`Page ${currentPageNumber} Of ${totalPagesNumberToBeDisplayed} Pages`}</p>
        <button
          className="pagination-button"
          type="button"
          onClick={this.displayNextPage}
        >
          <BsArrowRightCircle size="30px" />
        </button>
      </div>
    );
  };

  // Render Fetched Entries List
  renderEntriesList = () => {
    const {
      entriesData,
      searchedDisplayEntries,
      searchInput,
      selectedEntries,
      startItemNumber,
      endItemNumber,
      headInputCheckedStatus,
    } = this.state;
    const isUserSearching = searchInput.length !== 0;
    const entiresToBeDisplayed = isUserSearching
      ? searchedDisplayEntries
      : entriesData;
    const isSearchInputValid = entiresToBeDisplayed.length !== 0;
    const thisPageList = entiresToBeDisplayed.slice(
      startItemNumber,
      endItemNumber
    );
    const isThisPageEmpty = thisPageList.length === 0;
    if (isThisPageEmpty) {
      alert(
        "You Are Removing All The Entries Of This Page, This Page Is Going To Be Empty, Please Move To Previous Page..."
      );
    }
    return (
      <div className="entries-list-container">
        <div className="entries-list-headings-container">
          <input
            type="checkbox"
            className="list-checkbox-input"
            checked={headInputCheckedStatus}
            onChange={this.onCheckHeadInput}
          />
          <p className="list-heading-text">Name</p>
          <p className="list-heading-text">Email</p>
          <p className="list-heading-text">Role</p>
          <p className="list-heading-text">Actions</p>
        </div>
        <hr className="entry-head-bottom-line" />
        <ul className="home-entries-list">
          {isSearchInputValid ? (
            thisPageList.map((eachItem) => (
              <EntriesListItem
                key={eachItem.id}
                eachEntry={eachItem}
                deleteEntry={this.deleteEntry}
                selectEntry={this.selectEntry}
                unselectEntry={this.unselectEntry}
                selectedEntries={selectedEntries}
                headInputCheckedStatus={headInputCheckedStatus}
                onUpdateEntryDetails={this.onUpdateEntryDetails}
              />
            ))
          ) : (
            <h1 className="empty-entries-message-heading">
              No Entry Is Left, Please Reload The Page...
            </h1>
          )}
        </ul>
        <div className="entries-delete-button-pagination-container">
          <button
            className="delete-selected-items-button"
            type="button"
            onClick={this.deleteSelectedItems}
          >
            Delete Selected
          </button>
          {this.renderPaginationContainer()}
        </div>
      </div>
    );
  };

  // Render Failure Container In Case Of Data Fetch Failure
  renderFailureView = () => (
    <div className="api-failure-view-container">
      <CgDanger size="60px" />
      <h1 className="api-failure-heading">Network Error</h1>
      <p className="api-failure-text">Sorry For The Inconvenience...</p>
    </div>
  );

  // Render Entries List Container
  renderEntriesListContainer = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiConstants.failure:
        return this.renderFailureView();
      case apiConstants.inProgress:
        return this.renderLoader();
      case apiConstants.success:
        return this.renderEntriesList();
      default:
        return null;
    }
  };

  // Render Entries List Page
  render() {
    return (
      <div className="home-bg-container">
        <h1 className="home-app-heading">Geektrust Admin UI Challenge</h1>
        <div className="home-content-container">
          <input
            className="home-search-input"
            placeholder="Search by name email or role"
            type="text"
            onChange={this.onChangeSearchInput}
          />
          {this.renderEntriesListContainer()}
        </div>
      </div>
    );
  }
}

export default Home;
