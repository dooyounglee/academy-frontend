import React from 'react'
import ReactMarkdown from 'react-markdown'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'
import RemarkMathPlugin from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'

const _mapProps = props => ({
  ...props,
  escapeHtml: false,
  plugins: [RemarkMathPlugin, remarkGfm],
  remarkPlugins: [RemarkMathPlugin, remarkGfm],
  rehypePlugins: [rehypeKatex],
  renderers: {
    ...props.renderers,
    math: opts => <BlockMath math={opts.value} />,
    inlineMath: opts => <InlineMath math={opts.value} />
  }
})

const Markdown = props => <ReactMarkdown {..._mapProps(props)} />

export default Markdown
