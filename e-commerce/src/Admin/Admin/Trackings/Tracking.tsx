import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../Dasboard/DashboardSidebar"
import { Navbar } from "../Dasboard/Navbar"
import { DataTable } from "../Dasboard/DataTable"
import { Card } from "../Dasboard/Card"
import { useEffect, useState } from "react"
import { IoFilter } from "react-icons/io5";

import toast from "react-hot-toast"
import moment from "moment"
type DataTableProps = {
    data: any[];
    columns: { key: string; label: string }[];
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
};

type PackageType = {
    weight: number;
    id: number;
    username: string;
    email: string;
    contact: string;
    packageName: string;
    packageTypes: string; // If this should allow empty strings, keep it as a string type.
    dimensions: string;
    shipmentStatus: string;
    trackingCode: string;
    createdAt: string; // Consider using Date if you plan to work with date objects.
    updatedAt: string; // Similarly, use Date if you need date manipulation.
  };

  const tableColumns = [
    { key: "id", label: "ID" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "packageName", label: "Package Name" },
    { key: "trackingCode", label: "Tracking Code" },
    { key: "dimensions", label: "Dimensions" },
    { key: "weight", label: "Weight (kg)" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
    { key: "shipmentStatus", label: "Status" },
  ];
  
const Tracking = () => {
    const [isOpen, setIsOpen] = useState(false);
    const  [Submitting,setSubmitting] = useState(false)
   
    const [Package, setPackage] = useState<PackageType[]>([]); 
    
    const FetchUsers = async () => {
        setSubmitting(true); 
        try {
            const token = localStorage.getItem("access_token");
            console.log(token, "token package");
            
    
            if (!token) {
                toast.error("No access token found. Please login again.");
                return;
            }
    
            const response = await fetch(`http://localhost:5000/track/shipments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            const result = await response.json();
            console.log(result, "result");
    
            if (response.ok) {
                toast.success("Users retrieved successfully!");
                const formattedUsers = result.shipments.map((packages: PackageType) => ({
                    ...packages,
                    createdAt: moment(packages.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
                    updatedAt: moment(packages.updatedAt).format("MMMM Do YYYY, h:mm:ss a"),
                }));
    
                setPackage(formattedUsers);
            } else {
                toast.error(result.message || "Users retrieving failed. Please try again.");
            }
        } catch (error: any) {
            console.error("Error during users retrieving:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setSubmitting(false); 
        }
    };
    
    useEffect(() => {
        FetchUsers();
    }, []); 

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };
    return (
        <SidebarProvider>
            <>
                <div className="flex min-h-screen w-full">
                    <DashboardSidebar />
                    <div className="flex-1">
                        <Navbar />
                        <main className="container space-y-6 p-6">


                            <Card className="p-6">
                                <div className=" flex justify-between">
                                    <h2 className="mb-4 text-lg font-semibold">Recent Users</h2>
                                    <div className=" w-screen max-w-screen-md">



                                        <form className="">
                                            <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                                                {/* icon */}
                                                <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                    <circle cx="11" cy="11" r="8" className=""></circle>
                                                    <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
                                                </svg>
                                                <div className=" flex gap-2">
                                                    <input type="name" name="search" className="h-8 w-100 cursor-text rounded-md border text-xs border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Search by name, type, manufacturer, etc" />
                                                    <button className="rounded-lg text-xs bg-blue-600 px-8 py-1 font-medium text-white outline-none hover:opacity-80 focus:ring">Search</button>
                                                </div>

                                                <div className="relative inline-block">
                                                    {/* Filter Icon Button */}
                                                    <div
                                                        onClick={toggleDropdown}
                                                        className="flex items-center text-xs gap-2 rounded-md border border-gray-300 bg-gray-100 px-3 py-1 shadow-xs hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                    >
                                                        <IoFilter className="h-4 w-4" />
                                                        Filter
                                                    </div>

                                                    {/* Dropdown Menu */}
                                                    {isOpen && (
                                                        <div style={{ zIndex: 9999 }} className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg">
                                                            <ul
                                                                onClick={() => {
                                                                    console.log("Dispatched Out");
                                                                    closeDropdown();
                                                                }}
                                                                className="py-1 text-sm text-gray-700">
                                                                <li
                                                                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                                    onClick={() => console.log("Dispached Out")}
                                                                >
                                                                    Dispached Out
                                                                </li>
                                                                <li
                                                                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                                    onClick={() => console.log("In Warehouse")}
                                                                >
                                                                    In Warehouse
                                                                </li>
                                                                <li
                                                                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                                    onClick={() => console.log("Being Brought In")}
                                                                >
                                                                    Being Brought In
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>



                                <DataTable
                                    data={Package}
                                    columns={tableColumns}
                                    onEdit={(item) => console.log("Edit", item)}
                                    onDelete={(item) => console.log("Delete", item)}
                                />
                            </Card>

                        </main>
                    </div>
                </div>



            </>

        </SidebarProvider>
    )
}

export default Tracking