import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from '@chakra-ui/core'

/**
 * Styled `<kbd />` element. Composed using Chakra UI's `<Tag />` component with
 * some additional styling.
 * @param {String} props.text Text representing a keyboard key.
 */
const KbdKey = ({ text }) => (
  <Tag mx={1} size='sm' borderWidth='1px' borderColor='gray.400'>
    {text}
  </Tag>
)

KbdKey.propTypes = {
  /** string representing a keyboard key, e.g. "Enter" or "Ctrl" */
  text: PropTypes.string.isRequired,
}

export default KbdKey
