import prisma from "@/lib/prisma";

export const GET = async (request, { params }) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.js:10 ~ GET ~ error:", error);
    return new Response(JSON.stringify({ error: "ไม่สามารถ ดึงข้อมูลได้" }), {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { name, price, stock, image } = await request.json();

  try {
    // Find the existing product by ID
    // ค้นหาว่ามีแล้วหรือยัง
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!existingProduct) {
      return new Response("Product not found", { status: 404 });
    }

    // Update the prompt with new data
    existingProduct.name = name;
    existingProduct.price = price;
    existingProduct.stock = stock;
    existingProduct.image = image;

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: existingProduct,
    });

    return new Response("Successfully updated the Product", { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.js:47 ~ PATCH ~ error:", error);
    return new Response("Error Updating Prompt", { status: 500 });
  }
};
