import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Error 404</h2>
      <button onClick={() => navigate("/signIn")}>Refresh</button>
    </div>
  );
};

export default Error404;
