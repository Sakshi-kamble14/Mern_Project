import axios from "axios";
import config from "./config";

export async function getAllVideos(token) {
  const headers={token}
  const URL = config.BASE_URL + "/video/all_video";
  const response = await axios.get(URL,{headers});
  return response.data;
}

export async function addVideo(course_id, title, youtube_url, description,added_at,token) {
  const headers={token}
  const URL = config.BASE_URL + "/video/add";
  const body = { course_id, title, youtube_url, description ,added_at};
  const response = await axios.post(URL, body,{headers});
  return response.data;
}

export async function updateVideo(video_id,course_id,title,youtube_url,description,token) {
  const headers={token}
  const URL = config.BASE_URL + `/video/update/${video_id}`;
  const body = { course_id, title, youtube_url, description };
  const response = await axios.put(URL, body,{headers});
  return response.data;
}

export async function deleteVideo(video_id,token) {
  const headers={token}
  const URL = config.BASE_URL + `/video/delete/${video_id}`;
  const response = await axios.delete(URL,{headers});
  return response.data;
}
