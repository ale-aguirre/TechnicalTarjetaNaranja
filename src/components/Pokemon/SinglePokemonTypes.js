import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const SinglePokemonTypes = (props) => {
  const [dataTypes, setDataTypes] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  useEffect(() => {
    setDataTypes([]);
    props.types.forEach((item) => {
      fetch(item)
        .then((response) => response.json())
        .then((responseData) => {
          const mydata = {
            typename: responseData.name,
            damageFrom: responseData.damage_relations.double_damage_from.map(
              (item) => item.name
            ),
            damageTo: responseData.damage_relations.double_damage_to.map(
              (item) => item.name
            ),
          };
          setDataTypes((prevState) => [...prevState, mydata]);
          setIsLoading(false);
        });
    });// eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      {isloading === true ? (
        <Loader />
      ) : (
        <div className="container single single__types">
          <div className="row">
            <div className="col-12">
              <h3>Types</h3>
              <hr />
              <div className="row">
                {dataTypes.map((item, index) => {
                  return (
                    <div key={index} className="col-sm-12 col-md-6">
                      <div
                        className={`col-12 single__types__type ${item.typename}`}
                      >
                        <p>{item.typename}</p>
                      </div>

                      <div className="col-12">
                        <p className="item__detail">Damage from:</p>

                        <div className="row">
                          {item.damageFrom.map((item, index) => (
                            <div key={index} className="col-6">
                              <div className={`single__types__type ${item}`}>
                                <p>{item}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-12">
                        <p className="item__detail">Damage to:</p>

                        <div className="row">
                          {item.damageTo.map((item, index) => (
                            <div key={index} className="col-6">
                              <div className={`single__types__type ${item}`}>
                                <p>{item}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SinglePokemonTypes;
