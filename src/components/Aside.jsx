export default function Aside({ title, children }) {
  return (
    <aside
      className="glass aside"
      style={{
        position: "absolute",
        top: "0px",
        width: "25vw",
        height: "98vh",
        padding: "0 10px",
        overflowY: "scroll",
        margin: "10px",
        zIndex: "5",
      }}
    >
      <h3
        style={{
          textAlign: "center",
        }}
      >
        {title}
      </h3>
      {children}
    </aside>
  );
}
