import {Suspense, useEffect, useState, useRef} from 'react'
import axios from 'axios'
import { Canvas} from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Earth from '/public/Earth'
import Asteroid from '/public/Asteroid'
import { useAsteroidStore } from '../../stores/asteroidStore'



const EarthSimulation = () => {
  const [asteroids, setAsteroids] = useState([])
  const [currentlySelected, setCurrentlySelected] = useState('Earth')
  const controlsRef = useRef()
  const asteroidRefs = useRef({})
  const cameraRef = useRef()
  const asteroidPositions = useRef({})
  const {focusedId, focusedName} = useAsteroidStore()
  const [minDist, setMinDist] = useState(3.5)
  const [maxDist, setMaxDist] = useState(200)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/astroX"); // adjust if needed
        setAsteroids(res.data.data);
        res.data.data.forEach((asteroid) => {
          if (!asteroidPositions.current[asteroid._id]) {
            asteroidPositions.current[asteroid._id] = getAsteroidPosition(asteroid)
          }
        })
        
      } catch (err) {
        console.log("Error fetching asteroid data:", err);
      }
    };
  
    fetchData();
  }, [])

  useEffect(() => {
    focusAsteroid(focusedId)
  }, [focusedId])

  
  const getAsteroidPosition = (asteroid) => {
    let distance = parseFloat(asteroid.miss_distance_km) / 1_000_000;
    distance = Math.max(distance, 2);
  
    const theta = Math.random() * 2 * Math.PI; // horizontal angle
    const phi = Math.acos(2 * Math.random() - 1); // vertical angle (0 to π)
  
    const x = distance * Math.sin(phi) * Math.cos(theta);
    const y = distance * Math.sin(phi) * Math.sin(theta);
    const z = distance * Math.cos(phi);
  
    return [x, y, z];
  };

  const getAsteroidScale = (asteroid) => {
    const raw = parseFloat(asteroid.estimated_diameter_km);
    const scaled = Math.max(0.05, raw / 5); // Prevent too small
    return [scaled, scaled, scaled];
  };

  const focusAsteroid = (id) => {
    const mesh = asteroidRefs.current[id];
    if (mesh && controlsRef.current) {
      controlsRef.current.target.copy(mesh.position); // focus
      controlsRef.current.update(); // apply the change
      setMinDist(0.5)
      setMaxDist(500)
      cameraRef.current.fov = 4
      cameraRef.current.updateProjectionMatrix()
      setCurrentlySelected(focusedName)
    }
  }

  const focusEarth = () => {
    controlsRef.current.target.set(0, 0, 0)
    controlsRef.current.update()

    cameraRef.current.position.set(2, 2, 4)
    cameraRef.current.fov = 40
    cameraRef.current.updateProjectionMatrix();
    setMinDist(3.5)
    setMaxDist(200)
    setCurrentlySelected('Earth')
  }
    
  return (
    <div className="flex flex-col gap-4 justify-center bg-black/60 rounded-2xl w-[100%] items-center">
        <Canvas camera={{position: [2, 2, 4], fov: 40}}
          onCreated = { ({camera}) => {
            cameraRef.current = camera
          }}
        >
            <ambientLight intensity={1}/>
            <OrbitControls ref={controlsRef} minDistance={minDist} maxDistance={maxDist}/>
            <Suspense fallback={null}>
                <Earth/>
            </Suspense>
            <Environment preset='sunset'/>

            {asteroids.map((asteroid) => (
              <mesh
                key={asteroid._id}
                position={asteroidPositions.current[asteroid._id]}
                ref={(el) => {asteroidRefs.current[asteroid._id] = el}}
              >
                <group scale={getAsteroidScale(asteroid)}>
                    <Asteroid/>
                </group>
              </mesh>
            ))}

        </Canvas>
        <div className="flex bg-none flex-col justify-center items-center"> 
          <p>Currently Selected: {currentlySelected}</p>
          <button className="cursor-pointer p-2"
                  onClick={focusEarth}>
            Reset Camera
          </button>
        </div>

    </div>
  )
}

export default EarthSimulation
