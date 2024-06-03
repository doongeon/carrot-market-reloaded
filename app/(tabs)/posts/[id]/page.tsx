import { getComments, getPost } from "./gateway";
import TopBar from "@/Components/top-bar";
import Post from "./components/post";
import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "포스트",
};

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const post = await getPost(Number(id));

  if (!post) redirect("/posts");

  const initialComments = await getComments(post?.id!);

  const session = await getSession();

  const like = Boolean(post?.Like.find((like) => like.userId == session.id));

  return (
    <div className="w-full relative flex flex-col gap-5 my-5">
      <TopBar title="포스트" />
      <Post post={post} initialComments={initialComments} like={like} userId={session.id} />
    </div>
  );
}
