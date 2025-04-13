'use client'

import { highlight } from 'sugar-high';
import React, { FC, HTMLAttributes } from 'react';
import { Copy } from 'lucide-react';

// 定义组件的类型接口
interface CodeProps extends HTMLAttributes<HTMLElement> {
  children: string; // 明确 children 类型为 string
}

// 使用泛型约束 props 类型
const Code: FC<CodeProps> = ({ children, ...props }) => {
  const codeHTML = highlight(children); // 调用高亮函数
  const onClickCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = children;
    document.body.appendChild(textArea); 
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
  return (
    <>
     <div className="float-right sticky top-0 right-1 cursor-pointer text-gray-500 hover:text-gray-600" title='copy'>
       <Copy size={20} strokeWidth={2}  fill="none" onClick={onClickCopy} />
     </div>
     <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    </>
  );
};

export default Code;
