import getProduct from "./action";
import Modal from "./modal";

export default function InterceptProducts({
  params: { id: productId },
}: {
  params: { id: number };
}) {
  const product = getProduct(productId);

  return (
    <Modal>
      <div className="w-full max-w-screen-sm aspect-[4/3] bg-neutral-800 opacity-100 rounded-lg overflow-hidden">
        <div></div>
        <div></div>
      </div>
    </Modal>
  );
}
