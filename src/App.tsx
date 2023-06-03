import { useEffect, useState } from "react"
import {
  ChakraProvider,
  Button,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import Nav from "./components/NavBar"
import Form from "./components/Form"
import { initializeApp, FirebaseApp } from 'firebase/app'
import { User } from './types/users'
import { GoogleUser } from "./types/googleUser"
import { getFirebaseConfig } from './firebase/firebase-config'
import { collection, onSnapshot, getFirestore, addDoc, deleteDoc, doc, query } from '@firebase/firestore'
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const App = () => {

  /**
   * firebaseApp is the firebase app that is initialized with the firebase config
   * users is the state that holds the users in the database
   * googleUser is the state that holds the user that is signed in with google
   */
  const [users, setUsers] = useState<User[]>()
  const [googleUser, setGoogleUser] = useState<GoogleUser>()

  useEffect(() => {
    /**
     * onSnapshot is a listener that listens to changes in the database
     * and updates the state of the users array
     */
    onSnapshot(collection(getFirestore(), 'users'), (snapshot) => {
      console.log(snapshot.docs.map(doc => doc.data()));
      /**
       * snapshot.docs.map(doc => doc.data()) returns an array of objects
       * that are the users in the database
       */
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as User[])
    })
  }, [])


  /**
   * handleAdd is a function that adds a new user to the database
   * when the button is clicked
   */
  const handleAdd = async () => {
    /**
     * collectionRef is a reference to the users collection in the database
     * newUser is the object that will be added to the database
     * addDoc is a function that adds a new document to the database
     */
    const collectionRef = collection(getFirestore(), 'users')
    const newUser = {
      firstname: 'Test',
      surname: 'Holliday',
      dob: '19/Test/Lui'
    }
    await addDoc(collectionRef, newUser) // add new user to the database
  }

  const handleDelete = async (id: string) => {
    /**
     * collectionRef is a reference to the users collection in the database
     * id is the id of the user that will be deleted
     * deleteDoc is a function that deletes a document from the database
     */
    const collectionRef = collection(getFirestore(), 'users')
    await deleteDoc(doc(collectionRef, id))
  }

  //const firebaseQueryToReturnAllUsers = query(collection(getFirestore(), 'users'))


  const isUserSignedIn = () => {
    /** 
     * auth is the authentication object that is used to sign in and sign out users
     * onAuthStateChanged is a listener that listens to changes in the authentication state
     * and updates the state of the user
     * user is the user that is signed in
     * if user is not null then the user is signed in
     * else the user is not signed in
     * */
    const auth = getAuth(firebaseApp)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return true
      } else {
        return false
      }
    })
  }


  /**
  * firebaseAppConfig is the configuration object that is used to initialize the firebase app
  * firebaseApp is the firebase app that is initialized with the firebaseAppConfig
  */
  const firebaseAppConfig = getFirebaseConfig();
  const firebaseApp = initializeApp(getFirebaseConfig())
  return (
    <ChakraProvider theme={theme}>
      <Nav user={googleUser} setGoogleUser={setGoogleUser} firebaseApp={firebaseApp} />
      <Button onClick={() => handleAdd()}>Add</Button>
      <Form />
      {users?.map(user => <li key={user.id}>{user.firstname}<button onClick={() => handleDelete(user.id)}>click</button></li>)}
    </ChakraProvider>
  )
}
