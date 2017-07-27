# gm-xlsx


table_to_sheet(data):
－－通过表格解析成模板对象。
－－data为table dom。


json_to_sheet(data)
－－通过json数组生成模板对象
－－data为json数组，如:[{1:'a',2:'b',3:'c',4:'d'}, {1:'e',2:'f',3:'g',4:'h'}]。其中key为生成模板头部,且key值必须唯一



sheetToJson(file, options = {}, readOptions = {})
－－解析模板文件，生成json字符串
－－file导入模板文件。
－－options:参数配置项，如:range:2,则返回从第二行以后的数据;header:1,返回一个数组[[1,2,3,4,5,6],[7,8,9,10,11,12]],header:'A',返回一个数组[[A:1,B:2,C:3,D:4,E:5,:F6],[A:7,B:8,C:9,D:10,E:11,F:12]]。


write(wb, writeOptions)
－－写入workbook
－－wb:{SheetNames: sNames, Sheets: Sheets},sNames导出模板标签名，Sheets为模板内容
－－writeOptions，配置项：type:输出类型，一般用{type:"binary"}，bookType:输出格式，一般用{bookType: 'xlsx'},一般使用这两个可以了


read(data, readOptions)
--读取解析数据
－－data读取文件成功后的数据
－－readOptions，配置项：type:输入类型，一般用{type:'binary'}