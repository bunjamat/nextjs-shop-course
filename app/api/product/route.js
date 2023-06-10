import prisma from "@/lib/prisma";

export const GET = async (request) => {

  
  try {
    const allProduct = await prisma.product.findMany();
    return new Response(JSON.stringify(allProduct), { status: 201 });

  } catch (error) {

    console.log("🚀 ~ file: route.js:44 ~ POST ~ error:", error);


    return new Response(
      JSON.stringify({ error: "ไม่สามารถ ดึงข้อมูลได้" }),
      { status: 500 }
    );
  }
};