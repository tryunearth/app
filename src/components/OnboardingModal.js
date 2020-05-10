import React from 'react'
import {
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
} from '@chakra-ui/core'

import { useAuth } from '../contexts/AuthContext'
import { SyncButton } from '../components'

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
  const { user } = useAuth()

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
          <SyncButton initialSync />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default OnboardingModal
