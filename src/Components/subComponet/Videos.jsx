import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ReactLoading from "react-loading";
import '../../Css/Videoses.css'

export default function Videos({route}) {

 const [videos,setVideos]= useState('')
 const {state} = useLocation();
const {Id} =  state;


const data = {"Id":Id}

  useEffect(()=>{
    const fetchCourseVideos = async (Id)=>{
      try{
        const response = await fetch(`http://localhost:8000/class/classes`,{
          method:'POST',
          body:JSON.stringify(data),
          headers:{'content-type':'application/json'}
        })
        const responsedata = await response.json();
        setVideos(responsedata)
        console.log(responsedata)

      }
      catch(error){
        console.log(error)
      }
    }
    fetchCourseVideos(Id)
  },[])

  if (!videos) {
    return (
      <div className="main">
        <ReactLoading type="balls" color="#0000FF" height={100} width={50} />
        
        
      </div>
    );
  }

  return (
    <div>
      {
        videos.classes.map((item)=>{
          return(
            <div key={item.Id} className="lecter-box">
              <div className="flex">
                <div>
                  <p className="lecter-title">
                    Lecter {item.Class_NO} : {item.Classes_Name}
                  </p>
                </div>
                <div className="button-center-box">
                  <Link >
                    <div className="lecter-button">Delete Now</div>
                  </Link>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
