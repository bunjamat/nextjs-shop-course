"use client";
import React from "react";
import ProductItem from "./ProductItem";

const data = [{
    "name" : "iPhone 1ๅ",
    "price" :19999,
    "stock" : 100,
    "image" : "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    "active" : true
}]

export default function GridProduct({ selected }) {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-6 py-4">
      {data?.map((item, index) => {
        return <ProductItem key={index} product={item} />;
      })}
    </div>
  );
}
