import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../pages/company/Layout";
import NotFound from "../pages/NotFound";
import Spinner from "../components/ui/Spinner";

const DashboardPage = lazy(() => import("../pages/company/Home"))

const AdminRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path="/" element={<RootLayout />}>
       <Route index element={<DashboardPage />} />
 
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
  );
};

export default AdminRoutes;
