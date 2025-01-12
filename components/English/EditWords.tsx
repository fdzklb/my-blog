"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dataItemType } from "./index";
import { Textarea } from "../ui/textarea";
import { Edit } from "lucide-react";
const EditWords = ({
  data,
  updateWord,
}: {
  data?: dataItemType;
  updateWord: Function;
}) => {
  const [tempData, setTempData] = useState<dataItemType>({ chinese: "", english: "", tip: "" });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    data && setTempData(data);
  }, [data]);
  const onOk = () => {
    if (tempData?.chinese.trim() === "" || tempData?.english.trim() === "") {
      alert("请输入中文和英文");
      return;
    }
    updateWord(tempData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit className="w-4 h-4 text-blue-500 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>编辑</DialogTitle>
        <div className="flex flex-col py-4 space-y-4">
          {[{ key: "chinese" }, { key: "english" }, { key: "tip" }].map(
            (item) => (
              <div className="flex gap-4" key={item.key}>
                {item.key === "tip" ? (
                  <Textarea
                    placeholder=""
                    value={tempData[item.key]}
                    onChange={(e) =>
                      setTempData({ ...tempData, [item.key]: e.target.value })
                    }
                  />
                ) : (
                  <Input
                    placeholder=""
                    value={tempData[item.key]}
                    onChange={(e) =>
                      setTempData({ ...tempData, [item.key]: e.target.value })
                    }
                  />
                )}
              </div>
            )
          )}
        </div>
        <div className="w-full flex justify-end">
          <Button onClick={onOk}>确定</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditWords;
