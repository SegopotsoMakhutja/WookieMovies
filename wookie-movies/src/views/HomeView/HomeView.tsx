import React, { useEffect, useState } from 'react';
import {
  GridItem, Grid, Flex, Spinner, Heading,
} from '@chakra-ui/react';
import { getMovieList } from '../../services/movies.services';
import { IMovieList, IMovie } from '../../types/types';
import { MovieCard } from '../../components';
import { SearchBar } from '../../components/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState<IMovieList>();
  const [searchValue, setSearchValue] = useState('');

  const onSearch = (key: string) => {
    setSearchValue(key);
  };

  useEffect(() => {
    let mounted = true;
    getMovieList()
      .then((resItems) => {
        if (mounted) {
          setMovies(resItems);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filteredMovies = movies?.movies.filter((movie) => movie.title.toLowerCase().includes(searchValue.toLowerCase()));

  // filter by multiple genres
  // const getMoviesByGenres = movies?.movies.filter((movie) => movie.genres.includes('Action'));

  return (
    <Flex justifyContent="center" alignItems="center" flexDir={{ base: 'column' }}>
      <SearchBar handleSearch={onSearch} searchValue={searchValue} />
      {filteredMovies?.length === 0 ? (
        <Heading
          mt={10}
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, purple.400, purple.600)"
          backgroundClip="text"
        >
          No Results Found.
        </Heading>
      ) : null}
      {/* movie tabs here. */}
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        {filteredMovies ? filteredMovies.map((movie: IMovie) => (
          <GridItem key={movie.id}>
            <MovieCard movie={movie} />
          </GridItem>
        )) : <Spinner label="loading movies" />}
      </Grid>
    </Flex>
  );
};

export default Home;
