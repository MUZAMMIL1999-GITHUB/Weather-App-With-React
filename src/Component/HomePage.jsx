import { useState } from 'react'
import './HomePage.css'
import axios from 'axios'
import cloud_icon from '../../public/cloud.png'
import rain_icon from '../../public/rain.png'
import clear_icon from '../../public/clear_cloud.png'
import drizzle_icon from '../../public/drizzle.png'
import snow_icon from '../../public/rain.png'

export function HomePage() {
    const [input, setInput] = useState('')
    const [data, setData] = useState(false)
    const [forecastData, setForecastData] = useState([])
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }
    // console.log(data.main.temp);
    

    const API_KEY = "eef3ba28c1868b69460ac2b9dae187fa"

    function fetchWeatherData() {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${API_KEY}`)
        .then((res) => {
            console.log(res.data)
            
            const icon = allIcons[res.data.weather[0].icon] || cloud_icon;
            setData({
                humidity: res.data.main.humidity,
                temprature: (res.data.main.temp).toFixed(2),
                feels_like: (res.data.main.feels_like).toFixed(0),
                pressure: res.data.main.pressure,
                wind_speed: res.data.wind.speed,
                address: res.data.name,
                icon_el: icon,
                // icon: res.data.weather[0].icon,
                weatherStatus: res.data.weather[0].main,
                sunrise: new Date(res.data.sys.sunrise * 1000).toLocaleTimeString(),
                sunset: new Date(res.data.sys.sunset * 1000).toLocaleTimeString(),
                local_date: new Date(res.data.sys.sunset * 1000).toDateString(),
            });
            
        })
    }

    function fetchForecastData() {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=metric&appid=${API_KEY}`)
        .then((res) => {
            console.log(res.data.list)
            setForecastData(res.data.list)

        })
    }
   const filterData = forecastData.slice(0, 5)
   console.log(filterData)
    
    function handleChange(e) {
        setInput(e.target.value)
    }
    function handleClick() {
        console.log("yes");
        
        fetchWeatherData()
        fetchForecastData()
    }

    return (
        <>
            <header className='header bg-dark'>
                <div className="logo_area">
                    <h3 className='text-white'>Weather</h3>
                </div>
                <div className="search_area">
                    <input type="text" id='search_input' placeholder='Search City London, New York' onChange={handleChange} />
                    <button className='search_btn' onClick={handleClick}>Search</button>
                </div>
            </header>
            <div className="main_container px-3">
                <aside className='aside_section'>

                    <div className="current_weather_container bg-dark text-white">
                        <h5>Now</h5>
                        <div className="temp_area">
                            <h2>{data.temprature}°c</h2>
                             <div className="cloud_icon">
                                <img src={data.icon_el} style={{width: "35px"}} alt="" />
                                </div> 
                        </div>
                        <div className="weather_status">
                            <p>{data.weatherStatus}</p>
                        </div>
                        <div className="address_with_date">
                            <p className='date_div'>{data.local_date}</p>
                            <p className='address_div'>{data.address}</p>
                        </div>
                    </div>
                    <h3 className='text-dark'>5 Days Forecast</h3>
                    <div className="forecast_container bg-dark text-white">
                     
                        {
                        filterData.map((item, index) => {
                        return (
                           <div key={index} className="first_forecast_container">
                         <p className='forecast_temp'>{item.main.temp}°c</p>
                            <p className='forecast_date'>{item.dt_txt}</p>
                            <p className='forecast_weather_statsu'>{item.weather[0].main}</p>
                             </div>
                        )
                        })
                        }
                           
                       
                    </div>
                </aside>

                <div className="right_container text-white">
                    <p>Today's Highlights</p>
                    <div className="big_grid_area bg-dark">
                        <div className="big_grid_left">
                            <div className="first">
                                <h5>Air Quality Index</h5>
                            </div>
                            <p className='big_grid_icons'>icon</p>
                            <div className="mix_data">
                                <div className="one">
                                    <p>CO</p>
                                    <p>210.43 mg/m<sup>3</sup></p>
                                </div>
                                <div className="one">
                                    <p>NO</p>
                                    <p>249.43 mg/m<sup>3</sup></p>
                                </div>
                                <div className="one">
                                    <p>CO<sub>2</sub></p>
                                    <p>168.43 mg/m<sup>3</sup></p>
                                </div>
                                <div className="one">
                                    <p>O<sub>2</sub></p>
                                    <p>126.43 mg/ms<sup>3</sup></p>
                                </div>
                            </div>
                           
                        </div>
                       
                        <div className="big_grid_right">
                            <div className="first">
                                <h5>Sunrise And Sunset</h5>
                            </div>
                           <div className="right_div_icons px-4">
                           <p className='big_grid_icons sun bi bi-sun'></p>
                           <p className='big_grid_icons moon bi bi-moon'></p>
                           </div>
                           <div className="time_div">
                            <p>{data.sunrise}</p>
                            <p>{data.sunset}</p>
                           </div>
                           
                        </div>
                    </div>

                    <div className="right_down_container">
                        <div className="down_two bg-dark">
                            <p>Humidity</p>
                            <div className="content_one">
                                <p className='bi bi-droplet-fill'></p>
                                <p>{data.humidity}%</p>
                            </div>
                        </div>
                        <div className="down_two bg-dark">
                            <p>Pressure</p>
                            <div className="content_two">
                                <p className='bi bi-speedometer'></p>
                                <p>{data.pressure} hPa</p>
                            </div>
                        </div>
                        <div className="down_two bg-dark">
                            <p>Visibility</p>
                            <div className="content_three">
                                <p className='bi bi-eye'></p>
                                <p>{data.wind_speed}km</p>
                            </div>
                        </div>
                        <div className="down_two bg-dark">
                            <p>Feels Like</p>
                            <div className="content_four">
                                <p className='bi bi-thermometer'></p>
                                <p>{data.feels_like}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}