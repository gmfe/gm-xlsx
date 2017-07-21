import React from 'react';
import XLSX from '../node_modules/xlsx/xlsx';
import FileSaver from 'file-saver';
import {jsonToSheet, TableToSheet} from '../src/index';

const {utils, write} = XLSX;

class Export extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: [{
                '姓名': '张三',
                '年龄': 23,
                '性别': '男',
                '公司': '观麦',
                '工号': 4567
            },{
                '姓名': '李四',
                '年龄': 27,
                '性别': '男',
                '公司': '观麦',
                '工号': 6666
            }],
            data2: [{
                '姓名': '龙',
                '年龄': 23,
                '性别': '男',
                '公司': '观麦',
                '工号': 4567
            },{
                '姓名': '虎',
                '年龄': 27,
                '性别': '男',
                '公司': '观麦',
                '工号': 6666
            }]
        };

        this.handleExportTable1 = ::this.handleExportTable1;
        this.handleExportTable2 = ::this.handleExportTable2;
        this.handleExportData = ::this.handleExportData;
    }

    handleExportTable1() {
        const tbl1 = document.getElementById('sheetjs1');
        const tbl2 = document.getElementById('sheetjs2');
        TableToSheet([tbl1, tbl2], {fileName: 'table_test.xlsx', SheetNames: ['test1']});
        // const ts = utils.table_to_book(tbl);
        // const ws = write(ts, { bookType: 'xlsx', type: 'binary'});
        //
        // const wsblob = new Blob([this.s2ab(ws)], {type: 'application/octet-stream'}); //创建二进制对象写入转换好的字节流
        // FileSaver.saveAs(wsblob, "teble.xlsx");
    }

    handleExportTable2() {
        const tbl = document.getElementById('sheetjs2');
        TableToSheet([tbl], {fileName: 'table2_test.xlsx', SheetNames: ['test2']});
        // const ts = utils.table_to_book(tbl);
        // const ws = write(ts, { bookType: 'xlsx', type: 'binary'});
        //
        // const wsblob = new Blob([this.s2ab(ws)], {type: 'application/octet-stream'}); //创建二进制对象写入转换好的字节流
        // FileSaver.saveAs(wsblob, "teble.xlsx");
    }

    handleExportData() {
        const {data1, data2} = this.state;
        // const d1 = utils.json_to_sheet(data1);
        // const d2 = utils.json_to_sheet(data2);
        //
        // const ws = write({SheetNames: ["first", 'second'], Sheets: {first: d1, second: d2}}, { bookType: 'xlsx', type: 'binary'});
        //
        // const wsblob = new Blob([this.s2ab(ws)], {type: 'application/octet-stream'}); //创建二进制对象写入转换好的字节流
        // FileSaver.saveAs(wsblob, "data.xlsx");
        jsonToSheet([data1, data2], {fileName: 'test.xlsx', SheetNames: ['test1', 'test2']})
    }

    //字符串转字符流
    s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);

        for (let i = 0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }

        return buf;
    }

    render() {
        return (
            <div style={{padding: '15px'}}>
                <button className="btn btn-default" onClick={this.handleExportTable1}>导出表格1</button>
                <div style={{padding: '10px'}}/>
                表格1
                <table id="sheetjs1" className="table table-bordered">
                    <tbody>
                        <tr>
                            <th>姓名</th>
                            <th>年龄</th>
                            <th>性别</th>
                            <th>爱好</th>
                            <th>公司</th>
                            <th>工号</th>
                        </tr>
                        <tr>
                            <td>张三</td>
                            <td>23</td>
                            <td>男</td>
                            <td>王者荣耀</td>
                            <td>观麦</td>
                            <td>007</td>
                        </tr>
                        <tr>
                            <td>李四</td>
                            <td>23</td>
                            <td>男</td>
                            <td>王者荣耀</td>
                            <td>观麦</td>
                            <td>009</td>
                        </tr>
                    </tbody>
                </table>
                <div style={{padding: '10px'}}/>
                <button className="btn btn-default" onClick={this.handleExportTable2}>导出表格2</button>
                <div style={{padding: '10px'}}/>
                表格2
                <table id="sheetjs2" className="table table-bordered">
                    <tbody>
                    <tr>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>性别</th>
                        <th>爱好</th>
                        <th>公司</th>
                        <th>工号</th>
                    </tr>
                    <tr>
                        <td>张三</td>
                        <td>23</td>
                        <td>男</td>
                        <td>王者荣耀</td>
                        <td>观麦</td>
                        <td>007</td>
                    </tr>
                    <tr>
                        <td>李四</td>
                        <td>23</td>
                        <td>男</td>
                        <td>王者荣耀</td>
                        <td>观麦</td>
                        <td>009</td>
                    </tr>
                    <tr>
                        <td colSpan="3">李四</td>
                        <td>王者荣耀</td>
                        <td>观麦</td>
                        <td>009</td>
                    </tr>
                    <tr>
                        <td rowSpan="2">傻1</td>
                        <td>23</td>
                        <td>男</td>
                        <td>王者荣耀</td>
                        <td>观麦</td>
                        <td>009</td>
                    </tr>
                    <tr>
                        <td>23</td>
                        <td>男</td>
                        <td>王者荣耀</td>
                        <td>观麦</td>
                        <td>009</td>
                    </tr>
                    </tbody>
                </table>
                <div style={{padding: '10px'}}/>
                <button className="btn btn-default" onClick={this.handleExportData}>数据导出</button>
                <div style={{padding: '10px'}}>通过json数据导出</div>
                <div> 数据1：{JSON.stringify(this.state.data1)}</div>
                <div> 数据2：{JSON.stringify(this.state.data2)}</div>
            </div>
        );
    }
}

export default Export;