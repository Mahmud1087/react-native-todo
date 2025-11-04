import { StyleSheet } from 'react-native';

export const todo_styles = StyleSheet.create({
  bg_image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240,
    width: 500,
  },

  img: {
    width: '100%',
    height: '100%',
  },

  container: {
    paddingTop: 75,
    paddingBottom: 70,
    paddingLeft: 30,
    paddingRight: 30,
    position: 'relative',
    zIndex: 10,
    height: '100%',
    overflow: 'scroll',
    fontSize: 16,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  form_section: {
    marginTop: 28,
    width: '100%',
  },

  form: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
    gap: 6,
    position: 'relative',
  },

  input: {
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 0,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 60,
    paddingRight: 10,
  },

  add_button: {
    borderRadius: 6,
  },

  todos: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    borderRadius: 8,
  },

  todo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
  },

  check: {
    width: 24,
    height: 24,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 2,
  },

  check_gradient: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  form_circle: {
    position: 'absolute',
    left: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
  },

  todo_text: {
    fontSize: 16,
  },

  buttons: {
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
  },

  footer_button: {
    padding: 12,
    backgroundColor: 'transparent',
  },

  footer_button_text: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  todo_footer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 20,
    paddingRight: 20,
  },

  button: {},
});
