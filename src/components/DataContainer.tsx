import React, { Component } from 'react'
import DataTable from './DataTable';
import Pagination from './Pagination';

//Component for the DataTable and Pagination
export class DataContainer extends Component<{data: Array<Object>, changeSort: Function, ascending: boolean, sort: string}, {page: number}> {

    constructor(props: {data: Array<Object>, changeSort: Function, ascending: boolean, sort: string}) {
        super(props);
        //Default page for DataTable is 0
        this.state = {
            page: 0
        }
    }

    //Returns the amount of pages needed to present all the currently loaded data
    getMaxPages = () => {
        return Math.max(0, Math.ceil((this.props.data.length)/5));
    }

    //Change the page after the user clicks on the pagination
    pageChange = (pageNumber: number) => {
        //Set the state after validating the page number
        this.setState({
            page: Math.min(Math.max(0, pageNumber), this.getMaxPages()-1)
        })
    }

    render() {
        const { page } = this.state;
        const { data } = this.props;
        const maxPages = this.getMaxPages();
        //Set page to last page incase user loads new data and the new data is shorter
        if (page > maxPages) {
            this.setState({
                page: maxPages
            });
        }
        //Take 5 data entries for displaying on the currenet page
        const tableData = data.slice(page*5, (page+1)*5);

        let dataTable;
        let pagination;
        
        //Only show the components if there is data to display
        if (this.props.data.length > 0) {
            dataTable = <DataTable data={tableData} changeSort={this.props.changeSort} ascending={this.props.ascending} sort={this.props.sort}/>
            pagination = <Pagination maxPages={maxPages} page={page} pageChange={this.pageChange}/>
        }
        return (

            <div>
                {dataTable}
                {pagination}
            </div>
        )
    }
}

export default DataContainer
