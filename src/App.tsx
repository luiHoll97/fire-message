import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import Nav from "./components/NavBar"
import Form from "./components/Form"

export const App = () => (
  <ChakraProvider theme={theme}>
  <Nav />
  <Form />
  </ChakraProvider>
)
