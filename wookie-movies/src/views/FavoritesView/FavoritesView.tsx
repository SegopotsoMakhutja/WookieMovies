import React, { useState, useEffect } from 'react';
import {
  GridItem, Grid, Flex, Spinner, Heading,
} from '@chakra-ui/react';
import { MovieCard } from '../../components';
import { IMovie } from '../../types/types';

const FavoritesView = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([]);

  // get movies objects from id using the favorites array
  const getFavoriteMovies = JSON.parse(localStorage.getItem('favorites') || '[]');

  useEffect(() => {
    if (localStorage.getItem('favorites') !== null) {
      getFavoriteMovies.forEach((movieId: string) => {
        const localStore = localStorage.getItem(`favorite ${movieId}` || movieId);
        if (localStore !== null) {
          setFavoriteMovies((prevState) => [...prevState, JSON.parse(localStore)]);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex justifyContent="center" alignItems="center" flexDir={{ base: 'column' }}>
      {/* movie tabs here. */}
      <Heading fontSize="2xl" fontFamily="body" mb={4}>
        Favorites
      </Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        {favoriteMovies ? favoriteMovies.map((movie: IMovie) => (
          <GridItem key={movie.id}>
            <MovieCard movie={movie} />
          </GridItem>
        )) : <Spinner label="loading movies" />}
      </Grid>
    </Flex>
  );
};

export default FavoritesView;
