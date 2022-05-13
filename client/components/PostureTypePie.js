import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPoses } from "../store/posture";
import { VictoryPie } from "victory";

const PostureTypePie = (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const pieData = useSelector((state) => state.posesReducer);

  useEffect(() => {
    const fetchPoses = () => {
      if (userId) {
        dispatch(getPoses());
      }
    };
    fetchPoses();
  }, [userId]);

  const posturePieData = [
    { x: "Good Posture", y: 0 },
    { x: "Bad Posture", y: 0 },
    { x: "OK Posture", y: 0 },
  ];

  const countObj = {
    "Good Posture": 0,
    "OK Posture": 0,
    "Bad Posture": 0,
  };

  let count = 0;

  const mappedPie = pieData.map((survey) => {
    countObj[survey.type] += 1;
    count++;
  });

  for (let i = 0; i < posturePieData.length; i++) {
    const entry = posturePieData[i];
    const poseCount = countObj[entry.x];
    entry.y = poseCount;
  }
  const checkArray = posturePieData.filter((entry) => entry.y !== 0).length;

  const colors = {
    pink: ["#CB5599", "#5E6063"],
    teal: ["#00FFFF", "#5E6063", "#49C6B7"],
  };

  return (
    <div>
      {checkArray.length === 0 ? (
        <p>Loading data</p>
      ) : (
        <div className="pie-chart-container">
          <h5>Posture Type Breakdown</h5>
          <VictoryPie
            data={posturePieData}
            name="Areas of Discomfort"
            colorScale={colors["teal"]}
            innerRadius={150}
            padAngle={3}
            width={900}
            height={800}

            sortOrder={"ascending"}
            style={{
              labels: { fontSize: 35, padding: 35 },
            }}
            labelRadius={({ outerRadius }) => outerRadius + 20}
            labels={({ datum }) =>
              `${datum.x}: ${((datum.y / count) * 100).toFixed(0)}% `
            }
          />
        </div>
      )}
    </div>
  );
};

export default PostureTypePie;
