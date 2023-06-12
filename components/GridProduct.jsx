"use client";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const data = [
  {
    name: "dddddd111",
    price: 19999,
    stock: 100,
    image: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    active: true,
  },
];

export default function GridProduct({ selected }) {
  //useState คือ การเก็บตัวแปรและเซ็ตตัวแปรให้ react
  const [allProduct, setAllProduct] = useState([]);

  //สร้าง function สำหรับดึงข้อมูล
  const fecthData = async () => {
    //กำหนดเส้นทางที่จะดึงข้อมูล
    const URL = "/api/product/";

    //ทำการดึงข้อมูลด้วยใช้ fetch
    const products = await fetch(URL);

    //เมื่อได้ข้อมูลมาแล้วแปลงให้เป็น json
    const result = await products.json();

    // เก็บข้อมูลไว้ใน state หรือ ตัวแปรของ react
    setAllProduct(result);
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-6 py-4">
      {/* แสดงข้อมูล */}
      {allProduct?.map((item, index) => {
        return <ProductItem key={index} product={item} />;
      })}
    </div>
  );
}
