import { Link } from "react-router";

export const LibraryPage = () => {
  return (
    <div>
      <h1>Library</h1>
      <p>Explore the list of topics here.</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/library/training">Training</Link>
        <Link to="/library/agent">Agent</Link>
      </div>
    </div>
  );
};

export default LibraryPage;
