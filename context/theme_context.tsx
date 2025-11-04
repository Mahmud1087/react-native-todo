import { colors } from '@/constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated, Appearance, Easing } from 'react-native';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  theme: Record<string, string>;
  animatedTheme: Record<string, Animated.AnimatedInterpolation<string>>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  theme: colors.light,
  animatedTheme: {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemTheme = Appearance.getColorScheme() as ThemeMode;
  const [mode, setMode] = useState<ThemeMode>(systemTheme ?? 'light');

  // Load saved theme on mount
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('themeMode');
      if (saved) setMode(saved as ThemeMode);
    })();
  }, []);

  // Save mode to storage
  useEffect(() => {
    AsyncStorage.setItem('themeMode', mode);
  }, [mode]);

  // Animated value to interpolate between light and dark
  const animation = useRef(new Animated.Value(mode === 'dark' ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: mode === 'dark' ? 1 : 0,
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [mode]);

  // Interpolate colors
  const animatedTheme: Record<
    string,
    Animated.AnimatedInterpolation<string>
  > = {};
  const light = colors.light;
  const dark = colors.dark;

  Object.keys(light).forEach((key) => {
    const k = key as keyof typeof light;
    animatedTheme[k as string] = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [light[k], dark[k]],
    });
  });

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{ mode, theme: colors[mode], animatedTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
