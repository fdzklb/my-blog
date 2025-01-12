"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Delete, LucideCopy, Settings } from "lucide-react";
import ImportWords from "./ImportWords";
import ExportWords from "./ExportWords";
import { dataItemType } from "./index";
const Setting = ({
  allNames,
  modeType,
  setSelectNames,
  selectNames,
  setModeType,
  addWords,
  onDelete,
}: {
  allNames: string[];
  modeType: string;
  selectNames: string[];
  setSelectNames: (names: string[]) => void;
  setModeType: (mode: string) => void;
  addWords: (name: string, content: dataItemType[]) => void;
  onDelete: (name: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);

  const copyData = (name: string) => {
    const data = window.localStorage.getItem(name);
    const formatData = `~!@##@!~${name}~!@##@!~${data}`;
    if (data) {
      navigator.clipboard.writeText(formatData);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="fixed right-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="menu"
            className={"top-4 right-0"}
          >
            <Settings className="size-4" />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>设置</SheetTitle>
        </SheetHeader>
        <div className="space-y-8 mt-8">
          <div className="flex space-x-4 align-middle">
            <h1 className="leading-9">今日新词量</h1>
            <Input
              type="number"
              className="w-16"
              value={window.localStorage.getItem("newWordsNum") || 10}
              onChange={(e) => {
                window.localStorage.setItem("newWordsNum", e.target.value);
              }}
            />
          </div>
          <div className="flex space-x-4 align-middle">
            <h1 className="leading-9">今日复习量</h1>
            <Input
              type="number"
              className="w-16"
              value={window.localStorage.getItem("reviewWordsNum") || 30}
              onChange={(e) => {
                window.localStorage.setItem("reviewWordsNum", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <h1>记忆模式</h1>
            <Button
              variant={modeType === "艾宾浩斯记忆法" ? "default" : "ghost"}
              onClick={() => setModeType("艾宾浩斯记忆法")}
            >
              艾宾浩斯记忆法
            </Button>
            <Button
              variant={modeType === "收藏模式" ? "default" : "ghost"}
              onClick={() => setModeType("收藏模式")}
            >
              收藏模式
            </Button>
          </div>
          <div className="pt-8 space-y-4">
            <div className="flex space-x-4 align-middle">
              <h1>单词本</h1>
              <ImportWords addWords={addWords} />
              <ExportWords />
            </div>
            <div className="flex flex-col space-y-4">
              {allNames.map((name) => (
                <div key={name} className="flex space-x-2">
                  <Checkbox
                    id="terms"
                    checked={selectNames.includes(name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectNames([...selectNames, name]);
                      } else {
                        setSelectNames(selectNames.filter((n) => n !== name));
                      }
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {name}
                  </label>
                  <Delete
                    className="size-4 text cursor-pointer"
                    onClick={() => onDelete(name)}
                  />
                  <div title='复制单词本完整数据，包括单词是否被收藏等信息，用于粘贴到其他终端设备'>
                    <LucideCopy className="size-4 text cursor-pointer" onClick={() => copyData(name)} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Setting;
