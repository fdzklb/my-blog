'use client'

import { useState } from 'react'
import dayjs from 'dayjs'
import { ThumbsUp } from 'lucide-react'

type Comment = {
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

export default function CommentList({ comments }: CommentListProps) {
  // 用于存储每条评论的点赞状态
  const [likes, setLikes] = useState<{ [key: number]: number }>({})

  // 处理点赞事件
  const handleLike = (commentId: number) => {
    setLikes(prev => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 1
    }))
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
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
    </div>
  )
}
