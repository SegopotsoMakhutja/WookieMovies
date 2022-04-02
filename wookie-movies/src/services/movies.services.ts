import { IMovie } from '../types/types';

const { REACT_API_HOST, AUTH_TOKEN } = process.env;

export const getMovieList = async (): Promise<IMovie> => {
  const data = await fetch(`${REACT_API_HOST}`, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return data.json();
};

export const getMovie = async (id: string): Promise<IMovie> => {
  const data = await fetch(`${REACT_API_HOST}/${id}`, {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  });
  return data.json();
};

export const searchMovie = async (query: string): Promise<IMovie> => {
  return fetch(`${REACT_API_HOST}?q=${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => err);
};
