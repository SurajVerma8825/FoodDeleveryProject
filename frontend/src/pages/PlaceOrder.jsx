import EmailIcon from '@mui/icons-material/Email';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalAmount, food_list, token, cartItems } =
    useContext(StoreContext);

   const url = "https://fooddeleveryproject.onrender.com/order/place";
 // const url = 'http://localhost:3000/order/place';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: formData,
      items: orderItems,
      amount: getTotalAmount() + 99,
    };
    try {
      const res = await axios.post(url, orderData, { headers: { token } });
      if (res.status === 200) {
        const { session_url } = res.data;
        window.location.replace(session_url);
      } else {
        alert('Error');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
      toast.error('Please login to continue');
    } else if (getTotalAmount() === 0) {
      navigate('/cart');
      toast.error('Your cart is empty');
    }
  }, [token]);

  return (
    <div className="md:pl-16 sm:pl-10 pl-6 md:pr-16 sm:pr-10 pr-8 pt-[5rem] pb-4 font-poppins">
      <form
        onSubmit={handleSubmit}
        className=" flex items-start justify-between gap-[50px] mt-[100px] w-full"
      >
        <div className="w-full">
          <p className="text-[30px] font-semibold mb-[20px]">
            Delivery Information
          </p>
          <div className="flex gap-[10px] w-full">
            <label
              htmlFor="firstName"
              className="flex items-center w-1/2  border-2 rounded-lg bg-[#f0e4f2] mt-6"
            >
              <PersonIcon
                className="text-gray-400 ml-2 w-full"
                fontSize="small"
              />
              <input
                required
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                className="bg-transparent outline-none ml-2  py-2  w-full"
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="lastName"
              className="flex items-center w-1/2  border-2 rounded-lg bg-[#f0e4f2] mt-6"
            >
              <PersonIcon className="text-gray-400 ml-2" fontSize="small" />
              <input
                required
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                className="bg-transparent outline-none ml-2  py-2 w-full"
                onChange={handleChange}
              />
            </label>
          </div>
          <label
            htmlFor="email"
            className="flex items-center w-full border-2 rounded-lg bg-[#f0e4f2] mt-4"
          >
            <EmailIcon className="text-gray-400 ml-2" fontSize="small" />
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="bg-transparent outline-none ml-2 py-2  w-full"
              onChange={handleChange}
            />
          </label>
          <label
            htmlFor="streetAddress"
            className="flex items-center w-full border-2 rounded-lg bg-[#f0e4f2] mt-4"
          >
            <LocationOnIcon className="text-gray-400 ml-2" fontSize="small" />
            <input
              required
              type="text"
              id="streetAddress"
              name="streetAddress"
              placeholder="Street Address"
              className="bg-transparent outline-none ml-2  py-2 w-full"
              onChange={handleChange}
            />
          </label>
          <div className="flex gap-[10px] w-full">
            <label
              htmlFor="city"
              className="flex items-center w-1/2  border-2 rounded-lg bg-[#f0e4f2] mt-6"
            >
              <LocationCityIcon
                className="text-gray-400 ml-2"
                fontSize="small"
              />
              <input
                required
                type="text"
                id="city"
                name="city"
                placeholder="City Name"
                className="bg-transparent outline-none ml-2  py-2 w-full"
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="state"
              className="flex items-center w-1/2  border-2 rounded-lg bg-[#f0e4f2] mt-6"
            >
              <HomeWorkIcon className="text-gray-400 ml-2" fontSize="small" />
              <input
                required
                type="text"
                id="state"
                name="state"
                placeholder="State Name"
                className="bg-transparent outline-none ml-2  py-2 w-full"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="flex gap-[10px] w-full">
            <label
              htmlFor="zipCode"
              className="flex items-center w-1/2 border-2 rounded-lg bg-[#f0e4f2] mt-6"
            >
              <MapIcon className="text-gray-400 ml-2" fontSize="small" />
              <input
                required
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="Zip Code"
                className="bg-transparent outline-none ml-2  py-2 w-full"
                onChange={handleChange}
              />
            </label>
            <label
              htmlFor="country"
              className="flex items-center w-1/2 border-2 rounded-lg bg-[#f0e4f2] mt-6  "
            >
              <PublicIcon className="text-gray-400 ml-2" fontSize="small" />
              <input
                required
                type="text"
                id="country"
                name="country"
                placeholder="Country Name"
                className="bg-transparent outline-none ml-2  py-2 w-full "
                onChange={handleChange}
              />
            </label>
          </div>
          <label
            htmlFor="phone"
            className="flex items-center w-full border-2 rounded-lg bg-[#f0e4f2] mt-6 mb-6"
          >
            <PhoneIcon className="text-gray-400 ml-1" fontSize="small" />
            <input
              required
              id="phone"
              name="phone"
              placeholder="Phone Number"
              className="bg-transparent outline-none ml-2  py-2 w-full"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="w-full pr-8 pl-8 mt-[15px] pb-4">
          <div className=" flex-1 flex flex-col  gap-6">
            <h2 className="text-xl font-semibold">Cart Totals</h2>
            <div>
              <div className="flex justify-between text-[#555] pl-2 pr-2">
                <p>Subtotals</p>
                <p>&#8377;{getTotalAmount()}</p>
              </div>
              <div className="border-b border-zinc-300 mt-2 mb-2 w-full "></div>
              <div className="flex justify-between text-[#555] pl-2 pr-2">
                <p>Delivery Fee</p>
                <p>&#8377;{getTotalAmount() === 0 ? 0 : 99}</p>
              </div>
              <div className="border-b-2 border-zinc-500 w-full mb-2 mt-2 "></div>
              <div className="flex justify-between text-black font-medium text-lg pl-2 pr-2 ">
                <p className=" ">Total</p>
                <p>
                  &#8377;{getTotalAmount() === 0 ? 0 : getTotalAmount() + 99}
                </p>
              </div>
            </div>

            <div className="w-full">
              <button
                disabled={loading}
                type="submit"
                className="before:ease relative flex mx-auto  items-center justify-center  px-6  h-[40px] overflow-hidden rounded-xl bg-[#9c28b1] font-poppins text-white font-medium shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-[#9c28b1] hover:before:-translate-x-80"
              >
                {loading ? 'Please wait...' : 'Add Food Detail'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
