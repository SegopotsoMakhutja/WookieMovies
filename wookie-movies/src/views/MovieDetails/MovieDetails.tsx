/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from 'react';
import {
  Flex, Spinner, useToast,
} from '@chakra-ui/react';
import { useMatch } from '@tanstack/react-location';
import { getMovie } from '../../services/movies.services';
import { MovieDetails } from '../../components/MovieDetails';
import { IMovie } from '../../types/types';

const MovieDetailsView = () => {
  const { params: { slug } } = useMatch();
  const [movie, setMovie] = useState<IMovie>();
  const toast = useToast();

  useEffect(() => {
    let mounted = true;
    getMovie(slug).then((res) => {
      if (mounted) {
        setMovie(res);
      }
    }).catch((err) => {
      toast({
        title: `Error ${err.status}`,
        description: 'An Error loading movie.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <Flex
      flexDir="column"
      alignSelf="center"
      // bg="yellow.400"
      overflow="hidden"
      p={8}
    >
      {movie ? <MovieDetails movie={movie} /> : <Spinner label="loading movie" />}
    </Flex>
  );
};

export default MovieDetailsView;
