// @flow

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export type Todo = {
  id: string;
  name: string;
  description: string;
  due: string;
  completedDate?: string;
};

export const dateFormat = 'MM/DD/YYYY';

const demoTodo = {
  id: uuidv4(),
  name: 'Your first task',
  description: 'Double-click here to edit this task, check the box on the left to complete it or click the × button on the right to delete it.',
  due: moment().format(dateFormat),
};

const rehydrateStorage = (): Array<Todo> => {
  return JSON.parse(localStorage.getItem('store')) || [demoTodo];
};

const syncStore = (todos: Array<Todo>) => {
  localStorage.setItem('store', JSON.stringify(todos));
};

export const createStore = () => ({
  todos: rehydrateStorage(),

  addTodo(data) {
    const todo: Todo = {
      id: uuidv4(),
      ...data,
    };
    this.todos = [todo, ...this.todos];
    syncStore(this.todos);
  },

  updateTodo(id, data) {
    const index = this.todos.findIndex(todo => todo.id === id);
    const todo = this.todos[index];
    this.todos = [
      ...this.todos.slice(0, index),
      {
        ...todo,
        ...data,
      },
      ...this.todos.slice(index + 1)
    ];
    syncStore(this.todos);
  },

  removeTodo({ id }: Todo) {
    const index = this.todos.findIndex(todo => todo.id === id);
    this.todos = [
      ...this.todos.slice(0, index),
      ...this.todos.slice(index + 1)
    ];
    syncStore(this.todos);
  },

  toggleTodo({ id }: Todo) {
    const todo = this.todos.find(item => item.id === id);
    const data = {
      completedDate: todo.completedDate ? null : moment().format()
    };
    this.updateTodo(id, data);
  },
});
