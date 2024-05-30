import TopBar from "@/Components/top-bar";
import { getPosts } from "./gateway";
import { HeartIcon } from "@heroicons/react/24/solid";
import { formatToTimeAge } from "@/libs/utils";
import PostList from "./components/post-list";

export default async function Life() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col gap-5 mb-14">
      <TopBar title="포스팅" />
      <PostList posts={posts} />
    </div>
  );
}
