import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Create a new todo
export const createTodo = mutation({
  args: {
    text: v.string(),
    isCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert('todos', {
      text: args.text,
      isCompleted: args.isCompleted ?? false,
      createdAt: Date.now(),
    });
    return todoId;
  },
});

// Get all todos
export const getTodos = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db.query('todos').order('desc').collect();
    return todos;
  },
});

// Get a single todo by ID
export const getTodo = query({
  args: {
    id: v.id('todos'),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    return todo;
  },
});

// Update a todo
export const updateTodo = mutation({
  args: {
    id: v.id('todos'),
    text: v.optional(v.string()),
    isCompleted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Delete a todo
export const deleteTodo = mutation({
  args: {
    id: v.id('todos'),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Toggle todo completion status
export const toggleTodo = mutation({
  args: {
    id: v.id('todos'),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
    return args.id;
  },
});
