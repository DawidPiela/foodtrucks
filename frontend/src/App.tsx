import { useEffect, useState } from 'react'

import './App.css'
import { SearchBar, StarRating } from './components'
import { getDataFromLocalStorage } from './helpers/localStorageHelpers'

type Food = {
  locationid: string
  Applicant: string
  FacilityType: string
  FoodItems: string
  LocationDescription: string
}
function App() {
  const [data, setData] = useState<Food[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [locations, setLocations] = useState<{ locationid: string; rating: number }[]>(getDataFromLocalStorage('locations'))

  useEffect(() => {
    const getFood = async () => {
      setIsLoading(true)
      const response = await fetch(`http://127.0.0.1:4000/food?query=${searchTerm}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        credentials: 'include'
      })
      const data = await response.json()
      setData(data)
      setIsLoading(false)
    }
    getFood()
  }, [searchTerm])

  return (
    <div className='container'>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? <p>Loading...</p> : (
        data.length === 0 ? (
          <p>No data</p>
        ) : (
          <div className='leaderboard'>
            <h1>
              Food trucks list
            </h1>
            <ol>
              {data.map(food => (
                <li key={food.locationid}>
                  <StarRating locationid={food.locationid} locations={locations} setLocations={setLocations} />
                  {food.Applicant}<br />
                  {food.FacilityType}<br />
                  {food.FoodItems}<br />
                  {food.LocationDescription}<br />
                </li>
              ))}
            </ol>
          </div>
        )
      )}
    </div>
  )
}
export default App