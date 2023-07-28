import { useContentful } from 'react-contentful'
import ReactMarkdown from 'react-markdown'

import Stack from 'react-bootstrap/Stack'

const Documentation = () => {
  const { data } = useContentful({
    contentType: 'documentation',
    query: {},
  })
  const body = data?.items[0].fields.body
  return (
    <Stack className="col-sm-10 mx-auto">
      <ReactMarkdown>{body}</ReactMarkdown>
    </Stack>
  )
}

export default Documentation
