import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import TabsMenu from "@/components/TabsMenu";

//logic

export default function Home() {
  //logic
  return (
    <>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          ซื้อสินค้าออนไลน์ง่ายๆ
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">Next Shop</span>
        </h1>
        <p className="desc text-center">
          เมื่อสั่งของออนไลน์กับเราแล้ว
          คุณมั่นใจได้ว่าร้านค้าจะจัดส่งสินค้าอย่างรวดเร็ว ทันใจ ไม่ต้องรอนานfffffffff
          ซึ่งคุณสามารถเลือกรูปแบบบริการจัดส่งได้หมด ส่งได้ทั่วประเทศไทย
          และติดตามการจัดส่งได้อย่างง่ายดาย
        </p>
        <TabsMenu />
      </section>
    </>
  );
}
