import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
//import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const Highlighter = {
  // eslint-disable-next-line no-unused-vars
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter style={coy} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}
