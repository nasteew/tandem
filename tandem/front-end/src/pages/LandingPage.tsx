import { Link } from "react-router";
import Editor from "@monaco-editor/react";
import { format } from "date-fns";
import Markdown from "react-markdown";
export const LandingPage = () => {
  const date = format(new Date(), "yyyy-MM-dd");
  const markdown = `# Hello world
  ## Hello world
  ### Hello world
  #### Hello world
  ##### Hello world
  ###### Hello world`;
  return (
    <div>
      <h1>Welcome to the Landing Page</h1>
      <p>Please log in to continue.</p>
      <p>Current date: {date}</p>
      <Markdown>{markdown}</Markdown>
      <Editor height="200px" defaultLanguage="javascript" defaultValue="// some code" theme="vs-dark" />
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
