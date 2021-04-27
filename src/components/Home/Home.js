import React, { useState, useEffect } from "react";
import clsx from "clsx";
import FadeIn from "react-fade-in";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Drawer from "@material-ui/core/Drawer";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  TextField,
} from "@material-ui/core";
import { Mayuscula } from "../constants";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Pokedex from "../Pokedex/Pokedex2";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import "./Home.css";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import typeColor from "../helper/typeColors";

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#752210",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: -15,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  search: {
    flexGrow: 0.5,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
  pokedexContainer: {
    display: "flex",
    height: "auto",
    backgroundColor: "white",
    paddingTop: "20px",
    paddingLeft: "40px",
    paddingRight: "90px",
  },
  cardMedia: {
    borderRadius: "15px",
    marginTop: "12px",
    width: "230px",
    height: "230px",
  },
  cardContent: {
    textAlign: "center",
    width: "250px",
  },
}));

export default function MiniDrawer(props) {
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
      .then(function(response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
              1}.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite, types } = pokemonData[pokemonId];

    return (
      <div className="cont-1" key={pokemonId}>
        <div className="cont-2" onClick={() => history.push(`/${id}`)}>
            
          <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{
              backgroundColor: typeColor[types]
            }}
          />

          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${Mayuscula(name)}`}</Typography>
          </CardContent>
        </div>
      </div>
    );
  };

  return (
    <Fade in={true}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon style={{ cursor: "pointer", color: "black" }} />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                className="header__logo"
                src="https://fontmeme.com/permalink/210423/a754231c524beec1f70f322dcb4bb1e5.png"
                alt="logo"
              />
            </Link>
            <div className={classes.search} />
            <div className={classes.searchContainer}>
              <SearchIcon className={classes.searchIcon} />
              <TextField
                className={classes.searchInput}
                onChange={handleSearchChange}
                label="Find your Pokemon"
                variant="standard"
              />
            </div>
            <div className={classes.root} />
            <div className="header__iconos">
              <Link
                to="/profile"
                style={{ color: "black", textDecoration: "none" }}
              >
                {/* {user ? (
                <FaceIcon color="primary" />
              ) : (
                <AccountCircleIcon className="header__icono" />
              )} */}
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <MenuIcon /> : <MenuIcon />}
            </IconButton>
          </div>
          <List>
            <Sidebar />
          </List>
        </Drawer>
        <FadeIn delay="400" transitionDuration="4000">
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {pokemonData ? (
              <Grid container spacing={6} className={classes.pokedexContainer}>
                {Object.keys(pokemonData).map(
                  (pokemonId) =>
                    pokemonData[pokemonId].name.includes(filter) &&
                    getPokemonCard(pokemonId)
                )}
              </Grid>
            ) : (
              <CircularProgress />
            )}
          </main>
        </FadeIn>
      </div>
    </Fade>
  );
}
