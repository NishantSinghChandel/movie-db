// import { useState } from 'react'
import Navbar from "./components/Navbar"
import SearchBar from "./components/search-bar/SearchBar"
import './App.css'
import TrendingVideos from "./components/trending-videos/TrendingVideos"

function App() {
  // const [count, setCount] = useState(0)

  return (
      <div className="">
        <Navbar/>
        <SearchBar/>
        <TrendingVideos/>
      </div>
  )
}

export default App
