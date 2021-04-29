import React from "react";
import "../../assets/styles/components/ButtonMore.scss";

const ButtonMore = ({ handleShowMore }) => {
  return (
    <div className="col-sm-12 poke-button d-flex justify-content-center">
      <button onClick={handleShowMore}>Show More</button>
    </div>
  );
};

export default ButtonMore;
