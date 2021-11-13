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
    entriesData: [],
    itemsRange: 9,
    startItemNumber: 0,
    endItemNumber: 9,
    currentPageNumber: 1,
    apiStatus: apiConstants.initial,
  };

  componentDidMount() {
    this.getEntriesDataFromApi();
  }

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

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#000000" height={80} width={80} />
    </div>
  );

  displayPreviousPage = () => {
    const { currentPageNumber, itemsRange } = this.state;
    if (currentPageNumber > 1) {
      this.setState((prevState) => ({
        startItemNumber: prevState.startItemNumber - itemsRange,
        endItemNumber: prevState.endItemNumber - itemsRange,
        currentPageNumber: prevState.currentPageNumber - 1,
      }));
    }
  };

  displayNextPage = () => {
    const { entriesData, itemsRange, currentPageNumber } = this.state;
    const entriesDataLength = entriesData.length;
    const totalPagesNumber = entriesDataLength / itemsRange;
    if (currentPageNumber < totalPagesNumber) {
      this.setState((prevState) => ({
        startItemNumber: prevState.startItemNumber + itemsRange,
        endItemNumber: prevState.endItemNumber + itemsRange,
        currentPageNumber: prevState.currentPageNumber + 1,
      }));
    }
  };

  renderPaginationContainer = () => {
    const { currentPageNumber } = this.state;
    return (
      <div className="home-pagination-buttons-container">
        <button
          className="pagination-button"
          type="button"
          onClick={this.displayPreviousPage}
        >
          <BsArrowLeftCircle size="30px" />
        </button>
        <p className="current-page-number">{currentPageNumber}</p>
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

  renderEntriesList = () => {
    const { entriesData, startItemNumber, endItemNumber } = this.state;
    const thisPageList = entriesData.slice(startItemNumber, endItemNumber);
    return (
      <div className="entries-list-container">
        <div className="entries-list-headings-container">
          <input type="checkbox" className="list-checkbox-input" />
          <p className="list-heading-text">Name</p>
          <p className="list-heading-text">Email</p>
          <p className="list-heading-text">Role</p>
          <p className="list-heading-text">Actions</p>
        </div>
        <hr className="entry-head-bottom-line" />
        <ul className="home-entries-list">
          {thisPageList.map((eachItem) => (
            <EntriesListItem key={eachItem.id} eachEntry={eachItem} />
          ))}
        </ul>
      </div>
    );
  };

  renderFailureView = () => (
    <div className="api-failure-view-container">
      <CgDanger size="40px" />
      <h1 className="api-failure-heading">Network Error</h1>
      <p className="api-failure-text">We Are Sorry For The Inconvenience...</p>
    </div>
  );

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

  render() {
    return (
      <div className="home-bg-container">
        <h1 className="home-app-heading">Geektrust Admin UI Challenge</h1>
        <div className="home-content-container">
          <input
            className="home-search-input"
            placeholder="Search by name email or role"
            type="text"
          />
          {this.renderEntriesListContainer()}
        </div>
        {this.renderPaginationContainer()}
      </div>
    );
  }
}

export default Home;
