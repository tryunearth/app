import React, { createContext, useState, useContext } from 'react'
import {
  Stack,
  Box,
  Text,
  Button,
  CloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/core'
import { RiLightbulbLine } from 'react-icons/ri'

import { CustomTagsInput, KbdKey } from '../components'

import config from '../config'
import { useAuth } from './AuthContext'
import { useThings } from './ThingsContext'
import { useFilters } from './FiltersContext'

const TagModalContext = createContext({})

const TagValidationErrorAlert = ({ setShowError }) => {
  const error = {
    title: 'Invalid tag!',
    message: 'Valid characters: a-Z, 0-9, _, and -',
  }

  return (
    <Alert status='error' w='full' borderRadius='sm'>
      <AlertIcon />
      <AlertTitle mr={2}>{error.title}</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
      <CloseButton
        position='absolute'
        right='8px'
        top='8px'
        onClick={() => setShowError(false)}
      />
    </Alert>
  )
}

const TagModalProvider = ({ children }) => {
  const [thing, setThing] = useState({})
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const { token } = useAuth()
  const { things, updateThings } = useThings()
  const { updateFilters } = useFilters()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef()

  const handleOpen = (thing) => {
    setShowError(false)
    setThing(thing)
    setTags(thing.tags)
    onOpen()
  }

  const handleOnChange = (tags, changed, changedIndexes) => {
    setTags([...new Set(tags.map((tag) => tag.trim()))])
  }

  const handleRemoveTag = (tagName) => {
    setTags(tags.filter((tag) => tag !== tagName))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const updatedThing = { ...thing, tags: [...tags] }
    await setThing(updatedThing)
    await updateThings(
      things.map((thing) => {
        if (thing.id === updatedThing.id) {
          return updatedThing
        }
        return thing
      }),
    )
    await fetch(`${config.backend.BASE_URL}/things/${updatedThing.id}/tags`, {
      method: 'PATCH',
      body: JSON.stringify(updatedThing.tags),
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    await updateFilters()
    setIsLoading(false)
    onClose()
  }

  return (
    <TagModalContext.Provider value={{ thing, handleOpen }}>
      <Modal
        size='lg'
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
                tags={tags}
                disabled={isLoading}
                handleOnChange={handleOnChange}
                handleRemoveTag={handleRemoveTag}
                setShowError={setShowError}
              />
              <Button
                ml={2}
                size='md'
                minW='max-content'
                isLoading={isLoading}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Stack>
            <Stack mt={4} isInline fontSize='sm'>
              <Box d='flex' alignItems='center'>
                <Box
                  d='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Box as={RiLightbulbLine} />
                  <Text fontWeight='bold'>ProTip!</Text>
                </Box>
              </Box>
              <Box>
                Use the
                <KbdKey text='Enter' />
                or
                <KbdKey text='Tab' />
                keys to add multiple tags, then click "Save" to submit.
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            {showError && (
              <TagValidationErrorAlert setShowError={setShowError} />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      {children}
    </TagModalContext.Provider>
  )
}

const useTagModal = () => useContext(TagModalContext)

export { TagModalProvider, useTagModal }
