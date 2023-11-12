import SearchComponent from 'components/SearchComponent';
import React from "react";

const App: React.FunctionComponent = () => {

  return (
    <div className="pageWrapper">
      <p>Search Component</p>
      <SearchComponent />
      <p>List Component</p>
      <ListComponent />
      <p>Found results: ?</p>
      <p>Total results: ?</p>
    </div>
  );
};

export default App;
