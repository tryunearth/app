import React, { createContext, useState, useContext } from 'react'
import {
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/core'

import { CustomTagsInput } from '../components'

import config from '../config'
import { useAuth } from './AuthContext'
import { useThings } from './ThingsContext'

const TagModalContext = createContext({})

const TagModalProvider = ({ children }) => {
  const [thing, setThing] = useState({})
  const { token } = useAuth()
  const { things, updateThings } = useThings()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()

  const handleOpen = (thing) => {
    setThing(thing)
    onOpen()
  }

  const handleOnChange = (tags, changed, changedIndexes) => {
    const updatedThing = { ...thing, tags: [...tags] }
    setThing(updatedThing)
    updateThings(
      things.map((thing) => {
        if (thing.id === updatedThing.id) {
          return updatedThing
        }
        return thing
      }),
    )
  }

  const handleSubmit = async () => {
    await fetch(`${config.backend.BASE_URL}/things/${thing.id}/tags`, {
      method: 'PATCH',
      body: JSON.stringify(thing.tags),
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    onClose()
  }

  return (
    <TagModalContext.Provider value={{ thing, handleOpen }}>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent borderRadius='md'>
          <ModalHeader>Edit Tags</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack
              spacing={4}
              direction='row'
              justify='space-around'
              align='center'
            >
              <CustomTagsInput
                ref={initialRef}
                tags={thing.tags}
                handleOnChange={handleOnChange}
              />
              <Button
                ml={2}
                size='md'
                minW='max-content'
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Stack>
          </ModalBody>

          <ModalFooter>
            {/* <Button variantColor='blue' mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {children}
    </TagModalContext.Provider>
  )
}

const useTagModal = () => useContext(TagModalContext)

export { TagModalProvider, useTagModal }
