import ProductFooter from "@/Components/product-footer";

import { getSession } from "@/libs/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProduct } from "./gateway";
import ProductDetail from "./components/product-detail";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!Number(id)) notFound();

  const product = await getProduct(Number(id));

  const session = await getSession();

  return (
    <>
      <ProductDetail product={product} />
      {/* <div className="w-full max-w-screen-md flex flex-col relative">
        <div className="aspect-square w-full max-w-96 mx-auto relative">
          <Image src={product.photo} alt="product img" fill />
        </div>
        <div className="min-h-[20vh]">
          <div className="border-b-2 border-neutral-700 flex items-center gap-3 px-3 py-2 mt-1">
            <div className="relative aspect-square h-8 rounded-full overflow-hidden">
              {product.user.avatar ? (
                <Image src={product.user.avatar} alt="user avatar" fill />
              ) : (
                <UserIcon />
              )}
            </div>
            <span className="text-sm">{product.user.username}</span>
          </div>
          <div className="flex flex-col gap-2 py-5 px-5 text-sm">
            <span className="text-lg">{product.title}</span>
            <span>{product.description}</span>
          </div>
        </div>
      </div> */}
      <ProductFooter sessionId={session.id!} product={product} />
    </>
  );
}
