// @flow

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';
import { EditForm } from './EditForm';

export const AddTodo = observer(() => {
  const [isFormVisible, setFormVisible] = useState(false);
  const toggleForm = () => setFormVisible(!isFormVisible);

  return (
    <section className="mb-4 text-center">
      {isFormVisible
        ? <EditForm onClose={toggleForm} />
        : <Button variant="outline-primary" onClick={toggleForm}>Add New Task</Button>}
    </section>
  );
});
