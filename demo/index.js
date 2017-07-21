import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Export from './export';
import Import from './import';

class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 0
        };

        this.handleExportTab = ::this.handleExportTab;
        this.handleImportTab = ::this.handleImportTab;
    }

    handleExportTab() {
        this.setState({status: 0});
    }

    handleImportTab() {
        this.setState({status: 1});
    }

    render() {
        const {status} = this.state;
        return (
            <div style={{padding: '15px'}}>
                <div style={{marginBottom: '10px', fontSize: '24px'}}>模板导入导出Demo</div>
                <ul className="nav nav-tabs">
                    <li role="presentation" className={status===0 ? 'active': ''}>
                        <a href="#" onClick={this.handleExportTab}>模板导出</a>
                    </li>
                    <li role="presentation" className={status===1 ? 'active': ''}>
                        <a href="#" onClick={this.handleImportTab}>模板导入</a>
                    </li>
                </ul>
                {(status===0) ? <Export/> : <Import/>}
            </div>
        );
    }
}

ReactDOM.render(<Demo/>, window.document.getElementById('appContainer'));