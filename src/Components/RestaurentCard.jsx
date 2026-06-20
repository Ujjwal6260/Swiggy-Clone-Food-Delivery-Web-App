import { useNavigate } from "react-router-dom"
import Rating_Icon from "../assets/Rating_Icon.svg"
import { CDN } from "../Utilis/Constants";

function RestaurentCard({data, size, cdn})
{
    // console.log(data)
     const navigate = useNavigate()
    const{areaName, avgRating, cloudinaryImageId, cuisines, name, sla, id} =data
    const{slaString} = sla
    return(
        <div className= "shrink-0 w-fit">
                <img 
                    onClick={() => {
                        navigate(`/restaurants/menu/${id}`)
                    }}
                    src={cdn + cloudinaryImageId} 
                    alt="TOPRESTARENT_IMAGE" 
                    className = {"rounded-2xl " + (size == 'large' ? "h-50 w-70" : "h-[186.6px] w-[280px]")}/>

                <div>
                    <h3 className= {"font-[600] text-[18px] text-[#02060B] tracking-[-0.45px] " + (size == "large" ? "text-lg" : "text-sm")}>
                        {name.slice(0, 18)}...
                    </h3>

                    <p className ="flex gap-1">
                        <img src={Rating_Icon} alt="Rating Logo" 
                        />
                        <span>{avgRating}</span>
                        <span>&bull;</span>
                        {slaString}
                    </p>

                    <p className = "text-gray-500 font-[200] text-sm tracking-[-0.4]">
                        {cuisines.join(", ").length > 25 ? cuisines.join(", ").slice(0,25) +"..." : cuisines.join(",")}
                    </p>

                    <p className = "text-gray-500 font-[200] text-sm tracking-[-0.4]">
                        {areaName}
                    </p>
                </div>
        </div>
    )
}

export default RestaurentCard