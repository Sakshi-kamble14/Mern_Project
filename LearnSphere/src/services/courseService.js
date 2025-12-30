import axios from 'axios'
import config from './config';



export async function getAllCourses() {
    const URL=config.BASE_URL+"/course/all-courses"
    const response=await axios.get(URL)
    return response.data
}
export async function getActiveCourses() {
    const URL=config.BASE_URL+"/course/all-active-course"
    const response=await axios.get(URL)
    return response.data
}

export async function addCourse(courseName,description,fees,startDate,endDate,videoExpireDays) {
    const URL=config.BASE_URL+"/course/add-course"
    const body={courseName,description,fees,startDate,endDate,videoExpireDays}
    const response=await axios.get(URL,body)
    return response.data
    
}
export async function getCourseById(course_id){
    const URL = config.BASE_URL +"/course/"+ course_id;
    const response = await axios.get(URL)
    return response.data
}

export async function registercourse(data) {
  const URL = config.BASE_URL + "/user/registertocourse"

  const token = localStorage.getItem("token")

  const response = await axios.post(
    URL,
    data,
    {
     headers: { Authorization: `Bearer ${token}` }

    }
  )

  return response.data
}
