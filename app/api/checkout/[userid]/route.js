import prisma from "@/lib/prisma";

export const POST = async (request, { params }) => {
  //รับค่าตัวแปรที่ส่งเข้ามา
  const { fullname, address } = await request.json();

  try {
    const productCart = await prisma.cart.findMany({
      where: { user_id: parseInt(params.userid) },
      include: {
        product: true,
      },
    });

    const newItm = productCart.map((val) => {
      const i = {
        order_id: parseInt(order.order_id),
        product_id: val.product_id,
        quantity: val.qty,
        sub_total: val.product_price * val.qty,
      };
      return i;
    });

    const data = {
      user_id: parseInt(params.userid),
      order_fname: fullname,
      order_address: address,
      order_lname: "",
      order_phone: "",
      order_email: "",
      order_grandtotal: 90.0,
      order_paymentslip: "",
      order_payment: "",
      order_shipping: "",
      order_approve: false,
    };

    const order = await prisma.orders.create({ data });

    if (order) {
      //เลือกสินค้าในตระกร้ามาเพื่อ insert

      console.log("newItm", newItm);
      //   const userCreateInfo = await prisma.user.createMany({
      //     data: [
      //       {
      //         age: 12,
      //         name: "Søren Bramer-Schmidt",
      //         email: "schmidt@prisma.io",
      //         role: "ADMIN",
      //         country: "Germany",
      //       },
      //       {
      //         age: 7,
      //         name: "Nikolas Burk",
      //         email: "burk@prisma.io",
      //         country: "Germany",
      //       },
      //     ],
      //   });
    }

    //   //ค้นหาว่ามีในตระกร้ารึยัง
    //   const existingProduct = await prisma.cart.findFirst({
    //     where: { id: parseInt(params.id) },
    //   });
    //   //ถ้าไม่มี
    //   if (!existingProduct) {
    //     return new Response("ไม่พบสินค้านี้ในตระกร้า", { status: 404 });
    //   }

    //   // Update จำนวนที่ส่งเข้ามา
    //   existingProduct.qty = qty;

    //   await prisma.cart.update({
    //     where: { id: parseInt(existingProduct.id) },
    //     data: existingProduct,
    //   });

    return new Response(
      JSON.stringify({ fullname: fullname, address: address }),
      { status: 200 }
    );
  } catch (error) {
    console.log("🚀 ~ file: route.js:78 ~ POST ~ error:", error);
    return new Response("Error Updating Cart", { status: 500 });
  }
};
