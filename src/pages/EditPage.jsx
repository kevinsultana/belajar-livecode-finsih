import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { editProduct, fetchProductById } from "../redux/features/productSlice";
import Swal from "sweetalert2";

export default function EditPage() {
  const { id } = useParams();

  const [namaProduct, setNamaProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");

  const navigate = useNavigate();

  const { item } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleEditProduct = (e) => {
    e.preventDefault();
    if (!namaProduct || !price || !imgUrl) {
      Swal.fire("Error", "Please fill all the fields", "error");
      return;
    }
    const product = { name: namaProduct, price, imgUrl };
    dispatch(editProduct(id, product));
    Swal.fire("Success", "Product edited successfully", "success").then(() => {
      navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id]);

  useEffect(() => {
    if (item) {
      setNamaProduct(item.name);
      setPrice(item.price);
      setImgUrl(item.imgUrl);
    }
  }, [item]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <h1>Edit Product</h1>
      <form onSubmit={handleEditProduct} className="border-2 p-4 space-y-2">
        <div className="flex justify-center items-center">
          <img src={imgUrl} alt="ipong" className="w-52" />
        </div>
        <div className="flex justify-between gap-4 items-center">
          <label>Nama Produk</label>
          <input
            type="text"
            placeholder="Nama Produk..."
            className="outline-none border p-2"
            onChange={(e) => setNamaProduct(e.target.value)}
            value={namaProduct}
          />
        </div>
        <div className="flex justify-between gap-4 items-center">
          <label>Price</label>
          <input
            type="number"
            placeholder="Price..."
            className="outline-none border p-2"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="flex justify-between gap-4 items-center">
          <label>Image Url</label>
          <input
            type="url"
            placeholder="Image Url"
            className="outline-none border p-2"
            onChange={(e) => setImgUrl(e.target.value)}
            value={imgUrl}
          />
        </div>
        <div className="text-center mt-6">
          <button className="bg-blue-500 px-4 py-2 text-white rounded-2xl cursor-pointer">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
