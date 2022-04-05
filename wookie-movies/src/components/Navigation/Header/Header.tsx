import React, { ReactNode } from 'react';
import {
  Flex,
  Text,
  HStack,
  Box,
  Heading,
  Stack,
  useDisclosure,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  MdHome,
  MdExplore,
  MdMovieFilter,
  MdMenu,
  MdClose,
} from 'react-icons/md';
import { useNavigate } from '@tanstack/react-location';

import { ColorModeSwitcher } from '../../../ColorModeSwitcher';

import { LinkItemProps } from '../Navigation.types';
import { NavItem } from '../NavItem';

const NavItems: Array<LinkItemProps> = [
  { name: 'Home', icon: MdHome, path: '/' },
  { name: 'Explore', icon: MdExplore, path: '/search-results' },
  { name: 'Box Office', icon: MdMovieFilter, path: '/box-office' },
];

const Header = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const onClick = () => {
    navigate({ to: '/', replace: false });
  };

  const renderNavItems = () => NavItems.map((navItem) => (
    <NavItem key={navItem.name} icon={navItem.icon} to={navItem.path}>
      {navItem.name}
    </NavItem>
  ));

  return (
    <>
      <Flex
        w="100%"
        p={2}
        h={16}
        bg={useColorModeValue('gray.100', '#343951')}
        boxShadow="xl"
      >
        <Flex
          wrap="wrap"
          flex={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            size="md"
            variant="ghost"
            icon={isOpen ? <MdClose /> : <MdMenu />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Flex justifyContent="flex-start">
            <ColorModeSwitcher justifySelf="flex-start" />
            <Heading
              display="inline-block"
              justifyContent="flex-start"
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, purple.700, purple.500)"
              backgroundClip="text"
              onClick={onClick}
              style={{ cursor: 'pointer' }}
            >
              Wookie
            </Heading>
            <Text fontWeight="400" fontSize="15" alignSelf="flex-end">
              Movies
            </Text>
          </Flex>

          <HStack spacing={8} alignItems="center">
            <HStack
              as="nav"
              spacing={1}
              display={{ base: 'none', md: 'flex' }}
            >
              {renderNavItems()}
            </HStack>
          </HStack>
        </Flex>

        {/* mobile responsive nav header */}
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={1}>
              {renderNavItems()}
            </Stack>
          </Box>
        ) : null}
      </Flex>

      {/* main content will be here */}
      <Box p="4" h="90vh">
        {children}
      </Box>
    </>
  );
};

export default Header;
