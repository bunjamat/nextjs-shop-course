"use client";

import { fCurrencyTH } from "@/utils/formatNumber";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Cart = () => {
  //เรียกใช้งาน session user
  const { data: session } = useSession();
  //useState คือ การเก็บตัวแปรและเซ็ตตัวแปรให้ react
  const [allCart, setAllCart] = useState([]);
  console.log("🚀 ~ file: page.jsx:13 ~ Cart ~ allCart:", allCart);

  //สร้าง function สำหรับดึงข้อมูล
  const fecthData = async () => {
    //กำหนดเส้นทางที่จะดึงข้อมูล
    const URL = `/api/user/${session.user.id}/cart`;

    //ทำการดึงข้อมูลด้วยใช้ fetch
    const cart = await fetch(URL);

    //เมื่อได้ข้อมูลมาแล้วแปลงให้เป็น json
    const result = await cart.json();

    // เก็บข้อมูลไว้ใน state หรือ ตัวแปรของ react
    setAllCart(result);
  };

  useEffect(() => {
    //ถ้ามี  user login ถึงให้ดึงข้อมูล
    if (session) {
      fecthData();
    }
  }, [session]);

  const calculateTotalCost = () => {
    let totalCost = 0;

    for (const item of allCart) {
      // console.log("🚀 ~ file: page.jsx:40 ~ calculateTotalCost ~ item:", item)
      const { qty, product_price } = item;
      // console.log("🚀 ~ file: page.jsx:42 ~ calculateTotalCost ~ qyt:", qyt)
      const itemSubtotal = qty * product_price;
      totalCost += itemSubtotal;
    }
    // console.log("totalCost",totalCost);
    return totalCost;
  };

  function name(params) {}

  const totalCost = calculateTotalCost();

  return (
    <div className=" bg-gray-100 w-full">
      <h1 className="mb-10 text-center text-2xl font-bold">ตระกร้าของฉัน</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {allCart?.map((item, index) => {
            return (
              <div
                key={index}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                <Image
                  src={item.product.image}
                  width={300}
                  height={300}
                  alt={item.product_name}
                  className="w-full rounded-lg sm:w-40"
                />

                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.product_name}
                    </h2>
                    {/* <p className="mt-1 text-xs text-gray-700">36EU - 4US</p> */}
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                        {" "}
                        -{" "}
                      </span>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        defaultValue={item.qty}
                        min={1}
                      />
                      <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                        {" "}
                        +{" "}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">
                        ฿{fCurrencyTH(item.product_price)}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">$129.99</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">
                ฿{fCurrencyTH(totalCost)}
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            ชำระเงิน
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
