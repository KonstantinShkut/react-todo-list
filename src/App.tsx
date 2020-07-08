import React from 'react';
import { TodoList } from './TodoList/TodoList';
import { Container } from 'react-bootstrap';
import { StoreProvider } from './store/useStore';
import logo from './logo.svg';

export default () => {
  return (
    <Container className="App col-lg-6 col-md-8">
      <div className="text-center">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <StoreProvider>
        <TodoList />
      </StoreProvider>
    </Container>
  );
};
