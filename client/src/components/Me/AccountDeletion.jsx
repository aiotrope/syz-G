import Button from 'react-bootstrap/Button'

const AccountDeletion = ({ handleDeleteAccount }) => {
  return (
    <>
      <p>This action will delete your account profile, posts and comments from our records.</p>
      <Button variant="outline-danger" size="lg" onClick={handleDeleteAccount}>
        Delete my account
      </Button>
    </>
  )
}

export default AccountDeletion
