import React, { useState, useEffect } from 'react'
import {
  Heading,
  Button,
  Input,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
} from '@chakra-ui/core'

import { SEO } from '../components'
import { useAuth } from '../contexts/AuthContext'

const Account = () => {
  const { user } = useAuth()

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

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <SEO title='Account' />
      <Heading as='h3' size='xl' mb={4} fontWeight='bold'>
        Account
      </Heading>
      <Stack as='form' px={1} spacing={8} onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor='email'>Email Address</FormLabel>
          <Input
            type='email'
            id='email'
            name='email'
            aria-describedby='email-helper-text'
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
            Choose how often you'd like to receive your personalized newsletter.
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
    </>
  )
}

export default Account
