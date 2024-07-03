// -------- Our Customers Section ------------------------
const OurCustomers = () => {
  return (
    <>
      <div className="sm:ml-20 m-auto w-5/6 font-['Open_Sans'] lg:mr-40">
        <div className="flex flex-col gap-3 mb-6">
          <p className="text-[#C76001] font-['Odor_Mean_Chey'] font-bold text-xl">
            Our Customers
          </p>
          <p className="text-[#218225] text-2xl font-bold">
            Don’t just take our words
          </p>
        </div>
{/* Customers Reviews */}
        <div className="flex flex-col lg:flex-row gap-8">
          {OurCustomersContent.map((content, index) => {
            const { name, img, review, rating } = content;
            return (
              <Customer
                key={index}
                name={name}
                img={img}
                review={review}
                rating={rating}
              />
            );
          })}
        </div>
        <p className="text-[#1A78C2] text-xs mt-8">
          Check out all 12334 customer reviews
        </p>
      </div>
    </>
  );
};

// Customer review Box
const Customer = (props) => {
  const { img, rating, review, name } = props;
  return (
    <div className="flex flex-row gap-8 relative">
    {/* Customer Picture */}
      <img
        src={img}
        alt=""
        className="h-80 min-[425px]:h-72 min-[502px]:h-52 sm:h-56 lg:h-[310px] w-40 object-cover rounded-md"
      />
      {/* Review */}
      <div className="flex flex-col gap-7 h-auto">
        <img src={rating} alt="" className="w-20" />
        <p className="text-xs sm:text-sm lg:text-base sm:mr-40 md:mr-36 lg:mr-8 min-[1170px]:mt-5 leading-5">
          {review}
        </p>
        <p className="text-sm font-bold absolute bottom-2">{name}</p>
      </div>
    </div>
  );
};

// ------------- Customers Content ---------------------
const OurCustomersContent = [
  {
    name: "Jenny Wilson",
    img: "./images/jenny.png",
    rating: "./images/reviewrating.svg",
    review: `"The quality of the produce is outstanding, everything arrives fresh and in great condition. I love that I can support local farmers while enjoying high-quality products at reasonable prices."`,
  },
  {
    name: "Devon Lane",
    img: "./images/devon.png",
    rating: "./images/reviewrating.svg",
    review: `"I recently tried out this website for the first time and I was blown away by the variety of products available. I was able to find all of my favorite fruits and vegetables, as well as some unique and hard-to-find items.`,
  },
];
export { OurCustomers, OurCustomersContent };
