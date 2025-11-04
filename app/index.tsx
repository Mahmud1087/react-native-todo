import DarkLogo from '@/assets/images/dark-bg.jpg';
import LightLogo from '@/assets/images/light-bg.jpg';
import Logo from '@/assets/images/logo.svg';
import { api } from '@/convex/_generated/api';
import {
  JosefinSans_400Regular,
  JosefinSans_500Medium,
  useFonts,
} from '@expo-google-fonts/josefin-sans';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useTheme } from '@/context/theme_context';
import { useQuery } from 'convex/react';
import { useState } from 'react';
import { Animated, Image, TextInput, View } from 'react-native';
import './global.css';
import { todo_styles } from './styles';

export default function Index() {
  const [activeButton, setActiveButton] = useState<
    'All' | 'Active' | 'Completed'
  >('All');
  const { mode, theme, animatedTheme, toggleTheme } = useTheme();
  const dark = mode === 'dark';
  const tasks = useQuery(api.tasks.get);
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_500Medium,
  });

  if (!fontsLoaded) return null;

  return (
    <Animated.View
      style={[
        todo_styles.container,
        {
          backgroundColor: animatedTheme.container_bg,
        },
      ]}
    >
      <View style={[todo_styles.bg_image]}>
        <Image
          style={[todo_styles.img]}
          source={dark ? DarkLogo : LightLogo}
          alt='Background Image'
        />
      </View>

      <View style={[todo_styles.header]}>
        <Image source={Logo} alt='Todo Logo' />
        <Ionicons
          name={dark ? 'sunny-sharp' : 'moon-sharp'}
          size={24}
          color='white'
          onPress={toggleTheme}
        />
      </View>

      <View style={[todo_styles.form_section]}>
        <form style={todo_styles.form}>
          <TextInput
            className='form-input'
            style={[
              todo_styles.input,
              {
                color: theme.input_text,
                backgroundColor: theme.background,
                width: '100%',
              },
            ]}
            placeholder='Create a new todo...'
          />
          <View
            className='form-circle'
            style={[
              todo_styles.check,
              {
                borderColor: theme.circle_border,
              },
            ]}
          />
        </form>
      </View>

      <Animated.View
        className='todos'
        style={[
          todo_styles.todos,
          {
            backgroundColor: animatedTheme.background,
          },
        ]}
      >
        {tasks?.map((task, i) => {
          return (
            <View
              className='todo'
              style={[
                todo_styles.todo,
                {
                  borderTopColor: theme.border,
                },
              ]}
              key={i}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                }}
              >
                <View
                  style={[
                    todo_styles.check,
                    {
                      borderColor: theme.circle_border,
                      backgroundImage: task.isCompleted && theme.checkmark,
                    },
                  ]}
                />
                <Animated.Text
                  style={[
                    todo_styles.todo_text,
                    {
                      color: task.isCompleted
                        ? animatedTheme.inactive_text
                        : animatedTheme.todo_text,
                      textDecorationLine: task.isCompleted && 'line-through',
                    },
                  ]}
                >
                  {task.text}
                </Animated.Text>
              </View>
              <Feather name='x' size={24} color={theme.delete_color} />
            </View>
          );
        })}
      </Animated.View>

      <Animated.View
        style={[
          todo_styles.buttons,
          {
            backgroundColor: animatedTheme.background,
          },
        ]}
      >
        {['All', 'Active', 'Completed'].map((btn) => (
          <button
            key={btn}
            className='footer_button'
            style={{
              color:
                activeButton === btn ? theme.active_text : theme.inactive_text,
            }}
            onClick={() => setActiveButton(btn as any)}
          >
            {btn}
          </button>
        ))}
      </Animated.View>

      <Animated.Text
        style={{
          fontSize: 17,
          color: animatedTheme.inactive_text,
          fontWeight: 500,
          textAlign: 'center',
          marginTop: 50,
        }}
      >
        Drag and drop to reorder list
      </Animated.Text>
    </Animated.View>
  );
}
