import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../Dasboard/DashboardSidebar";
import { Navbar } from "../Dasboard/Navbar";
import { DataTable } from "../Dasboard/DataTable";
import { Card } from "../Dasboard/Card";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import moment from "moment";
import toast from "react-hot-toast";
import { RegisterTable } from "./RegisterTable";

export type UserType = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

const tableColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "createdAt", label: "Created At" },
    { key: "updatedAt", label: "Updated At" },
];

const Register = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [users, setUsers] = useState<UserType[]>([]);

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
            <div className="flex min-h-screen w-full">
                <DashboardSidebar />
                <div className="flex-1">
                    <Navbar />
                    <main className="container space-y-6 p-6">
                        <Card className="p-6">
                            <div className="flex justify-between">
                                <h2 className="mb-4 text-xl font-semibold">Users</h2>
                                <div className="w-screen max-w-screen-md">
                                    <form>
                                        <div className="relative mb-10 w-full flex items-center justify-between rounded-md">
                                            <svg
                                                className="absolute left-2 block h-5 w-5 text-gray-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <circle cx="11" cy="11" r="8" />
                                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                            </svg>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    name="search"
                                                    className="h-8 w-60 rounded-md border text-xs border-gray-100 bg-gray-100 py-4 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                    placeholder="Search by name, email, etc."
                                                />
                                                <div className="relative inline-block">
                                                    <div
                                                        onClick={toggleDropdown}
                                                        className="flex items-center gap-2 rounded-md border bg-gray-100 px-3 py-2 shadow-xs hover:bg-gray-200 focus:outline-none"
                                                    >
                                                        <IoFilter className="h-4 w-4" />
                                                        Filter
                                                    </div>

                                                    {isOpen && (
                                                        <div
                                                            style={{ zIndex: 9999 }}
                                                            className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-lg"
                                                        >
                                                            <ul
                                                                onClick={closeDropdown}
                                                                className="py-1 text-sm text-gray-700"
                                                            >
                                                                <li
                                                                    className="block cursor-pointer px-4 py-2 hover:bg-gray-100"
                                                                    onClick={() => console.log("Dispatched Out")}
                                                                >
                                                                    Dispatched Out
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
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <RegisterTable
                                data={users}
                                columns={tableColumns}
                                onEdit={(item) => console.log("Edit", item)}
                                onDelete={(item) => console.log("Delete", item)}
                            />
                        </Card>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default Register;
