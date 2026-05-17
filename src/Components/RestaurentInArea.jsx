import RestaurentCard from "./RestaurentCard"
const CDN = import.meta.env.VITE_IMG_CDN
function RestaurentInArea({data})
{
    const{title ,cards} = data
    return(
        <div className = "mt-5 text-lg w-[80vw] mx-auto">
            <div className = 'flex justify-between'>
                    <h3 className="font-[700]">{title}</h3>
            </div>

            <div className="mt-4 grid grid-cols-4">
                {cards.map((item) => {
                    return <RestaurentCard cdn = {CDN} data ={item}/>
                })}
            </div>

        </div>
    )
}

export default RestaurentInArea