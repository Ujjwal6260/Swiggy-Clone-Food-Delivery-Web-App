import { useNavigate } from "react-router-dom"
import { CDN } from "../Utilis/Constants";

// const CDN= import.meta.env.VITE_IMG_CDN

function FoodSuggestion({data})
{
    const navigate = useNavigate()
    const {title, card} = data
    return(
        <div className = "mt-5 text-lg w-[80vw] mx-auto">
                <div className = 'flex justify-between'>
                    <h3 className="font-[700]">{title}</h3>

                    <div>
                        <i className="fa-solid fa-arrow-right"></i>
                        
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                </div>

                <div className = "flex overflow-scroll scrollbar-none [scrollbar-width:none] ">
                    {card?.map((c) => {
                        // console.log(c.entityId.slice(36,41))
                        return <img 
                            onClick={() => {
                                navigate(`/restaurents/${c.entityId.slice(36,41)} `)
                            }}
                            src={CDN + c.imageId} 
                            alt="Card Image" 
                            className= "w-[144px] h-[180px]" />
                    })}
                </div>
            </div>
    )
}

export default FoodSuggestion