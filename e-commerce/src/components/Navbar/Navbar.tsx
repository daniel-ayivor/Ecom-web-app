import { useState } from "react";
import { Link } from "react-router-dom"
import SelectedCarts from "../SelectedCarts/SelectedCarts";


const Navbar = () => {
    const [showComponent, setShowComponent] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage((prevPage) => prevPage - 1);
        // Add any additional logic here, e.g., fetching new data
      }
    };
  
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
      // Add any additional logic here, e.g., fetching new data
    };

    const handleClick = () => {
        setShowComponent(!showComponent);
    };

    const handleClose = () => {
        setShowComponent(false); 
    };


  return (
    <div>
           {/* Navbar at the top */}
           <nav className="bg-gray-800 fixed top-0 w-full z-50">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>

                                <svg
                                    className="block size-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    data-slot="icon"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                    alt="Your Company"
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a href="home" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">
                                        Home
                                    </a>
                                    {/* <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                        About Us
                                    </a> */}
                                    <a href="/product" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                        Product
                                    </a>
                                    <a href="/contact" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                        Contact
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            
                        <div>
                            
    <button
        type="button"
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        onClick={handleClick}
    >
        <span className="sr-only">View notifications</span>
        <svg
            className="size-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
        </svg>
        {/** Badge showing the count */}
        {/* {cartItems.length > 0 && ( */}
            <span
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
            >
                {/* {cartItems.length} */} 0
            </span>
        {/* )} */}
    </button>

    {/* Conditionally render the component when showComponent is true */}
    {showComponent && <SelectedCarts handleClose={handleClose} />}
</div>

                            <button className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                <svg
                                    className="w-6 h-6 text-gray-400 hover:text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2m0 0L7 13h10l1.6-8H5.4M5.4 5l-1 5h14.2M16 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm-9 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"
                                    />
                                </svg>


                            </button>
                            <button className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                <svg
                                    className="w-6 h-6 text-red-300 hover:text-white "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M11.998 21.163l-1.428-1.286C5.835 15.635 3 12.874 3 9.497 3 6.989 4.86 5 7.348 5c1.553 0 3.013.763 3.894 2.03C12.64 5.763 14.1 5 15.653 5 18.141 5 20 6.989 20 9.497c0 3.377-2.835 6.138-7.57 10.38l-1.432 1.286z"
                                    />
                                </svg>


                            </button>
                            <Link to={"/signin"}>
                            <button className=" text-gray-50 text-xs"> signin</button>
                            
                            </Link>
                           
                        </div>
                    </div>
                </div>
            </nav>
    
    </div>
  )
}

export default Navbar