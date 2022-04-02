/* eslint-disable prettier/prettier */
import { IMovieList } from '../types/types';

const { REACT_APP_API_HOST, REACT_APP_AUTH_TOKEN } = process.env;

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Authorization', `Bearer ${REACT_APP_AUTH_TOKEN}`);

export const getMovieList = async (): Promise<IMovieList> => {
  const data = await fetch(`${REACT_APP_API_HOST}`, {
    method: 'GET',
    headers: myHeaders,
  });
  return data.json();
};

export const getMovie = async (id: string): Promise<IMovieList> => {
  const data = await fetch(`${REACT_APP_API_HOST}/${id}`, {
    method: 'GET',
    headers: myHeaders,
  });
  return data.json();
};

export const searchMovie = async (query: string): Promise<IMovieList> => {
  return fetch(`${REACT_APP_API_HOST}?q=${query}`, {
    method: 'GET',
    headers: myHeaders,
  })
    .then((res) => res.json())
    .catch((err) => err);
};
