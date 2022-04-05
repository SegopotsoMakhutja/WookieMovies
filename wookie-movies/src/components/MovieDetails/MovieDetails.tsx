/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import {
  Flex,
  Image,
  useToast,
  Badge,
  Button,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import {
  MdTheaters, MdChatBubble,
} from 'react-icons/md';
import {
  AiFillHeart, AiOutlineHeart,
} from 'react-icons/ai';

import { IMovie } from '../../types/types';
import { Rating } from '../Rating';

interface IMovieDetailsProps {
  movie: IMovie;
}

const MovieDetails = ({ movie }: IMovieDetailsProps) => {
  const {
    title,
    imdb_rating,
    poster,
    length,
    classification,
    backdrop,
    cast,
    overview,
    director,
    genres,
    released_on,
  } = movie;

  const releaseDate = released_on.split('T')[0];

  const toast = useToast();

  // should just hold, movie IDs
  const [favorites, setFavorites] = useState<string[]>([]);

  // just check if the movie is in the favorites array
  // if it is in the array, then it will be removed, otherwise it will be added.
  // also change the icon to a filled heart if it is, otherwise an empty heart.
  // show toast
  const addFavorite = (favoriteMovie: IMovie) => {
    const array = favorites;
    let addToArray = true;

    array.forEach((favoriteMovieId, idx: number) => {
      if (favoriteMovieId === favoriteMovie.id) {
        array.splice(idx, 1);
        addToArray = false;
        toast({
          title: 'Removed from favorites',
          description: `${favoriteMovie.title} was removed from your favorites`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
    });
    if (addToArray) {
      array.push(favoriteMovie.id);
      toast({
        title: 'Added to favorites',
        description: `${favoriteMovie.title} was added to your favorites`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    setFavorites([...array]);
    // to maintain the bookmarking/favorites store them in LocalStorage.
    localStorage.setItem('favorites', JSON.stringify(favorites));

    const localStore = localStorage.getItem(`favorite ${favoriteMovie.id}` || favoriteMovie.id);
    if (localStore == null) {
      localStorage.setItem(`favorite ${favoriteMovie.id}` || favoriteMovie.id, JSON.stringify(favoriteMovie));
    } else {
      localStorage.removeItem(`favorite ${favoriteMovie.id}` || favoriteMovie.id);
    }
  };

  const getArray = JSON.parse(localStorage.getItem('favorites') || '[]');
  const isFavorite = getArray.includes(movie.id);

  // onMount of component get the favorites array from localStorage
  useEffect(() => {
    if (localStorage.getItem('favorites') !== null) {
      setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
    }
  }, []);

  return (
    <>
      <Center py={3} justifyContent="flex-start" alignItems="center" flex={1} w="full">
        <Stack
          w="100%"
          rounded="md"
          height={{ sm: '476px', md: '30rem' }}
          direction={{ base: 'column', md: 'row' }}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow="2xl"
          padding={4}
        >
          <Flex justifyContent="flex-start" bg="yellow.400" alignItems="flex-start">
            <Image
              objectFit="scale-down"
              boxSize="100%"
              src={poster}
            />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize="2xl" fontFamily="body">
              {title}
            </Heading>
            <Text fontWeight={600} color="gray.500" size="sm" mb={4}>
              {releaseDate}
              {' '}
              |
              {' '}
              {length}
              {' '}
              |
              {' '}
              {classification}
            </Text>
            <Stack align="center" justify="center" direction="row" mt={6}>
              {genres.map((genre) => (
                <Badge
                  key={genre}
                  px={2}
                  py={1}
                  colorScheme="blue"
                  fontWeight="400"
                >
                  {genre}
                </Badge>
              ))}
            </Stack>
            <Text
              textAlign="center"
              color={useColorModeValue('gray.700', 'gray.400')}
              px={3}
            >
              {overview}
            </Text>
            <Text textAlign="center" color={useColorModeValue('gray.700', 'gray.400')}>
              <strong>
                Director -
                {' '}
                {director}
              </strong>
            </Text>
            <HStack spacing={4} mt={6}>
              {cast.map((name) => (
                <Text key={name} fontWeight={600} color="gray.500" size="sm">
                  [
                  {' '}
                  {name}
                  {' '}
                  ]
                </Text>
              ))}
            </HStack>
            <Rating imdbRating={imdb_rating} />
            {/* stacked buttons on top of backdrop */}
            <Stack direction="row" spacing={4}>
              <Button leftIcon={<MdTheaters />} colorScheme="green" variant="outline">
                Trailer
              </Button>
              <Button leftIcon={<MdChatBubble />} colorScheme="blue" variant="outline">
                Comment
              </Button>
              <Button
                leftIcon={isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                colorScheme="pink"
                variant={isFavorite ? 'solid' : 'outline'}
                onClick={() => addFavorite(movie)}
              >
                {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
      <Flex
        flexDir="column"
        flex={1}
        w="full"
        alignItems="center"
        bgSize="cover"
        overflow="hidden"
      >
        {/* backdrop */}
        <Image
          position="absolute"
          rounded="md"
          src={backdrop}
          fit="cover"
          fallbackSrc="https://via.placeholder.com/500x500"
          align="flex-start"
          opacity={0.4}
          w="100%"
          h={{ base: '100%', sm: '400px', lg: '60vh' }}
        />
      </Flex>
    </>
  );
};

export default MovieDetails;
