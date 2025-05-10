"use client";

import * as React from "react";

const hType = ["h1", "h2", "h3", "h4", "h5", "h6"];

type AnchorType = {
  type: string;
  id: string;
  children?: AnchorType[];
};
// 将标题数组转换为树形结构的函数
const convertToTree = (arr: AnchorType[]): AnchorType[] => {
  const result: AnchorType[] = [];
  const stack: AnchorType[] = [];

  arr.forEach((item) => {
    // 获取当前标题的等级数字
    const currentLevel = parseInt(item.type.substring(1));

    // 如果是h1或栈为空，直接添加到结果数组
    if (currentLevel === 1 || stack.length === 0) {
      const newNode = { ...item, children: [] };
      result.push(newNode);
      stack.length = 0; // 清空栈
      stack.push(newNode);
      return;
    }

    // 获取栈顶元素的等级
    const topLevel = parseInt(stack[stack.length - 1].type.substring(1));

    // 如果当前等级大于栈顶等级，作为子节点
    if (currentLevel > topLevel) {
      const newNode = { ...item, children: [] };
      stack[stack.length - 1].children?.push(newNode);
      stack.push(newNode);
    }
    // 如果当前等级小于等于栈顶等级，需要回溯
    else {
      // 回溯栈直到找到合适的父节点
      while (
        stack.length > 0 &&
        parseInt(stack[stack.length - 1].type.substring(1)) >= currentLevel
      ) {
        stack.pop();
      }

      const newNode = { ...item, children: [] };
      if (stack.length === 0) {
        // 如果栈为空，添加到结果数组
        result.push(newNode);
      } else {
        // 否则添加到找到的父节点的children中
        stack[stack.length - 1].children?.push(newNode);
      }
      stack.push(newNode);
    }
  });

  return result;
};

const Anchor = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(({ className, ...props }, ref) => {
  const [active, setActive] = React.useState(false);
  const [achorArr, setAchorArr] = React.useState<AnchorType[]>([]);
  React.useEffect(() => {
    const anchors = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const arr = [...anchors].map((item) => ({
      type: item.localName,
      id: item.id,
    }));
    const achorArr = convertToTree(arr);
    setAchorArr(achorArr);
  }, []);

  // const scrolltoAchor = (id: string) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  const renderAchor = (anchor: AnchorType) => {
    const { id, children } = anchor;
    return (
      <React.Fragment key={id}>
        <li className="mt-0 pt-2">
          <a
            href={`#${id}`}
            // onClick={() => scrolltoAchor(id)}
            className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
          >
            {id}
          </a>
          {children && children.length > 0 && (
            <ul className="m-0 list-none pl-4">
              {children.map((child) => renderAchor(child))}
            </ul>
          )}
        </li>
      </React.Fragment>
    );
  };

  const achorElement = React.useMemo(() => {
    return achorArr.map((anchor) => renderAchor(anchor));
  }, [achorArr]);

  return (
      <div className="flex justify-center">
        <div className="no-scrollbar h-full overflow-auto pb-10">
          <div className="space-y-2">
            <ul className="m-0 list-none overflow-y-auto max-h-[500px]">{achorElement}</ul>
          </div>
        </div>
      </div>
    
  );
});

export default Anchor;
