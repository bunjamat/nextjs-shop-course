import prisma from "@/lib/prisma";

//update จำนวนสินค้าในตระกร้า
export const PATCH = async (request, { params }) => {
  //รับค่าตัวแปรที่ส่งเข้ามา
  const { qty } = await request.json();

  try {
    //ค้นหาว่ามีในตระกร้ารึยัง
    const existingProduct = await prisma.cart.findFirst({
      where: { id: parseInt(params.id) },
    });
    //ถ้าไม่มี
    if (!existingProduct) {
      return new Response("ไม่พบสินค้านี้ในตระกร้า", { status: 404 });
    }

    // Update จำนวนที่ส่งเข้ามา
    existingProduct.qty = qty;

    await prisma.cart.update({
      where: { id: parseInt(existingProduct.id) },
      data: existingProduct,
    });

    return new Response("Successfully updated the Cart", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Cart", { status: 500 });
  }
};

//ลบจำนวนสินค้าในตร้า
export const DELETE = async (request, { params }) => {
  try {
    //สั่งลบสินค้าในตระกร้าด้วย id
    const deletedCart = await prisma.cart.delete({
      where: { id: parseInt(params.id) },
    });
    return new Response("Cart deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting Cart", { status: 500 });
  }
};
