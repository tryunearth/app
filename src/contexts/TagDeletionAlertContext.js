import React, { createContext, useState, useContext, useRef } from 'react'
import { useMatch, useNavigate } from '@reach/router'
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
import { useFilters } from './FiltersContext'

const TagDeletionAlertContext = createContext({})

const TagDeletionAlertProvider = ({ children }) => {
  const [tag, setTag] = useState({})
  const cancelRef = useRef()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { token } = useAuth()
  const { filters, updateFilters } = useFilters()

  const match = useMatch('/tags/:tagName')
  const navigate = useNavigate()

  const redirectIfDeleted = (target) => {
    const tags = [...filters['tags']]
    const index = tags.findIndex((tag) => tag.id === target.id)

    if (tags.length === 1) {
      return null
    } else if (tags.length === 2) {
      return index === 0 ? tags[1] : tags[0]
    } else {
      return index === tags.length - 1 ? tags[index - 1] : tags[index + 1]
    }
  }

  const handleOpen = (tag) => {
    onOpen()
    setTag(tag)
  }
  const handleClose = () => onClose()
  const handleDelete = async () => {
    await fetch(`${config.backend.BASE_URL}/tags/${tag.id}`, {
      method: 'DELETE',
      headers: { Authorization: `bearer ${token}` },
    })
    await updateFilters()

    if (tag.name === match.tagName) {
      const neighborTag = redirectIfDeleted(tag)
      await navigate(neighborTag ? `/tags/${neighborTag.name}` : `/`)
    }

    setTag({})
    onClose()
  }

  return (
    <TagDeletionAlertContext.Provider value={{ handleOpen }}>
      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent borderRadius='md'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Are you sure?
          </AlertDialogHeader>

          <AlertDialogBody>
            Once you delete a tag, you can't undo it!
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClose}>
              Cancel
            </Button>
            <Button variantColor='red' onClick={handleDelete} ml={3}>
              Delete Tag
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </TagDeletionAlertContext.Provider>
  )
}

const useTagDeletionAlert = () => useContext(TagDeletionAlertContext)

export { TagDeletionAlertProvider, useTagDeletionAlert }
