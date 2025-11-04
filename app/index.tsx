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
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { todo_styles } from './styles';

export default function Index() {
  const [activeButton, setActiveButton] = useState<
    'All' | 'Active' | 'Completed'
  >('All');
  const [newTodoText, setNewTodoText] = useState('');
  const { mode, theme, animatedTheme, toggleTheme } = useTheme();
  const dark = mode === 'dark';

  const todos = useQuery(api.todos.getTodos);
  const createTodo = useMutation(api.todos.createTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);

  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    JosefinSans_500Medium,
  });

  if (!fontsLoaded) return null;

  const handleCreateTodo = async () => {
    if (newTodoText.trim()) {
      try {
        await createTodo({ text: newTodoText.trim() });
        setNewTodoText('');
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    }
  };

  const handleToggleTodo = async (id: Id<'todos'>) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  const handleDeleteTodo = async (id: Id<'todos'>) => {
    try {
      await deleteTodo({ id });
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  // Filter todos based on active tab
  const filteredTodos = todos?.filter((todo) => {
    if (activeButton === 'Active') return !todo.isCompleted;
    if (activeButton === 'Completed') return todo.isCompleted;
    return true; // 'All'
  });

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
        <View style={todo_styles.form}>
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
            value={newTodoText}
            onChangeText={setNewTodoText}
            onSubmitEditing={handleCreateTodo}
          />
          <View
            style={[
              todo_styles.check,
              todo_styles.form_circle,
              {
                borderColor: theme.circle_border,
              },
            ]}
          />
        </View>
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
        {todos === undefined ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <ActivityIndicator size='large' color={theme.active_text} />
          </View>
        ) : filteredTodos?.length === 0 ? (
          <View style={{ padding: 40, alignItems: 'center' }}>
            <Animated.Text
              style={{
                color: animatedTheme.inactive_text,
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              {activeButton === 'All'
                ? 'No todos yet. Create one above!'
                : activeButton === 'Active'
                  ? 'No active todos'
                  : 'No completed todos'}
            </Animated.Text>
          </View>
        ) : (
          filteredTodos?.map((todo, i) => {
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
                  <TouchableOpacity
                    onPress={() => handleToggleTodo(todo._id)}
                    style={[
                      todo_styles.check,
                      {
                        borderColor: theme.circle_border,
                        backgroundImage: todo.isCompleted
                          ? theme.checkmark
                          : undefined,
                      },
                    ]}
                  />
                  <Animated.Text
                    style={[
                      todo_styles.todo_text,
                      {
                        color: todo.isCompleted
                          ? animatedTheme.inactive_text
                          : animatedTheme.todo_text,
                        textDecorationLine: todo.isCompleted
                          ? 'line-through'
                          : 'none',
                      },
                    ]}
                  >
                    {todo.text}
                  </Animated.Text>
                </View>
                <TouchableOpacity onPress={() => handleDeleteTodo(todo._id)}>
                  <Feather name='x' size={24} color={theme.delete_color} />
                </TouchableOpacity>
              </View>
            );
          })
        )}
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
          <TouchableOpacity
            key={btn}
            style={todo_styles.footer_button}
            onPress={() => setActiveButton(btn as any)}
          >
            <Animated.Text
              style={[
                todo_styles.footer_button_text,
                {
                  color:
                    activeButton === btn
                      ? theme.active_text
                      : theme.inactive_text,
                },
              ]}
            >
              {btn}
            </Animated.Text>
          </TouchableOpacity>
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
