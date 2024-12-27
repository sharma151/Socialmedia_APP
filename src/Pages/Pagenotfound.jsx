const Pagenotfound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.subtitle}>Page Not Found</p>
      <p style={styles.description}>
        Sorry, the page you are looking for does not exist. You can always go
        back to the
        <a href="/" style={styles.link}>
          {" "}
          Homepage
        </a>
        .
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    padding: "0 20px",
  },
  title: {
    fontSize: "6rem",
    fontWeight: "bold",
    color: "#343a40",
  },
  subtitle: {
    fontSize: "2rem",
    color: "#6c757d",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1rem",
    color: "#495057",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    marginLeft: "5px",
  },
};

export default Pagenotfound;
