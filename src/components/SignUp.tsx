import { Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react"

const Signup = () : JSX.Element => {
    return (
        <FormControl>
        <VStack spacing={4}>
            <Input placeholder="first name"/>
            <Input placeholder="last name"/>
            <Input type="email" placeholder="email"/>
            <Input type='password' placeholder='password'/>
            <Button colorScheme="teal">Sign up!</Button>
        </VStack>
        </FormControl>
    )
}

export default Signup