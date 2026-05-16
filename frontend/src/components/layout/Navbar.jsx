import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className={`w-full border-b ${scrolled ? "bg-white shadow" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between h-20 items-center">

        <Link to="/" className="flex gap-2 items-center">
          <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded">M</div>
          <h1 className="font-bold text-xl">MediCare</h1>
        </Link>

        <div className="hidden md:flex gap-10">
          <Link to="/">Home</Link>
          <Link to="/doctors">Doctors</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="flex gap-4 items-center">
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <span
                className="cursor-pointer"
                onClick={() => {
                  if (user.role === "doctor") {
                    navigate("/doctor");
                  } else {
                    navigate("/dashboard");
                  }
                }}
              >
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}