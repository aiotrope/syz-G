import React from 'react'

import Button from 'react-bootstrap/Button'

export const AccountDeletion = ({ handleDeleteAccount }) => {
  return (
    <>
      <p>This action will delete your account profile, posts and comments from our records.</p>
      <Button variant="outline-danger" size="lg" onClick={handleDeleteAccount}>
        Delete my account
      </Button>
    </>
  )
}
