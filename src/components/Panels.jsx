import { forwardRef } from "react";

const MainPanel = forwardRef((props, fref) => {
  return (
    <div
      ref={fref}
      className="panel"
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
});

const SidePanel = forwardRef((props, fref) => {
  return (
    <div
      ref={fref}
      className="panel"
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "300px",
        height: "300px",
      }}
    ></div>
  );
});

export { MainPanel, SidePanel };
