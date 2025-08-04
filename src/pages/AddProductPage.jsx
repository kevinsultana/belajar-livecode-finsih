import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/features/productSlice";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function AddProductPage() {
  const [namaProduct, setNamaProduct] = useState("");
  const [price, setPrice] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.product);

  const handleAddProduct = (e) => {
    e.preventDefault();
    // if (!namaProduct || !price || !imgUrl) {
    //   Swal.fire("Error", "Please fill all the fields", "error");
    //   return;
    // }
    const product = { name: namaProduct, price, imgUrl };
    dispatch(addProduct(product));
    Swal.fire("Success", "Product added successfully", "success").then(() => {
      navigate(-1);
    });
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <h1>Add New Product</h1>
      <form onSubmit={handleAddProduct} className="border-2 p-4 space-y-2">
        <div className="flex justify-between gap-4 items-center">
          <label>Nama Produk</label>
          <input
            type="text"
            placeholder="Nama Produk..."
            className="outline-none border p-2"
            onChange={(e) => setNamaProduct(e.target.value)}
            value={namaProduct}
            required
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
            required
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
            required
          />
        </div>
        <div className="text-center mt-6">
          <button className="bg-blue-500 px-4 py-2 text-white rounded-2xl cursor-pointer">
            {loading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
