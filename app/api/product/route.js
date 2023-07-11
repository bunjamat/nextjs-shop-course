import prisma from "@/lib/prisma";

export const GET = async (request) => {
  //รับ  searchParams
  const { searchParams } = new URL(request.url);
  //เก็บไว้
  const category = searchParams.get("category");

  try {
    //if short else
    const whereCodition =
      category && category !== "8"
        ? {
            where: {
              category_id: parseInt(category),
            },
          }
        : {};

    const allProduct = await prisma.product.findMany(whereCodition);

    return new Response(JSON.stringify(allProduct), { status: 201 });
  } catch (error) {
    console.log("🚀 ~ file: route.js:44 ~ POST ~ error:", error);

    return new Response(JSON.stringify({ error: "ไม่สามารถ ดึงข้อมูลได้" }), {
      status: 500,
    });
  }
};
