import React, { useState, useEffect, useRef } from 'react'
import {
  Heading,
  Text,
  Box,
  Button,
  Input,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from '@chakra-ui/core'

import config from '../config'
import { SEO } from '../components'
import { useAuth } from '../contexts/AuthContext'

const Account = () => {
  const toast = useToast()
  const { token, user, logout, updateUser } = useAuth()

  // Delete Account Confirmation
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef()

  const [userEmail, setUserEmail] = useState(user.email)
  const [preferredFrequency, setPreferredFrequency] = useState(user.frequency)
  const [settingsHaveChanged, setSettingsHaveChanged] = useState(false)
  const ogSettings = {
    email: user.email,
    frequency: user.frequency,
  }

  useEffect(() => {
    const updatedSettings = { email: userEmail, frequency: preferredFrequency }
    setSettingsHaveChanged(
      JSON.stringify(updatedSettings) === JSON.stringify(ogSettings),
    )
  }, [ogSettings, userEmail, preferredFrequency])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${config.backend.BASE_URL}/auth/me`, {
        method: 'PATCH',
        body: JSON.stringify({
          email: userEmail,
          frequency: preferredFrequency,
        }),
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      const updatedUser = data.payload.user
      updateUser(updatedUser)
      toast({
        title: 'Success!',
        description: 'Your settings were successfully saved.',
        status: 'success',
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Uh oh!',
        description:
          'An error occurred while attempting to save your settings.',
        status: 'error',
        isClosable: true,
      })
    }
  }

  const handleDelete = async () => {
    try {
      await fetch(`${config.backend.BASE_URL}/auth/me`, {
        method: 'DELETE',
        headers: { Authorization: `bearer ${token}` },
      })
      logout()
      toast({
        title: 'Goodbye',
        description: 'Account successfully deleted. Thanks for trying Unearth!',
        status: 'info',
        isClosable: false,
        duration: 8000,
      })
    } catch (error) {
      toast({
        title: 'Uh oh!',
        description: 'An error occurred while trying to delete your account.',
        status: 'error',
        isClosable: true,
      })
    }
  }

  return (
    <>
      <SEO title='Account' />
      <Stack spacing={8}>
        <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
          Account
        </Heading>
        <Stack as='form' px={1} spacing={4} onSubmit={handleSubmit}>
          <Box>
            <Heading size='lg'>Profile</Heading>
            <Text>General account information.</Text>
          </Box>
          <FormControl>
            <FormLabel htmlFor='email'>Email Address</FormLabel>
            <Input
              type='email'
              id='email'
              name='email'
              aria-describedby='email-helper-text'
              placeholder='your.email@example.com'
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <FormHelperText id='email-helper-text'>
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='frequency'>Email Frequency</FormLabel>
            <RadioGroup
              id='frequency'
              value={preferredFrequency}
              onChange={(e, value) => setPreferredFrequency(value)}
            >
              <Radio value='daily'>Daily</Radio>
              <Radio value='weekly'>Weekly</Radio>
              <Radio value='monthly'>Monthly</Radio>
              <Radio value='unsubscribe'>Unsubscribe</Radio>
            </RadioGroup>
            <FormHelperText id='frequency-helper-text'>
              Choose how often you'd like to receive your personalized
              newsletter (feature coming soon).
            </FormHelperText>
          </FormControl>
          <Button
            w='max-content'
            type='submit'
            variantColor='blue'
            isDisabled={settingsHaveChanged}
          >
            Save Changes
          </Button>
        </Stack>
        <Stack spacing={4}>
          <Box>
            <Heading size='lg'>Danger Zone</Heading>
            <Text>Irreversible and destructive actions. Tread lightly.</Text>
          </Box>

          <Box>
            <Button
              w='max-content'
              variantColor='red'
              onClick={() => setIsOpen(true)}
            >
              Delete Account
            </Button>
            <AlertDialog
              isOpen={isOpen}
              isCentered
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay />
              <AlertDialogContent borderRadius='md'>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Delete Account
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? All your Unearth data (i.e. tags) will also be
                  deleted which cannot be recovered afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button variantColor='red' onClick={handleDelete} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Box>
        </Stack>
      </Stack>
    </>
  )
}

export default Account
