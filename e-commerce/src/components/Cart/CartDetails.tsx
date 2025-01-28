import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { ProductAttributes, productResponse } from "@/Admin/Dialogs/ProductDialog";
import Rating from "../Product/Rating";
import { useCart } from "../contexts/CartContext";
import toast from "react-hot-toast";

const CartDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductAttributes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 const {addItem} = useCart()
   

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/${id}`);
        if (!response.ok) {
          setError(`Error: ${response.status} ${response.statusText}`);
          throw new Error(`Failed to fetch product.`);
        }
        const data: productResponse = await response.json();
  
        setProduct(data.product);
      } catch (error) {
        setError("Error fetching product.");
        console.log("Error fetching data: ", error);  
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = (product: ProductAttributes) => {
    addItem({
      id: product.id,
      name: product.title,
      quantity: 1,
      image:product.image,
      price:product.price
    });
    toast.success(`${product.title} added to cart`);
  };

  return (
    <>
   
   <Navbar />
   <div className=" mt-20 flex flex-col">
   <div className="  flex-grow" role="dialog" aria-modal="true">
   <div className="" role="dialog" aria-modal="true">
   <div className=" ">
     <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
 
       <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
         <div className=" flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14  sm:px-6 sm:pt-8 md:p-6 lg:p-8">
     
           <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
             <img  src={`http://localhost:8000/${product.image}`|| "/fallback-image.jpg"} alt="Two each of gray, white, and black shirts arranged on table." className="aspect-[2/3] w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"/>
             <div className="sm:col-span-8 lg:col-span-7">
               <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product?.title}</h2>
               <p className="">Men's running shoes in sizes 8-12, designed for a comfortable and supportive fit, perfect for active lifestyles</p>
               <p className="">{product?.text}</p>
               <section aria-labelledby="information-heading" className="mt-2">
                 <h3 id="information-heading" className="sr-only">Product information</h3>
                 <p className="text-xl text-gray-700">${product?.price}</p>
                 <div className="mt-6">
                   <h4 className="sr-only">Reviews</h4>
                   <div className="flex items-center">
                     <div className="flex items-center">
                     <Rating />
                     </div>
                     <p className="sr-only">3.9 out of {product?.rating} stars</p>
                     <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">({product?.rating})</a>
                   </div>
                 </div>
               </section>
               <section aria-labelledby="options-heading" className="mt-10">
                 <h3 id="options-heading" className="sr-only">Product options</h3>
                 <form>
              
                   {/* <fieldset aria-label="Choose a color">
                     <legend className="text-sm font-medium text-gray-900">Color</legend>
                     <div className="mt-4 flex items-center gap-x-3">
          
                       <label aria-label="White" className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                         <input type="radio" name="color-choice" value="White" className="sr-only"/>
                         <span aria-hidden="true" className="size-8 rounded-full border border-black/10 bg-white"></span>
                       </label>
                  
                       <label aria-label="Gray" className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                         <input type="radio" name="color-choice" value="Gray" className="sr-only"/>
                         <span aria-hidden="true" className="size-8 rounded-full border border-black/10 bg-gray-200"></span>
                       </label>
              
                       <label aria-label="Black" className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-900 focus:outline-none">
                         <input type="radio" name="color-choice" value="Black" className="sr-only"/>
                         <span aria-hidden="true" className="size-8 rounded-full border border-black/10 bg-gray-900"></span>
                       </label>
                     </div>
                   </fieldset> */}

                   
       
                   <fieldset className="mt-10" aria-label="Choose a size">
                     <div className="flex items-center justify-between">
                       <div className="text-sm font-medium text-gray-900">Size</div>
                       <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                     </div>
                     <div className="mt-4 grid grid-cols-4 gap-4">
                
                    
                    
                     <div className="absolute top-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <a className="">                          
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
                                </a>

                                <button
                               
                                 className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
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

                    
                  
                       <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1">
                         <input type="radio" name="size-choice" value="XL" className="sr-only"/>
                         <span>{product.size}</span>
                   
                         <span className="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                       </label>
              
                     
           
                    
                     </div>
                   </fieldset>
                   <button onClick={()=> handleAddToCart(product)} type="button" className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add to cart</button>
                 </form>
               </section>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
   </div>
    
</div>
<Footer/>
</>
  );
};

export default CartDetails;
