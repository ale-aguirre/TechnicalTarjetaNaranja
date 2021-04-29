import React, { useEffect, useState } from "react";
import "../../assets/styles/screens/SinglePokemon.scss";
import "../../assets/styles/components/ButtonMore.scss";
import SinglePokemonTypes from "./SinglePokemonTypes";
import SinglePokemonChain from "./SinglePokemonChain";
import pokeball from "../../assets/pk.svg";
import Loader from "./Loader";
import { Mayuscula } from "../constants";
import { Link } from "react-router-dom";

const SinglePokemon = (props) => {
  const [pokeData, setPokeData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  useEffect(() => {
    let isSubscribed = true;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((responseData) => {
        if (isSubscribed) {
          setPokeData({
            pokeimage:
              responseData.sprites.other["official-artwork"].front_default,
            pokename: responseData.name,
            pokeid: responseData.id,
            pokeheight: responseData.height,
            pokeweight: responseData.weight,
            pokeabilities: responseData.abilities,
            pokestats: responseData.stats,
            poketypes: responseData.types.map((item) => item.type.url),
            poketype: responseData.types[0].type.name,
            pokesprite: {
              front: responseData.sprites.front_default,
              back: responseData.sprites.back_default,
            },
            pokeshiny: {
              front: responseData.sprites.front_shiny,
              back: responseData.sprites.back_shiny,
            },
            pokespecies: responseData.species,
          });
          setIsLoading(false);
        }
      });

    return () => (isSubscribed = false);
    // eslint-disable-next-line
  }, [pokeData]);

  return (
    <React.Fragment>
      {isloading === true ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="container single single__cont">
            <div className="container single single__details">
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <div
                    className={`single__details__card d-flex align-items-center justify-content-center ${pokeData.poketype}`}
                  >
                    <img src={pokeball} alt="" className="maskpokeball" />
                    <img
                      className="single__details__card__image"
                      src={pokeData.pokeimage}
                      alt="Pokémon"
                    />
                  </div>
                </div>

                <div className="col-sm-12 col-md-6 single__details__info">
                  <div className="row">
                    <div className="col-6 col-md-12">
                      <p className="single__details__number">
                        #{pokeData.pokeid}
                      </p>
                    </div>

                    <div className="col-6 col-md-12 single__details__name">
                      <p>{pokeData.pokename}</p>
                    </div>

                    <div className="col-12 col-md-6 d-flex justify-content-between">
                      <p className="item__detail">Height:</p>
                      <p className="item__value">{pokeData.pokeheight}</p>
                    </div>

                    <div className="col-12 col-md-6 d-flex justify-content-between">
                      <p className="item__detail">Weight:</p>
                      <p className="item__value">{pokeData.pokeweight}</p>
                    </div>

                    <div className="col-12">
                      <p className="item__detail">Abilities:</p>
                      <div className="d-flex flex-wrap justify-content-around">
                        {pokeData.pokeabilities.map((item, index) => {
                          return (
                            <div key={index} className="abiliti_item">
                              <p>{Mayuscula(item.ability.name)}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container single single__stats">
              <div className="row">
                <div className="col-12">
                  <h3>Stats</h3>
                  <hr />
                  <div className="row">
                    {pokeData.pokestats.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="col-12 col-md-4 d-flex single__stats__stat"
                        >
                          <p className="item__detail">{item.stat.name}:</p>
                          <p className="item__value">{item.base_stat}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <SinglePokemonTypes types={pokeData.poketypes} />

            <div className="container single single__shiny">
              <div className="row">
                <div className="col-12">
                  <h3>Sprite</h3>
                  <hr />
                  <div className="col-12 single__shiny__container">
                    <div
                      className={`single__shiny__card d-flex justify-content-around align-items-center ${pokeData.poketype}`}
                    >
                      <img src={pokeball} alt="" className="maskpokeball" />
                      <img
                        className="single__shiny__image"
                        src={pokeData.pokesprite.front}
                        alt="Pokémon Shiny"
                      />
                    </div>

                    <div
                      className={`single__shiny__card d-flex justify-content-around align-items-center ${pokeData.poketype}`}
                    >
                      <img src={pokeball} alt="" className="maskpokeball" />
                      <img
                        className="single__shiny__image"
                        src={pokeData.pokesprite.back}
                        alt="Pokémon Shiny"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container single single__shiny">
              <div className="row">
                <div className="col-12">
                  <h3>Shiny</h3>
                  <hr />
                  <div className="col-12 single__shiny__container">
                    <div
                      className={`single__shiny__card d-flex justify-content-around align-items-center ${pokeData.poketype}`}
                    >
                      <img src={pokeball} alt="" className="maskpokeball" />
                      <img
                        className="single__shiny__image"
                        src={pokeData.pokeshiny.front}
                        alt="Pokémon Shiny"
                      />
                    </div>

                    <div
                      className={`single__shiny__card d-flex justify-content-around align-items-center ${pokeData.poketype}`}
                    >
                      <img src={pokeball} alt="" className="maskpokeball" />
                      <img
                        className="single__shiny__image"
                        src={pokeData.pokeshiny.back}
                        alt="Pokémon Shiny"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <SinglePokemonChain species={pokeData.pokespecies} />
            <div className="container">
              <Link to="/pokedex">
                <div className="col-sm-12 poke-button d-flex justify-content-center">
                  <button>BACK TO POKEDEX</button>
                </div>
              </Link>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SinglePokemon;
