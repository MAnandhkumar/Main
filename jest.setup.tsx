import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock framer-motion
vi.mock('framer-motion', () => {
  const filterProps = (props: any) => {
    const {
      initial: _initial,
      animate: _animate,
      exit: _exit,
      transition: _transition,
      whileInView: _whileInView,
      viewport: _viewport,
      whileHover: _whileHover,
      whileTap: _whileTap,
      variants: _variants,
      ...rest
    } = props
    return rest
  }

  return {
    motion: {
      div: ({ children, ...props }: any) => (
        <div {...filterProps(props)}>{children}</div>
      ),
      header: ({ children, ...props }: any) => (
        <header {...filterProps(props)}>{children}</header>
      ),
      section: ({ children, ...props }: any) => (
        <section {...filterProps(props)}>{children}</section>
      ),
      footer: ({ children, ...props }: any) => (
        <footer {...filterProps(props)}>{children}</footer>
      ),
      h1: ({ children, ...props }: any) => (
        <h1 {...filterProps(props)}>{children}</h1>
      ),
      p: ({ children, ...props }: any) => (
        <p {...filterProps(props)}>{children}</p>
      ),
      span: ({ children, ...props }: any) => (
        <span {...filterProps(props)}>{children}</span>
      ),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  }
})
