import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/AppNavigator';
import {Student} from '../types/Student';
import StudentCard from '../components/StudentCard';
import {COLORS} from '../types/colors';
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'StudentList'
> & {
  students: Student[];
};

const StudentListScreen = ({navigation, students}: Props) => {
  const [searchText, setSearchText] = useState('');

  const filteredStudents = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    if (!keyword) {
      return students;
    }

    return students.filter(student => {
      const matchCode = student.studentCode
        .toLowerCase()
        .includes(keyword);

      const matchName = student.fullName
        .toLowerCase()
        .includes(keyword);

      return matchCode || matchName;
    });
  }, [searchText, students]);

  const handleStudentPress = (student: Student) => {
    navigation.navigate('StudentDetail', {
      studentId: student.id,
    });
  };

  const handleAddStudent = () => {
    navigation.navigate('AddStudent');
  };

  const handleStatistics = () => {
  navigation.navigate('Statistics');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View>
          <Text style={styles.heading}>
            Danh sách sinh viên
          </Text>

          <Text style={styles.subtitle}>
            Tổng số: {students.length} sinh viên
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddStudent}
          activeOpacity={0.8}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statisticsButton}>  
        <CustomButton
            title="Xem thống kê"
            type="secondary"
            onPress={handleStatistics}
          />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm theo mã hoặc họ tên..."
        placeholderTextColor={COLORS.textSecondary}
        value={searchText}
        onChangeText={setSearchText}
      />

      {searchText.length > 0 && (
        <Text style={styles.resultText}>
          Tìm thấy {filteredStudents.length} sinh viên
        </Text>
      )}

      <FlatList
        data={filteredStudents}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <StudentCard
            student={item}
            onPress={() => handleStudentPress(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🔍</Text>

            <Text style={styles.emptyTitle}>
              Không tìm thấy sinh viên
            </Text>

            <Text style={styles.emptyText}>
              Hãy thử tìm kiếm bằng mã sinh viên hoặc họ tên khác.
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },

  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 14,
  },

  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  addButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  addButtonText: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 32,
  },

  searchInput: {
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },

  resultText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },

  listContent: {
    paddingTop: 2,
    paddingBottom: 20,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 45,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  statisticsButton: {
    marginBottom: 12,
  },
});

export default StudentListScreen;