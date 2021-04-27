import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

const Landing = () => {
  return (
    <div className="container_landing">
      <div className="cont_gral">
        <FadeIn delay="400" transitionDuration="4000">
          <div className="cont_logo">
            <img
              className="logo_poke1"
              src="https://fontmeme.com/temporary/e19ce87579cae761386e44f68d3e7226.png"
            />
            <br />
            <img
              className="logo_poke"
              src="https://fontmeme.com/permalink/210423/a754231c524beec1f70f322dcb4bb1e5.png"
            />
          </div>
          <div className="logo_go">
              {/* <button className="glow-on-hover" type="button">
              GO!
            </button> */}
            <Link to="/pokedex">
              <img
                className="logo_poke2 box shake-4"
                src="https://image.flaticon.com/icons/png/512/188/188954.png"
              />
              </Link>
              <br />
              <br />
              <img  className="logo_poke3"
              src="https://fontmeme.com/temporary/b3865c50fd8a551d2f78382247f3dddb.png"/>
          </div>
        </FadeIn>
      </div>
      <div className="cont_footer">
        <h4>Created with ♥ by Alexis Aguirre </h4>
      </div>
    </div>
  );
};

export default Landing;
