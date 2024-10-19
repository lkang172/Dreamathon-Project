import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/login");
  };
  return (
    <div className="home-container">
      <h1 className="h1Home">Simplify</h1>
      <p>In development</p>
      <button className="buttonHome" type="submit" onClick={handleCreateClick}>
        Try it out
      </button>
    </div>
  );
};

export default Home;
