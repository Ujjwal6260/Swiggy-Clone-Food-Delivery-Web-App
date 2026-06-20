import swiggy_corporeate from "../assets/Swiggy_Corporeate_icon.svg";
import SignIn_Icon from "../assets/SignIn_Icon.svg";
import Cart_Icon from "../assets/Cart_Icon.svg";
import help_Icon from "../assets/help_Icon.svg";
import Search_icon from "../assets/Search_Icon.svg";
import offer_icon from "../assets/Offer_Icon.svg";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Navvar() {

    const location = useSelector(store => store.location);

    return (
        <header className="w-full bg-white shadow-md">

            <div
                className="
                    max-w-[1200px]
                    h-[80px]
                    mx-auto
                    flex
                    items-center
                    justify-between
                    px-4
                "
            >

                {/* LEFT */}
                <div className="flex items-center gap-8">

                    {/* LOGO */}
                    <img
                        src="/src/assets/logo.svg"
                        alt="logo"
                        className="w-[46px] h-[70px] cursor-pointer"
                    />

                    {/* LOCATION */}
                    <div className="flex items-center gap-2 cursor-pointer">

                        <span className="font-bold border-b-2 border-black text-[14px]">
                            Other
                        </span>

                        <p
                            className="
                                text-[14px]
                                text-gray-600
                                max-w-[260px]
                                truncate
                            "
                        >
                            {location.data.location && location.data.location.slice(0,30) + "..."}
                        </p>

                        <span className="text-[#FF5200] text-lg">
                            ▼
                        </span>

                    </div>
                </div>

                {/* RIGHT */}
                <nav className="flex items-center gap-10 text-[16px] font-medium">

                    <NavLink
                        to="/corporate"
                        className="flex items-center gap-2 hover:text-[#FF5200]"
                    >
                        <img
                            src={swiggy_corporeate}
                            alt="corporate"
                            className="w-5 h-5"
                        />

                        <span>Swiggy Corporate</span>
                    </NavLink>

                    <NavLink
                        to="/search"
                        className="flex items-center gap-2 hover:text-[#FF5200]"
                    >
                        <img
                            src={Search_icon}
                            alt="search"
                            className="w-5 h-5"
                        />

                        <span>Search</span>
                    </NavLink>

                    <NavLink
                        to="/offers"
                        className="flex items-center gap-2 hover:text-[#FF5200]"
                    >
                        <img
                            src={offer_icon}
                            alt="offers"
                            className="w-5 h-5"
                        />

                        <span>Offers</span>
                    </NavLink>

                    <NavLink
                        to="/help"
                        className="flex items-center gap-2 hover:text-[#FF5200]"
                    >
                        <img
                            src={help_Icon}
                            alt="help"
                            className="w-5 h-5"
                        />

                        <span>Help</span>
                    </NavLink>

                    <NavLink
                        to="/signin"
                        className="flex items-center gap-2 hover:text-[#FF5200]"
                    >
                        <img
                            src={SignIn_Icon}
                            alt="signin"
                            className="w-5 h-5"
                        />

                        <span>Sign In</span>
                    </NavLink>

                    <NavLink
                        to="/cart"
                        className="flex items-center gap-2 hover:text-[#FF5200]"
                    >
                        <img
                            src={Cart_Icon}
                            alt="cart"
                            className="w-5 h-5"
                        />

                        <span>Cart</span>
                    </NavLink>

                </nav>
            </div>
        </header>
    );
}

export default Navvar;