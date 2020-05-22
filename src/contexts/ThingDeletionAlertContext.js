import React, { createContext, useState, useContext, useRef } from 'react'
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/core'

import config from '../config'
import { useAuth } from './AuthContext'
import { useThings } from './ThingsContext'

const ThingDeletionAlertContext = createContext({})

const ThingDeletionAlertProvider = ({ children }) => {
  const [thing, setThing] = useState({})
  const cancelRef = useRef()

  const { token } = useAuth()
  const { things, updateThings } = useThings()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleThingDeletionOpen = (thing) => {
    onOpen()
    setThing(thing)
  }
  const handleClose = () => onClose()

  const handleDelete = async () => {
    await fetch(`${config.backend.BASE_URL}/things/${thing.id}`, {
      method: 'DELETE',
      headers: { Authorization: `bearer ${token}` },
    })
    const newThings = things.filter((t) => t.id !== thing.id)
    updateThings(newThings)
    setThing({})
    onClose()
  }

  return (
    <ThingDeletionAlertContext.Provider value={{ handleThingDeletionOpen }}>
      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent borderRadius='md'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Thing
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClose}>
              Cancel
            </Button>
            <Button variantColor='red' onClick={handleDelete} ml={3}>
              Delete Thing
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </ThingDeletionAlertContext.Provider>
  )
}

const useThingDeletionAlert = () => useContext(ThingDeletionAlertContext)

export { ThingDeletionAlertProvider, useThingDeletionAlert }
