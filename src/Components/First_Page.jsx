import { Link, useNavigate } from "react-router-dom";
import Card_1 from "../assets/Card_1.png";
import Search_Icon from "../assets/Search_Icon.svg"
import logo from "../assets/swiggy_logo_white.png";
import veggies from "../assets/Veggies_new.png";
import sushi from "../assets/Sushi_replace.png";
import Card_2 from "../assets/card_2.png";
import Card_3 from "../assets/card_3.png";
import Location_Icon from "../assets/Location_Icon.svg"
import Aerrow_Icon from "../assets/Aerrow_Down_Icon.svg"

function First_Page() {
    const nav = useNavigate();

    return (
        <div className="bg-[#FF5200] h-screen relative">

            <nav className="flex justify-between items-center px-10 py-10">
                <img src={logo} alt="Logo" className="h-12 w-40" />

                <div className="text-[16px] text-white flex gap-5 items-center">
                    <Link to="/restaurents/swiggycorporate">Swiggy Corporate</Link>
                    <Link to="/restaurents/partner">Partner with us</Link>

                    <button className="border border-white px-4 py-3 rounded-xl">
                        Get the App
                    </button>
                    <button className="bg-black text-white px-4 py-3 rounded-2xl">
                        Sign in
                    </button>
                </div>
            </nav>

            <h1 className="text-[48px] font-semibold text-white mt-16 text-center">
                Order food & groceries. Discover <br />
                best restaurants. Swiggy it!
            </h1>

            <img className="h-[70vh] absolute top-35 left-0" src={veggies} alt="" />
            <img className="h-[70vh] absolute top-35 right-0" src={sushi} alt="" />

            <div className="mt-6 flex justify-center gap-4">
            
                <div className="relative w-[300px] h-[60px]">
                    <input
                        type="text"
                        placeholder="Enter your delivery location"
                        className="w-full h-full pl-12 pr-5 rounded-[16px] bg-white"
                    />

                    <img 
                        src= {Location_Icon} 
                        alt="Location_Icon"
                        className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5"  />
                        
                    <img  
                        src={Aerrow_Icon} 
                        alt="Aerrow Icon" 
                        className = "absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5" />
                </div>
            

                <div className = "w-[480px] h-[60px] relative">
                    <input
                        type="text"
                        placeholder="Search for restaurant, item or more"
                        className="w-full h-full p-5 rounded-[16px] bg-white"
                    />
                    <img 
                        src={Search_Icon} 
                        alt="Search_Icon" 
                        className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 "/>
                </div>
            </div>

            <div className="flex justify-center mt-10 gap-4">
                <img onClick={() => nav('/restaurents')} className="h-[40vh] cursor-pointer" src={Card_1} />
                <img onClick={() => nav('/restaurents')} className="h-[40vh] cursor-pointer" src={Card_2} />
                <img onClick={() => nav('/restaurents')} className="h-[40vh] cursor-pointer" src={Card_3} />
            </div>
        </div>
    );
}

export default First_Page;