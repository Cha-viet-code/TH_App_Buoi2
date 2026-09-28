import React, {useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../navigation/AppNavigator';
import {Student} from '../types/Student';
import {getStudentRank} from '../types/studentUtils';
import {COLORS} from '../types/colors';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Statistics'
> & {
  students: Student[];
};

const StatisticsScreen = ({
  students,
}: Props) => {
  const statistics = useMemo(() => {
    let gioi = 0;
    let kha = 0;
    let trungBinh = 0;
    let yeu = 0;

    students.forEach(student => {
      const rank = getStudentRank(student.gpa);

      if (rank === 'Giỏi') {
        gioi++;
      } else if (rank === 'Khá') {
        kha++;
      } else if (rank === 'Trung bình') {
        trungBinh++;
      } else {
        yeu++;
      }
    });

    const totalGpa = students.reduce(
      (sum, student) => sum + student.gpa,
      0,
    );

    const averageGpa =
      students.length > 0
        ? totalGpa / students.length
        : 0;

    return {
      gioi,
      kha,
      trungBinh,
      yeu,
      averageGpa,
    };
  }, [students]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Thống kê sinh viên
        </Text>

        <Text style={styles.subtitle}>
          Tổng quan tình hình học tập
        </Text>
      </View>

      {/* Tổng sinh viên */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>
          Tổng số sinh viên
        </Text>

        <Text style={styles.totalNumber}>
          {students.length}
        </Text>

        <Text style={styles.totalDescription}>
          sinh viên trong danh sách
        </Text>
      </View>

      {/* GPA trung bình */}
      <View style={styles.averageCard}>
        <Text style={styles.averageLabel}>
          GPA trung bình
        </Text>

        <Text style={styles.averageNumber}>
          {statistics.averageGpa.toFixed(2)}
        </Text>

        <Text style={styles.averageDescription}>
          điểm trung bình của toàn bộ sinh viên
        </Text>
      </View>

      {/* Xếp loại */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Phân loại học lực
        </Text>

        <StatRow
          title="Giỏi"
          count={statistics.gioi}
          total={students.length}
        />

        <StatRow
          title="Khá"
          count={statistics.kha}
          total={students.length}
        />

        <StatRow
          title="Trung bình"
          count={statistics.trungBinh}
          total={students.length}
        />

        <StatRow
          title="Yếu"
          count={statistics.yeu}
          total={students.length}
        />
      </View>

      {/* Thông tin */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>
          Quy tắc xếp loại
        </Text>

        <Text style={styles.infoText}>
          • GPA từ 8.5 trở lên: Giỏi
        </Text>

        <Text style={styles.infoText}>
          • GPA từ 7.0 đến dưới 8.5: Khá
        </Text>

        <Text style={styles.infoText}>
          • GPA từ 5.0 đến dưới 7.0: Trung bình
        </Text>

        <Text style={styles.infoText}>
          • GPA dưới 5.0: Yếu
        </Text>
      </View>
    </ScrollView>
  );
};

interface StatRowProps {
  title: string;
  count: number;
  total: number;
}

const StatRow = ({
  title,
  count,
  total,
}: StatRowProps) => {
  const percentage =
    total > 0
      ? Math.round((count / total) * 100)
      : 0;

  return (
    <View style={styles.statRow}>
      <View style={styles.statHeader}>
        <Text style={styles.statTitle}>
          {title}
        </Text>

        <Text style={styles.statCount}>
          {count} SV ({percentage}%)
        </Text>
      </View>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progress,
            {
              width: `${percentage}%`,
            },
          ]}
        />
      </View>
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

  totalCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    padding: 22,
    marginBottom: 14,
  },

  totalLabel: {
    color: '#FBE7EA',
    fontSize: 14,
  },

  totalNumber: {
    color: COLORS.white,
    fontSize: 42,
    fontWeight: '800',
    marginTop: 4,
  },

  totalDescription: {
    color: COLORS.white,
    fontSize: 14,
  },

  averageCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 22,
    marginBottom: 14,
  },

  averageLabel: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  averageNumber: {
    color: COLORS.primary,
    fontSize: 36,
    fontWeight: '800',
    marginTop: 4,
  },

  averageDescription: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },

  section: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 18,
  },

  statRow: {
    marginBottom: 18,
  },

  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  statTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },

  statCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  progressBackground: {
    height: 9,
    backgroundColor: COLORS.border,
    borderRadius: 10,
    overflow: 'hidden',
  },

  progress: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },

  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10,
  },

  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
});

export default StatisticsScreen;