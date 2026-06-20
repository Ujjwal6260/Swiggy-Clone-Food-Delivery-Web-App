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


  const [suggestionData, setSuggestionData] = useState({
    title: "",
    card: []
  });


  const [topRestaurents, setTopRestaurents] = useState({
    title: "",
    cards: []
  });


  const [restaurentInArea, setRestaurentInArea] = useState({
    title: "",
    cards: []
  });


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  const location = useSelector(store => store.location);
  const cacheData = useSelector(store => store.cache.home);


  const dispatch = useDispatch();





  function filterData(apiData) {

    let foodArray = [];
    let topBrandsArray = [];
    let areaRestaurantsArray = [];


    const cards = apiData?.data?.cards || [];


    foodArray =
      cards
        ?.find(
          (item) =>
            item?.card?.card?.gridElements?.infoWithStyle?.info
        )
        ?.card?.card?.gridElements?.infoWithStyle?.info || [];


    let restaurantSections = [];


    function findRestaurants(obj) {

      if (!obj || typeof obj !== "object") return;


      if (obj?.gridElements?.infoWithStyle?.restaurants) {

        restaurantSections.push(
          obj.gridElements.infoWithStyle.restaurants
        );

      }


      Object.values(obj).forEach(findRestaurants);
    }


    findRestaurants(apiData);



    if (restaurantSections.length > 0) {

      topBrandsArray =
        restaurantSections[0].map(
          (item) => item.info
        );


      areaRestaurantsArray =
        restaurantSections[
          restaurantSections.length - 1
        ].map(
          (item) => item.info
        );

    }

    setSuggestionData({
      title: "What's on your mind?",
      card: foodArray
    });


    setTopRestaurents({
      title: "Top restaurant chains",
      cards: topBrandsArray
    });


    setRestaurentInArea({
      title: "Restaurants in your area",
      cards: areaRestaurantsArray
    });


    setLoading(false);

  }








  useEffect(() => {


    async function getData() {


      try {



        if (cacheData) {


          filterData(cacheData);

          return;


        }




        if (!location?.data?.lat) {

          return;

        }





        const API = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7041&lng=77.1025&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`



        const response = await fetch(API);



        if (!response.ok) {


          throw new Error("API Error");


        }




        const json = await response.json();



        console.log("API DATA =====>", json);



        dispatch(addHomeData(json));



        filterData(json);




      }


      catch (err) {


        console.log("ERROR =====>", err);


        setError(true);


        setLoading(false);


      }



    }



    getData();



  }, [location, cacheData, dispatch]);









  if (error) {


    return (

      <div>

        <Navvar />

        <h2 className="text-center mt-20 text-xl">

          Something went wrong. Please try again.

        </h2>

      </div>

    )

  }








  if (loading) {


    return (

      <div>

        <Navvar />


        <div className="
h-screen
flex
justify-center
items-center
">

          <Loder />

        </div>


      </div>


    )


  }









  return (

    <div>


      <Navvar />




      <Routes>


        <Route path="corporate" element={<SwiggyCorporate />} />

        <Route path="search" element={<Search />} />

        <Route path="offers" element={<Offers />} />

        <Route path="help" element={<Help />} />

        <Route path="signin" element={<SignIn />} />

        <Route path="cart" element={<Cart />} />


      </Routes>





      <FoodSuggestion data={suggestionData} />


      <hr className="
border border-gray-200
w-[80vw]
mx-auto
mt-10"
      />



      <TopReastaurents data={topRestaurents} />



      <hr className="
border border-gray-200
w-[80vw]
mx-auto
mt-10"
      />



      {<RestaurentInArea data={restaurentInArea} />}




    </div>

  )


}


export default Restaurents;