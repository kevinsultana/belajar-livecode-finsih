import React from "react";

export default function Card({
  imgUrl,
  name,
  price,
  id,
  onClickDelete,
  onClickEdit,
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="border-2 border-black p-2 space-y-2">
        <img src={imgUrl} alt="ipong" className="w-52" />
        <h1>{name}</h1>
        <h1 className="text-red-500">
          Rp {Number(price).toLocaleString("id-ID")}
        </h1>
        <div className="flex justify-between">
          <button
            onClick={() => onClickEdit(id)}
            className="bg-blue-500 px-4 py-2 text-white rounded-2xl cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => onClickDelete(id)}
            className="bg-red-500 px-4 py-2 text-white rounded-2xl cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
