"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { LucideDownload } from "lucide-react";
import { dataItemType } from "./index";
const ExportWords = () => {
  const [open, setOpen] = React.useState(false);
  const [selectNames, setSelectNames] = React.useState<string[]>([]);

  const allNames = JSON.parse(localStorage.getItem("allNames") || "[]");
  const onOk = () => {
    if(selectNames.length === 0) return;
    selectNames.forEach((name) => {
        const words = JSON.parse(
          localStorage.getItem(name) || "[]"
        ) as dataItemType[];
        const str = words
          .map((word) => {
            return `${word.english}\n${word.chinese}\n${word.tip}`;
          })
          .join("\n");
        const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${name}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer text-blue-500">
          <LucideDownload className="w-4 h-4 mr-1" />
          <span>导出单词本</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>导出单词本(txt格式)</DialogTitle>
        <div className="flex space-x-2">
          {allNames.map((name) => (
            <div key={name} className="flex space-x-2">
              <Checkbox
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
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={onOk}>确定</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportWords;
