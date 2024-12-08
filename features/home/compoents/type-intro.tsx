"use client";

import * as React from "react";
import { TypeAnimation } from "react-type-animation";

export const TypeIntro = ({ lang }: { lang: string }) => {
  return (
    <TypeAnimation
      className="text-2xl tracking-widest md:text-5xl"
      sequence={[
        500,
        lang === "zh" ? "一名前端开发工程师 。" : "A Full Stack <Developer /> .",
        1000,
        lang === "zh" ? "A Web <Developer /> 。" : "I Am An Entrepreneur ?",
        1000,
      ]}
      speed={10}
      repeat={Infinity}
    />
  );
};
