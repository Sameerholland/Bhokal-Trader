import axios from "axios";
export function AddCourse(userdata) {
  return new Promise(async (resolve) => {
    console.log(userdata)
    try{
    const response = await fetch(`http://localhost:8000upload`,  {
      method:'POST',
      body:userdata,
      
      
    });
    const data = await response.json();
    resolve({ data });
  }
  catch(err){
    console.log("Error in uploading",err)
  }
  });
}



export function getAllCources() {
  return new Promise(async (resolve) => {
   console.log('Get All Courses API Called')
    const response = await fetch(`http://localhost:8000/course/Courses`, {
      method: "GET",
      body: JSON.stringify(),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
