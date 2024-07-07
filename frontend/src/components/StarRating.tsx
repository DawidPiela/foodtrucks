import React, { useState } from 'react'
import { saveDataToLocalStorage } from '../helpers/localStorageHelpers'

type StarRatingProps = {
  locationid: string
  locations: { locationid: string; rating: number }[]
  setLocations: React.Dispatch<React.SetStateAction<{locationid: string; rating: number}[]>>
}

type StarProps = {
  filled: boolean
  onClick: () => void
}

export const StarRating = ({ locationid, locations, setLocations }: StarRatingProps) => {
  const [rating, setRating] = useState(locations.find(item => item.locationid === locationid)?.rating || 0)

  const handleClick = (index: number) => {
    setLocations(prevState => {
      if (prevState.find(item => item.locationid === locationid)) {
        const newState = [...prevState]
        const element = newState.find(item => item.locationid === locationid)
      
        if (element) {
          element.rating = index + 1
        }

        saveDataToLocalStorage('locations', newState)
        return newState
      } else {
        saveDataToLocalStorage('locations', [...prevState, { locationid, rating: index + 1 }])
        return [...prevState, { locationid, rating: index + 1 }]
      }
    })
    setRating(index + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  )
}

const Star = ({ filled, onClick }: StarProps) => (
  <span
    onClick={onClick}
    style={{
      cursor: 'pointer',
      color: filled ? 'gold' : 'white',
      fontSize: '1.5rem',
      zIndex: 10
    }}
  >
    ★
  </span>
)