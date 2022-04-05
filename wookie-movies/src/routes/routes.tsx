import React from 'react';
import { ReactLocation } from '@tanstack/react-location';
import { Home, NotFound, MovieDetails } from '../views';

// Set up a ReactLocation instance
export const location = new ReactLocation();

// create a routes object
export const routes = [
  { path: '/', element: <Home /> },
  { path: '/search-results', element: <Home /> },
  { path: '/movie-details/:slug/:id', element: <MovieDetails /> },
  // last path for any other routes that are not defined.
  { path: '*', element: <NotFound /> },
];
