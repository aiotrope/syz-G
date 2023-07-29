import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Stack from 'react-bootstrap/Stack'

import mdFile from '../assets/docs.md'
import Highlighter from './misc/highlighter'

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
    <Stack className="col-sm-10 mx-auto">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]} components={Highlighter}>
        {markdown}
      </ReactMarkdown>
    </Stack>
  )
}

export default Documentation
