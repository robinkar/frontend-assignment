import React, { Component } from 'react'

//DataTable component contains a table displaying data
export class DataTable extends Component<{data: Array<any>, changeSort: Function, ascending: boolean, sort: string}> {

    //Format the to DD Month YYYY
    formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short'});
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;

    }

    //Create a header(cell) for the table
    createTableHeader = (property: string, text: string) => {
        const { ascending, sort } = this.props;
        //Use some ASCII for indicating sort order
        let sortIcon;
        sortIcon = ascending ? '▼' : '▲';
        //Create a table header with onClick set to run the changeSort with the correct parameters
        return <th onClick={this.props.changeSort.bind(this, property, (sort === property ? !ascending : ascending))}>
        {text} {this.props.sort === property ? sortIcon: ''}</th>
    }

    render() {
        
        return (
            <div>
                <table className='dataTable'>
                    <thead>
                        <tr className='dataRow'>
                            {this.createTableHeader('conversation_count', 'Conversations')}
                            {this.createTableHeader('missed_chat_count', 'Missed Chats')}
                            {this.createTableHeader('visitors_with_conversation_count', 'Visitors with conversations')}
                            {this.createTableHeader('date', 'Date')}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map( (dataEntry) => (
                            //Map over the data and put each entry on a separate table row
                            <tr className='dataRow' key={dataEntry['date']}>
                                <td>{dataEntry['conversation_count']}</td>
                                <td>{dataEntry['missed_chat_count']}</td>
                                <td>{dataEntry['visitors_with_conversation_count']}</td>
                                <td>{this.formatDate(dataEntry['date'])}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DataTable
