import {
  CreditCard,
  DollarSign,
  Package,
  Users,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {  useEffect } from "react";
import Card from "../../components/ui/Card";



const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openFromSidebar) {
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.state, navigate]);

 
  return (
    <div className="flex flex-col gap-y-4 ">
      <h1 className="title">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[
          {
            icon: <Package size={26} />,
            title: "Total Events",
           // value: totalEvents.toLocaleString(),
          },
          {
            icon: <DollarSign size={26} />,
            title: "Total Bookings",
           // value: totalBookings.toLocaleString(),
          },
          {
            icon: <Users size={26} />,
            title: "Total Users",
           // value: totalUsers.toLocaleString(),
          },
          {
            icon: <CreditCard size={26} />,
            title: "Total Demo Request",
          // value: totalDemoRequest.toLocaleString(),
          },
        ].map(({ icon, title, //value 

        }, i) => (
          <Card
           key={i}
           title={title}
              icon={icon}
           className="text-slate-900 dark:bg-slate-950"
         // subtitle={value}
       
        >
          
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
