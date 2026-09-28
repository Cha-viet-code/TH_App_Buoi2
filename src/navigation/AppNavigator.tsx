import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StudentListScreen from '../screens/StudentListScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import AddStudentScreen from '../screens/AddStudentScreen';
import EditStudentScreen from '../screens/EditStudentScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

import {Student} from '../types/Student';

export type RootStackParamList = {
  StudentList: undefined;

  Statistics: undefined;

  StudentDetail: {
    studentId: string;
  };

  AddStudent: undefined;

  EditStudent: {
    studentId: string;
  };
};

interface AppNavigatorProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = ({
  students,
  setStudents,
}: AppNavigatorProps) => {
  return (
    <Stack.Navigator
      initialRouteName="StudentList"
      screenOptions={{
        headerShown: true,

        headerStyle: {
          backgroundColor: '#A61B29',
        },

        headerTintColor: '#FFFFFF',

        headerTitleStyle: {
          fontWeight: '700',
        },
      }}>
      {/* ================= DANH SÁCH ================= */}

      <Stack.Screen
        name="StudentList"
        options={{
          title: 'Quản lý sinh viên',
        }}>
        {props => (
          <StudentListScreen
            {...props}
            students={students}
          />
        )}
      </Stack.Screen>

      {/* ================= THỐNG KÊ ================= */}
      <Stack.Screen
        name="Statistics"
        options={{title: 'Thống kê'}}>
        {props => (
          <StatisticsScreen
            {...props}
            students={students}
          />
        )}
      </Stack.Screen>
      
      {/* ================= CHI TIẾT ================= */}

      <Stack.Screen
        name="StudentDetail"
        options={{
          title: 'Chi tiết sinh viên',
        }}>
        {props => (
          <StudentDetailScreen
            {...props}
            students={students}
            setStudents={setStudents}
          />
        )}
      </Stack.Screen>

      {/* ================= THÊM ================= */}

      <Stack.Screen
        name="AddStudent"
        options={{ title: 'Thêm sinh viên' }}>
        {props => (
          <AddStudentScreen
            {...props}
            students={students}
            setStudents={setStudents}
          />
        )}
      </Stack.Screen>

      {/* ================= CHỈNH SỬA ================= */}

      <Stack.Screen
        name="EditStudent"
        options={{ title: 'Chỉnh sửa sinh viên' }}>
        {props => (
          <EditStudentScreen
            {...props}
            students={students}
            setStudents={setStudents}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;