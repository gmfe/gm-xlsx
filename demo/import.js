import React from 'react';
import {sheetToJson} from '../src/index';

class Import extends React.Component {
    constructor(props) {
        super(props);

        this.handleFileLoad = ::this.handleFileLoad;
    }

    handleFileLoad(e) {
        const files = e.target.files;

        if (!files || files.length === 0) {
            return;
        }

        const file = files[0];

        sheetToJson(file, this.handleFile, {header:1});
    }

    handleFile(res) {
        console.log(res);
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