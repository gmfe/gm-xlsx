import {utils, write, read} from 'xlsx'
import FileSaver from 'file-saver'
import _ from 'lodash'

// /* eslint-disable-next-line */
const {
  json_to_sheet: xlsxJsonToSheet,
  table_to_sheet: xlsxTableToSheet
} = utils

/**
 * 官方wiki中提到重写Range的方法: https://github.com/SheetJS/js-xlsx/wiki/General-Utility-Functions#updating-worksheet-range
 * @param ws 表格数据
 */
function updateSheetRange (ws) {
  let range = { s: { r: 20000000, c: 20000000 }, e: { r: 0, c: 0 } }
  Object.keys(ws).filter(function (x) { return x.charAt(0) !== '!' })
    .map(utils.decode_cell).forEach(function (x) {
      range.s.c = Math.min(range.s.c, x.c); range.s.r = Math.min(range.s.r, x.r)
      range.e.c = Math.max(range.e.c, x.c); range.e.r = Math.max(range.e.r, x.r)
    })
  ws['!ref'] = utils.encode_range(range)
}

/**
 *  通过json数组导出模板
 */
const jsonToSheet = (datas, options) => {
  const opts = Object.assign({}, options, {style: 'json'})
  toSheet(datas, opts)
}

/**
 * 通过table导出模板
 */
const tableToSheet = (datas, options) => {
  const opts = Object.assign({}, options, {style: 'table'})
  toSheet(datas, opts)
}

/**
 * 导入excel,解析excel文档转换为json
 */
const sheetToJson = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    reader.readAsBinaryString(file)

    // 读取文件成功后执行
    reader.onload = (data) => {
      const binary = data.target.result
      const wb = read(binary, {type: 'binary'})
      let res = []
      // 通过wb.SheetNames数组遍历，返回有序json数组
      _.each(wb.SheetNames, (name) => {
        let sheet = wb.Sheets[name]
        // 参考 issue
        // https://github.com/SheetJS/js-xlsx/issues/1004
        // https://github.com/SheetJS/js-xlsx/issues/764
        // 因为一些原因(第三方工具导出/wps不兼容?) 客户的excel中 <dimension ref="A1:W1048576"/> ref属性可能有问题
        // 解决方案
        // https://github.com/SheetJS/js-xlsx/wiki/General-Utility-Functions#updating-worksheet-range
        updateSheetRange(sheet)

        const data = utils.sheet_to_json(sheet, {header: 1})
        // 去掉最后为空的数组
        const list = _.reverse(data)
        let lastNullNum = 0
        _.find(list, (l) => {
          if (l.length === 0) {
            lastNullNum++
          }
          return l.length !== 0
        })

        res.push({[name]: _.slice(data, 0, data.length - lastNullNum)})
      })

      resolve(res)
    }

    reader.onerror = reject
  }
  )
}

// 字符串转字符流
function s2ab (s) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)

  for (let i = 0; i !== s.length; ++i) {
    view[i] = s.charCodeAt(i) & 0xFF
  }

  return buf
}

/**
 * 模板导出逻辑处理，暂时只支持json和table两种格式导出
 * @param datas 数据源数组，数组元素包含导出每页数据，可能为多个[data1, data2]
 * @param opts 配置选项,包含文件名如"test.xlsx"，导出每页数据的名称['sheet1', 'sheet2],
 */
function toSheet (datas, opts) {
  const {fileName = 'download', SheetNames = [], style = 'json'} = opts

  // 处理多个sheet
  let Sheets = {}; let sNames = []
  _.each(datas, (data, index) => {
    const sheetName = SheetNames[index] ? SheetNames[index].replace(/[\\:;?/*[\]]/g, '-') : ('sheet' + index) // 如果没有传名字，则给默认名字
    Sheets[sheetName] = (style === 'json') ? xlsxJsonToSheet(data) : xlsxTableToSheet(data)
    sNames.push(sheetName)
  })

  const ws = write({SheetNames: sNames, Sheets: Sheets}, {bookType: 'xlsx', type: 'binary'})

  const wsblob = new window.Blob([s2ab(ws)], {type: 'application/octet-stream'}) // 创建二进制对象写入转换好的字节流
  FileSaver.saveAs(wsblob, fileName.replace(/[<>\\:;?/*|]/g, '-'))
}

export {jsonToSheet, tableToSheet, sheetToJson}
