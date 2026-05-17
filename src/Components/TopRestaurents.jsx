import { useNavigate } from "react-router-dom"
import RestaurentCard from "./RestaurentCard"
const CDN = import.meta.env.VITE_IMG_CDN
function TopReastaurents({data})
{
    const{title, cards} = data 
    const navigate = useNavigate()
    return(
            
            <div className = "mt-5 text-lg w-[80vw] mx-auto">
                <div className = 'flex justify-between'>
                    <h3 className="font-[700]">{title}</h3>

                    <div>
                        <i className="fa-solid fa-arrow-right"></i>
                        
                        <i className="fa-solid fa-arrow-left"></i>
                    </div>
                </div>

                <div className="flex gap-4 overflow-scroll scrollbar-none [scrollbar-width:none] mt-4">
                    {cards.map((item) => {
                        return <RestaurentCard cdn={CDN} data={item}/>
                    })}
                </div>
            </div>
    )
}

export default TopReastaurents