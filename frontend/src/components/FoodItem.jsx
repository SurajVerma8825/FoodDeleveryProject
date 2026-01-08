import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeToCart } = useContext(StoreContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        bg-white rounded-2xl overflow-hidden
        shadow-[0_6px_24px_rgba(0,0,0,0.06)]
        hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)]
        transition-shadow duration-300
        font-poppins
      "
    >
      {/* IMAGE */}
      <div className="relative h-[220px] md:h-[240px] overflow-hidden group cursor-pointer">
        <img
          src={image}
          alt={name}
          className="
            w-full h-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-[1.03]
          "
        />

        {/* SOFT OVERLAY */}
        <div
          className="
            absolute inset-0
            bg-black/0
            group-hover:bg-black/10
            transition-colors duration-500
          "
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 md:p-5">
        {/* TITLE + RATING */}
        <div className="flex justify-between items-start mb-1.5">
          <h3
            className="
              text-[15px] md:text-[17px]
              font-medium
              leading-snug
              line-clamp-1
            "
          >
            {name}
          </h3>
          <img src={assets.rating_starts} className="w-[64px]" />
        </div>

        {/* DESCRIPTION */}
        <p
          className="
            text-[13px] md:text-[14px]
            text-gray-500
            leading-relaxed
            line-clamp-2
            mb-4
          "
        >
          {description}
        </p>

        {/* PRICE + ACTION (PREMIUM ROW) */}
        <div className="flex items-center justify-between">
          <p
            className="
              text-primary
              text-[18px] md:text-[20px]
              font-semibold
            "
          >
            ₹{price}
          </p>

          {/* ACTION */}
          {!cartItems[id] ? (
            <button
              onClick={() => addToCart(id)}
              className="
                flex items-center gap-2
                px-3 py-1.5
                rounded-full
                border border-gray-200
                hover:border-primary
                hover:bg-primary/5
                transition-all
              "
            >
              <img src={assets.add_icon_green} className="w-5" />
              <span className="text-sm font-medium">
                Add
              </span>
            </button>
          ) : (
            <div
              className="
                flex items-center gap-3
                px-3 py-1.5
                rounded-full
                border border-gray-200
              "
            >
              <img
                src={assets.remove_icon_red}
                onClick={() => removeToCart(id)}
                className="w-5 cursor-pointer"
              />
              <span className="text-sm font-medium">
                {cartItems[id]}
              </span>
              <img
                src={assets.add_icon_green}
                onClick={() => addToCart(id)}
                className="w-5 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodItem;
