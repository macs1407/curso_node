
const axios = require('axios');

const getCiudad = async(ciudad)=>{
    /*const instace = axios.create({
        baseURL:`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=571dc2a45a7ad42f5d8d0033fe2ff229`
    });*/

    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=571dc2a45a7ad42f5d8d0033fe2ff229`);
    if(resp.data){
        return {
            temperature: resp.data.main.temp,
            description: resp.data.weather[0].description,
            humidity: resp.data.main.humidity,
            wind_speed: resp.data.wind.speed,
            city: resp.data.name,
            country: resp.data.sys.country,
        }
    } else {
        throw new Error('No hay resultados para la cidad ', ciudad)
    }
}

module.exports = {
    getCiudad
}




