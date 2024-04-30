import React from 'react'

import {HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon} from "@heroicons/react/outline"

function Sidebar() {
  return (
 <div>
    <div>
        <button className="flex">
     < HomeIcon className='w-5 h-5'/>
     <p>Home</p>
     </button>
     
     <button className="flex">
     < SearchIcon className='w-5 h-5'/>
     <p>Search</p>
     </button>

     <button className="flex">
     < LibraryIcon className='w-5 h-5'/>
     <p>Your Library</p>
     </button>

    </div>
 </div>
  )
}

export default Sidebar
