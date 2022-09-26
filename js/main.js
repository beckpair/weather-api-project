const form = document.querySelector('#weatherDataForm')

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let query_city = document.querySelector('#city').value;
    console.log(event)
    load_data(query_city)
})

var token = config.MY_API_TOKEN;

const getData = async (query_city) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query_city}&units=imperial&appid=${token}`)
    console.log(response.data)
    return response.data
}

const DOM_Elements ={
    current_weather: '.current-weather'
}

const create_list = (max, min, humidity, forecast) => {
    const html = `
    <a href="#" class="list-group-item list-group-item-action position-absolute top-50 start-50 translate-middle" id="${humidity}">
    <div class="row row-cols-1 row-cols-md-2 g-4 text-center">
        <div class="col">
            <div class="card w-60">
            <div class="card-body">
                <h5 class="card-title">High Temp</h5>
                <h6 class="card-text">${max}</h6>
            </div>
            </div>
        </div>
        <div class="col">
            <div class="card w-60">
            <div class="card-body">
                <h5 class="card-title">Low Temp</h5>
                <h6 class="card-text">${min}</h6>
            </div>
            </div>
        </div>
        <div class="col">
            <div class="card w-60">
            <div class="card-body">
                <h5 class="card-title">Humidity</h5>
                <h6 class="card-text">${humidity}%</h6>
            </div>
            </div>
        </div>
        <div class="col">
            <div class="card w-60">
            <div class="card-body">
                <h5 class="card-title">Forecast</h5>
                <h6 class="card-text">${forecast}</h6>
            </div>
            </div>
        </div>
        
    </div>
  </a>`;
  document
  .querySelector(DOM_Elements.current_weather)
  .insertAdjacentHTML("beforeend", html);
};

const load_data = async (query_city) => {
    const weather = await getData(query_city);    
      create_list(
        weather.main.temp_max,
        weather.main.temp_min,
        weather.main.humidity,
        weather.weather[0].main,
      )
      };

  const clear_data = () => {
    document.querySelector(DOM_Elements.current_weather).innerHTML = '';
}
