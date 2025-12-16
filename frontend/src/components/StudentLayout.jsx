import { Link, Outlet, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const StudentLayout = () => {
  const { user, logout } = useContext(AuthContext)
  console.log("user", user)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login")
  };

  return (
    <div className="flex h-screen">
      {/* Left sidebar */}
      <aside className="w-75 bg-gray-700 text-white flex flex-col">
        <div className="p-8 font-bold text-xl border-b border-white">
          Welcome, {user.firstname}
        </div>
        <nav className="flex-1 flex flex-col p-4 space-y-2">
          <Link
            to="/courses"
            className="px-3 py-2 rounded hover:bg-white hover:text-black"
          >
            Available Courses
          </Link>
          <Link
            to="/enrolled"
            className="px-3 py-2 rounded hover:bg-white hover:text-black"
          >
            Enrolled Courses
          </Link>
          <Link
            to="/recommend"
            className="px-3 py-2 rounded hover:bg-white hover:text-black"
          >
            OpenAI Recommendation
          </Link>
          <button
            onClick={handleLogout}
            className="mt-auto px-3 py-2 rounded bg-red-500 hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
