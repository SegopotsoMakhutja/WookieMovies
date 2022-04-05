import React, { useEffect, useState } from 'react';
import {
  GridItem,
  Grid,
  Flex,
  Spinner,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { getMovieList } from '../../services/movies.services';
import { IMovieList, IMovie } from '../../types/types';
import { MovieCard } from '../../components';
import { SearchBar } from '../../components/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState<IMovieList>();
  const [searchValue, setSearchValue] = useState('');
  const [movieGenres, setMovieGenres] = useState([]);

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

  const getAllUniqueGenres = (items: IMovie[]) => {
    const genres = items.reduce((acc: any, movie) => {
      movie.genres.forEach((genre) => {
        if (!acc.includes(genre)) {
          acc.push(genre);
        }
      });
      return acc;
    }, []);
    return genres;
  };

  useEffect(() => {
    if (filteredMovies && filteredMovies.length > 0) {
      setMovieGenres(getAllUniqueGenres(filteredMovies));
    }
  }, [movies]);

  // eslint-disable-next-line arrow-body-style
  const getMoviesByGenres = (genre: string) => {
    // filter by multiple genre passed as an arg
    return movies?.movies.filter((movie) => movie.genres.includes(genre)) || [];
  };

  // map each genre to the movies that include that genre
  // eslint-disable-next-line arrow-body-style
  const mapMoviesToGenre = movieGenres.map((genre) => {
    return {
      label: genre,
      movies: getMoviesByGenres(genre),
    };
  });

  console.log(mapMoviesToGenre);

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
      <Flex justifyContent="center" alignItems="center">
        <Tabs>
          <TabList>
            <Tab> All </Tab>
            {mapMoviesToGenre.map((genre) => <Tab key={genre.label}>{genre.label}</Tab>)}
          </TabList>

          <TabPanels>
            {mapMoviesToGenre.map((genre, idx) => (
              <TabPanel>
                <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                  {genre.movies ? genre.movies.map((movie: IMovie) => (
                    <GridItem key={movie.id}>
                      <MovieCard movie={movie} />
                    </GridItem>
                  )) : <Spinner label="loading movies" />}
                </Grid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default Home;
