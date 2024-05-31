import { Metadata } from "next";
import { getUserOnSession } from "./actions";
import ProfileContent from "./components/profile-content";
import TopBar from "@/Components/top-bar";

export const metadata: Metadata = {
  title: "프로필",
};

export default async function Profile() {
  const user = await getUserOnSession();

  return (
    <div className="flex flex-col gap-5 mb-14">
      <TopBar title="프로필" />
      <ProfileContent
        key={user.id}
        username={user.username}
        avatar={user.avatar}
        createdAt={user.created_at}
        products={user.Product}
      />
    </div>
  );
}
