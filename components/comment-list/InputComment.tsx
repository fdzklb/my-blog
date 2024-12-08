'use client'

import { createComment } from '@/lib/actions';
import { useState, FormEvent, useActionState } from 'react'

interface InputCommentProps {
  onSubmit: (data: { name: string; email: string; content: string }) => void
}

export default function InputComment({ onSubmit }: InputCommentProps) {
  const initialState = { message: "", errors: {} };
  const [errors, dispatch, isPending] = useActionState(createComment, initialState)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  })

  // 验证表单数据
  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      content: ''
    }

    // 验证姓名
    if (!formData.name) {
      newErrors.name = '请输入姓名'
    } else if (formData.name.length > 10) {
      newErrors.name = '姓名不能超过10个字符'
    }

    // 验证邮箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = '请输入邮箱'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '请输入正确的邮箱格式'
    }

    // 验证评论内容
    if (!formData.content) {
      newErrors.content = '请输入评论内容'
    } else if (formData.content.length > 1000) {
      newErrors.content = '评论内容不能超过1000字符'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  // 处理表单提交
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
      // 清空表单
      setFormData({
        name: '',
        email: '',
        content: ''
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          姓名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={10}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          邮箱 <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          评论内容 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          maxLength={1000}
        />
        <div className="mt-1 flex justify-between">
          {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
          <span className="text-sm text-gray-500">
            {formData.content.length}/1000
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        提交评论
      </button>
    </form>
  )
}
