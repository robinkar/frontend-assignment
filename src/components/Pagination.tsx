import React, { Component } from 'react'

export class Pagination extends Component<{maxPages: number, page: number, pageChange: Function}> {

    //Show first page, last page and 2 pages in each direction from the current page
    //Prevents getting a really long pagination if the loaded data is large
    getPagesToShow = () => {
        //Use a set for preventing repetition
        let pages: Set<number> = new Set()
        pages.add(0)
        pages.add(this.props.maxPages-1)
        //Start from 2 pages before the current one and end 2 pages after the current one
        const start = Math.max(0, this.props.page-2);
        const end = Math.min(this.props.maxPages-1, this.props.page+3)

        for (let i = start; i < end; i++) {
            pages.add(i);
        }
        //Return a sorted array of the pages to display
        return Array.from(pages).sort();
    }


    render() {
        return (
            <div>
                <ul className='pagination'>
                    <li onClick={this.props.pageChange.bind(this, this.props.page-1)} className='prevPage'>{'<'}</li>
                    {this.getPagesToShow().map( (pageNumber) => (
                        //Generate a list item for each of the pages to show in the pagination with the current page highlighted with blue background
                        <li key={pageNumber} 
                            onClick={this.props.pageChange.bind(this, pageNumber)}
                            className={this.props.page === pageNumber ? 'currentPage' : ''}><a href='# '>{pageNumber+1}</a></li>
                    ))}
                    <li onClick={this.props.pageChange.bind(this, this.props.page+1)} className='nextPage'>{'>'}</li>
                </ul>
            </div>
        )
    }
}

export default Pagination
