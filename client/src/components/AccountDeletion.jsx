import Button from 'react-bootstrap/Button'

// user account deletion component
const AccountDeletion = ({ handleDeleteAccount }) => {
  return (
    <>
      <p>This action will delete your account profile, posts and comments from our records.</p>
      <Button
        variant="outline-danger"
        size="lg"
        onClick={handleDeleteAccount}
        id="account-delete-btn"
      >
        Delete my account
      </Button>
    </>
  )
}

export default AccountDeletion
