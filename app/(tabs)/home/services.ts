import { useEffect, useRef, useState } from "react";
import { Products } from "./types";
import { getMoreProducts } from "./gateway";
import getIntersectionObserver from "@/libs/getIntersectionObserver";
import { useRecoilValue } from "recoil";
import { pageExitAtom } from "@/libs/atom";


export default function useProductList(initialProducts: Products) {
  const pageExit = useRecoilValue(pageExitAtom);
  const [products, setProducts] = useState<Products>(initialProducts);
  const [loadingMoreProducts, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(false);
  const observerTrigger = useRef<HTMLButtonElement>(null);

  async function listUpNewProducts(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) {
    const element = entries[0];

    if (!element.isIntersecting) return;
    if (!observerTrigger.current) return;

    setLoading(true);
    const moreProducts = await getMoreProducts(page);
    if (moreProducts.length !== 0) {
      setProducts((prev) => [...prev, ...moreProducts]);
      setPage((prev) => prev + 1);
    } else {
      setPageEnd(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    const observer = getIntersectionObserver({
      threshold: 1.0,
      rootMargin: "-80px 0%",

      callback: listUpNewProducts,
    });

    if (observer && observerTrigger.current) {
      observer.observe(observerTrigger.current);
    }

    return () => observer.disconnect();
  }, [page, pageExit]);

  return {
    products,
    pageEnd,
    observerTrigger,
    loadingMoreProducts,
  };
}
