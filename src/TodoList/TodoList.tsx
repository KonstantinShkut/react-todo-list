import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/useStore';
import TodoListItem from './TodoListItem';
import { AddTodo } from './AddTodo';
import './TodoList.css';

export const TodoList = observer(() => {
  const store = useStore();
  const isListEmpty = !store.todos.length;

  return (
    <div>
      <AddTodo />
      {isListEmpty && <p className="text-center text-muted">
        You don't have any tasks yet. <br />
        Click Add New Task button above to add one.
      </p>}
      <ul className="todo-list shadow">
        {store.todos.map(todo => <TodoListItem
          key={todo.id}
          todo={todo}
          onDelete={store.removeTodo}
          onToggle={store.toggleTodo}
        />)}
      </ul>
    </div>
  );
});
