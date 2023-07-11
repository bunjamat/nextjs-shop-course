import prisma from "@/lib/prisma";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  // console.log("🚀 ~ file: route.js:5 ~ GET ~ category:", category);

  try {
    const whereCondition =
      category && category !== "8"
        ? {
            where: {
              category_id: parseInt(category),
            },
          }
        : {};
    const allProduct = await prisma.product.findMany(whereCondition);
    return new Response(JSON.stringify(allProduct), { status: 201 });
  } catch (error) {
    console.log("🚀 ~ file: route.js:19 ~ GET ~ error:", error);
    return new Response(JSON.stringify({ error: "ไม่สามารถ ดึงข้อมูลได้" }), {
      status: 500,
    });
  }
};
