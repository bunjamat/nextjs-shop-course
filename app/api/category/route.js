import prisma from "@/lib/prisma";

export const GET = async (request) => {
  try {
<<<<<<< HEAD
    const category = await prisma.category.findMany(/* {
      include: {
        product: true,
      },
    } */);
    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    console.log("🚀 ~ file: route.js:44 ~ POST ~ error:", error);

=======
    const allCategory = await prisma.category.findMany();

    return new Response(JSON.stringify(allCategory), { status: 201 });
  } catch (error) {
    console.log("🚀 ~ file: route.js:44 ~ POST ~ error:", error);
>>>>>>> 9e2e3ef7a5dc7d622028e36e8abd0c9d0f762bc0
    return new Response(JSON.stringify({ error: "ไม่สามารถ ดึงข้อมูลได้" }), {
      status: 500,
    });
  }
};
