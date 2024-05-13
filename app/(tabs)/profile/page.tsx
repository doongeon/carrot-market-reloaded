import db from "@/libs/db";
import { getSession } from "@/libs/getSession";
import { notFound, redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();

  if (session.id) {
    const user = db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (user) {
      return user;
    }
  }
  notFound();
};

export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    "use server";

    const session = await getSession();
    session.destroy();
    redirect("/");
  };

  return (
    <>
      <div>Profile</div>
      <div>안녕하세요, {user?.username}</div>
      <form action={logOut}>
        <button>로그아웃</button>
      </form>
    </>
  );
}
