export function Footer() {
  return (
    <footer className="footer">
      <div style={{ flex: 1 }}>
        <h2 style={{textAlign: "center"}}>Dagens gullkorn</h2>
        <p style={{textAlign: "center"}}>
          Du er ikke full hvis du kan ligge på gulvet uten å holde deg fast.
        </p>
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{textAlign: "center"}}>Want to know more?</h2>
        <nav
          style={{ display: "flex", flexFlow: "column nowrap", gap: "0.5em",textAlign: "center" }}
        >
          <a href="https://nrk.no" target="_blank">
            Check out NRK
          </a>
          <a
            href="https://github.com/erlandM/react-workshop"
            target="_blank"
          >
            Go to my github repo
          </a>
        </nav>
      </div>
    </footer>
  );
}
