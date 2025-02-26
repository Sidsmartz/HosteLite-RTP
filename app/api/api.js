import axios from "axios";

// Backend API URL (Change this to your actual backend IP)
const API_URL = "http://192.168.1.3:5000";

// Fetch all students
export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Add a student
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/students`, studentData);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// Update attendance
export const updateAttendance = async (id, attendance) => {
  try {
    const response = await axios.put(`${API_URL}/students/${id}`, {
      attendance,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating attendance:", error);
    throw error;
  }
};
