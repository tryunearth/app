import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Heading,
  Text,
  Stack,
  Box,
  List,
  ListItem,
  useToast,
} from '@chakra-ui/core'

import { useAuth } from '../contexts/AuthContext'

const ModalText = () => (
  <Stack spacing={4}>
    <Text>
      We're excited to have you! A lot of attention and care has gone into the
      development of Unearth and we hope that you can experience the best of it.
    </Text>
    <Box>
      <Text
        color='gray.400'
        fontWeight='extrabold'
        fontSize='sm'
        textTransform='uppercase'
        letterSpacing='tight'
      >
        Features
      </Text>
      <List pl={8} styleType='disc' stylePos='outside'>
        <ListItem>
          Build a permanent library of everything you’ve saved
        </ListItem>
        <ListItem>
          Customize your experience using numerous preferences
        </ListItem>
        <ListItem>
          Find content quickly with enhanced searching & tagging
        </ListItem>
      </List>
    </Box>
    <Text>
      To finalize your account setup, we just need you to sync your Reddit
      saves. What are you waiting for?
    </Text>
  </Stack>
)

const OnboardingModal = () => {
  const { token, user, updateUser } = useAuth()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)

  const syncSaves = async () => {
    const response = await fetch('http://localhost:5000/v1/reddit/sync', {
      headers: { Authorization: `bearer ${token}` },
    })
    const data = await response.json()
    updateUser(data.payload.user)
    toast({
      title: "You're All Set",
      description: "We've successfully setup your account, enjoy!",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
  }

  if (user.has_completed_onboarding) return null
  return (
    <Modal
      size='xl'
      isOpen={!user.has_completed_onboarding}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent borderRadius='lg'>
        <ModalHeader>
          <Heading>
            Welcome to Unearth!{' '}
            <span role='img' aria-label='waving emoji'>
              👋
            </span>
          </Heading>
        </ModalHeader>
        <ModalBody>
          <ModalText />
        </ModalBody>

        <ModalFooter>
          <Button
            variantColor='orange'
            mr={3}
            isLoading={isLoading}
            loadingText='Fetching saves…'
            onClick={() => {
              setIsLoading(true)
              syncSaves()
            }}
          >
            Sync Reddit Saves
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OnboardingModal
