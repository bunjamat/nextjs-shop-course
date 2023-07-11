"use client";
import React from "react";

const page = () => {
  const t = 2;
  let name = "thongchai";
  if (t === 2) {
    name = "bird";
  } else if (t === 3) {
    name = "jone";
  } else if (t === 4) {
    name = "jone";
  } else {
    name = "jane";
  }
  

  const name2 = t === 2 ? "bird" : t === 3 ? "jone" : t === 3 ? "jane" : "ffff";

  console.log("🚀 ~ file: page.jsx:6 ~ page ~ name:", name);

  console.log("🚀 ~ file: page.jsx:15 ~ page ~ name2:", name2);

  return <div>{t === 2 ? <>true</> : t === 3 ? <>false</> : <></>}</div>;
};
export default page;
