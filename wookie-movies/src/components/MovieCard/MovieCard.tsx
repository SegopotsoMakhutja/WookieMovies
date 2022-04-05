/* eslint-disable camelcase */
import React from 'react';
import {
  Flex,
  Image,
  Box,
  useColorModeValue,
  Badge,
  Text,
} from '@chakra-ui/react';

import { useNavigate } from '@tanstack/react-location';

import { IMovie } from '../../types/types';
import { Rating } from '../Rating';

interface MovieCardProps {
  movie: IMovie;
}

const MovieCard = ({ movie } : MovieCardProps) => {
  const {
    title,
    imdb_rating,
    poster,
    length,
    classification,
  } = movie;

  const navigate = useNavigate();

  const onClick = (slug: string, id: string) => {
    navigate({ to: `/movie-details/${slug}/${id}`, replace: false });
  };

  const getClassificationBadge = (mvClassification: string) => {
    // not very extensible, but it's a demo.
    switch (mvClassification) {
      case ('7+'): return 'green';
      case ('13+'): return 'yellow';
      case ('18+'): return 'red';
      default: return 'gray';
    }
  };

  return (
    <Flex
      flex={1}
      m={2}
      p={2}
      flexDir="column"
      w="250px"
      h="360px"
      overflow="clip"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
      position="relative"
      bg={useColorModeValue('white', 'gray.800')}
      _hover={{
        transform: 'scale(1.05)',
        transition: 'all .2s ease-in-out',
        boxShadow: '2xl',
        cursor: 'pointer',
      }}
      onClick={() => onClick(movie.slug, movie.id)}
    >
      <Image
        src={poster}
        fallbackSrc="https://via.placeholder.com/150"
        alt="movie-art"
        boxShadow="lg"
        w="100%"
        h="75%"
        roundedTop="lg"
      />
      {/* badge for release date */}
      <Box display="flex" alignItems="baseline" position="absolute" justifyContent="flex-end">
        <Badge
          rounded="lg"
          px="2"
          fontSize="0.8em"
          colorScheme={getClassificationBadge(classification)}
        >
          {classification}
        </Badge>
      </Box>
      <Box p="6">
        {/* title of movie */}
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize="2xl"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {title}
          </Box>
        </Flex>

        {/* movie rating */}
        <Flex justifyContent="space-between" alignContent="center">
          <Rating imdbRating={imdb_rating} />
          <Text>{length}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MovieCard;
