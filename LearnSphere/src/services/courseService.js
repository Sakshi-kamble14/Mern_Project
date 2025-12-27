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