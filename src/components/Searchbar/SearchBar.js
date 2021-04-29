import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../../assets/styles/components/SearchBar.scss";

const SearchBar = ({ handleSubmit, handleChange, searching }) => {
  return (
    <div className="col-sm-12 poke-search d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-9">
          <input
            className="search"
            type="text"
            placeholder="Search a Pokémon"
            onChange={handleChange}
            value={searching}
          />
        </div>

        <div className="col-3">
          <button type="submit" className="btn poke__btn mb-3">
            <SearchIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
