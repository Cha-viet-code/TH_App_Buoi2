import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

import {COLORS} from '../types/colors';

interface StudentInputProps extends TextInputProps {
  label: string;
  error?: string;
}

const StudentInput = ({
  label,
  error,
  ...textInputProps
}: StudentInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...textInputProps}
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={COLORS.textSecondary}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 7,
  },

  input: {
    height: 48,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: COLORS.text,
  },

  inputError: {
    borderColor: COLORS.danger,
  },

  error: {
    marginTop: 5,
    fontSize: 12,
    color: COLORS.danger,
  },
});

export default StudentInput;