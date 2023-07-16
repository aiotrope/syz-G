import React from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import FormGroup from 'react-bootstrap/FormGroup'
import FormLabel from 'react-bootstrap/FormLabel'
import Button from 'react-bootstrap/Button'

export const UpdateAvatarForm = ({ avatarForm, onAvatarFormSubmit }) => {
  return (
    <Form onSubmit={avatarForm.handleSubmit(onAvatarFormSubmit)} className="mt-1 mb-5">
      <h4>Update your avatar</h4>
      <FormGroup className="mb-4">
        <FormLabel htmlFor="image" className="text-warning">
          Recommended file size: Less than 19 KB only.
        </FormLabel>
        <FormControl
          type="file"
          size="lg"
          {...avatarForm.register('image')}
          aria-invalid={avatarForm.formState.errors.image?.message ? 'true' : 'false'}
          className={`${avatarForm.formState.errors.image?.message ? 'is-invalid' : ''} `}
          id="image"
          multiple
        />
        {avatarForm.formState.errors.image?.message && (
          <FormControl.Feedback type="invalid">
            {avatarForm.formState.errors.image?.message}
          </FormControl.Feedback>
        )}
      </FormGroup>
      <FormGroup className="d-grid mt-3">
        <Button
          variant="secondary"
          size="lg"
          type="submit"
          disabled={!avatarForm.formState.isDirty}
          aria-disabled={!avatarForm.formState.isDirty}
        >
          UPDATE AVATAR
        </Button>
      </FormGroup>
    </Form>
  )
}
