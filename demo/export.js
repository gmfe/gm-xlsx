import React from 'react';
import {jsonToSheet, tableToSheet} from '../src/index';

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
            }],
            count: 10000,
            downloading: false
        };

        this.handleExportTable1 = ::this.handleExportTable1;
        this.handleExportTable2 = ::this.handleExportTable2;
        this.handleExportData = ::this.handleExportData;
        this.handleExportMoreTableData = ::this.handleExportMoreTableData;
        this.handleExportMoreJsonData = ::this.handleExportMoreJsonData;
    }

    handleExportTable1() {
        const tbl1 = document.getElementById('sheetjs1');
        const tbl2 = document.getElementById('sheetjs2');

        //配置项,fileName文件名，excel名，writeOptions写入文件配置项
        const options = {
            fileName: 'table_test.xlsx',
            SheetNames: ['test1'],
            writeOptions: {bookType: 'xlsx', type: 'binary'}
        };

        tableToSheet([tbl1, tbl2], options);
    }

    handleExportTable2() {
        const tbl = document.getElementById('sheetjs2');

        //配置项,fileName文件名，excel名，writeOptions写入文件配置项
        const options = {
            fileName: 'table2_test.xlsx',
            SheetNames: ['test2'],
            writeOptions: {bookType: 'xlsx', type: 'binary'}
        };

        tableToSheet([tbl], options);
    }

    handleExportData() {
        const {data1, data2} = this.state;
        //配置项,fileName文件名，excel名，writeOptions写入文件配置项
        const options = {
            fileName: 'test.xlsx',
            SheetNames: ['test1', 'test2'],
            writeOptions: {bookType: 'xlsx', type: 'binary'}
        };

        jsonToSheet([data1, data2], options)
    }

    handleExportMoreTableData() {
        const self = this;
        //配置项,fileName文件名，excel名，writeOptions写入文件配置项
        const options = {
            fileName: 'glut_test.xlsx',
            SheetNames: ['glut_test'],
            writeOptions: {bookType: 'xlsx', type: 'binary'}
        };
        self.setState({downloading: true});
        setTimeout(()=>{
            const tbl = this.createTable();
            tableToSheet([tbl], options);
            self.setState({downloading: false});
        }, 500);
    }

    createTable(){
        const count = this.state.count;
        let table = document.createElement("table");
        let tr,td;
        for(let m = 0; m<count; m++){
            //循环插入元素
            tr = table.insertRow(table.rows.length);
            for(let n=0;n<10;n++){
                td = tr.insertCell(tr.cells.length);
                td.innerHTML = '第'　+ m + '行，第' + n + '列';
                td.align = "center";
            }
        }
        return table;
    }

    handleExportMoreJsonData() {
        const self = this;
        //配置项,fileName文件名，excel名，writeOptions写入文件配置项
        const options = {
            fileName: 'json_glut_test.xlsx',
            SheetNames: ['json_glut_test'],
            writeOptions: {bookType: 'xlsx', type: 'binary'}
        };
        self.setState({downloading: true});
        let data = [];
        data.push([1,2,3,4,5,6,7,8,9,10]);
        setTimeout(()=>{
            for(let m = 0; m<self.state.count; m++){
                //循环插入元素
                let column = [];
                for(let n=0;n<10;n++){
                    const name = '第'　+ (m + 2)+ '行，第' + (n+1) + '列';
                    column.push(name);
                }
                data.push(column)
            }
            jsonToSheet([data], options);
            self.setState({downloading: false});
        }, 500);
    }

    render() {
        return (
            <div style={{padding: '15px'}}>
                <button className="btn btn-default" onClick={this.handleExportTable1}>导出表格1</button>
                <div style={{padding: '10px'}}/>
                表格1
                <table id="sheetjs1" className="table table-bordered">
                    <tbody>
                        <tr style={{fontSize: '20px', fontFamily: 'bold'}}>
                            <th style={{ textAlign: 'center'}}>姓名</th>
                            <th style={{ textAlign: 'center'}}>年龄</th>
                            <th style={{ textAlign: 'right'}}>性别</th>
                            <th style={{ textAlign: 'center'}}>爱好</th>
                            <th style={{ textAlign: 'center'}}>公司</th>
                            <th style={{ textAlign: 'right'}}>工号</th>
                        </tr>
                        <tr>
                            <td>张三</td>
                            <td>23</td>
                            <td>男</td>
                            <td>王者荣耀</td>
                            <td>观麦</td>
                            <td>007</td>
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
                <div style={{padding: '10px'}}/>
                <button
                    className="btn btn-default"
                    disabled={this.state.downloading}
                    onClick={this.handleExportMoreTableData}
                >
                    {this.state.downloading ? "正在导出中":　"table数据大量导出"}
                </button>
                <div style={{padding: '10px'}}>通过创建table,导出10000条数据</div>
                <div style={{padding: '10px'}}/>
                <button
                    className="btn btn-default"
                    disabled={this.state.downloading}
                    onClick={this.handleExportMoreJsonData}
                >
                    {this.state.downloading ? "正在导出中":　"json数据大量导出"}
                </button>
                <div style={{padding: '10px'}}>通过json,导出10000条数据</div>
            </div>
        );
    }
}

export default Export;