// @flow

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form } from 'react-bootstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useStore } from '../store/useStore';
import { useInput } from '../hooks/useInput';
import { dateFormat } from '../store/createStore';
import type { Todo } from '../store/createStore';

type Props = {
  todo?: Todo;
  onClose: () => void;
};

export const EditForm = observer(({ todo, onClose }: Props) => {
  const store = useStore();
  const [name, nameProps, resetName] = useInput(todo ? todo.name : '');
  const [description, descriptionProps, resetDescription] = useInput(todo ? todo.description : '');
  const [due, setDue] = useState(todo && todo.due ? moment(todo.due).toDate() : '');

  const saveTodo = (e) => {
    e.preventDefault();
    const dueDate = due && moment(due).format(dateFormat);
    const data = { name, description, due: dueDate };
    todo
      ? store.updateTodo(todo.id, data)
      : store.addTodo(data);
    close();
  };

  const close = () => {
    resetName();
    resetDescription();
    setDue('');
    onClose();
  };

  return (
    <Form className="p-4 shadow" onSubmit={saveTodo}>
      {!todo && <>
        <h4>Add New Task</h4>
        <p className="text-muted">Please fill out the form to add a new task.</p>
      </>}
      <Form.Group>
        <Form.Control placeholder="Name" required {...nameProps} />
      </Form.Group>
      <Form.Group>
        <Form.Control as="textarea" rows="2" placeholder="Description" {...descriptionProps} />
      </Form.Group>
      <Form.Group>
        <DatePicker
          className="form-control"
          selected={due}
          placeholderText="Target completion date"
          onChange={value => setDue(value)}
        />
      </Form.Group>
      <div className="text-right mb-2">
        <Button variant="default" onClick={close}>
          Cancel
        </Button>
        <Button className="ml-3" variant="round" type="submit">
          {todo ? 'Update' : 'Add Task'}
        </Button>
      </div>
    </Form>
  );
});
