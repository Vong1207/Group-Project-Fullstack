/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Vu Linh, Tran Gia Vong
// # ID: 3999487, s4012094 */
import "./CustomerCart.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

// Import reducers
import {
  setUser,
  subtractCartQuantity,
  addCartQuantity,
  inputCartQuantity,
  deleteCartProduct,
  updateWalletBalance,
} from "../../redux/userSlice.js";

export default function CustomerCart() {
  const dispatch = useDispatch();

  // Get cart products from Redux
  const productsInCart = useSelector((state) => state.user.user?.cart) || [];

  // Checkbox state for selected products (used for ordering)
  const [checked, setChecked] = useState(productsInCart.map(() => false));

  // Calculate total price for selected products only
  const totalPriceSelected = productsInCart.reduce((total, product, index) => {
    return checked[index]
      ? total + product.product.productPrice * product.quantity
      : total;
  }, 0);

  // Ensure checked state stays in sync when products change
  useEffect(() => {
    if (checked.length === 0 && productsInCart.length > 0) {
      setChecked(productsInCart.map(() => false));
    }
  }, [productsInCart]);

  // Save cart changes to DB function
  const userId = useSelector((state) => state.user.user?._id);
  const walletBalance =
    useSelector((state) => state.user.user?.walletBalance) || 0;

  async function saveCartToDB(cart) {
    if (!userId) return;
    try {
      await axios.post(
        "http://localhost:3000/api/cart/update",
        { userId, cart },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error saving cart to DB:", error);
    }
  }

  // Cart functions
  function handleSelectAllProducts() {
    const allSelected = checked.every(Boolean);
    setChecked(productsInCart.map(() => !allSelected));
  }
  // Select a product
  function handleSelectProduct(index) {
    setChecked(checked.map((item, i) => (i === index ? !item : item)));
  }

  // Decrease product quantity
  function handleSubtractQuantity(index) {
    dispatch(subtractCartQuantity(index));
  }

  // Increase product quantity
  function handleAddQuantity(index) {
    dispatch(addCartQuantity(index));
  }

  // Set product quantity by input
  function handleInputQuantity(event, index) {
    const value = event.target.value;
    dispatch(inputCartQuantity({ index, value }));
  }

  // Remove product from cart
  function handleDeleteProduct(index) {
    dispatch(deleteCartProduct(index));
  }
  // Order function
  async function handlePlaceOrder() {
    if (!userId) return;

    const selectedItems = productsInCart.filter((_, i) => checked[i]);
    // Check the product is not empty
    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
      return;
    }
    // Check wallet balance
    if (walletBalance < totalPriceSelected) {
      alert("You don't have enough money in your wallet.");
      return;
    }

    // Create an array of products
    const products = selectedItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    // check stock quantity
    if (products.stockQuantity < inputCartQuantity) {
      alert("There are not enough products to order");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/cart/order",
        {
          userId,
          cart: products,
          totalPrice: totalPriceSelected,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Order success!");
        dispatch(setUser(res.data.updatedUser));
        dispatch(updateWalletBalance(walletBalance - totalPriceSelected));
        setChecked([]);
      } else {
        alert(res.data.error || "Order failed");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong.");
      console.error("Order error:", err);
    }
  }

  // Save cart changes to DB
  useEffect(() => {
    saveCartToDB(productsInCart);
  }, [
    handleAddQuantity,
    handleDeleteProduct,
    handleInputQuantity,
    handleSubtractQuantity,
  ]);

  return (
    <>
      <h1 className="mb-0 text-center mt-4">My Cart</h1>

      {/* Cart Display on -md breakpoint */}
      <div className="mt-4 d-md-block d-none" id="cartContainer">
        <div
          className="mx-lg-5 mx-md-2 p-3 d-flex justify-content-between"
          id="cartHeader"
        >
          <div className="select-all d-flex align-items-center">
            <button
              className={
                checked.length > 0 && checked.every(Boolean) ? "checked" : ""
              }
              type="button"
              onClick={handleSelectAllProducts}
            ></button>
          </div>
          <div className="image"></div>
          <div className="name"></div>
          <div className="price text-center fw-bold">Price</div>
          <div className="quantity text-center fw-bold">Quantity</div>
          <div className="total text-center fw-bold">Total</div>
          <div className="delete"></div>
        </div>

        {productsInCart.map((product, index) => (
          <div
            key={index}
            className="mx-lg-5 mx-md-2 p-3 d-flex justify-content-between productContainer"
          >
            <div className="selectProductBtnContainer d-flex align-items-center justify-content-center">
              <button
                type="button"
                className={`selectProductBtn ${
                  checked[index] ? "checked" : ""
                }`}
                onClick={() => handleSelectProduct(index)}
              ></button>
            </div>

            <div className="productImageContainer">
              <img
                src={product.product.productImage}
                alt={`${product.product.productName} Image`}
                className="productImage"
              />
            </div>

            <div className="d-flex align-items-center productNameContainer">
              <p className="mb-0 fw-bold">{product.product.productName}</p>
            </div>

            <div className="d-flex align-items-center justify-content-center priceContainer">
              <p className="mb-0">
                {(product.product?.productPrice ?? 0).toLocaleString()}₫
              </p>
            </div>

            <div className="d-flex align-items-center justify-content-center quantityContainer">
              <button
                type="button"
                onClick={() => handleSubtractQuantity(index)}
              >
                -
              </button>
              <input
                type="number"
                className="text-center"
                value={product.quantity}
                onChange={(event) => handleInputQuantity(event, index)}
              />
              <button type="button" onClick={() => handleAddQuantity(index)}>
                +
              </button>
            </div>

            <div className="d-flex align-items-center justify-content-center totalPriceContainer">
              <p className="mb-0">
                {(
                  (product.product?.productPrice ?? 0) * (product.quantity ?? 0)
                ).toLocaleString()}
                ₫
              </p>
            </div>

            <div className="deleteBtnContainer d-flex justify-content-center align-items-center">
              <button
                type="button"
                className="d-flex justify-content-center align-items-center"
                onClick={() => handleDeleteProduct(index)}
              >
                <i className="fi fi-ts-x"></i>
              </button>
            </div>
          </div>
        ))}

        <div
          className="mx-lg-5 mx-md-2 p-3 mt-4 d-flex justify-content-between"
          id="totalAndPurchase"
        >
          <div className="d-flex align-items-center">
            <p className="mb-0 fs-5">{`Total: ${totalPriceSelected.toLocaleString()}₫`}</p>
          </div>

          <div>
            <button
              className="px-3 py-2 fw-bold"
              type="button"
              id="buyNowBtn"
              onClick={handlePlaceOrder}
            >
              Order
            </button>
          </div>
        </div>
      </div>

      {/* Cart Display on -sm breakpoint */}
      <div className="mt-4 d-md-none d-block" id="cartContainerSm">
        <div className="p-3" id="selectAllSm">
          <button
            className={
              checked.length > 0 && checked.every(Boolean) ? "checked" : ""
            }
            type="button"
            onClick={handleSelectAllProducts}
          ></button>
        </div>

        {productsInCart.map((product, index) => (
          <div
            key={index}
            className="p-3 d-flex productContainerSm position-relative"
          >
            <div className="d-flex justify-content-center align-items-center selectProductBtnContainerSm">
              <button
                type="button"
                className={`selectProductBtn ${
                  checked[index] ? "checked" : ""
                }`}
                onClick={() => handleSelectProduct(index)}
              ></button>
            </div>

            <div className="ms-3 flex-fill d-flex productInfoContainerSm">
              <div className="productImageContainerSm">
                <img
                  src={product.product.productImage}
                  alt={`${product.product.productName} Image`}
                  className="d-sm-none productImageXSm"
                />
                <img
                  src={product.product.productImage}
                  alt={`${product.product.productName} Image`}
                  className="d-sm-block d-none productImageSm"
                />
              </div>
              <div className="ms-sm-4 ms-3">
                <p className="mb-0 productNameSm fw-bold">
                  {product.product.productName}
                </p>
                <p className="mb-0 mt-2">
                  {(product.product?.productPrice ?? 0).toLocaleString()}₫
                </p>
                <div className="d-flex align-items-center productQuantityContainerSm">
                  <button
                    type="button"
                    onClick={() => handleSubtractQuantity(index)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="text-center"
                    value={product.quantity}
                    onChange={(event) => handleInputQuantity(event, index)}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddQuantity(index)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="deleteBtn position-absolute"
              onClick={() => handleDeleteProduct(index)}
            >
              <i className="fi fi-ts-x"></i>
            </button>
          </div>
        ))}

        <div
          className="p-3 d-flex justify-content-between align-items-center"
          id="totalAndPurchaseSm"
        >
          <p className="mb-0">{`Total: ${totalPriceSelected.toLocaleString()}₫`}</p>
          <button
            type="button"
            className="px-3 py-2 fw-bold"
            id="buyNowBtn"
            onClick={handlePlaceOrder}
          >
            Order
          </button>
        </div>
      </div>
    </>
  );
}
