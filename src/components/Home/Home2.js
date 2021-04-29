import React, { useState, useEffect } from "react";
import clsx from "clsx";
import FadeIn from "react-fade-in";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { Toolbar } from "@material-ui/core";
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
import Loader from "../Pokemon/Loader";
import ButtonMore from "./ButtonMore";
import SearchBar from "../Searchbar/SearchBar";
import Swal from "sweetalert2";

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
    background: "linear-gradient(180deg, #eb2c32 0%, #ad1217 100%)",
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
    alignItems: "center",
    paddingRight: "20px",
    borderRadius: "25px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
    height: "25px",
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [nextdata, setNextData] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState("");
  const [issearching, setIsSearching] = useState(false);
  // eslint-disable-next-line

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=18")
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.results);
        setNextData(responseData.next);
      });
  }, []);

  const handleShowMore = () => {
    fetch(nextdata)
      .then((response) => response.json())
      .then((responseData) => {
        setData((prevState) => [...prevState, ...responseData.results]);
        setNextData(responseData.next);
      });
  };

  const handleChange = (event) => {
    setSearching(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchResults([]);
    setSearching("");

    fetch(`https://pokeapi.co/api/v2/pokemon/${searching.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((responseData) => {
        setIsSearching(true);
        setSearchResults([
          {
            name: responseData.name,
            url: `https://pokeapi.co/api/v2/pokemon/${responseData.id}/`,
          },
        ]);
      })
      .catch((error) => {
        setIsSearching(false);
        Swal.fire({
          title: "Pokemon Not Found!",
          text: "The Pokemon does not exist",
          imageUrl: "https://i.pinimg.com/originals/c9/01/03/c901035a8cd3745d6e47fafe6ad048d9.gif",
          confirmButtonText: "Try Again",
        });
        // alert("Pokémon not found " + error);
      });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

            {/* buscador / searchbar */}
            <div className={classes.search} />
            <div className={classes.searchContainer}>
              <SearchBar
                handleSubmit={handleSubmit}
                className={classes.searchInput}
                handleChange={handleChange}
                label="Find your Pokemon"
                searching={searching}
              />
            </div>
          </Toolbar>
        </AppBar>

        {/* opener del sidebar */}
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

          {/* Sidebar lateral / iconos */}
          <List>
            <Sidebar />
          </List>
        </Drawer>

        {
          //seccion del contenido - fade in
          <FadeIn delay="400" transitionDuration="4000">
            {/* si esta buscando arroja en el home un titulo con los resultados de busqueda tanto id como nombre */}
            {issearching === true ? (
              searchResults.length > 0 ? (
                <Pokedex title="Results" pokemon={searchResults} />
              ) : (
                <Loader />
              )
            ) : null}
            {/* muestra por defecto todos los pokemon, con el boton mostrar mas carga 18 pokemon ordenadamente */}
            {data.length > 0 ? (
              <React.Fragment>
                <Pokedex title="All Pokémon" pokemon={data} />
                <ButtonMore handleShowMore={handleShowMore} />
              </React.Fragment>
            ) : (
              <Loader />
            )}
          </FadeIn>
        }
      </div>
    </Fade>
  );
}
