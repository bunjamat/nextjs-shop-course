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
