import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../store/surveyDataSet";
import PainAreaChart from "./PainAreaChart";
import PostureTypePie from "./PostureTypePie";
import DiscomfortLevelLineGraph from "./DiscomfortLevelLineGraph";
import StretchList from "./StretchList";
import { Row, Col, Container } from "react-bootstrap";

export default (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const dataSet = useSelector((state) => state.dataSet);
  const [graphs, setGraphs] = useState("all");

  const sortedSet = dataSet.sort((a, b) => {
    return a.id - b.id;
  });

  const onChangeHandler = (e) => {
    setGraphs(e.target.value);
  };

  useEffect(() => {
    const fetchData = () => {
      if (userId) {
        dispatch(getUserData(userId));
      }
    };
    fetchData();
  }, [userId]);

  const renderGraphs = () => {
    switch (graphs) {
      case "discomfort_level":
        return (
          <>
            <DiscomfortLevelLineGraph dataSet={sortedSet} />
          </>
        );
      case "discomfort_areas":
        return (
          <>
            <PainAreaChart dataSet={sortedSet} />
          </>
        );
      case "posture_breakdown":
        return (
          <>
            <PostureTypePie />
          </>
        );
      default:
        return (
          <>
            <Container className="graphs-container">
              <Row>
                <Col className="h-100 d-inline-block">
                  <PainAreaChart dataSet={sortedSet} />
                </Col>
                <Col className="h-100 d-inline-block">
                  <PostureTypePie />
                </Col>
              </Row>

              <Row>
                <DiscomfortLevelLineGraph
                  className="graphs-container"
                  dataSet={sortedSet}
                />
              </Row>
            </Container>
          </>
        );
    }
  };

  return (
    <div>
      <form>
        <label>See charts : </label>
        <select onChange={onChangeHandler}>
          <option value="all"> All </option>
          <option value="discomfort_level">Discomfort Levels</option>
          <option value="discomfort_areas">Discomfort Areas</option>
          <option value="posture_breakdown">Posture Breakdown</option>
        </select>
      </form>
      {renderGraphs()}
      {/* <DiscomfortLevelLineGraph dataSet={sortedSet} />
      <PainAreaChart dataSet={sortedSet} />
      <PostureTypePie /> */}
      <StretchList />
    </div>
  );
};
