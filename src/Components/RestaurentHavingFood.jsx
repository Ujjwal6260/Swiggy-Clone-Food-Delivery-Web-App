import React, { useEffect, useState } from 'react'
import Navvar from './Navvar'
import { useNavigate, useParams } from 'react-router-dom'
import Loder from './Loder'
import { useDispatch, useSelector } from 'react-redux'
import RestaurentCard from './RestaurentCard'
import { addDataById } from '../Utilis/CacheSlice'
import not_found_page from '../assets/not_found_page.png'
const CDN = import.meta.env.VITE_IMG_CDN


const RestaurentHavingFood = () => {

    const{id} = useParams()
    const[data, setData] = useState({})
    const[isIdIncorrect, setIsIdIncorrect] = useState(false)
    const{lat, lon} = useSelector(store => store.location.data)
    const dispatch = useDispatch()
    const cachedData = useSelector(store => store.cache[`${id}`])
    const navigate = useNavigate()

    useEffect(() => {


        if(cachedData)
        {
             let kaamKaData = cachedData.data.cards.slice(3).map((item) => {
                    return item.card.card.info
                })

                setData({
                    info : {
                        title : cachedData.data.cards[0].card.card.title,
                        desc : cachedData.data.cards[0].card.card.description
                    },
                    cards : kaamKaData
                })
        }
        else
        {



        if(lat)
        {
            fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lon}&collection=${id}&tags=layout_CCS_Rolls&sortBy=&filters=&type=rcv2&offset=0&page_type=null`)
            .then((res) => {
                return res.json()
            })
            .then((apiData) => {
                // console.log(apiData.statusCode)
                dispatch(addDataById({id, data : apiData}))

                if(apiData.statusCode == 1)
                {
                    setIsIdIncorrect(true)
                }
                let kaamKaData = apiData.data.cards.slice(3).map((item) => {
                    return item.card.card.info
                })

                setData({
                    info : {
                        title : apiData.data.cards[0].card.card.title,
                        desc : apiData.data.cards[0].card.card.description
                    },
                    cards : kaamKaData
                })
            })
        }
        
    
    }

    }, [id, lat, lon])

    if(isIdIncorrect)
    {
        return (
            <div className='h-screen w-screen bg-[#F1F1F6]'>

                <Navvar />

                        <main className='h-[90vh] w-screen flex justify-center items-center flex-col'>

                            <div className='w-[270px] mb-6'>
                                <img
                                    src={not_found_page}
                                    alt="Image"
                                    className='w-full object-contain'
                                />
                            </div>


                            <h1 className='text-[40px] font-bold text-[#282C3F] leading-tight'>
                                Page not found
                            </h1>

                            <p className='text-center text-[#686B78] text-[20px] leading-7 mt-2'>
                                Uh-oh! Looks like the page you are trying to access,
                                <br />
                                doesn't exist. Please start afresh.
                            </p>

                            <button
                                onClick={() => navigate('/restaurents')}
                                className='mt-8 bg-[#FF5200] hover:bg-[#e64a00]
                                text-white font-bold uppercase
                                w-[140px] h-[50px]
                                tracking-wide duration-300'
                            >
                                Go Home
                            </button>

                        </main>

                    </div>
        )
    }

  return (
    <div>
        <Navvar />


        

        <main >
            {data.cards ? (
                <>
                    <div className=' w-fit mx-35 my-10'>
                        <h1 className='text-4xl font-extrabold'>{data.info.title}</h1>
                        <p className='text-lg'>{data.info.desc}</p>
                    </div>

                    <div className='grid grid-cols-4 w-fit mx-auto gap-4'>
                        {data.cards.map((item) => {
                            return <RestaurentCard cdn={CDN} data={item} />
                        })}
                    </div>
                </>
                
            ) : (
                <div className='h-[88vh] flex justify-center items-center'>
                    <Loder />

                </div>
            )
        }
        </main>


    </div>
  )
}

export default RestaurentHavingFood