import React from 'react'
import { Tag, TagCloseButton, TagLabel, Input } from '@chakra-ui/core'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import './tags-input.css'

const renderTagList = (props) => {
  const {
    tag,
    key,
    disabled,
    onRemove,
    classNameRemove,
    getTagDisplayValue,
    ...other
  } = props

  return (
    <Tag key={key} size='sm' {...other} border='none'>
      <TagLabel>{getTagDisplayValue(tag)}</TagLabel>
      <TagCloseButton />
    </Tag>
  )
}

const renderInput = (props) => {
  const { onChange, value, addTag, ref, ...other } = props
  return (
    <Input
      ref={ref}
      type='text'
      onChange={onChange}
      value={value}
      isFullWidth
      variant='unstyled'
      {...other}
    />
  )
}

const CustomTagsInput = React.forwardRef(({ tags, handleOnChange }, ref) => {
  return (
    <TagsInput
      value={tags}
      onChange={handleOnChange}
      addOnBlur
      onlyUnique
      preventSubmit={false}
      inputProps={{ ref }}
      renderTag={renderTagList}
      renderInput={renderInput}
    />
  )
})

export default CustomTagsInput
