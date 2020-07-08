import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { observer } from 'mobx-react-lite';
import { EditForm } from './EditForm';

export const AddTodo = observer(() => {
  const [isFormVisible, setFormVisible] = useState(false);
  const toggleForm = () => setFormVisible(!isFormVisible);

  return (
    <section className="mb-4 text-center">
      {isFormVisible
        ? <EditForm onClose={toggleForm} />
        : <Button variant="round" onClick={toggleForm}>Add New Task</Button>}
    </section>
  );
});
