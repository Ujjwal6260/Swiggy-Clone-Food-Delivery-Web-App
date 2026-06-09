import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import Navvar from "./Navvar";

import SwiggyCorporate from "./Navvar_Element/SwiggyCorporate";
import Search from "./Navvar_Element/Search";
import Offers from "./Navvar_Element/Offers";
import Help from "./Navvar_Element/Help";
import SignIn from "./Navvar_Element/SignIn";
import Cart from "./Navvar_Element/Cart";

import Loder from "./Loder";
import FoodSuggestion from "./FoodSuggestion";
import TopReastaurents from "./TopRestaurents";
import RestaurentInArea from "./RestaurentInArea";

import { addHomeData } from "../Utilis/CacheSlice";


function Restaurents() {

  const [suggestionData, setSuggestionData] = useState({});
  const [topRestaurents, setTopRestaurents] = useState({});
  const [restaurentInArea, setRestaurentInArea] = useState({});
  const [error, setError] = useState(false);

  const location = useSelector(store => store.location);
  const cacheData = useSelector(store => store.cache.home);

  const dispatch = useDispatch();


  const filterData = (apiData) => {

    const cards = apiData?.data?.cards;

    if (!cards) return;


    // What's on your mind

    const suggestion = cards.find(
      item =>
        item?.card?.card?.imageGridCards
    );


    setSuggestionData({

      title:
        suggestion?.card?.card?.header?.title ||
        "What's on your mind?",

      card:
        suggestion
        ?.card
        ?.card
        ?.imageGridCards
        ?.info || []

    });



    // Top Restaurants

    const restaurantCards = cards.find(
      item =>
        item
        ?.card
        ?.card
        ?.gridElements
        ?.infoWithStyle
        ?.restaurants
    );


    const restaurants =
      restaurantCards
      ?.card
      ?.card
      ?.gridElements
      ?.infoWithStyle
      ?.restaurants
      ?.map(item => item.info) || [];


    setTopRestaurents({

      title:
        restaurantCards
        ?.card
        ?.card
        ?.header
        ?.title
        ||
        "Top restaurant chains",

      cards: restaurants

    });


    setRestaurentInArea({

      title:
      "Restaurants in your area",

      cards: restaurants

    });

  };



useEffect(() => {


if(cacheData){

  filterData(cacheData);
  return;

}


if(location?.data?.lat){


const API = 
`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.data.lat}&lng=${location.data.lon}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;



fetch(API)

.then(response => {

if(!response.ok){
throw new Error("API Failed");
}

return response.json();

})


.then(data => {

dispatch(addHomeData(data));

filterData(data);

})


.catch(error => {

console.log("Swiggy API Error:",error);

setError(true);

});


}


},[location,cacheData,dispatch]);





if(error){

return(

<div>

<Navvar/>

<h2 className="text-center mt-20 text-xl">

Something went wrong. Please try again.

</h2>

</div>

)

}




return (

<div>


<Navvar/>


<Routes>

<Route 
path="corporate" 
element={<SwiggyCorporate/>}
/>

<Route 
path="search" 
element={<Search/>}
/>

<Route 
path="offers" 
element={<Offers/>}
/>

<Route 
path="help" 
element={<Help/>}
/>

<Route 
path="signin" 
element={<SignIn/>}
/>

<Route 
path="cart" 
element={<Cart/>}
/>

</Routes>




{
suggestionData?.card?.length > 0 ?

<div>


<FoodSuggestion 
data={suggestionData}
/>


<hr className="
border border-gray-200 
w-[80vw] 
mx-auto 
mt-10"
/>



<TopReastaurents 
data={topRestaurents}
/>



<hr className="
border border-gray-200 
w-[80vw] 
mx-auto 
mt-10"
/>



<RestaurentInArea
data={restaurentInArea}
/>



</div>


:


<div className="
h-screen 
flex 
justify-center 
items-center"
>

<Loder/>

</div>

}


</div>

)

}


export default Restaurents;