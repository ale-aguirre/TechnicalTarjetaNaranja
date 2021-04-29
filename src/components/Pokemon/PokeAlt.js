import React, { useEffect, useState } from "react";
import "../../assets/styles/components/PokeItem.scss";
import pokeball from "../../assets/pk.svg";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import './Pokemon.css'

const PokeItem = ({ info }) => {
  const [pokemonData, setpokemonData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [typeclass, setTypeClass] = useState("");

  useEffect(() => {
    fetch(info.url)
      .then((response) => response.json())
      .then((responseData) => {
        setpokemonData({
          namepokemon: responseData.name,
          number: responseData.id,
          types: responseData.types,
          image: responseData.sprites.other["official-artwork"].front_default,
        });
        setTypeClass(responseData.types[0].type.name);
        setIsLoading(true);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center">
      {isloading === true ? (
        <Link to={`/${pokemonData.namepokemon}`}>
          <div className={`poke-card ${typeclass}`}>
            <img src={pokeball} alt="" className="maskpokeball" />

            <div className="col poke-card__number text-right">
              <p>#{pokemonData.number}</p>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="col poke-card__name">
                  <p>{pokemonData.namepokemon}</p>
                </div>

                {pokemonData.types.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="poke-card__type d-flex align-items-center justify-content-center"
                    >
                      {item.type.name}
                    </div>
                  );
                })}
              </div>

              <div className="col-6 d-flex align-items-center justify-content-center">
                <img
                  className="poke-card__image"
                  src={pokemonData.image}
                  alt="Pokémon"
                />
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PokeItem;
