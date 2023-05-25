import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react"

const Login = () : JSX.Element => {
    return (
        <FormControl>
        <VStack spacing={4}>
            <Input type="email" placeholder="email"/>
            <Input type='password' placeholder='password'/>
            <Button colorScheme="teal">Login</Button>
        </VStack>
        </FormControl>
    )
}

export default Login