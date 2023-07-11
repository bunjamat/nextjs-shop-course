import prisma from "@/lib/prisma";

export const PATCH = async (request, { params }) => {
  const { qty } = await request.json();

  try {
    await connectToDB();

    //ค้นหาว่ามีในตระกร้ารึยัง
    const existingProduct = await prisma.cart.findFirst({
      where: { user_id: parseInt(user_id), product_id: product_id },
    });

    if (!existingProduct) {
      return new Response("Prompt not found", { status: 404 });
    }

    // Update จำนวนที่ส่งเข้ามา
    existingProduct.qty = qty;

    await existingPrompt.save();

    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
