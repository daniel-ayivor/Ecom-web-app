import { Activity, DollarSign, Users, ArrowUpRight } from "lucide-react";

import { AreaChart } from "./AreaChart";
import { BarChart } from "./BarChart";
import { StatCard } from "./StatCard";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../Dasboard/DashboardSidebar";
import { Navbar } from "../Dasboard/Navbar";
import { Card } from "../Dasboard/Card";
import { DataTable } from "../Dasboard/DataTable";
import toast from "react-hot-toast";
import moment from "moment";
import { useEffect, useState } from "react";

import { groupBy } from "lodash";
import { RegisterTable } from "../RegisterAdmin/RegisterTable";
import { UserType } from "../RegisterAdmin/Register";
import { GiPayMoney } from "react-icons/gi";
import { RegisterIndexTable } from "../RegisterAdmin/RegisterIndex";
import { ProductTableIndex } from "../Product/ProductTableIndex";
import { ProductAttributes } from "@/Admin/Dialogs/UpdateDialog";


const areaData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 900 },
];

const barData = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 30 },
  { name: "Wed", value: 60 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 50 },
  { name: "Sat", value: 90 },
  { name: "Sun", value: 75 },
];

type DataTableProps = {
  data: any[];
  columns: { key: string; label: string }[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
};



const tableColumns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
];

const ProductColumns = [
  { key: "id", label: "ID" },
  { key: "image", label: "Image" },
  { key: "title", label: "Title" },
  { key: "price", label: "Price" },
  // { key: "text", label: "Text" },
  { key: "rating", label: "Rating" },
  { key: "category", label: "Category" },
  { key: "createdAt", label: "Create At" },
  { key: "updatedAt", label: "Updated At" },
  { key: "size", label: "Size" }
];

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const  [Submitting,setSubmitting] = useState(false)
  const [users, setUsers] = useState<UserType[]>([]);
  const [products, setProducts] = useState<ProductAttributes[]>([]);

  const FetchProduct = async () => {
    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:8000/api/all`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const result = await response.json();
    //   console.log(result, "result"); // Log the response to confirm its structure
  
      if (response.ok && result?.products) {
        const formattedProducts = result.products.map((product: ProductAttributes) => ({
            ...product, 
          
           
            createdAt: moment(product.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
            updatedAt: moment(product.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
            
          }));
          setProducts(formattedProducts); 
        //   console.log(formattedProducts, 'formatted')
          // Update the state with the formatted data
          toast.success("Products retrieved successfully!");
      } else {
        toast.error(result.message || "Failed to retrieve products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };
  

useEffect(() => {
    FetchProduct();
}, []);

  const FetchUsers = async () => {
      setSubmitting(true);
      try {
          const token = localStorage.getItem("access_token");
          console.log(token, "token")
          if (!token) {
              toast.error("No access token found. Please login again.");
              return;
          }

          const response = await fetch(`http://localhost:8000/api/user/getUsers`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
              },
          });

          if (!response.ok) {
              const errorMessage = `Error ${response.status}: ${response.statusText}`;
              toast.error(errorMessage);
              throw new Error(errorMessage);
          }

          const result = await response.json();
          console.log(result, "Fetched Users");

          if (result?.users) {
              const formattedUsers = result.users.map((user: UserType) => ({
                  ...user,
                  createdAt: moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
                  updatedAt: moment(user.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
              }));

              setUsers(formattedUsers);
          } else {
              toast.error(result.message || "Failed to retrieve users.");
          }
      } catch (error: any) {
          console.error("Error fetching users:", error);
          toast.error("An error occurred while fetching users.");
      } finally {
          setSubmitting(false);
      }
  };

useEffect(()=>{
  FetchUsers()
}, [])
// Transform data for AreaChart (e.g., Total Weight per Month)
const getMonthlyData = (data: any[]) => {
  const grouped = groupBy(data, (item) => moment(item.createdAt).format("MMM YYYY"));
  return Object.entries(grouped).map(([month, items]) => ({
    name: month,
    value: items.reduce((total, item) => total + item.weight, 0), // Sum weights
  }));
};

// Example: Fetch the monthly data
const areaChartData = getMonthlyData(users);

// Transform data for BarChart (e.g., Shipment Count per Month)
const getMonthlyCounts = (data: any[]) => {
  const grouped = groupBy(data, (item) => moment(item.createdAt).format("MMM YYYY"));
  return Object.entries(grouped).map(([month, items]) => ({
    name: month,
    value: items.length, // Count items per month
  }));
};

// Example: Fetch the monthly counts
const barChartData = getMonthlyCounts(users);


const [registeredUsersCount, setRegisteredUsersCount] = useState(0);
const [previousUsersCount, setPreviousUsersCount] = useState(0);

const [trackingDataCount, setTrackingDataCount] = useState(0);
const [previousTrackingDataCount, setPreviousTrackingDataCount] = useState(0);

const [userPercentageChange, setUserPercentageChange] = useState(0);
const [trackingPercentageChange, setTrackingPercentageChange] = useState(0);


// Calculate Percentage Changes
useEffect(() => {
  if (previousUsersCount > 0) {
    setUserPercentageChange(
      ((registeredUsersCount - previousUsersCount) / previousUsersCount) * 100
    );
  }
  if (previousTrackingDataCount > 0) {
    setTrackingPercentageChange(
      ((trackingDataCount - previousTrackingDataCount) / previousTrackingDataCount) * 100
    );
  }
}, [registeredUsersCount, previousUsersCount, trackingDataCount, previousTrackingDataCount]);


// Pass the transformed data to your charts
  return (
    <SidebarProvider>
<>
<div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <Navbar />
          <main className="container space-y-6 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  <StatCard
    title="Total Revenue"
    value={products.length}
    change="+20.1%"
    icon={<DollarSign className="h-4 w-4" />}
  />
  <StatCard
    title="Registered Users"
    value={users.length}
    change={`${userPercentageChange > 0 ? "+" : ""}${userPercentageChange.toFixed(1)}%`}
    icon={<Users className="h-4 w-4" />}
  />
  <StatCard
    title="Orders Data"
    value={trackingDataCount.toString()}
    change={`${trackingPercentageChange > 0 ? "+" : ""}${trackingPercentageChange.toFixed(1)}%`}
    icon={<Activity className="h-4 w-4" />}
  />
  <StatCard
    title="Payment Rate"
    value="2.3%"
    change="+4.1%"
    icon={<GiPayMoney className="h-4 w-4" />}
  />
</div>

           
          <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Recent Users</h2>
            
                <RegisterIndexTable
                  data={users}
                  columns={tableColumns}
                  onEdit={(item) => console.log("Edit", item)}
                  onDelete={(item) => console.log("Delete", item)}
                />
              </Card>
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold">Recent Product</h2>
            
                <ProductTableIndex
                  data={products}
                  columns={ProductColumns}
                  onEdit={(item) => console.log("Edit", item)}
                  onDelete={(item) => console.log("Delete", item)}
                />
              </Card>
        <div className="grid gap-6 md:grid-cols-2">
        <AreaChart data={areaChartData} title="Registered Users" />
                <BarChart data={barChartData} title="Products Purschaseed" />
        </div>           
          </main>
        </div>
      </div>
</>
    </SidebarProvider>
  );
};

export default Index;