// const URL = "http://localhost:4000";
// const URL = "https://united-eldt-01b5f6f6813b.herokuapp.com";

import axios from "axios";
import { URL } from "../constants";

export const loginAdmin = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await axios.post(
      `${URL}/admin/login`,
      {
        email,
        password,
      },
      config
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};
export const getInstructors = async (token) => {
  try {
    const result = await axios.get(`${URL}/admin/teachers`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const getStudents = async (token) => {
  try {
    const result = await axios.get(`${URL}/admin/students`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const getCourses = async (token) => {
  try {
    const result = await axios.get(`${URL}/admin/course`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const markVerifiedStudent = async (token, id, adminId) => {
  try {
    const result = await axios.post(
      `${URL}/admin/markVerifiedStudent`,
      {
        id,
        adminId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const markVerifiedTeacher = async (token, id, adminId) => {
  try {
    const result = await axios.post(
      `${URL}/admin/markVerifiedTeacher`,
      {
        id,
        adminId,
      },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const makeTeacherActive = async (token, adminId, superAdminId) => {
  try {
    const result = await axios.post(
      `${URL}/admin/makeTeacherActive`,
      {
        adminId,
        superAdminId,
      },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const makeTeacherInActive = async (token, adminId, superAdminId) => {
  try {
    const result = await axios.post(
      `${URL}/admin/makeTeacherInActive`,
      {
        adminId,
        superAdminId,
      },

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const getCourseByIdForAdmin = async (courseId, token) => {
  try {
    const result = await axios.get(`${URL}/admin/course/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};

export const updateCourseStatsByAdmin = async (courseId, status, token) => {
  try {
    const result = await axios.post(
      `${URL}/admin/course/status/`,
      {
        courseId,
        status,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (error) {
    console.log("Error", error.response.data);
    return error.response.data;
  }
};
