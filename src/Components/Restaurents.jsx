import { Routes, Route } from "react-router-dom"
import Navvar from "./Navvar"
import { useDispatch, useSelector } from "react-redux"
import SwiggyCorporate from "./Navvar_Element/SwiggyCorporate"
import Search from "./Navvar_Element/Search"
import Offers from "./Navvar_Element/Offers"
import Help from "./Navvar_Element/Help"
import SignIn from "./Navvar_Element/SignIn"
import Cart from "./Navvar_Element/Cart"
import { useState, useEffect} from "react"
import Loder from "./Loder"
import FoodSuggestion from "./FoodSuggestion"
import TopReastaurents from "./TopRestaurents"
import { addHomeData } from "../Utilis/CacheSlice"
import RestaurentInArea from "./RestaurentInArea"



function Restaurents()
{
    const[suggestionData, setSuggestionData] = useState({})
    const[topRestaurents, setTopRestaurents] = useState({})
    const[restaurentInArea, setRestaurentInArea] = useState({})
    const location = useSelector(store => store.location)
    const dispatch = useDispatch()
    const data = useSelector(store => store.cache.home)

    useEffect(() => 
      {


        if(data)
        {
            setSuggestionData({

                    title :data.data.cards[0].card.card.header.title,
                    card:data.data.cards[0].card.card.imageGridCards.info
                })
                let importantData = data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants.map((item) => {
                    return item.info
                })
                setTopRestaurents({
                    title : data.data.cards[1].card.card.header.title,
                    cards : importantData
                })

                let importantData2 =data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants.map((item) => {
                    return item.info
                })
                setRestaurentInArea({
                    title:data.data.cards[2].card.card.title,
                    cards: importantData2
                })
        }
        else
        {
            if(location.data.lat)
            {
                fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.data.lat}&lng=${location.data.lon}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
                    .then((res) => {
                        return res.json()
                    })
                        .then((data) => {
                            // console.log(data)
                            dispatch(addHomeData(data))
                        setSuggestionData({
                            title :data.data.cards[0].card.card.header.title,
                            card:data.data.cards[0].card.card.imageGridCards.info
                        })
                        let importantData = data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants.map((item) => {
                            return item.info
                        })
                        setTopRestaurents({
                            title : data.data.cards[1].card.card.header.title,
                            cards : importantData
                        })

                        let importantData2 =data.data.cards[4].card.card.gridElements.infoWithStyle.restaurants.map((item) => {
                            return item.info
                        })
                        setRestaurentInArea({
                            title:data.data.cards[2].card.card.title,
                            cards: importantData2
                        })
                    })
            }
        }
        }, [location, data, dispatch])
            
            


    return suggestionData.title ? 
    (
        <div>  
            <Navvar/>
           <Routes>
                <Route path="search" element={<Search />} />
                <Route path="offers" element={<Offers />} />
                <Route path="help" element={<Help />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="cart" element={<Cart />} />
            </Routes>

            <div>
                <FoodSuggestion data={suggestionData}/>

                <hr className ="border border-gray-200 w-[80vw] mx-auto mt-10" />

                <TopReastaurents data={topRestaurents} />

                <hr className ="border border-gray-200 w-[80vw] mx-auto mt-10" />

                <RestaurentInArea data ={restaurentInArea} />
            </div> 
        </div>
    ) : 
    (
         <div>  
            <Navvar/>
           <Routes>
                <Route path="search" element={<Search />} />
                <Route path="offers" element={<Offers />} />
                <Route path="help" element={<Help />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="cart" element={<Cart />} />
            </Routes>

            <div className = "h-screen flex justify-center items-center">
                <Loder/>
            </div>
        </div>
    ) 
       
    
}
export default Restaurents





// https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/