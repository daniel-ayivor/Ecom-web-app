
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Category = () => {
  const items = [
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-01.jpg",
      alt: "Black Basic Tee",
      category:"Men"
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-02.jpg",
      alt: "White Crew Neck Tee",
      category:"Men"
    },


      {
        src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg",
        alt: "Blue Denim Jacket",
        category:"Kids"
      },
      {
        src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-01-related-product-03.jpg",
        alt: "Blue Denim Jacket",
        category:"Kids"
      },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
        appendDots: (dots: React.ReactNode) => (
      <div className="absolute right-0 top-1/2 -translate-y-1/2">{dots}</div>
    ),
    customPaging: (i: number) => (
      <div className="w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-500"></div>
    ),

    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-lg h-[30vh] mx-auto">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="flex items-center mt-32 justify-center">
            <img
              alt={item?.alt}
              src={item?.src}
              className="size-16 rounded-full bg-gray-200 object-cover"
            />
            <p className=" py-2 justify-center ml-4 text-xs">{item?.category}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Category;
