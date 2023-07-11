"use client";
import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import GridProduct from "./GridProduct";

function TabsMenu() {
  //useState คือ การเก็บตัวแปรและเซ็ตตัวแปรให้ react
  const [allCategory, setAllCategory] = useState([]);
  const [selected, setSelected] = useState(8);

  //สร้าง function สำหรับดึงข้อมูล
  const fecthCategory = async () => {
    //กำหนดเส้นทางที่จะดึงข้อมูล
    const URL = "/api/category/";

    //ทำการดึงข้อมูลด้วยใช้ fetch
    const category = await fetch(URL);

    //เมื่อได้ข้อมูลมาแล้วแปลงให้เป็น json
    const result = await category.json();

    // เก็บข้อมูลไว้ใน state หรือ ตัวแปรของ react
    setAllCategory(result);
  };

  useEffect(() => {
    fecthCategory();
  }, []);
  if (allCategory.length === 0) return <>loading</>;

  return (
    <div className="container relative p-4">
      <div className="w-full " id="category">
        <RadioGroup
          value={selected}
          onChange={(value) => {
            // dispatch(setMenuActive(value));
            setSelected(value);
          }}
          className="bg-white rounded-full"
        >
          <RadioGroup.Label className="sr-only">
            เมนูเครื่องดื่ม
          </RadioGroup.Label>
          <div className="flex shadow-md rounded-full p-2">
            {allCategory?.map((item) => (
              <RadioGroup.Option
                key={item.type_id}
                value={item.type_id}
                className={({ active, checked }) =>
                  `${active ? "" : ""}
                  ${checked ? "bg-primary text-white" : "bg-white"}
                    relative flex flex-1  cursor-pointer rounded-full px-1 py-2 focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full  items-center justify-center">
                      <div className="flex items-center">
                        <div className="text-base">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium text-center  ${
                              checked ? "text-white font-bold" : "text-primary"
                            }`}
                          >
                            {item.type_name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {/*  {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )} */}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <GridProduct selected={selected} />
      </div>
    </div>
  );
}

export default TabsMenu;
