// ------------Our Products Section ---------------------
const OurProducts = () => {
  return (
    <>
      <div className="mt-10 sm:ml-[65px] w-2/3 sm:w-1/2 m-auto mb-5">
        <p className="text-[#C76001] text-lg font-['Odor_Mean_Chey'] font-bold text-center sm:text-left">
          Our Products
        </p>
        <p className="text-[#2A303E] text-xs font-['Open_Sans'] text-center sm:text-left">
          Discover all categories of our farm-to-table pricing and order fresh
          produce delivered straight to your doorstep, or visit us at the farm
          for a closer look at our sustainable farming practices.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-5 sm:ml-16 mb-20 w-5/6 m-auto">
        {/* Our Products including the food items */}
        {ProductList.map((product, index) => {
          const { img, name, description, price, rating } = product;
          return (
            <Product
              key={index}
              img={img}
              name={name}
              description={description}
              price={price}
              rating={rating}
            />
          );
        })}
      </div>
    </>
  );
};

// ------------- Our Product Box ------------------
const Product = (props) => {
  const { img, name, description, price, rating } = props;
  return (
    <>
      <div
        className="flex flex-col bg-[#ffffff] w-5/6 sm:w-[30%] h-[28rem] m-auto sm:m-0 rounded-b-2xl relative"
        style={{ boxShadow: "14px 22px 52px -12px rgba(127, 127, 127, 0.1)" }}
      >
        {/* Image */}
        <img src={img} alt="" className="h-1/2 rounded-t-2xl object-cover" />
        <div className="flex flex-col gap-3 mt-5 px-3 font-['Open_Sans']">
          <div className="flex flex-row justify-between">
            {/* Name */}
            <p className="text-[#2A303E] font-['Odor_Mean_Chey'] text-3xl sm:text-xl md:text-3xl font-bold">
              {name}
            </p>
            {/* Rating */}
            <img src={rating} alt="" className="w-20 sm:w-16 md:w-20" />
          </div>
          {/* Description */}
          <p className="text-[#575E6F] text-xs">
            Description:
            <span className="font-semibold text-[#191819]"> {description}</span>
          </p>
          {/* Price */}
          <p className="text-[#575E6F] text-xs align-middle">
            Price:
            <span className="font-semibold text-[#C89200] text-xl sm:text-sm md:text-xl align-middle">
              {" "}
              {price}
            </span>
          </p>
          <button className="bg-[#218225] h-10 w-11/12 self-center m-auto mt-5 rounded-md text-[#FFFFFF] text-sm absolute bottom-4">
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

// ---------- Product Contents ------------------------------
const ProductList = [
  {
    img: "./images/egg.png",
    name: "Eggs",
    description: "Nigeria, Edible Natural color,...",
    price: "#1,200/Crate",
    rating: "./images/rating.svg",
  },
  {
    img: "./images/beans.png",
    name: "Beans",
    description: "Nigeria, Dried, Natural color",
    price: "#900/Cup",
    rating: "./images/rating.svg",
  },
  {
    img: "./images/flower.png",
    name: "Flower",
    description: "Nigeria, Fresh, Natural color,...",
    price: "#5,000/package",
    rating: "./images/rating.svg",
  },
  {
    img: "./images/garri.png",
    name: "Garri",
    description: "Nigeria, Natural color, Grade A",
    price: "Price: #900/Cup",
    rating: "./images/rating.svg",
  },
  {
    img: "./images/herbs.png",
    name: "Herbs",
    description: "Africa, Organic fresh mixed herbs",
    price: "#5,000/package",
    rating: "./images/rating.svg",
  },
  {
    img: "./images/carrot.png",
    name: "Carrot",
    description: "Nigeria, Fresh Raw carrot fruit,...",
    price: "#5,000/package",
    rating: "./images/rating.svg",
  },
  {
    img: "./images/hibiscus.png",
    name: "Hibiscus",
    description: "Nigeria, Dried raw hibiscus...",
    price: "Price: #1,200/bag",
    rating: "./images/rating.svg",
  },
  {
    img: "./images/sesame.png",
    name: "Sesame",
    description: "Free from damages with natural...",
    price: "Price: #1,500/Cup",
    rating: "./images/rating.svg",
  },
  {
    img: "./images/ginger.png",
    name: "Ginger",
    description: "Description: Fresh dried whole ginger root,...",
    price: "#5,000/package",
    rating: "./images/rating.svg",
  },
];

export { OurProducts, Product, ProductList };
