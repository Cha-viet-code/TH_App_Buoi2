import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/AppNavigator';
import {Student} from '../types/Student';
import {getStudentRank} from '../types/studentUtils';
import {COLORS} from '../types/colors';
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'StudentDetail'
> & {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
};

const StudentDetailScreen = ({
  navigation,
  route,
  students,
  setStudents,
}: Props) => {
  const {studentId} = route.params;

  const student = students.find(
    item => item.id === studentId,
  );

  if (!student) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>
          Không tìm thấy sinh viên
        </Text>

        <CustomButton
          title="Quay lại"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  const rank = getStudentRank(student.gpa);

  const handleEdit = () => {
    navigation.navigate('EditStudent', {
      studentId: student.id,
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Xóa sinh viên',
      `Bạn có chắc muốn xóa sinh viên "${student.fullName}"?`,
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setStudents(currentStudents =>
              currentStudents.filter(
                item => item.id !== student.id,
              ),
            );

            navigation.goBack();
          },
        },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      
      {/* ================= HEADER ================= */}

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {student.fullName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.name}>
          {student.fullName}
        </Text>

        <Text style={styles.studentCode}>
          {student.studentCode}
        </Text>

        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>
            {rank}
          </Text>
        </View>
      </View>

      {/* ================= GPA ================= */}

      <View style={styles.gpaCard}>
        <Text style={styles.gpaLabel}>
          Điểm trung bình tích lũy
        </Text>

        <Text style={styles.gpa}>
          {student.gpa.toFixed(1)}
        </Text>

        <Text style={styles.gpaRank}>
          Xếp loại: {rank}
        </Text>
      </View>

      {/* ================= THÔNG TIN CÁ NHÂN ================= */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Thông tin cá nhân
        </Text>

        <InfoRow
          label="Mã sinh viên"
          value={student.studentCode}
        />

        <InfoRow
          label="Họ và tên"
          value={student.fullName}
        />

        <InfoRow
          label="Ngày sinh"
          value={student.dateOfBirth}
        />

        <InfoRow
          label="Giới tính"
          value={student.gender}
        />
      </View>

      {/* ================= LIÊN HỆ ================= */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Thông tin liên hệ
        </Text>

        <InfoRow
          label="Email"
          value={student.email}
        />

        <InfoRow
          label="Số điện thoại"
          value={student.phone}
        />
      </View>

      {/* ================= HỌC TẬP ================= */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Thông tin học tập
        </Text>

        <InfoRow
          label="Lớp"
          value={student.className}
        />

        <InfoRow
          label="Khoa"
          value={student.faculty}
        />

        <InfoRow
          label="GPA"
          value={student.gpa.toFixed(1)}
        />

        <InfoRow
          label="Xếp loại"
          value={rank}
        />
      </View>

      {/* ================= BUTTON ================= */}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Chỉnh sửa sinh viên"
          onPress={handleEdit}
        />

        <View style={styles.buttonSpacing} />

        <CustomButton
          title="Xóa sinh viên"
          type="danger"
          onPress={handleDelete}
        />
      </View>
    </ScrollView>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({label, value}: InfoRowProps) => {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '800',
  },

  name: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
  },

  studentCode: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 5,
  },

  rankBadge: {
    backgroundColor: '#FDECEF',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 12,
  },

  rankText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },

  gpaCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginTop: 14,
  },

  gpaLabel: {
    color: '#FBE7EA',
    fontSize: 14,
  },

  gpa: {
    color: COLORS.white,
    fontSize: 40,
    fontWeight: '800',
    marginVertical: 4,
  },

  gpaRank: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },

  section: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  infoLabel: {
    width: '40%',
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  infoValue: {
    width: '58%',
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'right',
  },

  buttonContainer: {
    marginTop: 20,
  },

  buttonSpacing: {
    height: 12,
  },

  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.background,
  },

  notFoundTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default StudentDetailScreen;