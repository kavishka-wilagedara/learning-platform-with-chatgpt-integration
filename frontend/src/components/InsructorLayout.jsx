import { Link, Outlet, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { LiaSignOutAltSolid } from "react-icons/lia";

const InstructorLayout = () => {
  const { user, logout } = useContext(AuthContext)
  console.log("user", user)
  const navigate = useNavigate()
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login")
  };

  return (
    <div className="flex h-screen">
      
      {/* Left sidebar */}
      <aside 
        className={`bg-gray-700 text-white flex flex-col transition-all duration-300 ${
            sidebarIsOpen ? "w-72" : "w-20"
          }`
        }
      >
        <div
          className="flex items-center justify-end p-4 cursor-pointer hover:bg-gray-600"
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
        >
          {sidebarIsOpen ? (
            <GoSidebarExpand className="w-6 h-6"/>
          ):(
            <GoSidebarCollapse className="w-6 h-6"/>
          )}

        </div>

        {sidebarIsOpen && (
          <div className="p-8 font-bold text-xl border-b border-white">
            Welcome, {user.firstname}
          </div>
        )}

        <nav className="flex-1 flex flex-col p-4 space-y-2">

            <Link
                to="/all"
                className={`px-3 py-2 rounded hover:bg-white hover:text-black ${
                  !sidebarIsOpen && "text-md text-center"
                  }`
                }
            >
                {sidebarIsOpen ? "View posted courses" : "All"}
            </Link>

            <Link
                to="/create"
                className={`px-3 py-2 rounded hover:bg-white hover:text-black ${
                  !sidebarIsOpen && "text-md text-center"
                  }`
                }
            >
                {sidebarIsOpen ? "Post the course" : "Post"}
            </Link>
          
            <button
              onClick={handleLogout}
              className={`mt-auto px-3 py-2 rounded bg-red-500 hover:bg-red-600 ${
                !sidebarIsOpen && "text- text-center"
                }`
              }
            >
                {sidebarIsOpen ? "Log out" : 
                  <LiaSignOutAltSolid className="w-6 h-6"/>
                }
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

export default InstructorLayout;
