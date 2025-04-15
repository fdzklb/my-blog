import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Button  } from '@/components/ui/button'
import { Card, CardContent  } from '@/components/ui/card'
import Code from './Code'
import RotateAlbum from '@/components/blog/articles/RotateAlbum'
// 将markdown链接格式转换为HTML a标签
function convertMarkdownLinksToHTML(text: string): string {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
  // 如果没有匹配到链接格式，直接返回原文本
  if (!linkRegex.test(text)) {
    return text;
  }
  // 替换所有符合markdown链接格式的文本
  let result = text;
  let match;
  // 使用while循环持续匹配所有符合条件的链接
  while ((match = linkRegex.exec(result)) !== null) {
    const [fullMatch, title, url] = match;
    const replacement = `<a target="_blank" rel="noopener noreferrer" href="${url}">${title}</a>`;
    result = result.slice(0, match.index) + replacement + result.slice(match.index + fullMatch.length);
    // 重置lastIndex以避免无限循环
    linkRegex.lastIndex = match.index + replacement.length;
  }
  return result;
}


function Table({ headers, rows }: { headers: string[], rows: string[][] }) {
  let Headers = headers.map((header, index) => (
    <td key={index} dangerouslySetInnerHTML={{ __html: convertMarkdownLinksToHTML(header) }} />
  ))
  let Rows = rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
          <td key={cellIndex} dangerouslySetInnerHTML={{ __html: convertMarkdownLinksToHTML(cell) }} />
        )
      )}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{Headers}</tr>
      </thead>
      <tbody>{Rows}</tbody>
    </table>
  )
}

function CustomLink(props: any) {
  let href = props.href
  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    // .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  Button,
  RotateAlbum,
  Card, CardContent
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}