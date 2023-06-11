"use client";
import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import GridProduct from "./GridProduct";
const category = [
  {
    id: 1,
    value: 1,
    name: "เมนูร้อน",
  },
  {
    id: 2,
    value: 2,
    name: "เมนูเย็น",
  },
  {
    id: 3,
    value: 3,
    name: "เมนูปั่น",
  },
  {
    id: 4,
    value: 4,
    name: "อื่นๆ",
  },
];

function TabsMenu() {
  const [selected, setSelected] = useState("3");

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
            {category?.map((item) => (
              <RadioGroup.Option
                key={item.id}
                value={item.value}
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
                            {item.name}
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
