import { useUserContext } from "../context/AuthProvider";
const About = () => {
  // const { id, name, email, profilePicture } = user;
  const { user, logout } = useUserContext();
  if (!user) {
    return <h3>Please sign in</h3>;
  }

  const { name, email, profilePicture } = user;
  return (
    <div className="card h-100 shadow-sm" style={{ maxWidth: "350px" }}>
      <div className="card-body text-center d-flex flex-column align-items-center">
        {/* Profile Picture Container */}
        <div
          className="position-relative mb-3"
          style={{ width: "100px", height: "100px" }}
        >
          <img
            src={profilePicture || "https://via.placeholder.com/100"}
            alt={`${name}'s profile`}
            className="img-fluid rounded-circle border border-2 border-primary w-100 h-100 object-fit-cover"
            onError={(e) => {
              // Fallback if image URL is broken
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/100";
            }}
          />
        </div>

        {/* User Info */}
        <h5 className="card-title mb-1 text-truncate w-100" title={name}>
          {name}
        </h5>

        <p
          className="card-text text-muted small mb-2 text-truncate w-100"
          title={email}
        >
          {email}
        </p>
        <button className="btn btn-danger" onClick={() => logout()}>
          Logout
        </button>
        {/* User ID Badge */}
        {/* <div className="mt-auto">
          <span className="badge bg-secondary-subtle text-secondary-emphasis font-monospace px-2 py-1">
            ID: {id}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default About;
