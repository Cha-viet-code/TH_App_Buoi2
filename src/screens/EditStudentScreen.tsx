import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/AppNavigator';
import {Student} from '../types/Student';
import {COLORS} from '../types/colors';
import StudentInput from '../components/StudentInput';
import CustomButton from '../components/CustomButton';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'EditStudent'
> & {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
};

const EditStudentScreen = ({
  navigation,
  route,
  students,
  setStudents,
}: Props) => {
  const {studentId} = route.params;

  // Tìm sinh viên cần chỉnh sửa
  const student = students.find(
    item => item.id === studentId,
  );

  // Không tìm thấy sinh viên
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

  return (
    <EditStudentForm
      student={student}
      students={students}
      setStudents={setStudents}
      navigation={navigation}
    />
  );
};

interface EditStudentFormProps {
  student: Student;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  navigation: any;
}

const EditStudentForm = ({
  student,
  students,
  setStudents,
  navigation,
}: EditStudentFormProps) => {
  const [studentCode, setStudentCode] = useState(
    student.studentCode,
  );

  const [fullName, setFullName] = useState(
    student.fullName,
  );

  const [dateOfBirth, setDateOfBirth] = useState(
    student.dateOfBirth,
  );

  const [gender, setGender] = useState<
    'Nam' | 'Nữ' | 'Khác'
  >(student.gender);

  const [email, setEmail] = useState(
    student.email,
  );

  const [phone, setPhone] = useState(
    student.phone,
  );

  const [className, setClassName] = useState(
    student.className,
  );

  const [faculty, setFaculty] = useState(
    student.faculty,
  );

  const [gpa, setGpa] = useState(
    student.gpa.toString(),
  );

  const handleUpdateStudent = () => {
    const code = studentCode.trim();
    const name = fullName.trim();
    const dob = dateOfBirth.trim();
    const studentEmail = email.trim();
    const studentPhone = phone.trim();
    const studentClass = className.trim();
    const studentFaculty = faculty.trim();

    // 1. Kiểm tra trường bắt buộc
    if (
      !code ||
      !name ||
      !dob ||
      !studentEmail ||
      !studentPhone ||
      !studentClass ||
      !studentFaculty ||
      !gpa.trim()
    ) {
      Alert.alert(
        'Thiếu thông tin',
        'Vui lòng nhập đầy đủ thông tin sinh viên.',
      );
      return;
    }

    // 2. Kiểm tra mã sinh viên trùng
    // Bỏ qua chính sinh viên đang chỉnh sửa
    const isDuplicateCode = students.some(
      item =>
        item.id !== student.id &&
        item.studentCode.toLowerCase() ===
          code.toLowerCase(),
    );

    if (isDuplicateCode) {
      Alert.alert(
        'Mã sinh viên đã tồn tại',
        'Vui lòng nhập một mã sinh viên khác.',
      );
      return;
    }

    // 3. Kiểm tra ngày sinh
    const dateRegex =
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (!dateRegex.test(dob)) {
      Alert.alert(
        'Ngày sinh không hợp lệ',
        'Vui lòng nhập theo định dạng DD/MM/YYYY.\nVí dụ: 15/05/2003',
      );
      return;
    }

    // 4. Kiểm tra email
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(studentEmail)) {
      Alert.alert(
        'Email không hợp lệ',
        'Vui lòng nhập đúng định dạng email.',
      );
      return;
    }

    // 5. Kiểm tra số điện thoại
    const phoneRegex = /^0\d{9}$/;

    if (!phoneRegex.test(studentPhone)) {
      Alert.alert(
        'Số điện thoại không hợp lệ',
        'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.',
      );
      return;
    }

    // 6. Kiểm tra GPA
    const gpaNumber = Number(gpa);

    if (Number.isNaN(gpaNumber)) {
      Alert.alert(
        'GPA không hợp lệ',
        'GPA phải là một số.',
      );
      return;
    }

    if (gpaNumber < 0 || gpaNumber > 10) {
      Alert.alert(
        'GPA không hợp lệ',
        'GPA phải nằm trong khoảng từ 0 đến 10.',
      );
      return;
    }

    // 7. Cập nhật sinh viên
    setStudents(currentStudents =>
      currentStudents.map(item => {
        if (item.id !== student.id) {
          return item;
        }

        return {
          ...item,
          studentCode: code,
          fullName: name,
          dateOfBirth: dob,
          gender,
          email: studentEmail,
          phone: studentPhone,
          className: studentClass,
          faculty: studentFaculty,
          gpa: gpaNumber,
        };
      }),
    );

    // 8. Thông báo thành công
    Alert.alert(
      'Cập nhật thành công',
      `Thông tin của "${name}" đã được cập nhật.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Chỉnh sửa sinh viên
          </Text>

          <Text style={styles.subtitle}>
            Cập nhật thông tin bên dưới
          </Text>
        </View>

        {/* Thông tin cơ bản */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Thông tin cơ bản
          </Text>

          <StudentInput
            label="Mã sinh viên *"
            placeholder="Ví dụ: B21DCCN001"
            value={studentCode}
            onChangeText={setStudentCode}
            autoCapitalize="characters"
          />

          <StudentInput
            label="Họ và tên *"
            placeholder="Nhập họ và tên"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />

          <StudentInput
            label="Ngày sinh *"
            placeholder="DD/MM/YYYY"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            keyboardType="numeric"
            maxLength={10}
          />

          {/* Giới tính */}
          <Text style={styles.inputLabel}>
            Giới tính *
          </Text>

          <View style={styles.genderContainer}>
            {(['Nam', 'Nữ', 'Khác'] as const).map(
              item => {
                const isSelected = gender === item;

                return (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.genderButton,
                      isSelected &&
                        styles.genderButtonSelected,
                    ]}
                    onPress={() =>
                      setGender(item)
                    }>
                    <Text
                      style={[
                        styles.genderText,
                        isSelected &&
                          styles.genderTextSelected,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        </View>

        {/* Thông tin liên hệ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Thông tin liên hệ
          </Text>

          <StudentInput
            label="Email *"
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <StudentInput
            label="Số điện thoại *"
            placeholder="0987654321"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        {/* Thông tin học tập */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Thông tin học tập
          </Text>

          <StudentInput
            label="Lớp *"
            placeholder="Ví dụ: D21CQCN01"
            value={className}
            onChangeText={setClassName}
            autoCapitalize="characters"
          />

          <StudentInput
            label="Khoa *"
            placeholder="Ví dụ: Công nghệ thông tin"
            value={faculty}
            onChangeText={setFaculty}
          />

          <StudentInput
            label="GPA *"
            placeholder="Ví dụ: 8.5"
            value={gpa}
            onChangeText={setGpa}
            keyboardType="decimal-pad"
            maxLength={4}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Lưu thay đổi"
            onPress={handleUpdateStudent}
          />

          <View style={styles.buttonSpacing} />

          <CustomButton
            title="Hủy"
            type="secondary"
            onPress={() => navigation.goBack()}
          />
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  section: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 14,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },

  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },

  genderButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  genderText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },

  genderTextSelected: {
    color: COLORS.white,
  },

  buttonContainer: {
    marginTop: 4,
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

export default EditStudentScreen;