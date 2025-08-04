import { createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const initialState = {
  items: [],
  item: {},
  loading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setProduct: (state, action) => {
      state.item = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setProduct, setLoading, setError } =
  productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const querySnap = await getDocs(collection(db, "products"));
    const result = querySnap.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    dispatch(setProducts(result));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchProductById = (idProduct) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const queryDoc = doc(db, "products", idProduct);
    const docSnap = await getDoc(queryDoc);
    dispatch(setProduct(docSnap.data()));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const addProduct = (product) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await addDoc(collection(db, "products"), {
      name: product.name,
      price: product.price,
      imgUrl: product.imgUrl,
    });
    dispatch(fetchProducts());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteProduct = (idProduct) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteDoc(doc(db, "products", idProduct));
    dispatch(fetchProducts());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const editProduct = (idProduct, product) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await updateDoc(doc(db, "products", idProduct), {
      name: product.name,
      price: product.price,
      imgUrl: product.imgUrl,
    });
    dispatch(fetchProducts());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export default productSlice.reducer;
