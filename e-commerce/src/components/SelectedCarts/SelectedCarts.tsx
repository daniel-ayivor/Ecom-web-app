import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { CiCircleMinus } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
}

interface SelectedCartsProps {
  handleClose: () => void;
}

const SelectedCarts = ({ handleClose }: SelectedCartsProps) => {
  const { inventory, increaseItem, decreaseItem, removeItem, getTotal } = useCart();

  return (
    <div>
      <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                        Shopping Cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          onClick={handleClose}
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {inventory.length > 0 ? (
                      <div className="mt-8">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {inventory.map((item) => (
                            <li key={item.id} className="flex py-6">
                              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.image ? `http://localhost:8000/${item.image}` : "/fallback-image.jpg"}
                                  alt={item.name || "Product Image"}
                                  className="h-full w-full object-cover"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{item.name}</h3>
                                  <p className="ml-4">${item.price}.00</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => decreaseItem(item.id)}
                                      className="text-gray-600 hover:bg-gray-200 p-2 rounded-l-md transition"
                                    >
                                      <CiCircleMinus />
                                    </button>
                                    <span className="px-4 bg-gray-100">{item.quantity}</span>
                                    <button
                                      onClick={() => increaseItem(item.id)}
                                      className="text-gray-600 hover:bg-gray-200 p-2 rounded-r-md transition"
                                    >
                                      <IoIosAddCircleOutline />
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700 font-medium"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-gray-500 mt-6 text-center">Your cart is empty.</p>
                    )}
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${getTotal().toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <Link
                        to="/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={handleClose}
                        >
                          Continue Shopping <span aria-hidden="true">→</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedCarts;
