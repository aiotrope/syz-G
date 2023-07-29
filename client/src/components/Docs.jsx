import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Container from 'react-bootstrap/Container'

import mdFile from '../assets/docs.md'
import Highlighter from './misc/highlighter'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import '@wcj/markdown-style'

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
    <Container>
      <Row className="justify-content-md-center">
        <Col xs md lg="8">
          <markdown-style theme="light">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[gfm]}
              components={Highlighter}
            >
              {markdown}
            </ReactMarkdown>
          </markdown-style>
        </Col>
      </Row>
    </Container>
  )
}

export default Documentation
