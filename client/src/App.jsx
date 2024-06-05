import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import Public from "./pages/Public";
import AdminNavbar from "./admin/AdminNavbar";
// import Dashboard from "./admin/Dashboard";
import AllUsers from "./admin/AllUsers";
import UserPosts from "./admin/UserPosts";
import AdminSingle from "./admin/AdminSingle";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

// Layouts:
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      {children}
      <Footer />
    </>
  );
};

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  if (currentUser.isAdmin) {
    return <Navigate to="/admin/users" />;
  }

  return children;
}

function AdminProtectedRoute({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  if (!currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}
// eslint-disable-next-line react/prop-types

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout>
            <Home />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/write",
      element: (
        <ProtectedRoute>
          <Layout>
            <Write />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/post/:id",
      element: (
        <ProtectedRoute>
          <Layout>
            <Single />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/public",
      element: (
        <ProtectedRoute>
          <Layout>
            <Public />
          </Layout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/users",
      element: (
        <AdminProtectedRoute>
          <AdminLayout>
            <AllUsers />
          </AdminLayout>
        </AdminProtectedRoute>
      ),
    },
    {
      path: "/admin/user/:id",
      element: (
        <AdminProtectedRoute>
          <AdminLayout>
            <UserPosts />
          </AdminLayout>
        </AdminProtectedRoute>
      ),
    },
    {
      path: "/admin/single/:id",
      element: (
        <AdminProtectedRoute>
          <AdminLayout>
            <AdminSingle />
          </AdminLayout>
        </AdminProtectedRoute>
      ),
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
