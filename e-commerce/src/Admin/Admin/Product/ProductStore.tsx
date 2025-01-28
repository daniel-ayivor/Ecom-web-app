import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../Dasboard/DashboardSidebar"
import { Navbar } from "../Dasboard/Navbar"
import { DataTable } from "../Dasboard/DataTable"
import { Card } from "../Dasboard/Card"
import { useEffect, useState } from "react"
import { IoFilter } from "react-icons/io5";

import toast from "react-hot-toast"
import moment from "moment"
import { ProductAttributes, ProductDialog } from "@/Admin/Dialogs/ProductDialog"
type DataTableProps = {
    data: any[];
    columns: { key: string; label: string }[];
    onEdit: (item: any) => void;
    onDelete: (item: any) => void;
};


const tableColumns = [
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

const ProductStore = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [Submitting, setSubmitting] = useState(false)

    const [products, setProducts] = useState<ProductAttributes[]>([]);
    const [editingProduct, setEditingProduct] = useState<ProductAttributes | null>(null);

    // Handle Delete Package
    const deletePackage = async (id: number) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                toast.error("No access token found. Please login again.");
                return;
            }

            const response = await fetch(`http://localhost:5000/track/shipments/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success("Product deleted successfully!");
                setProducts((prev) => prev.filter((product) => product.id !== id));
            } else {
                const result = await response.json();
                toast.error(result.message || "Failed to delete product.");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };
    // console.log(products, 'productssss')

    // Handle Update Package
    const updatePackage = async (updatedProduct: ProductAttributes) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                toast.error("No access token found. Please login again.");
                return;
            }

            const response = await fetch(
                `http://localhost:5000/track/shipments/${updatedProduct.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedProduct),
                }
            );

            const result = await response.json();
            if (response.ok) {
                toast.success("Product updated successfully!");
                setProducts((prev) =>
                    prev.map((product) =>
                        product.id === updatedProduct.id ? { ...product, ...updatedProduct } : product
                    )
                );
                setEditingProduct(null); // Close the editing form
            } else {
                toast.error(result.message || "Failed to update product.");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };


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
                                                    <input type="name" name="search" className="h-8 w-40 cursor-text rounded-md border text-xs border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Search by name, type, manufacturer, etc" />
                                                    {/* <button className="rounded-lg text-xs bg-blue-600 px-8 py-1 font-medium text-white outline-none hover:opacity-80 focus:ring">Search</button> */}
                                                    <ProductDialog />
                                                    <div className="relative inline-block">
                                                        {/* Filter Icon Button */}
                                                        <div
                                                            onClick={toggleDropdown}
                                                            className="flex items-center text-xs gap-2 rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-xs hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                        >
                                                            <IoFilter className="h-4 w-4" />
                                                            {/* Filter */}
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
                                                                        Being Brought In by ddd
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



                                <DataTable
                                
                                    data={products}
                                    columns={tableColumns}
                                    onEdit={(item) => setEditingProduct(item)}
                                    onDelete={(item) => deletePackage(item)}
                                />
                            </Card>

                        </main>
                    </div>
                </div>



            </>

        </SidebarProvider>
    )
}

export default ProductStore