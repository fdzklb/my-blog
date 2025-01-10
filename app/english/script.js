// 这是一个js脚本，该脚本的作用是将files文件夹内的md文件转化为json格式的文件存在jsons文件夹中
// 详细过程如下：将md文件的内容按照空白行进行分隔成每一段，每一段中的内容是按照换行符分割成不同的句子。
// json字段中以句子的顺序作为key. value是一个对象，包含english, count, remember, tip, lastShowTime四个字段, 将句子以第一个换行进行分隔，前半部分赋值给chinese字段，其他部分赋给english字段，count默认为0，lastShowTime默认为当前时间

const fs = require('fs');
const path = require('path');
// const all_filesDatas = require('./jsons/all_files.json');

// 读取文件夹内的所有文件
const readFiles = (dir) => {
    return fs.readdirSync(dir).filter(file => path.extname(file).toLowerCase() === '.md');
};

// 处理单个Markdown文件并转换为JSON格式
const processFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const paragraphs = content.split(/\n\s*\n/);

    const result = {};
    paragraphs.forEach((paragraph, index) => {
        const sentences = paragraph.split('\n');
        const chinese = sentences[0];
        const english = sentences[1];
        const tip = sentences.slice(2).join('\n');
        result[chinese] = {
            chinese: chinese,
            english: english,
            tip: tip.replace(/\n/g, '<br>'),
            count: 0,
            remember: false,
            lastShowTime: 0,
            isFocus: false,
            name: path.basename(filePath, '.md')
        };
    });

    return result;
};

// 主函数，处理所有Markdown文件
const main = () => {
    const filesDir = path.join(__dirname, 'files');
    const jsonsDir = path.join(__dirname, 'jsons');

    if (!fs.existsSync(jsonsDir)) {
        fs.mkdirSync(jsonsDir);
    }

    const files = readFiles(filesDir);
    const allJsonContent = {};

    files.forEach(file => {
        const filePath = path.join(filesDir, file);
        const jsonContent = processFile(filePath);
        Object.assign(allJsonContent, jsonContent);
    });

    const jsonFilePath = path.join(jsonsDir, 'all_files.json');
    fs.writeFileSync(jsonFilePath, JSON.stringify(allJsonContent, null, 2));
    console.log(`Processed all files and saved to ${jsonFilePath}`);
};

main();