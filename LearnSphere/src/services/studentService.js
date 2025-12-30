import axios from "axios";
import config from "./config";

export async function getAllstudents(token) {
  const headers={token}
  const URL = config.BASE_URL + "/student/all_students";
  const response = await axios.get(URL,{headers});
  return response.data;
}

export async function getStudentsByCourse(courseId,token) {
  const headers={token}
  const URL = config.BASE_URL + "/student/all_students/by-course/" + courseId;
  const response = await axios.get(URL,{headers});
  return response.data;
}
