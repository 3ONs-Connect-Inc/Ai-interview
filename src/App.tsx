import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NotFound from "./pages/NotFound";
import AuthLayout from "./section/User/AuthLayout";
import MainLayout from "./section/User/MainLayout";

const CreateAccount = lazy(() => import("./pages/auth/CreateAccount"));
const SignInAccount = lazy(() => import("./pages/auth/SignInAccount"));
const Home = lazy(() => import("./pages/Home"));
const List = lazy(() => import("./components/interview/List"));
const SystemCheck = lazy(() => import("./components/interview/SystemCheck"));

const UnauthorizedPage = lazy(
  () => import("./components/auth/UnauthorizedPage")
);
const UserRoutes = lazy(() => import("./section/User"));
const AdminRoutes = lazy(() => import("./section/Admin"));
const CompanyRoutes = lazy(() => import("./section/Company"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));
const RoleGuard = lazy(() => import("./components/auth/RoleGuard"));



function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ zIndex: 9999 }}
      />  

      <Suspense>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInAccount />} />
            <Route path="/sign-up" element={<CreateAccount />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/interview-questions-list" element={<List />} />
            <Route path="/interview-system-check" element={<SystemCheck />} />

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/user/*" element={<UserRoutes />} />

            <Route element={<RoleGuard allowedRoles={["Admin"]} />}>
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Route>

            <Route element={<RoleGuard allowedRoles={["Company"]} />}>
              <Route path="/company/:companyId/*" element={<CompanyRoutes />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
