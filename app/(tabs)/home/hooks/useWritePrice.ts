import { ChangeEvent, useState } from "react";

export const MAX_PRICE = 10000000;

export default function useWritePrice() {
  const [price, setPrice] = useState("");
  const [writePriceError, setWritePriceError] = useState<string[] | null>(null);
  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice((prev) => e.target.value);

    if (e.target.value.length !== 0 && Number(e.target.value)) {
      setWritePriceError((prev) => null);
    }

    if (e.target.value.length !== 0 && !Number(e.target.value)) {
      setWritePriceError((prev) => ["가격을 입력해주세요."]);
      return;
    }

    if (Number(e.target.value) > MAX_PRICE) {
      setWritePriceError((prev) => [`최대 ${MAX_PRICE}원이에요.`]);
    } else {
      setWritePriceError((prev) => null);
    }
  };

  return { price, writePriceError, setWritePriceError, onChangePrice };
}
