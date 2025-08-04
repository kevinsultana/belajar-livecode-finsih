import React, { useEffect } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../redux/features/productSlice";

export default function HomePage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.product);

  const handleNavigateAddProduct = () => {
    navigate("/add-new");
  };

  const handleEditProduct = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <h1>Home Page</h1>
      <h2>List Product</h2>
      <button
        onClick={handleNavigateAddProduct}
        className="bg-blue-500 px-4 py-2 text-white rounded-2xl cursor-pointer"
      >
        Add Product
      </button>
      <div className="grid grid-cols-4 gap-4">
        {loading && <h1>Loading...</h1>}
        {items.map((item) => (
          <Card
            key={item.id}
            imgUrl={item.imgUrl}
            title={item.name}
            price={item.price}
            id={item.id}
            onClickDelete={handleDeleteProduct}
            onClickEdit={handleEditProduct}
          />
        ))}
      </div>
    </div>
  );
}
