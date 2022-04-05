/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { HelmetProvider } from 'react-helmet-async';
import { Router, Outlet } from '@tanstack/react-location';
import { location, routes } from './routes/routes';
import { Header } from './components';

const helmetContext = {};

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <HelmetProvider context={helmetContext}>
        <Router location={location} routes={routes}>
          <Header>
            <Outlet />
          </Header>
        </Router>
      </HelmetProvider>
    </ChakraProvider>
  );
}
