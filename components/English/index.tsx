"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { Wrapper } from "../wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type DataType = {
  [key: string]: {
    chinese: string;
    english: string;
    count: number;
    remember: boolean;
    tip: string;
    lastShowTime: string;
  };
};
const English = ({ data }: DataType) => {
  const typedData = useMemo(() => Object.values(data), []);
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        setRadom();
      }
      if (e.key === "ArrowDown") {
        setNext();
      }
    });
    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  const randomItem = useMemo(() => {
    return typedData[current];
  }, [current]);


  const speak = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      return;
    }
    if (randomItem.english !== "") {
      const utterThis = new SpeechSynthesisUtterance(randomItem.english);
      synth.speak(utterThis);
    }
  }

  const setNext = () => {
    if (current + 1 < typedData.length) {
      setCurrent((current) => current + 1);
      setVisible(false);
    } else {
      setCurrent(0);
    }
  };

  const setRadom = () => {
    setCurrent(Math.floor(Math.random() * typedData.length));
    setVisible(false);
  };


  return (
    <Wrapper className="flex min-h-screen flex-col px-6 pt-16 items-center space-y-4">
      <p className="text-lg">{randomItem?.chinese}</p>
      <Input autoFocus />
      <div>{randomItem?.tip}</div>
      <div
        className="cursor-pointer w-full text-center text-lg"
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? randomItem?.english : "点击显示"}
        {visible ? <span onClick={(e) => { e.stopPropagation(); speak() }}>🔊</span> : null}
      </div>
      <Button className="w-full" onClick={setRadom}>
        随机-&gt;
      </Button>
      <Button className="w-full" onClick={setNext}>
        下一句
      </Button>
    </Wrapper>
  );
};

export default English;
