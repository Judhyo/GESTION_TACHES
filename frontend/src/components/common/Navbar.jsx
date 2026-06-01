import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear("user");
    localStorage.clear("token");
    toast.success("Déconnexion réussie");
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
      <h1 className="text-xl font-bold text-gray-800">Gestion des tâches</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
