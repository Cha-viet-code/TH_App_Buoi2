import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';
import {Student} from './src/types/Student';
import {initialStudents} from './src/types/studentData';

const App = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  return (
    <NavigationContainer>
      <AppNavigator
        students={students}
        setStudents={setStudents}
      />
    </NavigationContainer>
  );
};

export default App;