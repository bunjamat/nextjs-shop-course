import ProductDetail from "@/components/ProductDetail";
import React from "react";

async function getData(productId) {
  const res = await fetch(`${process.env.BASE_URL}/api/product/${productId}`, {
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Detail = async ({ params }) => {
  const data = await getData(params.id);

  return (
    <>
      {/* conponents */}
      {/*ส่งค่าผ่าน props */}

      {data ? (
        <ProductDetail product={data} brand={"APPLE"} rate={8} />
      ) : (
        <> ไม่พบสินค้าที่ต้องการ </>
      )}
    </>
  );
};

export default Detail;
