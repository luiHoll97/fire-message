import { Box, Container, Heading, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import Login from "./Login"
import Signup from "./SignUp"

const Form = (): JSX.Element => {
    const inputProps = {
        mt: '7px',
        mb: '1px'
    }
    return (
        <Container maxW='60%' p='20px' centerContent>
            <Box>
                <Heading>
                    Aligned Sign-up Form
                </Heading>
                <Tabs isFitted variant='enclosed'>
                    <TabList mb={4}>
                        <Tab>Login</Tab>
                        <Tab>Sign-up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
            
        </Container>
    )
}

export default Form