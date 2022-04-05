import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { Link } from '@tanstack/react-location';

import { NavItemProps } from '../Navigation.types';

const getActiveProps = () => ({
  style: {
    color: '#6940a5',
    fontWeight: 'bold',
    textDecoration: 'underline',
  },
});

const NavItem = ({
  icon, to, children, ...rest
}: NavItemProps) => (
  <Link
    to={to}
    style={{ textDecoration: 'none' }}
    getActiveProps={getActiveProps}
    activeOptions={{ exact: true }}
  >
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        textDecoration: 'underline',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
      <Icon
        mr="4"
        fontSize="16"
        _groupHover={{
          color: 'white',
        }}
        as={icon}
      />
      )}
      {children}
    </Flex>
  </Link>
);

export default NavItem;
