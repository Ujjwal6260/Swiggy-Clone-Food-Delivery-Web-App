import {useParams} from "react-router-dom"
import Navvar from "./Navvar"
import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import Loder from "./Loder"
import Accordian from "./Accordian"
const CDN = import.meta.env.VITE_IMG_CDN

function Menu()
{
    const{id} = useParams()
    const[data, setData] = useState([])
    const{lat, lon} = useSelector(store => store.location.data)

    useEffect(() => {
        
        if(lat)
        {
            fetch(`https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lon}&restaurantId=${id}&submitAction=ENTER`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {

            let lstIdx =
                data.data.cards.length - 1

            let cards =
                data.data.cards[lstIdx]
                .groupedCard.cardGroupMap.REGULAR.cards

            let importantData =
                cards.slice(2, cards.length - 1)

            let filteredData =
                importantData.filter((item) => {
                    return item.card?.card?.itemCards
                })

            setData({
                title: data.data.cards[0].card.card.text,
                cards: filteredData
            })
            })
        }
            
    }, [id, lat, lon])
    return(
        <div>
            <Navvar/>
            {data.title ? 
            <div className="w-screen flex justify-center">
                <main className = "w-[60%] mt-10">

                    <h1 className = "text-3xl font-extrabold">{data.title}</h1>

                    <div>
                        {data.cards.map((item) => {
                            
                            return <Accordian id = {id} cdn = {CDN} title = {item.card.card.title} cards={item.card.card.itemCards} />
                        })}
                    </div>

                </main>
            </div> : 

            <div className = "h-[calc(100vh-80px)] flex justify-center items-center">
                <Loder/>
            </div>}
        </div>
    )
}
export default Menu