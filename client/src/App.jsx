import NavBar from "./components/myComponents/NavBar"
import AsteroidPanel from "./components/myComponents/AsteroidPanel"
import ChartsPanel from "./components/myComponents/EarthSimulation"

function App() {

  
  return (
    <div className="min-h-screen flex-col pl-5 pr-5">
      <NavBar/>
      <div className="flex gap-2">
        <AsteroidPanel/>
        <ChartsPanel/>
      </div>
      <div className="justify-between items-center flex w-full h-full mt-6">
        <p className="text-gray-500">Built and designed by Zaid Azkoul </p>
        <p className="text-gray-500 text-[9px]">Disclaimer: Asteroid positions in the 3D simulation are randomly generated based on their distance and do not represent actual orbital trajectories.</p>
        <p className="text-gray-500">© 2025 AstroX All rights reserved.</p>
      </div>
    </div>
  )

  
}

export default App
