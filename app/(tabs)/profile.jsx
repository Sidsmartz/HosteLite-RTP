import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getStudents, addStudent, updateAttendance } from "../api/api"; // Import API functions

export default function App() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: "",
    rollNumber: "",
    block: "",
    roomNumber: "",
    studentId: "",
    phoneNumber: "",
    parentContact: "",
    department: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      Alert.alert("Error fetching students");
    }
  };

  const handleAddStudent = async () => {
    try {
      await addStudent(newStudent);
      Alert.alert("Student Added");
      setNewStudent({
        name: "",
        rollNumber: "",
        block: "",
        roomNumber: "",
        studentId: "",
        phoneNumber: "",
        parentContact: "",
        department: "",
      });
      fetchStudents(); // Refresh student list
    } catch (error) {
      Alert.alert("Error adding student");
    }
  };

  const handleUpdateAttendance = async (id, status) => {
    try {
      await updateAttendance(id, status);
      fetchStudents(); // Refresh after update
    } catch (error) {
      Alert.alert("Error updating attendance");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Add Student</Text>
      <TextInput
        placeholder="Name"
        value={newStudent.name}
        onChangeText={(text) => setNewStudent({ ...newStudent, name: text })}
      />
      <TextInput
        placeholder="Roll Number"
        value={newStudent.rollNumber}
        onChangeText={(text) =>
          setNewStudent({ ...newStudent, rollNumber: text })
        }
      />
      <TextInput
        placeholder="Block"
        value={newStudent.block}
        onChangeText={(text) => setNewStudent({ ...newStudent, block: text })}
      />
      <TextInput
        placeholder="Room Number"
        value={newStudent.roomNumber}
        onChangeText={(text) =>
          setNewStudent({ ...newStudent, roomNumber: text })
        }
      />
      <TextInput
        placeholder="Student ID"
        value={newStudent.studentId}
        onChangeText={(text) =>
          setNewStudent({ ...newStudent, studentId: text })
        }
      />
      <TextInput
        placeholder="Phone Number"
        value={newStudent.phoneNumber}
        onChangeText={(text) =>
          setNewStudent({ ...newStudent, phoneNumber: text })
        }
      />
      <TextInput
        placeholder="Parent Contact"
        value={newStudent.parentContact}
        onChangeText={(text) =>
          setNewStudent({ ...newStudent, parentContact: text })
        }
      />
      <TextInput
        placeholder="Department"
        value={newStudent.department}
        onChangeText={(text) =>
          setNewStudent({ ...newStudent, department: text })
        }
      />
      <Button title="Add Student" onPress={handleAddStudent} />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        Students
      </Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>
              {item.name} - {item.attendance}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <TouchableOpacity
                onPress={() => handleUpdateAttendance(item._id, "Present")}
                style={{ marginRight: 10 }}
              >
                <Text style={{ color: "green" }}>Present</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleUpdateAttendance(item._id, "Absent")}
                style={{ marginRight: 10 }}
              >
                <Text style={{ color: "red" }}>Absent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleUpdateAttendance(item._id, "Out")}
              >
                <Text style={{ color: "blue" }}>Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
