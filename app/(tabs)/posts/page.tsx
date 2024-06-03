import TopBar from "@/Components/top-bar";
import { getPosts } from "./gateway";
import PostList from "./components/post-list";
import { Metadata } from "next";
import { getSession } from "@/libs/session";

export const metadata: Metadata = {
  title: "포스트",
};

export default async function Life() {
  const initialPost = await getPosts();
  const session = await getSession();

  return (
    <div className="flex flex-col gap-5 mb-14">
      <TopBar title="포스트" />
      <PostList initialPost={initialPost.reverse()} userId={session.id} />
    </div>
  );
}
