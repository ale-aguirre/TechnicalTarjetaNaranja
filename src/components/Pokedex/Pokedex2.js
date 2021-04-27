// import React, { useEffect, useState } from "react";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   CircularProgress,
// } from "@material-ui/core";
// import { fade, makeStyles } from "@material-ui/core/styles";
// import { Mayuscula } from "../constants";
// import "./Pokedex.css";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const useStyles = makeStyles((theme) => ({
//   pokedexContainer: {
//     height: "auto",
//     paddingTop: "20px",
//     paddingLeft: "90px",
//     paddingRight: "90px",
//   },
//   cardMedia: {
//     margin: "auto",
//   },
//   cardContent: {
//     textAlign: "center",
//   },
// }));

// const Pokedex = (props) => {
//   const classes = useStyles();
//   const { history } = props;
//   const [pokemonData, setPokemonData] = useState({});
//   const [filter, setFilter] = useState("");

//   useEffect(() => {
//     axios
//       .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
//       .then(function(response) {
//         const { data } = response;
//         const { results } = data;
//         const newPokemonData = {};
//         results.forEach((pokemon, index) => {
//           newPokemonData[index + 1] = {
//             id: index + 1,
//             name: pokemon.name,
//             sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
//               1}.png`,
//           };
//         });
//         setPokemonData(newPokemonData);
//       });
//   }, []);

//   const getPokemonCard = (pokemonId) => {
//     const { id, name, sprite } = pokemonData[pokemonId];
//     return (
//       <Grid item xs={2} key={pokemonId}>
//         <Link to={(`/${id}`)}>
//           <Card>
//             <CardMedia
//               className={classes.cardMedia}
//               image={sprite}
//               style={{ width: "130px", height: "130px" }}
//             />
//             <CardContent className={classes.cardContent}>
//               <Typography>{`${id}. ${Mayuscula(name)}`}</Typography>
//             </CardContent>
//           </Card>
//         </Link>
//       </Grid>
//     );
//   };

//   return (
//     <>
//       {pokemonData ? (
//         <Grid container spacing={2} className={classes.pokedexContainer}>
//           {Object.keys(pokemonData).map(
//             (pokemonId) =>
//               pokemonData[pokemonId].name.includes(filter) &&
//               getPokemonCard(pokemonId)
//           )}
//         </Grid>
//       ) : (
//         <CircularProgress />
//       )}
//     </>
//   );
// };

// export default Pokedex;
