import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { colors } from "../../ui/tokens";

import styles from "./styles";

enum ButtonVariant {
  faceBook = "faceBook",
  google = "google",
  primary = "primary",
}

type VariantType = keyof typeof ButtonVariant;

type ButtonProps = {
  variant?: VariantType;
  children?: React.ReactNode;
  mb?: number;
  onPress?: () => void;
} & TouchableOpacityProps;

const getContainerStyle = (variant: VariantType) => {
  const mapVariantToColor: { [key in ButtonVariant]: string } = {
    [ButtonVariant.faceBook]: colors.faceBook,
    [ButtonVariant.google]: colors.google,
    [ButtonVariant.primary]: colors.primary,
  };

  return { backgroundColor: mapVariantToColor[variant] };
};

const getTextStyle = (variant: VariantType) => {
  const mapVariantToColor: { [key in ButtonVariant]: string } = {
    [ButtonVariant.faceBook]: colors.white,
    [ButtonVariant.google]: colors.white,
    [ButtonVariant.primary]: colors.white,
  };

  return { color: mapVariantToColor[variant] };
};

const Button = ({
  children,
  mb,
  variant = ButtonVariant.primary,
  onPress = () => {},
  ...props
}: ButtonProps) => {
  const spacingStyle = {
    marginBottom: mb || 0,
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...spacingStyle,
        ...styles.container,
        ...getContainerStyle(variant),
      }}
      {...props}
    >
      <Text style={{ ...styles.text, ...getTextStyle(variant) }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
