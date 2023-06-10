"use client";

import React, { useState } from "react";

const Content = () => {
  var lastname = "bunjamat";
  const age = 29;

  const [count, setCount] = useState(10);
  const [name, setName] = useState("thongchai");
  
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            {name} {lastname} {count}
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            Get Started
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              setName("thongchai ");
            }}
          >
            เปลี่ยนชื่อ
          </button>


        </div>
      </div>
    </div>
  );
};

export default Content;
