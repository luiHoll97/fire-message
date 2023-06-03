import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { GoogleUser } from '../types/googleUser';
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

interface NavLinkProps {
  user: GoogleUser | undefined;
  setGoogleUser: React.Dispatch<React.SetStateAction<GoogleUser | undefined>>
  firebaseApp: any
}

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Nav({ user, setGoogleUser, firebaseApp } : NavLinkProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const signOutGoogleUser = async (auth: any) => {
    await signOut(getAuth(firebaseApp));
    setGoogleUser(undefined)
  }

  const signIn = async () => {
    /**
     * auth is the authentication object that is used to sign in and sign out users
     * provider is the provider that is used to sign in users with google
     * signInWithPopup is a function that signs in a user with a popup
     * onAuthStateChanged is a listener that listens to changes in the authentication state
     * and updates the state of the user
     */
    const auth = getAuth(firebaseApp)
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
    createGoogleUserObject(auth.currentUser)
    onAuthStateChanged(auth, (user) => {
      console.log(user);
    })
  }

  const createGoogleUserObject = (googleUser: any) => {
    /**
     * googleUser is the user that is signed in with google
     * user is the user object that is created from the googleUser object
     * */
    const user = {
      firstname: googleUser.displayName.split(' ')[0],
      surname: googleUser.displayName.split(' ')[1],
      email: googleUser.email,
      photoUrl: googleUser.photoURL,
    }
    setGoogleUser(user)
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              {!user && <Button onClick={() => signIn()}>Sign In</Button>}

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  {user && <Avatar
                    size={'sm'}
                    src={user ? user.photoUrl : 'https://avatars.dicebear.com/api/male/username.svg'}
                  />}
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={user ? user.photoUrl : 'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    {user && <p>{`${user.firstname} ${user.surname}`}</p>}
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={() => signOutGoogleUser(firebaseApp)}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
