import ProductDetail from "@/components/ProductDetail";
import { fCurrencyTH } from "@/utils/formatNumber";

async function getData(productId) {
  const res = await fetch(`${process.env.BASE_URL}/api/product/${productId}`,{ cache: 'no-store' });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Detail = async ({ params }) => {
  const data = await getData(params.id);

  return <ProductDetail data={data} />;
};

export default Detail;
