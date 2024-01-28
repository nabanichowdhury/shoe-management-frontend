// YourComponent.js

import { useEffect, useState } from "react";
import { useGetAllProductsQuery } from "../redux/features/products/productApi";
import {
  setBrandFilter,
  setColorFilter,
  setPriceFilter,
  setQuantityFilter,
} from "../redux/features/shoes/shoeSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const FilterProduct = () => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState([]);
  const { filters } = useAppSelector((state) => state.product);
  const { data, isLoading } = useGetAllProductsQuery(undefined);

  useEffect(() => {
    if (!isLoading) {
      setProducts(data || []);
    }
  }, [data, isLoading]);

  const handleQuantityChange = (event) =>
    dispatch(setQuantityFilter(parseInt(event.target.value, 10)));
  const handlePriceChange = (event) =>
    dispatch(setPriceFilter(parseInt(event.target.value, 10)));
  const handleColorChange = (event) =>
    dispatch(setColorFilter(event.target.value));
  const handleBrandChange = (event) =>
    dispatch(setBrandFilter(event.target.value));

  const uniqueColors = Array.from(
    new Set(products.map((product) => product.color))
  );
  const uc = ["All colors", ...uniqueColors];

  const filteredProducts = products.filter((product) => {
    return (
      (filters.quantity === null ||
        product.productQuantity <= filters.quantity) &&
      (filters.price === null || product.productPrice <= filters.price) &&
      (filters.color === null ||
        filters.color === "All colors" ||
        product.color.toLowerCase() === filters.color.toLowerCase()) &&
      (filters.brand === null ||
        product.brand.toLowerCase().includes(filters.brand.toLowerCase()))
    );
  });

  return (
    <div>
      {/* Quantity slider */}
      <label htmlFor="quantity-slider">Quantity:</label>
      <input
        id="quantity-slider"
        type="range"
        min="0"
        max="100"
        step="1"
        onChange={handleQuantityChange}
      />

      {/* Price slider */}
      <label htmlFor="price-slider">Price:</label>
      <input
        id="price-slider"
        type="range"
        min="0"
        max="1000"
        step="1"
        onChange={handlePriceChange}
      />

      {/* Color select field */}
      <label htmlFor="color-select">Color:</label>
      <select
        id="color-select"
        onChange={handleColorChange}
        className="select select-ghost w-full max-w-xs"
      >
        <option value="" disabled>
          Color choose
        </option>
        {uc.map((o, index) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      {/* Your brand input */}
      <label htmlFor="brand-input">Brand:</label>
      <input
        id="brand-input"
        type="text"
        placeholder="Brand"
        onChange={handleBrandChange}
      />

      <div>
        <h1 className="font-bold mx-3">My Buyers</h1>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Brand</th>
                <th>Color</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((d: any, index: number) => (
                <tr key={d._id}>
                  <th>{index + 1}</th>
                  <td>{d.name}</td>
                  <td>{d.productQuantity}</td>
                  <td>{d.productPrice}</td>
                  <td>{d.brand}</td>
                  <td>{d.color}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
