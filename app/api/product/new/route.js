import prisma from "@/lib/prisma";

export const POST = async (request) => {
  const { name, price, stock, image, active, categoryId } =
    await request.json();

  try {
    const newData = {
      name: name,
      price: price,
      stock: stock,
      image: image,
      active: active,
      category_id: categoryId,
    };

    const newProduct = await prisma.product.create({
      data: newData,
    });

    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.log("🚀 ~ file: route.js:44 ~ POST ~ error:", error);

    return new Response(JSON.stringify({ error: "ไม่สามารถสร้าง สินค้าได้" }), {
      status: 500,
    });
  }
};
