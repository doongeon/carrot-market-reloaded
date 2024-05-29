import Image from "next/image";
import { getUserOnSession, handleLogOutForm } from "./actions";
import { UserIcon } from "@heroicons/react/24/solid";
import { formatToWon } from "@/libs/utils";
import Link from "next/link";

export default async function Profile() {
  const user = await getUserOnSession();

  return (
    <div className="flex flex-col gap-5 mb-14">
      <div className="text-3xl bold border-b-2 border-neutral-600 p-5">
        프로필
      </div>
      <div className="flex flex-col gap-5 px-5">
        <div className="flex flex-col gap-5">
          <div className="w-full flex gap-5 items-center">
            <div className="size-20 relative rounded-full overflow-hidden">
              {user.avatar ? (
                <Image src={user.avatar} alt="user avatar" fill />
              ) : (
                <UserIcon />
              )}
            </div>
            <div className="flex flex-col">
              <span>안녕하세요, </span>
              <span>{user.username}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span>판매중인 상품</span>
            <div className="flex gap-5 overflow-x-scroll">
              {user.Product.map((product, index) => {
                return (
                  <div
                    className="w-full max-w-64 shrink-0 flex justify-center "
                    key={index}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="w-3/4 max-w-52 aspect-[1/1.05] bg-neutral-700 h-full flex flex-col gap-2 items-center p-2 rounded-lg"
                    >
                      <div className="relative w-3/4 aspect-square">
                        <Image src={product.photo} alt="product img" fill />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="">{product.title}</span>
                        <span>{formatToWon(product.price)}원</span>
                        <span className="text-sm">
                          {product.updateAt.toLocaleDateString("ko-KR")}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <span className="text-neutral-200 text-sm">
            생성일{" "}
            {user.created_at.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        </div>
        <form className="w-full flex justify-center" action={handleLogOutForm}>
          <button className="primary-btn w-40 h-10">로그아웃</button>
        </form>
      </div>
    </div>
  );
}
