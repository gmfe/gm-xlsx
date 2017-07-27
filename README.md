# gm-xlsx


tableToSheet(data):
－－通过表格解析成模板对象。
－－data为table dom。


jsonToSheet(datas, options)
－－通过json数组生成模板对象
－－datas为json数组，如:[{1:'a',2:'b',3:'c',4:'d'}, {1:'e',2:'f',3:'g',4:'h'}]。其中key为生成模板头部,且key值必须唯一
－－options文件配置项，fileName文件名,如{fileName: 'text.xlsl'}，SheetNames工作簿名称，如{SheetNames: ['sheet1', 'sheet2']}



sheetToJson(datas, options)
－－解析模板文件，生成json字符串
－－datas为table dom对象，如:[tabl21, table2],其中元素为table dom。
－－options文件配置项，fileName文件名,如{fileName: 'text.xlsl'}，SheetNames工作簿名称，如{SheetNames: ['sheet1', 'sheet2']}
