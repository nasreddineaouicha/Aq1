import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
// import wishlist from "../images/wishlist.svg";
// import watch from "../images/watch.jpg";
// import watch2 from "../images/watch-1.avif";
// import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlilce";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState } from "react";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const { grid, data } = props;
  const dispatch = useDispatch();
  console.log(data);
  const location = useLocation();

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);

  const [wishlist, setWishlist] = useState(wishlistState || []);

  useEffect(() => {
    setWishlist(wishlistState || []);
  }, [wishlistState]);

  const isProductInWishlist = (productId) => {
    return wishlist?.some((item) => item._id === productId);
  };

  const addToWish = (productId) => {
    if (isProductInWishlist(productId)) {
      dispatch(addToWishlist(productId)); // Dispatch the action to update the wishlist in Redux store

      const updatedWishlist = wishlist.filter((item) => item._id !== productId);
      setWishlist(updatedWishlist);
    } else {
      dispatch(addToWishlist(productId)); // Dispatch the action to update the wishlist in Redux store

      const product = data.find((item) => item._id === productId);
      setWishlist([...wishlist, product]);
    }
  };
  function calculateDiscountedPrice(price) {
    let discount = 0;

    if (price < 20) {
      discount = 0.4; // 40%
    } else if (price >= 20 && price < 70) {
      discount = 0.17; // 17%
    } else if (price >= 70 && price < 500) {
      discount = 0.5; // 50%
    } else {
      discount = 0.2; // 20%
    }

    const discountedPrice = (price * (1 - discount)).toFixed(2); // Prix final avec réduction
    return { price: discountedPrice, discount };
  }



  return (
    <>
      {data?.map((item, index) => {
        const isWishlist = isProductInWishlist(item._id);
        console.log(isWishlist);
        return (
          <div
            key={index}
            className={` ${location.pathname == "/product" ? `gr-${grid}` : "col-3"
              } `}
          >
            <div className="product-card position-relative">
              <div className="wishlist-icon position-absolute">
                <button
                  className="border-0 bg-transparent"
                  onClick={(e) => addToWish(item?._id)}
                >
                  {isWishlist ? (
                    <AiFillHeart className="fs-5 me-1" />
                  ) : (
                    <AiOutlineHeart className="fs-5 me-1" />
                  )}
                </button>
              </div>

              <div className="product-image">
                <img
                  src={item?.images[0]?.url}
                  // className="img-fluid d"
                  alt="product image"
                  height={"250px"}
                  width={"100%"}
                  onClick={() => navigate("/product/" + item?._id)}
                />
                <img
                  src={item?.images[0]?.url}
                  // className="img-fluid d"
                  alt="product image"
                  height={"250px"}
                  width={"100%"}
                  onClick={() => navigate("/product/" + item?._id)}
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title">
                  {grid === 12 || grid === 6
                    ? item?.title
                    : item?.title?.substr(0, 80) + "..."}
                </h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={item?.totalrating}
                  edit={false}
                  activeColor="#ffd700"
                />

                {/* Prix d'origine avec ligne barrée */}
                <p className="price original-price">
                  {item?.price} DT
                </p>

                {/* Prix après réduction */}
                <p className="price discounted-price">
                  {calculateDiscountedPrice(item?.price).price} DT
                  <span className="discount-percentage"> (-{calculateDiscountedPrice(item?.price).discount * 100}%)</span>
                </p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  {/* <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button> */}

                  {/* <button className="border-0 bg-transparent">
                    <img
                      onClick={() => navigate("/product/" + item?._id)}
                      src={view}
                      alt="view"
                    />
                  </button> */}
                  {/* <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
