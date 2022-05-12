import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const PetPlant = () => {
  const plant = useSelector((state) => state.plantReducer);
  console.log("Plant in PetPlant", plant);

  return (
    <div className="gameFrame">
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="3"
          aria-valuemin="0"
          aria-valuemax="12"
          style={{ width: "33%" }}
        ></div>
      </div>
      <img
        className="tree"
        src="./gamification/tree_1.png"
        // style={{
        //   width: 360,
        //   height: "auto",

        //   borderRadius: "4rem",
        // }}
      />
    </div>
  );
};

export default PetPlant;
