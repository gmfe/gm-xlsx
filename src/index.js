import XLSX from '../node_modules/xlsx/xlsx';
import FileSaver from 'file-saver';
import _ from 'lodash';

const {utils, write, read} = XLSX;
const {json_to_sheet, table_to_sheet, aoa_to_sheet} = utils;

/**
 *  通过json数组导出模板
 * @param dataMap
 * @param options　
 */
const jsonToSheet = (dataMap, options) => {
    const opts = Object.assign({}, options, {style: 'json'});
    toSheet(dataMap, opts);
};

/**
 *　通过table导出模板
 * @param tableMap
 * @param options
 * @constructor
 */
const tableToSheet = (tableMap, options) => {
    const opts = Object.assign({}, options, {style: 'table'});
    toSheet(tableMap, opts);
};

/**
 * 导入excel,解析excel文档转换为json
 * @param file
 * @param cb
 * @param options
 */
const sheetToJson = (file, cb, options, readOptions) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    //读取文件成功后执行
    reader.onload = (data) => {
        const binary = data.target.result;
        const wb = read(binary, readOptions);
        let res = {};
        _.each(wb.Sheets, (ws, name) => {
            res[name] = XLSX.utils.sheet_to_json(ws, options);
        });

        cb(res);
    };

    reader.onerror = () => {
        throw Error('读取文件错误');
    };
};

//字符串转字符流
function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);

    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }

    return buf;
}

/**
 * 模板导出逻辑处理，暂时只支持json和table两种格式导出
 * @param map　数据源数组，数组元素包含导出每页数据，可能为多个[data1, data2]
 * @param opts　配置选项，包含文件名如"test.xlsx"，导出每页数据的名称['sheet1', 'sheet2],
 */
function toSheet(map, opts) {
    const {fileName = 'download', SheetNames = [], style = 'json', writeOptions = {}} = opts;

    //处理多个sheet
    let Sheets = {}, sNames = [];
    _.each(map, (data, index) => {
        const sheetName = SheetNames[index] ? SheetNames[index]: ('sheet'+ index); //如果没有传名字，则给默认名字
        Sheets[sheetName] = (style==='json') ? json_to_sheet(data) : table_to_sheet(data);
        sNames.push(sheetName);
    });

    const ws = write({SheetNames: sNames, Sheets: Sheets}, writeOptions);

    const wsblob = new Blob([s2ab(ws)], {type: 'application/octet-stream'}); //创建二进制对象写入转换好的字节流
    FileSaver.saveAs(wsblob, fileName);
}

export {jsonToSheet, tableToSheet, sheetToJson}