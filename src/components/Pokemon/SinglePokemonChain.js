import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Section from "../Pokedex/Pokedex2";

const SinglePokemonChain = (props) => {
  const [chain, setChain] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch(props.species.url)
      .then((response) => response.json())
      .then((responseData) => {
        fetch(responseData.evolution_chain.url)
          .then((responsechain) => responsechain.json())
          .then((responsechainData) => {
            setChain((prevState) => {
              if (responsechainData.chain.evolves_to.length > 0) {
                const evolutions = [
                  {
                    name: responsechainData.chain.species.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${responsechainData.chain.species.name}/`,
                  },
                  {
                    name: responsechainData.chain.evolves_to[0].species.name,
                    url: `https://pokeapi.co/api/v2/pokemon/${responsechainData.chain.evolves_to[0].species.name}/`,
                  },
                ];

                if (
                  responsechainData.chain.evolves_to[0].evolves_to.length > 0
                ) {
                  const thirtevolution = [
                    {
                      name:
                        responsechainData.chain.evolves_to[0].evolves_to[0]
                          .species.name,
                      url: `https://pokeapi.co/api/v2/pokemon/${responsechainData.chain.evolves_to[0].evolves_to[0].species.name}/`,
                    },
                  ];
                  const newevolutions = [...evolutions, ...thirtevolution];

                  return [...prevState, ...newevolutions];
                } else {
                  return [...prevState, ...evolutions];
                }
              } else {
                return [];
              }
            });
            setIsLoading(false);
          });
      });// eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      {isloading === true ? (
        <Loader />
      ) : (
        <React.Fragment>
          {chain.length > 0 ? (
            <div className="container">
              <div className="row">
                <Section pokemon={chain} title={"Evolution Chain"} />
              </div>
            </div>
          ) : null}
         <div className="magi"></div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default SinglePokemonChain;
