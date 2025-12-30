
import axios from "axios";
import config from "./config";

export async function getAllCourses() {
  const URL = config.BASE_URL + "/course/all-courses";
  const response = await axios.get(URL);
  return response.data;
}


export async function getStudentCourses() {
 
  const email = sessionStorage.getItem("email"); 

  const URL = `${config.BASE_URL}/student/my-courses/${email}`;

  const response = await axios.get(URL, {
    headers: { token : "token"  }
  });

  return response.data;
}



export async function getAllvideo() {
  const email = sessionStorage.getItem("email");

  const URL = `${config.BASE_URL}/student/my_course_with_video?email=${email}`;

  const response = await axios.get(URL, {
    headers: { token: sessionStorage.getItem("token") }
  });

  return response.data;
}



