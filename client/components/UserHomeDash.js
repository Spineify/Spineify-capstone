import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getPoses } from "../store/posture";
import { Button, Alert } from "react-bootstrap";

const UserHomeDash = () => {
  const dispatch = useDispatch();
  const poses = useSelector((state) => state.posesReducer);
  const [show, setShow] = useState(true);

  let yest = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toISOString();
  let yesterday = yest.substr(0, 10);

  useEffect(() => {
    dispatch(getPoses());
  }, []);

  const yesterdaysPoses = poses.filter(
    (pose) => pose.createdAt.substr(0, 10) == yesterday
  );

  const totalPoses = yesterdaysPoses.length;
  const numOfGood = yesterdaysPoses.filter(
    (pose) => pose.type === "Good Posture"
  ).length;
  const numOfOK = yesterdaysPoses.filter(
    (pose) => pose.type === "OK Posture"
  ).length;
  const numOfBad = yesterdaysPoses.filter(
    (pose) => pose.type === "Bad Posture"
  ).length;

  const pOfGood = Math.round((numOfGood / totalPoses) * 100);
  const pOfOK = Math.round((numOfOK / totalPoses) * 100);
  const pOfBad = Math.round((numOfBad / totalPoses) * 100);

  // const pOfGood = 15;
  // const pOfOK = 64;
  // const pOfBad = 70;
  let tip = "No tips for you today, have a great day!";
  if (pOfGood >= 85) {
    tip =
      "Wow! You're killing the posture game! You had excellent posture yesterday. Be sure to feed your plant friend with all the new prizes you've won. Keep up the great work!";
  } else if (pOfGood >= 65) {
    tip =
      "Great posture! You had a great posture day yesterday, let's see if we can get that back even taller today. Don't forget to feed you plant friend!";
  } else if ((pOfGood >= 50 && pOfOK >= 40) || (pOfOK >= 50 && pOfOK < 65)) {
    tip =
      "You had an OK posture day yesterday! You had some solid posture throughout the day, but you slouched off jusssstttt a little bit. Lets see if we can get that back even taller today - you got this! Don't forget to feed your plant mate!";
  } else if (pOfGood >= 50 && pOfBad >= 40) {
    tip =
      "You're hot and you're cold! (cue Katie Perry💃 ) You've got some solid posture moments, but the other times your back shlumped like jello! Lets try to get that back nice and tall today. Don't forget to feed your plant buddy!";
  } else if (pOfOK >= 65) {
    tip =
      "You had an OK posture day yesterday! Let's try to sit up a bit taller today to get hit our posture goals - your back will thank you for it! Don't forget to feed you plant buddy!";
  } else if (pOfBad >= 65 && pOfBad < 75) {
    tip =
      "Oh no! You had bad posture for majority of the day yesterday! Make sure to give a bit of extra love to your back today and try to sit up nice and tall. Don't forget to try some of our suggested stretches out! ";
  } else if (pOfBad >= 75) {
    tip =
      "🚨 🚨 🚨 Seems like you had a rough posture day yesterday! Why don't we stretch out that back nice and tall to help reset for today with our suggested stretches. The more you protect your back with good posture, the better you'll feel and the more your plant friend will grow! You got this!! 😤 😤 😤 ";
  }

  return (
    <div className="home-dash">
      Yesterday's stats:
      <ul id="ul-stats">
        <li className="stat">Good posture: {pOfGood}%</li>
        <li className="stat">Ok posture: {pOfOK}%</li>
        <li className="stat">Bad posture: {pOfBad}%</li>
      </ul>
      <div className="tip-for-today">
        <Alert show={show} variant="success">
          <Alert.Heading>Tip of the day! </Alert.Heading>
          <p>{tip}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Hide tip
            </Button>
          </div>
        </Alert>

        {!show && (
          <Button variant="outline-success" onClick={() => setShow(true)}>
            Show tip
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserHomeDash;
