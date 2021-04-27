import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Button } from "@material-ui/core";
import { Mayuscula } from "../constants";
import axios from "axios";
import { Link } from "react-router-dom";
import typeColor from "../helper/typeColors";
import "./Pokemon.css";


const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function(response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function(error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <div className="poke_container">
        <div className="poke_info">
          <Typography variant="h1">
            #{`${id}.`} {Mayuscula(name)}
            {/* <img src={front_default} /> */}
          </Typography>
        
          <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
          <Typography variant="h3">Pokemon Info</Typography>
          <Typography>
            Species: {Mayuscula(species.name)}
          </Typography>
          <Typography>Height: {height} cm</Typography>
          <Typography>Weight: {weight} kg</Typography>
          <Typography>Abilites: {weight} kg</Typography>
          <Typography>XP: {weight} kg</Typography>
          <Typography variant="h6"> Types:</Typography>
          {types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            return (
              <Typography
                key={name}
                style={{
                  backgroundColor: typeColor[type.name],
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {" "}
                {Mayuscula(name)}
              </Typography>
            );
          })}
          <Link to="/pokedex">
            <Button>BACK TO POKEDEX</Button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div>
      {pokemon === undefined && (
        <div className="poke_loader">
          {" "}
          <CircularProgress />{" "}
        </div>
      )}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
    </div>
  );
};

export default Pokemon;
