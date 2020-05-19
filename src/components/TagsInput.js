import React from 'react'
import { Tag, TagCloseButton, TagLabel, Input } from '@chakra-ui/core'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

import './tags-input.css'

const renderTagList = (props, handleRemoveTag) => {
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
      <TagCloseButton onClick={() => handleRemoveTag(tag)} />
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

const handleValidate = (tag) => tag.length <= 18

const CustomTagsInput = React.forwardRef(
  ({ tags, handleOnChange, handleRemoveTag, setShowError }, ref) => {
    return (
      <TagsInput
        value={tags}
        onChange={handleOnChange}
        addOnBlur
        onlyUnique
        maxTags={10}
        preventSubmit={false}
        validate={handleValidate}
        validationRegex={/^[\w\s-]*$/}
        onValidationReject={() => setShowError(true)}
        inputProps={{ ref }}
        renderTag={(props) => renderTagList(props, handleRemoveTag)}
        renderInput={renderInput}
      />
    )
  },
)

export default CustomTagsInput
