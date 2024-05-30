import { getPost } from "./gateway";

export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  

  console.log(id);
  // const post = await getPost();

  return (
    <div>
      <div>
        <div>
          <h1></h1>
          <span></span>
        </div>
      </div>
    </div>
  );
}
