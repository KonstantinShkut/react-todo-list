import React from 'react';
import { Container } from 'react-bootstrap';
import { TodoList } from './TodoList/TodoList';
import { StoreProvider } from './store/useStore';

export default () => {
  return (
    <Container className="mb-5 col-lg-6 col-md-8">
      <StoreProvider>
        <TodoList />
      </StoreProvider>
    </Container>
  );
};
