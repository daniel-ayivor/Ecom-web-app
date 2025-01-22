import { useState } from 'react';
import Rating from './Rating'

const Product = () => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div>
            
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Latest Collections</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div className="group relative">
                            <img
                                src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                alt="Front of men's Basic Tee in black."
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="absolute top-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <svg
                                        className="h-6 w-6 text-gray-300 hover:text-red-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3C7.03 3 2.52 6.58 1.04 10.94a1 1 0 0 0 0 0.12C2.52 17.42 7.03 21 12 21s9.48-3.58 10.96-7.94a1 1 0 0 0 0-0.12C21.48 6.58 16.97 3 12 3zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                                        />
                                    </svg>

                                </button>
                                <button className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                                    <svg
                                        className="w-6 h-6 text-gray-300 hover:text-red-400"
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
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="/details/:id">
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            Basic Tee
                                        </a>
                                    </h3>
                                    <div className=" flex justify-between gap-x-16">
                                        <p className="mt-1 text-sm text-gray-500">Black</p>
                                        <Rating />
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-900">$35</p>
                            </div>
                        </div>

                        <div className="group relative">
                            <img
                                src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                alt="Front of men's Basic Tee in black."
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />

                            {/* Icons in the top-right corner (visible on hover) */}
                            <div className="absolute top-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {/* Love (heart) icon */}
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <svg
                                        className="h-6 w-6 text-gray-300 hover:text-red-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3C7.03 3 2.52 6.58 1.04 10.94a1 1 0 0 0 0 0.12C2.52 17.42 7.03 21 12 21s9.48-3.58 10.96-7.94a1 1 0 0 0 0-0.12C21.48 6.58 16.97 3 12 3zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                                        />
                                    </svg>

                                </button>
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
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="#">
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            Basic Tee
                                        </a>
                                    </h3>
                                    <div className=" flex justify-between gap-x-16">
                                        <p className="mt-1 text-sm text-gray-500">Black</p>
                                        <Rating />
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-900">$35</p>
                            </div>
                        </div>

                        <div className="group relative">
                            <img
                                src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                alt="Front of men's Basic Tee in black."
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />

                            {/* Icons in the top-right corner (visible on hover) */}
                            <div className="absolute top-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {/* Love (heart) icon */}
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <svg
                                        className="h-6 w-6 text-gray-300 hover:text-red-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3C7.03 3 2.52 6.58 1.04 10.94a1 1 0 0 0 0 0.12C2.52 17.42 7.03 21 12 21s9.48-3.58 10.96-7.94a1 1 0 0 0 0-0.12C21.48 6.58 16.97 3 12 3zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                                        />
                                    </svg>

                                </button>
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
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="#">
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            Basic Tee
                                        </a>
                                    </h3>
                                    <div className=" flex justify-between gap-x-16">
                                        <p className="mt-1 text-sm text-gray-500">Black</p>
                                        <Rating />
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-900">$35</p>
                            </div>
                        </div>

                        <div className="group relative">
                            <img
                                src="https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg"
                                alt="Front of men's Basic Tee in black."
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />

                            {/* Icons in the top-right corner (visible on hover) */}
                            <div className="absolute top-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {/* Love (heart) icon */}
                                <button
                                    type="button"
                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <svg
                                        className="h-6 w-6 text-gray-300 hover:text-red-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 3C7.03 3 2.52 6.58 1.04 10.94a1 1 0 0 0 0 0.12C2.52 17.42 7.03 21 12 21s9.48-3.58 10.96-7.94a1 1 0 0 0 0-0.12C21.48 6.58 16.97 3 12 3zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                                        />
                                    </svg>

                                </button>
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
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href="">
                                            <span aria-hidden="true" className="absolute inset-0"></span>
                                            Basic Tee
                                        </a>
                                    </h3>
                                    <div className=" flex justify-between gap-x-16">
                                        <p className="mt-1 text-sm text-gray-500">Black</p>
                                        <Rating />
                                    </div>
                                </div>
                                <p className="text-sm font-medium text-gray-900">$35</p>
                            </div>
                        </div>


                       



                    </div>
                </div>
            </div>

        </div>
    )
}

export default Product