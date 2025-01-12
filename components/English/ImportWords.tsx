"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { dataItemType } from "./index";
const ImportWords = ({ addWords }: { addWords: Function }) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState<string>("");
  const [wordsStr, setWordsStr] = useState<string>("");

  // 处理导入的txt文件
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setWordsStr(text);
    };
    reader.readAsText(file);
  };

  const onWordsStrChange = (str: string) => {
    if(str.startsWith('~!@##@!~')) {
      setName(str.split('~!@##@!~')[1]);
    }
    setWordsStr(str);
  };
  const onOk = () => {

    if (name.trim() === "" || wordsStr.trim() === "") {
      alert("请输入分类名称和单词");
      return;
    }
    if(JSON.parse(window.localStorage.getItem("allNames") || "[]").includes(name)) {
      alert("分类名称已存在，请修改分类名称");
      return;
    }

    // 如果是粘贴过来的完整数据
    if(wordsStr.startsWith('~!@##@!~')) {
      const rwa = JSON.parse(wordsStr.split('~!@##@!~')[2]);
      const focusIndexMapItem: number[] = [];
      rwa.forEach((element: dataItemType, index: number) => {
        if(element.isFocus) {
          focusIndexMapItem.push(index);
        }
      });
      addWords(name, rwa, focusIndexMapItem);
      setWordsStr("");
      setName("");
      return;
    } 

    const wordsArray = wordsStr
      .split(String.fromCharCode(10))
      .map((el) => el.trim());
    if (wordsArray.length < 2) {
      return;
    }

    const content: dataItemType[] = [];
    let aNewWord = {
      chinese: "",
      english: "",
      tip: "",
      name,
      count: 0,
      remember: false,
      lastShowTime: 0,
      isFocus: false,
    };
    let count = 1;
    for (let i = 0; i < wordsArray.length + 1; i++, count++) {
      if (wordsArray[i] === "" || i === wordsArray.length) {
        count = 0;
        if(aNewWord.chinese === "") continue;
        content.push(JSON.parse(JSON.stringify(aNewWord)));
        aNewWord = { ...aNewWord, chinese: "", english: "", tip: "" };
        continue;
      }
      if (count === 1) {
        aNewWord.chinese = wordsArray[i];
      } else if (count === 2) {
        aNewWord.english = wordsArray[i];
      } else if (count > 2) {
        aNewWord.tip = aNewWord.tip + wordsArray[i] + String.fromCharCode(10);
      }
    }
    addWords(name, content);
    setWordsStr("");
    setName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer text-blue-500">+ 导入单词</div>
      </DialogTrigger>
      <DialogContent className="max-w-full h-[90vh]">
        <DialogTitle>导入单词</DialogTitle>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right">
              导入txt
            </Label>
            <Input className="w-60" id="picture" type="file" onChange={handleFileChange} />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="name" className="text-right">
              分类名称
            </Label>
            <Input
              className="w-60"
              required
              placeholder="请输入分类名称,必填"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="items-center gap-4">
            <Textarea
              placeholder={`方式一：直接可以粘贴复制过来的单词本，系统会自动识别并导入单词本数据，并保留单词所有信息，包括是否被收藏等。
方式二：手动单词导入但必须遵守以下格式(第一行是单词，第二行是单词释义，其他行是笔记。用空白行间隔新单词), 如：
picnic
野餐，野餐食物
go on a picnic
we had a panic deside the river

sibling
兄弟姐妹
I have three sibilings
...`
            }
              value={wordsStr}
              className="w-full min-h-96 leading-5"
              onChange={(e) => onWordsStrChange(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Button onClick={onOk}>确定</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportWords;
