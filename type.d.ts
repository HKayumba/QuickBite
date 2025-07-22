// CustomInput component definition
// This component can be used to create a customizable input field
export interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}
// CustomButton component definition
// This component can be used to create a customizable button
export interface CustomButtonProps {
  title?: string;
  onPress?: () => void;
  isLoading?: boolean;
  style?: object;
  textStyle?: object;
  leftIcon?: React.ReactNode;
}

// CreateUserParams interface definition
// This interface defines the parameters required to create a user
export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

// SignInParams interface definition
// This interface defines the parameters required to sign in a user
export interface SignInParams {
  email: string;
  password: string;
}
