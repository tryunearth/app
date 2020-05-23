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
  const [isLoading, setIsLoading] = useState(false)
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
    setIsLoading(true)
    try {
      await fetch(`${config.backend.BASE_URL}/things/${thing.id}`, {
        method: 'DELETE',
        headers: { Authorization: `bearer ${token}` },
      })
      const newThings = things.filter((t) => t.id !== thing.id)
      updateThings(newThings)
      setThing({})
      setIsLoading(false)
      onClose()
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
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
            <Button
              variantColor='red'
              onClick={handleDelete}
              ml={3}
              loadingText='Deleting…'
              isLoading={isLoading}
            >
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
