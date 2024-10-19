import React from "react";
import ArcProgress from "react-arc-progress";

export default class MyArcProgress extends React.Component {
  state = {
    progress: 0.78,
    customText: [
      { text: "78", size: "34px", color: "gray", x: 100, y: 94 },
      { text: "/100", size: "14px", color: "gray", x: 100, y: 122 }
    ]
  };

  render() {
    const { progress, customText } = this.state;
    const arcFillColor = { gradient: ["#FBA86F", "#FED0A3", " #FED0A3"] };
    return (
      <>
        <div
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            position: "absolute",
            left: 58,
            marginTop: 50,
            boxShadow: `1px 3px 1px rgba(0,0,0,0.1)`,
            //boxShadow: "-2px 2px  rgba(0,0,0,0.1)",
            //mozBoxShadow: "0 0 5px  5px rgba(0,0,0,0.3)",
            webkitBoxShadow: "0 3px 5px 1px rgba(0,0,0,0.1)"
            //oBoxShadow: "0 0 2px 2px rgba(0,0,0,0.3)"
          }}
        ></div>
        <ArcProgress
          thickness={20}
          fillColor={arcFillColor}
          progress={progress}
          customText={customText}
          style={{ position: "relative" }}
          observer={(current) => {
            const { percentage, currentText } = current;
            console.log("observer:", percentage, currentText);
          }}
          animationEnd={({ progress, text }) => {
            console.log("animationEnd", progress, text);
          }}
        />
      </>
    );
  }
}
