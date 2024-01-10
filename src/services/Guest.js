// const URL = "http://localhost:4000";
// const URL = "https://united-eldt-01b5f6f6813b.herokuapp.com";

import { URL } from "../constants";

import axios from "axios";
export const getTeacherInfoForGuest = async (teacherId) => {
  try {
    const result = await axios.get(`${URL}/ins/${teacherId}`);
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const getApprovedCourses = async () => {
  try {
    const result = await axios.get(`${URL}/course`);

    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const getApprovedCourseById = async (courseId) => {
  try {
    const result = await axios.get(`${URL}/course/${courseId}`);
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const getLessonsOfCourse = async (courseId, language = "en") => {
  try {
    const result = await axios.post(
      `${URL}/course/lesson?language=${language}`,
      {
        chapterId: courseId,
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};
