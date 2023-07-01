import React from 'react'
import Stack from 'react-bootstrap/Stack'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const About = () => {
  const accessToken = cookies.get('access')
  console.debug(accessToken)
  return (
    <Stack className="col-lg mx-auto">
      <h2>About Page</h2>
    </Stack>
  )
}

export default About
