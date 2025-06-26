import {  Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {  Suspense} from 'react';
import Spinner from '../../components/ui/Spinner';

//const CreateAccount  = lazy(() => import("../pages/auth/CreateAccount"));



function UserRoutes() {

  return (
  <>    
    
      <div className="min-h-screen bg-[#f9f9f9]">
     <Suspense fallback={<Spinner />}>
         <Routes >
     {/* <Route path="/settings" element={<UserSettings />} />
            <Route path="/profile" element={<UserProfile />} /> */}
        
        </Routes>
     </Suspense>
    
      </div>
    </>

  );  
};


export default UserRoutes;