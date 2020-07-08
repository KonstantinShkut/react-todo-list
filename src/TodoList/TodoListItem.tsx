import React, { useState } from 'react';
import moment from 'moment';
import { EditForm } from './EditForm';
import { Todo } from '../store/createStore';

interface Props {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onToggle: (todo: Todo) => void;
}

const TodoListItem = ({ todo, onDelete, onToggle }: Props) => {
  const [isEditing, setEditing] = useState(false);

  const deleteTodo = () => onDelete(todo);

  const toggleTodoCompletion = () => onToggle(todo);

  const toggleTodoEditing = () => setEditing(!isEditing);

  return (
    <li className={!!todo.completedDate ? 'done' : ''}>
      {isEditing && <EditForm todo={todo} onClose={toggleTodoEditing} />}
      {!isEditing && <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={!!todo.completedDate}
          onChange={toggleTodoCompletion}
        />
        <label onDoubleClick={toggleTodoEditing}>
          <div className="name">{todo.name}</div>
          <div className="text-muted">
            {
              todo.description && <div className="description my-2">{todo.description}</div>
            }
            <div className="date">
              {todo.due && <span className="completion">Due {todo.due}</span>}
              {todo.completedDate && <span className="completed">
                — Completed {moment(todo.completedDate).format('LLL')}
              </span>}
            </div>
          </div>
        </label>
        <button className="destroy" onClick={deleteTodo} />
      </div>}
    </li>
  );
};

export default React.memo(TodoListItem);
