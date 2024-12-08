'use client'

import { useEffect, useState, useTransition } from 'react'
import dayjs from 'dayjs'
import { ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react'

type Comment = {
  id: number
  name: string
  email: string
  created_at: Date
  content: string
}

interface CommentListProps {
  comments: Comment[]
}

// 处理邮箱显示格式,只显示前3位和后4位,中间用***代替
const formatEmail = (email: string) => {
  const [prefix, suffix] = email.split('@')
  const maskedPrefix = prefix.slice(0, 3) + '***' + prefix.slice(-4)
  return `${maskedPrefix}@${suffix}`
}

export default function CommentList({ slug }: { slug: string }) {
  // 当前页码
  const [currentPage, setCurrentPage] = useState(1)
  const [comments, setComments] = useState([]);
  const [isPending, setPending] = useState(false);
  // 每页显示数量
  const PAGE_SIZE = 10

  useEffect(() => {
    getCommentsBySlug(slug)
  }, [slug, currentPage])

  const getCommentsBySlug = async (slug: string) => {
    setPending(true)
    // const comments = await fetchCommentsBySlug(slug)
    // setComments(comments)
    // setPending(false)
  }

  
  // 计算总页数
  const totalPages = Math.ceil(comments.length / PAGE_SIZE)
  
  // 获取当前页的评论
  const getCurrentPageComments = () => {
    const start = (currentPage - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    return comments.slice(start, end)
  }

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6">
      {/* 评论列表 */}
      {getCurrentPageComments().map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium text-gray-900">{comment.name}</h3>
              <p className="text-sm text-gray-500">{formatEmail(comment.email)}</p>
            </div>
            <span className="text-sm text-gray-500">
              {dayjs(comment.created_at).format('YYYY-MM-DD HH:mm')}
            </span>
          </div>
          
          <p className="text-gray-700 mb-4">{comment.content}</p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLike(comment.id)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{likes[comment.id] || 0}</span>
            </button>
          </div>
        </div>
      ))}

      {/* 分页控件 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}