import { writeProductStateAtom } from "@/libs/atom";
import { getObjectURL } from "@/libs/aws";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import useCreatePostForm from "../hooks/useCreatePostForm";
import { DESCRIPTION_MAX_LENGTH, TITLE_MAX_LENGTH } from "../constants";

export default function CreateProductFormModal() {
  const setWriteProductState = useSetRecoilState(writeProductStateAtom);
  const { data, error, onChange, loading, formLoadingState, onSubmitPostForm } =
    useCreatePostForm();

  return (
    <motion.div
      className="fixed left-0 top-0 z-30 bg-[rgba(0,0,0,0.2)] w-full h-full flex justify-center items-end overflow-y-auto py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ top: 1000 }}
        animate={{ top: 30 }}
        exit={{ top: 1000 }}
        className="absolute w-full flex flex-col items-center max-w-screen-sm p-5 bg-neutral-800 mt-auto rounded-2xl"
      >
        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              setWriteProductState(false);
            }}
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>
        <form
          onSubmit={onSubmitPostForm}
          className="w-full flex flex-col items-center gap-5 px-5"
        >
          <label
            htmlFor="photo"
            className="w-full max-w-96 aspect-square border-2 border-neutral-400 border-dashed flex flex-col justify-center items-center"
            style={{
              backgroundImage: `url(${getObjectURL(data.photoKey)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {loading.uploadPhotoLoading && <span>loading</span>}
            {!loading.uploadPhotoLoading && !data.photoKey && (
              <>
                <PhotoIcon className="size-20" />
                <span>이미지 불러오기</span>
                {error.uploadPhotoError && (
                  <span className="error-span">{error.uploadPhotoError}</span>
                )}
              </>
            )}
          </label>
          <input
            id="photo"
            type="file"
            name="photo"
            className="hidden"
            onChange={onChange.onChangePhoto}
          />
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="title"
              className="flex justify-between px-1 items-end"
            >
              <span>제목</span>
              <span className="text-sm text-neutral-600">
                {data.title.length}/{TITLE_MAX_LENGTH}
              </span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="제목"
              className="bg-neutral-800 outline-none ring-1 ring-orange-600 rounded-md px-2"
              value={data.title}
              onChange={onChange.onChangeTitle}
            />
            {error.writeTitleError && (
              <span className="error-span">{error.writeTitleError}</span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="price">가격</label>
            <input
              id="price"
              type="text"
              name="price"
              placeholder="가격"
              className="bg-neutral-800 outline-none ring-1 ring-orange-600 rounded-md px-2"
              value={data.price}
              onChange={onChange.onChangePrice}
            />
            {error.writePriceError && (
              <span className="error-span">{error.writePriceError}</span>
            )}
          </div>
          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="description"
              className="flex justify-between px-1 items-end"
            >
              <span>설명</span>
              <span className="text-sm text-neutral-600">
                {data.description.length}/{DESCRIPTION_MAX_LENGTH}
              </span>
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="설명"
              rows={3}
              className="bg-neutral-800 outline-none ring-1 ring-orange-600 rounded-md px-2 text-wrap resize-none"
              value={data.description}
              onChange={onChange.onChangeDescription}
            />
            {error.writeDescriptionError && (
              <span className="error-span">{error.writeDescriptionError}</span>
            )}
          </div>
          <button
            type="submit"
            className={`${
              formLoadingState ? "disable-btn" : "primary-btn"
            } mt-5`}
            disabled={formLoadingState}
          >
            등록하기
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
