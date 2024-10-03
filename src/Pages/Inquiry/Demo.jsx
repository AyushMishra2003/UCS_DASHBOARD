import React, { useState } from 'react'
import HomeLayout from '../../Layouts/HomeLayouts';

const Demo = () => {

    const state=useState(0)
 
    const Test=()=>{
        console.log("i am test ");
    }

    function p1(){
        console.log("aak");
        
    }

    // const p2=()=>{

    // }


  return (
    <HomeLayout>
    <div>
        <button onClick={()=>Test()} className='p-2 py-2 border border-red-500'>Click me</button>
    </div>
    </HomeLayout>
  )
}

export default Demo