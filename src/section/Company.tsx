import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../pages/company/Layout";
import NotFound from "../pages/NotFound";
import Spinner from "../components/ui/Spinner";


const DashboardPage = lazy(() => import("../pages/company/Home"));
const AddQuestions = lazy(()=> import ("../components/company/forms/AddQuestions"));
const QuestionsTable = lazy (()=> import("../components/company/tables/QuestionsTable"));

const CompanyRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
    <Routes>
      <Route path="/" element={<RootLayout />}>
       <Route index element={<DashboardPage />} />
        <Route path="add-interview-question" element={<AddQuestions />} />
          <Route path="view-interview-question" element={<QuestionsTable />} /> 

      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
  );
};

export default CompanyRoutes;
