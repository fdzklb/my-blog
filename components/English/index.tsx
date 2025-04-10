"use client";

import React, { useState, useEffect, useMemo, use } from "react";
import { Wrapper } from "../wrapper";
import { Button } from "@/components/ui/button";
import Setting from "./Setting";
import ImportWords from "./ImportWords";
import EditWords from "./EditWords";
import { LucideDelete } from "lucide-react";

export type dataItemType = {
  chinese: string;
  english: string;
  count?: number;
  remember?: boolean;
  tip?: string;
  name: string;
  lastShowTime?: number;
  isFocus?: boolean;
};

// export type DataType = {
//   [key: string]: dataItemType;
// };

// const English = ({ data }: DataType) => {
const English = () => {
  const [current, setCurrent] = useState<[string, number]>(["", 0]);
  const [lastCurrentArr, setLastCurrentArr] = useState<[string, number][]>([]); // 包含最近20次的current数据
  const [visible, setVisible] = useState(false);
  const [allNames, setAllNames] = useState<string[]>([]);
  const [modeType, setModeType] = useState<string>("艾宾浩斯记忆法"); // 艾斯记忆、收藏模式
  const [selectNames, setSelectNames] = useState<string[]>([]); // 选择的单词本
  const [refresh, setRefresh] = useState(0); // 刷新状态 很多数据从localStorage中获取，需要刷新

  const dataArr = useMemo(() => {
    return JSON.parse(window.localStorage.getItem(current[0]) || "[]");
  }, [current, refresh]);

  const dataItem = dataArr[current[1]];

  useEffect(() => {
    const allNames = JSON.parse(
      window.localStorage.getItem("allNames") || "[]"
    );
    setAllNames(allNames);
    if (allNames.length === 0) return;
    setSelectNames(allNames);
    setCurrent([allNames[0], 0]);
  }, []);

  // 快捷键
  // useEffect(() => {
  //   window.addEventListener("keydown", (e) => {
  //     if (e.key === "ArrowRight") {
  //       setRandom();
  //     }
  //     if (e.key === "ArrowDown") {
  //       setNext();
  //     }
  //     // 如果是空格键，显示英文
  //     if (e.key === " ") {
  //       setVisible((v) => !v);
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("keydown", () => {});
  //   };
  // }, []);

  useEffect(() => {
    if (current[0] === "") return;
    setVisible(false);

    // 记录最近20次的current数据
    const tempLastCurrentArr = JSON.parse(JSON.stringify(lastCurrentArr));
    const index = tempLastCurrentArr.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(current)
    );

    // 如果不在历史记录中
    if (index === -1) {
      if (tempLastCurrentArr.length >= 20) {
        tempLastCurrentArr.shift();
      }
      tempLastCurrentArr.push(current);
      setLastCurrentArr(tempLastCurrentArr);
    }

    // 设置count增加1， 更新lastShowTime
    const dataArr = JSON.parse(window.localStorage.getItem(current[0]) || "[]");
    const data = dataArr[current[1]];
    if (data === undefined) return;
    data.count += 1;
    data.lastShowTime = Date.now();
    window.localStorage.setItem(current[0], JSON.stringify(dataArr));
  }, [current]);

  const onModeChange = (mode: string) => {
    setModeType(mode);
    if (mode === "收藏模式") {
      const focusIndexMap = JSON.parse(
        window.localStorage.getItem("focusIndexMap") || "{}"
      );
      const names = Object.keys(focusIndexMap);
      if (names.length === 0) return;
      const name = names[0];
      const index = focusIndexMap[name][0];
      setCurrent([name, index]);
    }
  };

  // 语音朗读
  const speak = () => {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      return;
    }
    if (dataItem.english !== "") {
      const utterThis = new SpeechSynthesisUtterance(dataItem.english);
      utterThis.rate = 1.2; // 设置语速
      synth.speak(utterThis);
    }
  };

  // 前一句
  const setLastOne = () => {
    const index = lastCurrentArr.findIndex(
      (item) => JSON.stringify(item) === JSON.stringify(current)
    );
    if (index > 0 && lastCurrentArr.length > 1) {
      setCurrent(lastCurrentArr[index - 1]);
    }
  };

  // 上一句
  const setPre = () => {
    if (current[1] - 1 >= 0) {
      setCurrent(([name, index]) => [name, index - 1]);
    }
  };

  // 下一句
  const setNext = (step: number = 1) => {
    if (current[1] + step < dataArr.length) {
      setCurrent(([name, index]) => [name, index + step]);
    } else {
      setCurrent([current[0], dataArr.length - 1]);
    }
  };

  // 记住
  const setRemeber = () => {
    const dataArr = JSON.parse(window.localStorage.getItem(current[0]) || "[]");
    const data = dataArr[current[1]];
    data.remember = !data.remember;
    window.localStorage.setItem(current[0], JSON.stringify(dataArr));
    setRefresh((v) => v + 1);
  };

  // 收藏
  const setFocus = () => {
    const typedData = JSON.parse(
      window.localStorage.getItem(current[0]) || "[]"
    );
    const data = typedData[current[1]];
    data.isFocus = !data.isFocus;
    window.localStorage.setItem(current[0], JSON.stringify(typedData));

    const focusIndexMap: { [name: string]: number[] } = JSON.parse(
      window.localStorage.getItem("focusIndexMap") || "{}"
    );
    if (data.isFocus) {
      if (focusIndexMap[current[0]]?.includes(current[1])) return;
      if (!focusIndexMap[current[0]]) {
        focusIndexMap[current[0]] = [];
      }
      focusIndexMap[current[0]].push(current[1]);
    } else {
      const newIndexArr = focusIndexMap[current[0]]?.filter(
        (item) => item !== current[1]
      );
      focusIndexMap[current[0]] = newIndexArr;
    }
    window.localStorage.setItem("focusIndexMap", JSON.stringify(focusIndexMap));
    setRefresh((v) => v - 1);
  };

  // 随机
  const setRandom = () => {
    const randomName =
      selectNames[Math.floor(Math.random() * selectNames.length)];
    const dataArr = JSON.parse(window.localStorage.getItem(randomName) || "[]");
    let randomIndex = Math.floor(Math.random() * dataArr.length);
    if (modeType === "收藏模式") {
      const focusIndexMap = JSON.parse(
        window.localStorage.getItem("focusIndexMap") || "{}"
      );
      randomIndex =
        focusIndexMap[randomName][
          Math.floor(Math.random() * focusIndexMap[randomName].length)
        ];
    }
    // 如果与当前相同，且不止一个的时候重新随机
    if (
      randomName === current[0] &&
      randomIndex === current[1] &&
      (selectNames.length > 1 || dataArr.length > 1)
    ) {
      setRandom();
      return;
    }
    setCurrent([randomName, randomIndex]);
    setVisible(false);
  };

  // 添加单词
  const addWords = (
    name: string,
    content: dataItemType[],
    focusIndexMapItem?: number[]
  ) => {
    const strData = JSON.stringify(content);
    window.localStorage.setItem(name, strData);

    const tempAllNames = [...allNames, name];
    window.localStorage.setItem("allNames", JSON.stringify(tempAllNames));
    setAllNames(tempAllNames);
    setSelectNames([...selectNames, name]);
    if (focusIndexMapItem && focusIndexMapItem.length > 0) {
      const focusIndexMap = JSON.parse(
        window.localStorage.getItem("focusIndexMap") || "{}"
      );
      focusIndexMap[name] = focusIndexMapItem;
      window.localStorage.setItem(
        "focusIndexMap",
        JSON.stringify(focusIndexMap)
      );
    }
    if (current[0] === "") {
      setCurrent([name, 0]);
    }
    window.alert("导入成功");
  };

  // 删除单词本
  const onDelete = (name: string) => {
    if (window.confirm("确定删除吗？")) {
      window.localStorage.removeItem(name);
      const tempAllNames = allNames.filter((item) => item !== name);
      window.localStorage.setItem("allNames", JSON.stringify(tempAllNames));
      setAllNames(tempAllNames);
      const tempSelectNames = selectNames.filter((item) => item !== name);
      setSelectNames(selectNames.filter((item) => item !== name));
      if (current[0] === name) {
        setCurrent([tempSelectNames[0], 0]);
      }

      const focusIndexMap = JSON.parse(
        window.localStorage.getItem("focusIndexMap") || "{}"
      );
      delete focusIndexMap[name];
      window.localStorage.setItem(
        "focusIndexMap",
        JSON.stringify(focusIndexMap)
      );
      setRefresh((v) => v + 1);
    }
  };

  const deleteWord = () => {
    if (dataItem.isFocus) {
      window.alert("请先取消收藏再删除！");
      return;
    }
    const words = JSON.parse(window.localStorage.getItem(current[0]) || "[]");
    if (words.length === 1) {
      window.alert("该单词本只有这一个单词，请直接删除单词本");
      return;
    }
    if (window.confirm(`确定删除单词吗？`)) {
      words.splice(current[1], 1);
      window.localStorage.setItem(current[0], JSON.stringify(words));
    }
    setRefresh((v) => v + 1);
  };

  // 更新单词
  const updateWord = (data: dataItemType) => {
    const { chinese, english, tip } = data;
    const tempData = { ...dataItem, chinese, english, tip };
    const dataArr = JSON.parse(window.localStorage.getItem(current[0]) || "[]");
    dataArr[current[1]] = tempData;
    window.localStorage.setItem(current[0], JSON.stringify(dataArr));
    setRefresh((v) => v + 1);
  };

  const onChangeSelectName = (names: string[]) => {
    setSelectNames(names);
    setCurrent([names[0], 0]);
  };

  return (
    <div>
      <Setting
        allNames={allNames}
        modeType={modeType}
        selectNames={selectNames}
        setSelectNames={onChangeSelectName}
        setModeType={onModeChange}
        addWords={addWords}
        onDelete={onDelete}
      />
      {dataArr.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80">
          <p className="text-lg">暂无数据</p>
          <ImportWords addWords={addWords} />
        </div>
      ) : (
        <Wrapper className="flex flex-col px-6 pt-16 items-center space-y-4 h-full">
          <div className="flex space-x-4 items-center">
            <span className="text-lg">{dataItem?.chinese}</span>
            <EditWords data={dataItem} updateWord={updateWord} />
            <LucideDelete
              className="w-4 h-4 cursor-pointer text-blue-500"
              onClick={deleteWord}
            />
          </div>
          <div className="cursor-pointer w-full text-center text-lg">
            <span>{visible ? dataItem?.english : ""}</span>
            {visible && dataItem?.english !== "" ? (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  speak();
                }}
              >
                🔊
              </span>
            ) : null}
          </div>
          {dataItem?.tip && visible && (
            <div className="flex flex-col">
              {dataItem?.tip.split("\n").map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
          <div className="bottom-20 fixed w-[90%] flex justify-around sm:justify-between">
            <div className="space-y-4 w-[45%]">
              <Button className="w-full" onClick={setPre}>
                上一句
              </Button>
              <Button className="w-full" onClick={() => setNext(1)}>
                下一句
              </Button>
              <Button className="w-full" onClick={() => setVisible((v) => !v)}>
                {visible ? "隐藏原文" : "显示原文"}
              </Button>
              <Button className="w-full" onClick={setRandom}>
                随机-&gt;
              </Button>
            </div>
            <div className="space-y-4 w-[45%]">
              <Button className="w-full" onClick={setRemeber}>
                {dataItem?.remember ? "不认识了" : "我认识"}
                {/* {`我认识 第${dataItem?.count + 1}次`} */}
              </Button>
              <Button className="w-full" onClick={setFocus}>
                {dataItem?.isFocus ? "取消收藏" : "收藏"}
              </Button>
              <Button className="w-full" onClick={setLastOne}>
                前一句(历史记录)
              </Button>
              <Button className="w-full" onClick={() => setNext(5)}>
                下5句
              </Button>
            </div>
          </div>
        </Wrapper>
      )}
    </div>
  );
};

export default English;
