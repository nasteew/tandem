import { Link } from "react-router";

export const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <p>Please log in to continue.</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/auth">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/library">Library</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default LandingPage;
