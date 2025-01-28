import { BASE_URL } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Category, Rating, Size } from "@/types/productTypes"; // Ensure enums are correctly defined
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GiArchiveRegister } from "react-icons/gi";

export interface ProductAttributes {
    id: number;
    image: string;
    title: string;
    price: number;
    text?: string;
    rating: Rating;
    category: Category;
    size: Size;
    createdAt: string;
    updatedAt: string;
}

export interface productResponse{
    product: ProductAttributes,
    message: string
}
export function ProductDialog() {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductAttributes>();
    const [isSubmitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string>();
    const [imageData, setImageData] = useState<any>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
            const fileName = file.name.toLowerCase();
            if (!validExtensions.some(ext => fileName.endsWith(ext))) {
                toast.error("Only .jpg, .jpeg, .png, .gif, or .webp files are allowed.");
                return;
            }

            // Log file details
            console.log("Selected File Details:", {
                name: file.name,
                size: `${(file.size / 1024).toFixed(2)} KB`,
                type: file.type,
            });

            // Create a preview URL
            const fileUrl = URL.createObjectURL(file);
            setImagePreview(fileUrl);
            setImageData(file);
        }
    };

    const onSubmit: SubmitHandler<ProductAttributes> = async (data) => {
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("price", data.price.toString());
            formData.append("rating", data.rating);
            formData.append("category", data.category);
            formData.append("text", data.text || "");
            formData.append("size", data.size);
            if (imageData) {
                formData.append("image", imageData); // Attach the selected image file
            } else {
                toast.error("Please select an image.");
                return;
            }

            const response = await fetch("http://localhost:8000/api/product/create", {
                method: "POST",
                body: formData, // Send FormData directly
            });

            const result = await response.json();
            console.log("Result:", result);
            if (response.ok) {
                toast.success("Product created successfully!");
            } else {
                toast.error(result.message || "Failed to create product. Please try again.");
            }
        } catch (error) {
            console.error("Error during product creation:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    const submitButtonClasses = `mt-4 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:opacity-90 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className=" border-none" variant="outline">
                    <GiArchiveRegister className="" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-4">
                <DialogHeader>
                    <DialogTitle className="text-center text-neutral-600 text-sm">Add Product</DialogTitle>
                </DialogHeader>
                <div className="m-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <h1 className="mb-4 text-lg font-semibold text-neutral-800">Product Details</h1>

                        <div className="flex justify-between w-full gap-4">
                            <div className="w-full">
                                <label
                                    htmlFor="uploadFile1"
                                    className="bg-gray-100 text-gray-500 font-semibold text-base rounded max-w-md h-20 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-11 mb-2 fill-gray-500"
                                        viewBox="0 0 32 32"
                                    >
                                        <path
                                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                        />
                                        <path
                                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                        />
                                    </svg>
                                    {!imagePreview && (
                                        <span>Upload File</span>
                                    )}

                                    <input
                                        type="file"
                                        id="uploadFile1"
                                        name="image"
                                        accept=".jpg,.jpeg,.png,.gif,.webp"
                                        onChange={handleImageChange}
                                        className="hidden "
                                    />

                                    {/* Render the preview if an image is selected */}
                                    {imagePreview && (
                                        <div className="mt-0">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-20 p-2 h-20 object-cover rounded"
                                            />
                                        </div>
                                    )}

                                    {/* Render the <p> tag only if no image is selected */}
                                    {!imagePreview && (
                                        <p className="text-xs font-medium text-gray-400 mt-2">
                                            PNG, JPG, SVG, WEBP, and GIF are allowed.
                                        </p>
                                    )}
                                </label>

                                {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image.message}</p>}
                            </div>

                            {/* Product Title */}
                            <div className="w-full">
                                <label className="text-sm text-neutral-700">Product Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter product title"
                                    {...register("title", { required: "Title is required" })}
                                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                                />
                                {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                            </div>
                        </div>

                        <div className="flex justify-between w-full gap-4">
                            {/* Price */}
                            <div className="w-full">
                                <label className="text-sm text-neutral-700">Price</label>
                                <input
                                    type="text"
                                    placeholder="Enter product price"
                                    {...register("price", { required: "Price is required", min: 0 })}
                                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                                />
                                {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
                            </div>

                            {/* Rating */}
                            <div className="w-full">
                                <label className="text-sm text-neutral-700">Rating</label>
                                <select
                                    {...register("rating", { required: "Rating is required" })}
                                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                                >
                                    {Object.values(Rating).map((rate) => (
                                        <option key={rate} value={rate}>
                                            {rate}
                                        </option>
                                    ))}
                                </select>
                                {errors.rating && <p className="text-red-500 text-xs">{errors.rating.message}</p>}
                            </div>
                        </div>

                        <div className="flex justify-between w-full gap-4">
                            <div className=" w-full">
                                <label className="text-sm text-neutral-700">Category</label>
                                <select
                                    {...register("category", { required: "Category is required" })}
                                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                                >
                                    {Object.values(Category).map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
                            </div>

                            <div className=" w-full">
                                <label className="text-sm text-neutral-700">Size</label>
                                <select
                                    {...register("size", { required: "Size is required" })}
                                    className="mt-2 h-10 w-full rounded-md bg-gray-100 px-3 text-xs"
                                >
                                    {Object.values(Size).map((sz) => (
                                        <option key={sz} value={sz}>
                                            {sz}
                                        </option>
                                    ))}
                                </select>
                                {errors.size && <p className="text-red-500 text-xs">{errors.size.message}</p>}
                            </div>

                        </div>
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={submitButtonClasses}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Add Product"}
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
