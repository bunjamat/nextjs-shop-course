//เชื่อม database
import prisma from "@/lib/prisma";

//สร้าง method รับ POST
export const POST = async (request) => {
  //request มาแยกเป็น object
  //รับเป็น request ที่ส่งมา
  const { user_id, product_id, product_name, product_price, qty } =
    await request.json();
  try {
    const newData = {
      user_id: parseInt(user_id),
      product_id: product_id,
      product_name: product_name,
      product_price: product_price,
      qty: qty,
    };

    //ค้นหาว่ามีในตระกร้ารึยัง
    const existingProduct = await prisma.cart.findFirst({
      where: { user_id: parseInt(user_id), product_id: product_id },
    });

    //ถ้ายังไม่มี
    if (!existingProduct) {
      //insert
      const addCart = await prisma.cart.create({ data: newData });
      return new Response(JSON.stringify(addCart), { status: 201 });
    }

    //ถ้ามี ให้ update จำนวนใน cart + qty ที่ส่งเข้ามา
    existingProduct.qty = existingProduct.qty += qty;

    //update
    const updateCart = await prisma.cart.update({
      where: { id: parseInt(existingProduct.id) },
      data: existingProduct,
    });

    return new Response(JSON.stringify(updateCart), { status: 200 });
    
  } catch (error) {
    console.log("🚀 ~ file: route.js:39 ~ POST ~ error:", error);
    return new Response(
      JSON.stringify({ error: "ไม่สามารถเพิ่มเข้าตระกร้าได้" }),
      {
        status: 500,
      }
    );
  }
};
