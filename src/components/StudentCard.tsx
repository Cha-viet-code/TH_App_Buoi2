import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {Student} from '../types/Student';
import {getStudentRank} from '../types/studentUtils';
import {COLORS} from '../types/colors';

interface StudentCardProps {
  student: Student;
  onPress: () => void;
}

const StudentCard = ({student, onPress}: StudentCardProps) => {
  const rank = getStudentRank(student.gpa);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {student.fullName.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {student.fullName}
          </Text>

          <Text style={styles.studentCode}>
            {student.studentCode}
          </Text>
        </View>

        <View style={styles.gpaContainer}>
          <Text style={styles.gpa}>{student.gpa.toFixed(1)}</Text>
          <Text style={styles.gpaLabel}>GPA</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <Text style={styles.classText}>
          Lớp: {student.className}
        </Text>

        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },

  studentCode: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  gpaContainer: {
    alignItems: 'center',
    marginLeft: 10,
  },

  gpa: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },

  gpaLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  classText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  rankBadge: {
    backgroundColor: '#FDECEF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },

  rankText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default StudentCard;