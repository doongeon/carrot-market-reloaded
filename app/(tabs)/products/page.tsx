import { resolve } from "path";
import { useEffect } from "react";

const delay = new Promise((resolve) => {
  setTimeout(resolve, 6000);
});

export default async function Products() {
  const loading = await delay;

  return <div>products</div>;
}
