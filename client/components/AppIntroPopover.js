import React from "react";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";

const AppIntro = (props) => {
  return (
    <>
      {["right"].map((placement) => (
        <OverlayTrigger
          trigger="click"
          key={placement}
          placement={placement}
          overlay={
            <Popover id={`popover-positioned-${placement}`}>
              <Popover.Header as="h3">{`Spineify Instructions`}</Popover.Header>
              <Popover.Body>
                Welcome to Spineify! To start tracking your posture, click on
                the 'Start Tracking' button. Your posture will be tracked
                through the webcam on your computer. To stop tracking at any
                time, click 'Stop Tracking'. Every day fill out a daily survey
                to track your levels of discomfort and areas of pain. Suggested
                stretches based on your pain points will be recommended after
                each survey. Check out your results in the data section to
                monitor your progress. Win prizes for your pet plant by
                maintaining good posture during the day. You got this!
              </Popover.Body>
            </Popover>
          }
        >
          <Button id="instructions-button" variant="secondary">
            Instructions
          </Button>
        </OverlayTrigger>
      ))}
    </>
  );
};

export default AppIntro;
