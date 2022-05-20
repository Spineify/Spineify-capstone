import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../store/surveyDataSet";
import PainAreaChart from "./PainAreaChart";
import PostureTypePie from "./PostureTypePie";
import DiscomfortLevelLineGraph from "./DiscomfortLevelLineGraph";
import { Row, Col, Container } from "react-bootstrap";
import GoodPosturePercentLineGraph from "./GoodPosturePercentLineGraph";

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
      case "good_posture_trends":
        return (
          <>
            <GoodPosturePercentLineGraph />
          </>
        )
      default:
        return (
          <>
            <Container className="graphs-container">
              <Row className="graph-row">
                <Col className="graph-column">
                  <PainAreaChart dataSet={sortedSet} />
                </Col>
                <Col className="graph-column entire-posture-pie-container">
                  <PostureTypePie />
                </Col>
              </Row>
              <br />


              <Row className="graph-row">
                <Col>
                  <DiscomfortLevelLineGraph
                    className="line-graph-container"
                    dataSet={sortedSet}
                  />
                </Col>
                <Col>
                  <GoodPosturePercentLineGraph />
                </Col>
              </Row>
            </Container>
          </>
        );
    }
  };

  return (
    <div className="data-viz-body">
      <form>
        <label>See charts : </label>
        <select onChange={onChangeHandler}>
          <option value="all"> All </option>
          <option value="discomfort_level">Discomfort Levels</option>
          <option value="discomfort_areas">Discomfort Areas</option>
          <option value="posture_breakdown">Posture Breakdown</option>
          <option value="good_posture_trends">Good Posture Trends</option>
        </select>
      </form>
      <div className="graphs-container">{renderGraphs()}</div>
    </div>
  );
};
