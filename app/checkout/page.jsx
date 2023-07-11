"use client";
import { fCurrencyTH } from "@/utils/formatNumber";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Checkout = () => {
  const { data: session } = useSession();

  //useState คือ การเก็บตัวแปรและเซ็ตตัวแปรให้ react
  const [allCart, setAllCart] = useState([]);
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");

  //สร้าง function สำหรับดึงข้อมูล
  const fecthData = async () => {
    //กำหนดเส้นทางที่จะดึงข้อมูล
    const URL = `/api/user/${session.user?.id}/cart`;

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
  const totalCost = calculateTotalCost();

  const checkout = async () => {
    try {
      const URL = `/api/checkout/${session.user?.id}`;
      const obj = [
        { id: 1, name: "product 1", qty: 3 },
        { id: 2, name: "product 2", qty: 3 },
      ];

      //data ที่จะส่งไป api
      const data = JSON.stringify({
        fullname: fullname,
        address: address,
      });
      // request api ผ่าน axios
      const checkout = await axios.post(URL, data);
      if (checkout.status === 200) {
      }
    } catch (error) {
      return { error: "error api" };
    }
  };

  const fn = ()=>{}   
  let kk
  var kkk;
  
  const [isSTep, setIsStep] = useState(2);
  const step = ["Register", "Choose plan", "Purchase", "Receive Product"];

  return (
    <div className="min-w-screen min-h-screen bg-gray-50 py-5">
      <div className="px-5">
        <ul className="steps">
          {step.map((item, index) => {
            return (

              <li
                key={index}
                className={`step ${
                  index === isSTep || index <= isSTep ? "step-primary" : ""
                }`}
              >

                {item}


              </li>
            );
          })}
        </ul>

        <div className="mb-2">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-600">
            Checkout.
          </h1>
        </div>
        <div className="mb-5 text-gray-400">
          <a
            href="#"
            className="focus:outline-none hover:underline text-gray-500"
          >
            Home
          </a>{" "}
          /{" "}
          <a
            href="#"
            className="focus:outline-none hover:underline text-gray-500"
          >
            Cart
          </a>{" "}
          / <span className="text-gray-600">Checkout</span>
        </div>
      </div>
      <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
        <div className="w-full">
          <div className="-mx-3 md:flex items-start">
            <div className="px-3 md:w-7/12 lg:pr-10">
              <div className="w-full mx-auto text-gray-800 font-light mb-6 border-b border-gray-200 pb-6">
                {allCart?.map((item, idx) => {
                  return (
                    <div key={idx} className="w-full flex items-center">
                      <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                        <Image
                          src={item.product.image}
                          width={300}
                          height={300}
                          alt={item.product_name}
                          className="w-full rounded-lg sm:w-40"
                        />
                      </div>
                      <div className="flex-grow pl-3">
                        <h6 className="font-semibold uppercase text-gray-600">
                          {item.product_name}
                        </h6>
                        <p className="text-gray-400">x {item.qty}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-600 text-xl">
                          ฿{fCurrencyTH(item.product_price * item.qty)}
                        </span>
                        <span className="font-semibold text-gray-600 text-sm">
                          .00
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                <div className="w-full flex mb-3 items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Subtotal</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold">$190.91</span>
                  </div>
                </div>
              </div> */}
              <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                <div className="w-full flex items-center">
                  <div className="flex-grow">
                    <span className="text-gray-600">Total</span>
                  </div>
                  <div className="pl-3">
                    <span className="font-semibold text-gray-400 text-sm">
                      ฿
                    </span>{" "}
                    <span className="font-semibold">
                      {fCurrencyTH(totalCost)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 md:w-5/12">
              <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                <div className="w-full p-3 border-b border-gray-200">
                  <div>
                    <div className="mb-3">
                      <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                        ชื่อ - สกุล
                      </label>
                      <div>
                        <input
                          className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder=""
                          type="text"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                        ที่อยู่จัดส่ง
                      </label>
                      <div>
                        <textarea
                          className="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder=""
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"
                  onClick={checkout}
                >
                  <i className="mdi mdi-lock-outline mr-1" /> ยืนยันสั่งซื้อ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
