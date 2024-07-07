import React, { useCallback } from 'react'
import debounce from 'lodash.debounce'

type SearchBarProps = {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps ) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(debounce((event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value), 300), [])

  return (
    <div className='searchbar'>
      <input
        type="text"
        defaultValue={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
    </div>
  )
}
