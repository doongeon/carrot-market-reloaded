import TopBar from "@/Components/top-bar";
import { getPosts } from "./gateway";
import PostList from "./components/post-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "포스트",
};

export default async function Life() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-5 mb-14">
      <TopBar title="포스트" />
      <PostList posts={posts} />
    </div>
  );
}
