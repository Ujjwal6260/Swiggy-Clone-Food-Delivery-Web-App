import { Routes, Route } from "react-router-dom"
import First_Page from "./Components/First_Page"
// import Navvar from "./Components/Navvar"
import Restaurents from "./Components/Restaurents"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getLocationThunk } from "./Utilis/LocationSlice"
import RestaurentHavingFood from "./Components/RestaurentHavingFood"
import Menu from "./Components/Menu"
import { Toaster } from 'react-hot-toast';


function App()
{
  // console.log(import.meta.env.VITE_IMG_CDN)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLocationThunk())
  }, [])
  return(
    <div>
      <Toaster/>

      <Routes>
        <Route path = "/" element={<First_Page/>} />
        <Route path="/restaurents/*" element={<Restaurents />} />
        <Route path = "/restaurents/:id" element={<RestaurentHavingFood/>} />
        <Route path="/restaurants/menu/:id" element={<Menu />} />

        {/* <Navvar/> */}
      </Routes>
    </div>
  )
}
export default App