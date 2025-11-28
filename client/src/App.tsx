import { Routes, Route, Link } from "react-router-dom";
import { UsersPage } from "./pages/UsersPage";

function App() {
  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <h1>User Management</h1>
        <nav>
          <Link to="/">Home</Link>{" "}
        | <Link to="/users">Users</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={<p>Welcome to the User Management demo app.</p>}
          />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
