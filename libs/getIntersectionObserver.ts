export default function getIntersectionObserver({
  callback,
  threshold,
  rootMargin,
}: {
  threshold: number;
  rootMargin: string;
  callback: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => Promise<void>;
}) {
  return new IntersectionObserver(callback, {
    threshold,
    rootMargin,
  });
}

//use example
// async function listUpNewProducts(
//   entries: IntersectionObserverEntry[],
//   observer: IntersectionObserver
// ) {
//   const element = entries[0];

//   if (!element.isIntersecting) return;
//   if (!observerTrigger.current) return;

//   setLoading(true);
//   const moreProducts = await getMoreProducts(page);
//   if (moreProducts.length !== 0) {
//     setProducts((prev) => [...prev, ...moreProducts]);
//     setPage((prev) => prev + 1);
//   } else {
//     setPageEnd(true);
//   }
//   setLoading(false);
// }

// useEffect(() => {
//   const observer = getIntersectionObserver({
//     threshold: 1.0,
//     rootMargin: "-80px 0%",
//     callback: listUpNewProducts,
//   });

//   if (observer && observerTrigger.current) {
//     observer.observe(observerTrigger.current);
//   }

//   return () => observer.disconnect();
// }, [page]);