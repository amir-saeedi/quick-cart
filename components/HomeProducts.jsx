import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";

const HomeProducts = () => {
  const { products, router } = useAppContext();

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
        {products?.length === 0 &&
          Array.from({ length: 10 }, (v, i) => (
            <div className="flex flex-col gap-0.5">
              <div className="h-52 rounded-lg w-[200px] skeleton-animation-content"></div>
              <div className="h-4 rounded-lg w-[200px] skeleton-animation-content"></div>
              <div className="h-4 rounded-lg w-[200px] skeleton-animation-content"></div>
              <div className="h-4 rounded-lg w-[200px] skeleton-animation-content"></div>
              <div className="h-7 rounded-lg w-[200px] skeleton-animation-content"></div>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          router.push("/all-products");
        }}
        className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
      >
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
