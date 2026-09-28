import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {COLORS} from '../types/colors';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
}

const CustomButton = ({
  title,
  onPress,
  type = 'primary',
  loading = false,
  disabled = false,
}: CustomButtonProps) => {
  const getButtonStyle = () => {
    if (type === 'secondary') {
      return styles.secondaryButton;
    }

    if (type === 'danger') {
      return styles.dangerButton;
    }

    return styles.primaryButton;
  };

  const getTextStyle = () => {
    if (type === 'secondary') {
      return styles.secondaryText;
    }

    return styles.whiteText;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={[styles.text, getTextStyle()]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  primaryButton: {
    backgroundColor: COLORS.primary,
  },

  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  dangerButton: {
    backgroundColor: COLORS.danger,
  },

  disabledButton: {
    opacity: 0.5,
  },

  text: {
    fontSize: 16,
    fontWeight: '700',
  },

  whiteText: {
    color: COLORS.white,
  },

  secondaryText: {
    color: COLORS.primary,
  },
});

export default CustomButton;