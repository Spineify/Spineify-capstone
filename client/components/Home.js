import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { getPoses } from "../store/posture";
import Tracker from "./Tracker";
import PetPlant from "./PetPlant";
import { getPlant } from "../store/petPlant";
/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  const dispatch = useDispatch();

  //get all poses
  useEffect(() => {
    dispatch(getPoses());
    dispatch(getPlant());
  }, []);

  return (
    <div id="home">
      <h3>Hello, {username}</h3>
      <div className="homeContent">
        <Tracker />
        <PetPlant />
      </div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
