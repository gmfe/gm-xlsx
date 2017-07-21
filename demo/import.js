import React from 'react';
import XLSX from '../node_modules/xlsx/xlsx';
import FileSaver from 'file-saver';
import './index.less';

const {utils, read, readFile} = XLSX;

class Import extends React.Component {
    constructor(props) {
        super(props);

        this.handleFileLoad = ::this.handleFileLoad;
    }

    handleFileLoad(e) {
        const reader = new FileReader();
        const files = e.target.files;

        if (!files || files.length === 0) {
            return;
        }

        const file = files[0];
        let res = [];
        reader.readAsBinaryString(file);

        reader.onload = (data) => {
            const binary = data.target.result;
            const wb = read(binary, {type: 'binary'});
            console.log(wb);
            for (let name of wb.SheetNames) {
                const ws = wb.Sheets[name];
                res[name] = XLSX.utils.sheet_to_json(ws, {header:1, range: 4});
            }
            console.log(res);
        };

        reader.onerror = () => {
            throw Error('读取文件错误');
        };
    }

    render() {
        return (
            <div style={{padding: '15px'}}>
                <input type="file" onChange={this.handleFileLoad}/>
            </div>
        );
    }
}

export default Import;