import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'

import mdFile from '../assets/docs.md'
import Highlighter from './misc/highlighter'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// main documentation page component
const Documentation = () => {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    let mounted = true
    const prepareMarkdown = async () => {
      if (mounted) {
        const response = await fetch(mdFile)
        const marked = await response.text()
        setMarkdown(marked)
      }
    }
    prepareMarkdown()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Stack>
      <Container fluid>
        <Row>
          <Col>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[gfm]}
              components={Highlighter}
            >
              {markdown}
            </ReactMarkdown>
          </Col>
        </Row>
      </Container>
    </Stack>
  )
}

export default Documentation
