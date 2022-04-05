import React from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Box } from '@chakra-ui/react';

interface IRatingProps {
  imdbRating: number;
}

const Rating = ({ imdbRating }: IRatingProps) => {
  const rating = imdbRating / 2;
  const roundedRating = Math.round(rating * 2) / 2;

  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? 'yellow.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            // eslint-disable-next-line react/no-array-index-key
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
          }
          // eslint-disable-next-line react/no-array-index-key
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
    </Box>
  );
};

export default Rating;
