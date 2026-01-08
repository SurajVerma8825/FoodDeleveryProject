import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';

const MyOrder = () => {
  const url = "https://fooddeleveryproject.onrender.com/order/userorder";

  //const url = 'http://localhost:3000/order/userorder';

  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    const res = await axios.post(url, {}, { headers: { token } });
    setData(res.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className="md:pl-16 sm:pl-10 pl-6 md:pr-16 sm:pr-10 pr-8 pt-[5rem] pb-4 font-poppins">
      <h2 className="mt-8 md:text-4xl sm:text-2xl text-xl font-semibold">
        My Orders
      </h2>
      <div className="flex flex-col gap-[20px] mt-[30px]">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-1 items-center md:justify-items-start justify-items-center md:gap-[30px] gap-2 text-[14px] px-[20px] py-[10px] text-[#454545] border border-primary rounded-lg"
            >
              <LocalShippingIcon className="text-primary" fontSize="large" />
              <p className=" md:text-start  text-center font-medium ">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + '*' + item.quantity;
                  } else {
                    return item.name + '*' + item.quantity + ',';
                  }
                })}
              </p>
              <p className=" font-medium">&#8377;{order.amount}.00</p>
              <p className="font-medium">Items: {order.items.length} </p>
              <p>
                <span className="text-primary text-lg">&#x25cf;</span>
                <b className="text-[#454545] ml-1">{order.status}</b>
              </p>
              <button
                onClick={fetchOrder}
                className="before:ease md:w-[120px] w-full relative m-4 flex md:mx-0 items-center justify-center  h-[40px] overflow-hidden rounded-xl bg-[#9c28b1] font-poppins text-white font-medium shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-[#9c28b1] hover:before:-translate-x-80"
              >
                Track Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrder;
