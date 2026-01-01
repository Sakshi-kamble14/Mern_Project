import axios from 'axios'
import config from './config';

// common service access by anyone 
export async function getActiveCourses() {
    const URL=config.BASE_URL+"/course/all-active-courses"
    const response=await axios.get(URL)
    return response.data
}

export async function getCourseById(course_id,token) {
  const headers={token}
  const URL = `${config.BASE_URL}/course/${course_id}`;
  const response = await axios.get(URL,{headers});
  return response.data;
}

// below are need to token
export async function getAllCourses(token) {
  const headers={token}
    const URL=config.BASE_URL+"/course/all-courses"
    const response=await axios.get(URL,{headers})
    return response.data
}


export async function addCourse(courseName, description, fees, startDate, endDate, videoExpireDays,token) {
  const headers={token}
  const URL = config.BASE_URL + "/course/add-course";
  const body = { courseName, description, fees, startDate, endDate, videoExpireDays };
  const response = await axios.post(URL, body,{headers});
  return response.data;
}

// update course
export async function updateCourse(course_id,course_name,description,fees,start_date,end_date,video_expire_days,token) {
  const headers = { token };
  const URL = config.BASE_URL + `/course/update/${course_id}`;
  const body = {course_name,description,fees,start_date,end_date,video_expire_days};
  const response = await axios.put(URL, body, { headers });
  return response.data;
}

// delete course
export async function deleteCourse(course_id, token) {
  const headers = { token };
  const URL = config.BASE_URL + `/course/delete/${course_id}`;
  const response = await axios.delete(URL, { headers });
  return response.data;
}


export async function registerToCourse(course_id, data, token) {
  const headers = { token };
  const URL = `${config.BASE_URL}/course/registerCourse/${course_id}`;
  const response = await axios.post(URL, data, { headers });
  return response.data;
}

export async function getMyCourses(email, token) {
  const headers = { token };
  const URL = `${config.BASE_URL}/course/my-courses?email=${email}`;
  const response = await axios.get(URL, { headers });
  
  return response.data;
}

export async function getMyCoursesWithVideos(token) {
  const headers = { token };
  const URL = `${config.BASE_URL}/course/my_courses_with_videos`;
  const response = await axios.get(URL, { headers });
  return response.data;
}

// export async function getStudentCourses() {
//   const email = localStorage.getItem("email");

//   const URL = `${config.BASE_URL}/student/my-courses?email=${email}`;

//   const response = await axios.get(URL);

//   return response.data;
// }

// export async function getAllvideo() {
//   const email = localStorage.getItem("email");

//   const URL = `${config.BASE_URL}/student/my_courses_with_videos?email=${email}`;

//   const response = await axios.get(URL);

//   return response.data;
// }