import { useAuthStore } from "../../store/useAuthStore";
import { motion } from "framer-motion";

export const FullScreenLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen w-screen flex flex-col items-center justify-center bg-white"
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-300 animate-spin border-t-blue-600"></div>
      </div>
      <p className="mt-4 text-gray-700 font-medium">Checking session...</p>
    </motion.div>
  );
};



export const Spinner = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-medium">
        {/* Customize your global spinner */}
        <span>Loading...</span>
      </div>
    );
  }

  return children;
};




export default function Loader() {
    return (
      <div className="flex justify-center py-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  