import Modal from "./components/modal";
import { notFound } from "next/navigation";
import ProductFooter from "@/Components/product-footer";
import { getSession } from "@/libs/session";
import { getProduct } from "./gateway";

export default async function InterceptProducts({
  params: { id: productId },
}: {
  params: { id: number };
}) {
  if (isNaN(productId)) return null;

  const product = await getProduct(Number(productId));
  const session = await getSession();

  if (!product) notFound();

  return (
    <>
      <Modal userId={session.id} product={product} />
      {/* <ProductFooter sessionId={session.id} product={product} /> */}
    </>
  );
}
