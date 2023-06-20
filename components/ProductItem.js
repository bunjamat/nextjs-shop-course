"use client";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { fCurrencyTH } from "@/utils/formatNumber";

function ProductItem({ product }) {
  // const location = useSelector((state) => state.location);
  return (
    <div
      key={product.id}
      className="relative max-w-sm h-full bg-white shadow-lg rounded-2xl  cursor-pointer"
    >
      <Link
        href={{
          pathname: `/product/${product.id}`,

        }}
      >
        <div className="overflow-x-hidden  relative ">
          <Image
            src={
              product.image === null
                ? "/images/placeholder_view.png"
                : product.image
            }
            onError={(e) => {
              e.target.src = "/images/placeholder_view.png";
            }}
            alt={product.name}
            layout="responsive"
            width={320}
            height={320}
            priority
            className="h-full w-full rounded-t-2xl object-cover object-center"
          />
        </div>
        <div className="p-2">
          <p className="text-base break-words  leading-snug line-clamp-2 h-12 font-semibold text-gray-700 mb-0">
            {product.name}
          </p>
          <div className=" pl-2  flex justify-end">
            <div>
              {product?.product_sale_price > 0 ? (
                <div className=" flex space-x-1 items-baseline">
                  <span className="text-xs line-through text-gray-400">
                    {fCurrencyTH(product.price)}
                  </span>
                  <span className="font-bold text-xl text-primary">
                    <span className="">฿</span>
                    {fCurrencyTH(product.product_sale_price)}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-xl text-primary">
                  <span className="">฿</span>
                  {fCurrencyTH(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
