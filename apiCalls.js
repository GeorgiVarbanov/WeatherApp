export async function getForecast(obj){
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${obj.lat}&lon=${obj.lon}&appid=a013059126338bd2b7263241786e7bac`;

    const responce = await fetch(url);
    const data = await responce.json();

    const dayForecast = data.list[0];

    return dayForecast;
}

export async function getCoordinates(city){
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=a013059126338bd2b7263241786e7bac`;

    const responce = await fetch(url);

    const data = await responce.json();

    if (data.length === 0){
        return false;
    }

    const coordinatesObj = {
        lat: data[0].lat,
        lon: data[0].lon,
    }

    return coordinatesObj;
}