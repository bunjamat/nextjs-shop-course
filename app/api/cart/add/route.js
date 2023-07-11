import prisma from "@/lib/prisma";

export const POST = async (request) => {
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

    // ค้นหาว่ามีแล้วหรือยัง
    const existingProduct = await prisma.cart.findFirst({
      where: { user_id: parseInt(user_id), product_id: product_id },
    });
    // console.log("🚀 ~ file: route.js:20 ~ POST ~ existingProduct:", existingProduct)

    if (!existingProduct) {
      const newCart = await prisma.cart.create({
        data: newData,
      });
      return new Response(JSON.stringify(newCart), { status: 201 });
    }

    // Update the prompt with new data
    existingProduct.qty = existingProduct.qty += qty;
    // console.log("🚀 ~ file: route.js:30 ~ POST ~ existingProduct:", existingProduct)

    const updatedCart = await prisma.cart.update({
      where: { id: parseInt(existingProduct.id) },
      data: existingProduct,
    });
    return new Response(JSON.stringify(updatedCart), { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.js:44 ~ POST ~ error:", error);

    return new Response(
      JSON.stringify({ error: "ไม่สามารถเพิ่มเข้าตระกร้าได้" }),
      {
        status: 500,
      }
    );
  }
};
