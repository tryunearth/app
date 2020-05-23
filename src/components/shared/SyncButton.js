import React, { useState } from 'react'
import { Button, useToast } from '@chakra-ui/core'
import PropTypes from 'prop-types'

import config from '../../config'
import { useAuth } from '../../contexts/AuthContext'

const SyncButton = ({ initialSync }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { token, updateUser } = useAuth()
  const toast = useToast()

  const syncSaves = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(`${config.backend.BASE_URL}/reddit/sync`, {
        headers: { Authorization: `bearer ${token}` },
      })
      const data = await response.json()
      if (!response.ok) throw response

      updateUser(data.payload.user)

      let description
      let title

      if (!initialSync) {
        const { added, removed } = data.payload.parity
        title = 'Syncing Successful'
        description = `${added} ${
          added === 1 ? 'thing' : 'things'
        } added and ${removed} removed.`
      } else {
        title = "You're All Set"
        description = "We've successfully setup your account, enjoy!"
      }

      toast({
        title,
        description,
        status: 'success',
        duration: 8000,
        isClosable: true,
      })
    } catch (error) {
      const retryInSecs = error.headers.get('retry-after')
      const parsedRetry = () => {
        if (retryInSecs <= 60) {
          return `${retryInSecs} seconds`
        } else {
          const nearestMinute = Math.round(retryInSecs / 60)
          return `${nearestMinute} minutes`
        }
      }

      toast({
        title: 'Uh-oh!',
        description: `Cannot sync at this time, try again in ${parsedRetry()}`,
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      size={initialSync ? 'md' : 'sm'}
      variantColor='blue'
      mr={3}
      isLoading={isLoading}
      loadingText={initialSync ? 'Fetching saves…' : 'Syncing…'}
      onClick={syncSaves}
    >
      Sync Reddit Saves
    </Button>
  )
}

SyncButton.defaultProps = { initialSync: false }

SyncButton.propTypes = {
  /** Flag denoting whether or not this is the first time syncing Reddit saves. */
  initialSync: PropTypes.bool,
}

export default SyncButton
