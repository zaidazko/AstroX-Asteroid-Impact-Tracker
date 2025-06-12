import React from 'react'
import {Sun, Orbit} from 'lucide-react'
import { Switch } from '../ui/switch'
import { Separator } from "@/components/ui/separator"





const NavBar = () => {
  return (
    <div className="flex items-center gap-5 justify-between p-5 pt-8 min-w-full h-10 mb-5 ">
        <div className="flex gap-2">
          <Orbit className="size-7"/>
          <h1 className='text-2xl font-bold'>AstroX | Asteroid Impact Tracker</h1>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <p>Powered by Nasa's NeoWs API</p>
          <img src='src/assets/nasa.png' className="size-10"></img>

        </div>
        
        
      
    </div>
  )
}

export default NavBar
