import {useEffect, useState} from 'react'
import axios from 'axios'
import { useAsteroidStore } from '../../stores/asteroidStore'


import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Gauge, Ruler, CircleOff, TriangleAlert, CircleX, ExternalLink } from 'lucide-react'

import Asteroid from '../../../../server/models/Asteroid'



const AsteroidPanel = () => {
  const {setFocusedId, setFocusedName} = useAsteroidStore()

  const [asteroids, setAsteroids] = useState([])
  const [loading, setLoading] = useState(true)
  const [hazardous, setHazardous] = useState(false)
  const [filter, setFilter] = useState('date')
  const [input, setInput] = useState('')

  useEffect(() => {
    const fetchAsteroids = async () => {
      try{
          const response = await axios.get(`http://localhost:3000/astroX?hazardous=${hazardous}&sortBy=${filter}&search=${input}`)
          return setAsteroids(response.data.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchAsteroids()
  }, [hazardous, filter, input])


  const focusAsteroid = (asteroid) => {
    setFocusedId(asteroid._id)
    setFocusedName(asteroid.name)
  }

  return (
    <div className="flex flex-col gap-4 justify-center bg-black/15 rounded-2xl w-120 items-center">
      <div className="flex w-full p-3 pl-5 pr-5 justify-between ">
      <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search"/>

        <div className="w-full px-5">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                <SelectGroup>
                  <SelectLabel>Filter</SelectLabel>
                  <SelectItem value="date">Recent</SelectItem>
                  <SelectItem value="estimated_diameter_km">Diameter</SelectItem>
                  <SelectItem value="velocity_kph">Velocity</SelectItem>
                  <SelectItem value="miss_distance_km">Miss Distance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
        </div>
        <button onClick={() => setHazardous(prev => !prev)} className={`cursor-pointer px-2 justify-center items-center flex rounded-lg ${hazardous ? 'bg-red-500/50' : ''}`}>
          <TriangleAlert className="size-6"/>
        </button>
      </div>

      



      <ScrollArea className="h-[660px] w-[450px] rounded-md shadow-md p-2 pr-3">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 ">
            Loading...
          </div>
        )}
        {asteroids.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center gap-4 ">
            <CircleX className="size-6"/>
            NO ASTEROIDS
          </div>
        ) : (
            <div className="flex flex-col gap-3">
            {asteroids.map((asteroid) => (
              <Card key={asteroid._id} onClick={() => focusAsteroid(asteroid)} className="cursor-pointer bg-black/20 text-white border-none hover:scale-[1.01] hover:shadow-md transition-all duration-200">
                <div className="flex flex-col gap-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{asteroid.name.replace("(", "").replace(")", "")}</CardTitle>

                      <Tooltip>
                        <TooltipTrigger>
                          
                          
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Open Simulation</p>
                        </TooltipContent>
                      </Tooltip>

                    </div>
                    <CardDescription className="text-orange-300">{asteroid.close_approach_date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <CircleOff className="size-4" />
                      <p><span className="font-semibold">Diameter</span>: {asteroid.estimated_diameter_km} km</p>
                    </div>
                    <div className="flex gap-2">
                      <Gauge className="size-4"/>
                      <p><span className="font-semibold">Velocity</span>: {asteroid.velocity_kph} kph</p>
                    </div>
                    <div className="flex gap-2">
                      <Ruler className="size-4"/>
                      <p><span className="font-semibold">Miss Distance</span>: {asteroid.miss_distance_km} km</p>
                    </div>
                    {asteroid.hazardous ? (
                      <div className="flex gap-2 items-center justify-center mt-2 bg-red-500/40 rounded-md py-1 w-27 px-0.5">
                        <p className="">Hazardous</p>
                        <TriangleAlert className="size-4" />

                      </div>
                    ) : (
                      <p className="mt-2">Not Hazardous</p>
                    )}
                </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}
        
      </ScrollArea>
    </div>
  )
}

export default AsteroidPanel
