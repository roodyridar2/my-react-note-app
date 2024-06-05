import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Public from "./pages/Public";
import AdminNavbar from "./admin/AdminNavbar";
// import Dashboard from "./admin/Dashboard";
import AllUsers from "./admin/AllUsers";
import UserPosts from "./admin/UserPosts";
import AdminSingle from "./admin/AdminSingle";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

// Protected Route Component:
// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  if (currentUser.isAdmin) {
    return <Navigate to="/admin/users" />;
  }
  return currentUser ? children : <Navigate to="/login" />;
}

// eslint-disable-next-line react/prop-types
function AdminProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser && currentUser.isAdmin ? children : <Navigate to="/" />;
  
}

const AppRoutes = () => {
  const { currentUser } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: currentUser?.isAdmin ? <AdminLayout /> : <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/write",
          element: (
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          ),
        },
        {
          path: "/post/:id",
          element: (
            <ProtectedRoute>
              <Single />
            </ProtectedRoute>
          ),
        },
        {
          path: "/public",
          element: (
            <ProtectedRoute>
              <Public />
            </ProtectedRoute>
          ),
        },
        // {
        //   path: "/admin",
        //   element: (
        //     <AdminProtectedRoute>
        //       <Dashboard />
        //     </AdminProtectedRoute>
        //   ),
        // },
        {
          path: "/admin/users",
          element: (
            <AdminProtectedRoute>
              <AllUsers />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/admin/user/:id",
          element: (
            <AdminProtectedRoute>
              <UserPosts />
            </AdminProtectedRoute>
          ),
        },
        {
          path: "/admin/single/:id",
          element: (
            <AdminProtectedRoute>
              <AdminSingle />
            </AdminProtectedRoute>
          ),
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <div className="app">
      <div className="container">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
