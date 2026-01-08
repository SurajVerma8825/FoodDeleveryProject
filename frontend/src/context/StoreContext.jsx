import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
   const url = "https://fooddeleveryproject.onrender.com";
 // const url = "http://localhost:3000";
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null); // Initialize with null instead of " "
  const [food_list, setFoodlist] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(`${url}/cart/add`, { itemId }, { headers: { token } });
    }
  };

  const removeToCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${url}/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (let key in cartItems) {
      if (cartItems[key] > 0) {
        totalAmount +=
          cartItems[key] * food_list.find((item) => item._id === key).price;
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const res = await axios.get(`${url}/food/lists`);
    if (res.status === 200) {
      setFoodlist(res.data.data);
    } else {
      console.log("Error while fetching food list");
    }
  };

  const loadCartData = async (token) => {
    try {
      const res = await axios.get(`${url}/cart/get`, { headers: { token } });
      setCartItems(res.data.cartData);
    } catch (error) {
      console.error("Error while loading cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeToCart,
    getTotalAmount,
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
