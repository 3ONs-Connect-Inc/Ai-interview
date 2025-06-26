import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import Button from "../ui/Button";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md">
        <div className="flex flex-col items-center mb-6">
          <ShieldAlert className="h-12 w-12 text-red-500 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
          <p className="text-gray-600 mt-2">
            You do not have permission to view this page.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link to="/">
            <Button label="Go to Home"
            className="w-full bg-primary text-white hover:bg-primary/90"/>
          
         
          </Link>
          <Link to="/sign-in">
            <Button label=" Sign In with a different account"
             variant="outline" 
             className="w-full"/>
             
           
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
