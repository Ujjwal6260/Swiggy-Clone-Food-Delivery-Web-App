export default async function handler(req, res) {

  const { lat, lng } = req.query;

  try {

    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`,
      {
        headers:{
          "User-Agent":"Mozilla/5.0",
          "Accept":"application/json"
        }
      }
    );


    const data = await response.json();

    res.status(200).json(data);


  } catch(error){

    res.status(500).json({
      error:"Swiggy API Failed"
    });

  }

}