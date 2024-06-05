import Image from "next/image";
import Modal from "./modal";
import { notFound, redirect } from "next/navigation";
import { UserIcon } from "@heroicons/react/24/solid";
import ProductFooter from "@/Components/product-footer";

import getProduct from "./action";
import { getSession } from "@/libs/session";

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
    <Modal>
      <div className="w-full max-w-screen-sm aspect-[1/1.5] sm:aspect-[1/1.2] bg-black opacity-100 overflow-hidden flex flex-col gap-4 items-center overflow-y-scroll">
        <div className="relative w-full max-w-96 aspect-square">
          <Image src={product?.photo!} alt="product photo" fill />
        </div>
        <div className="w-full flex flex-col gap-3 px-3 pb-5">
          <div className="w-full flex gap-3 justify-start px-2">
            <div className="relative aspect-square h-6 rounded-full overflow-hidden">
              {product.user.avatar ? (
                <Image src={product.user.avatar} alt="user avatar" fill />
              ) : (
                <UserIcon />
              )}
            </div>
            <span>{product.user.username}</span>
          </div>
          <h1>{product.title}</h1>
          <div className="border-t-2 white py-2 break-words">
            {product.description}
          </div>
        </div>
      </div>

      <ProductFooter sessionId={session.id!} product={product} />
    </Modal>
  );
}
