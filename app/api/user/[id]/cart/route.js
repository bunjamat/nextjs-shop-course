import prisma from "@/lib/prisma";

export const GET = async (request, { params }) => {
  console.log("🚀 ~ file: route.js:4 ~ GET ~ params:", params);
  try {
    const productCart = await prisma.cart.findMany({
      where: { user_id: parseInt(params.id) },
      include: {
        product: true,
      },
    });
    return new Response(JSON.stringify(productCart), { status: 200 });
  } catch (error) {
    console.log("🚀 ~ file: route.js:10 ~ GET ~ error:", error);
    return new Response(JSON.stringify({ error: "ไม่สามารถ ดึงข้อมูลได้" }), {
      status: 500,
    });
  }
};
