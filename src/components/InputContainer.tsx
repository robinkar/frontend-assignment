import React, { Component, ChangeEvent } from 'react'

export class InputContainer extends Component<{onSubmit: Function, startDate: string, endDate: string, accessToken: string}, {startDate: string, endDate: string, accessToken: string}> {
    
    //Set default props to be the start of the available date range mentioned
    static defaultProps = {
        startDate: '2017-05-01',
        endDate: '2017-06-15',
        accessToken: ''
    }

    constructor(props: {onSubmit: Function, startDate: string, endDate: string, accessToken: string}) {
        super(props);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            accessToken: this.props.accessToken
        }
    }

    //EventHandler for the startDate input
    onStartChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({startDate: e.currentTarget.value})
    }

    //EventHandler for the endDate input
    onEndChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({endDate: e.currentTarget.value})
    }

    //EventHandler for the accessToken input
    onAccessTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({accessToken: e.currentTarget.value})
    }

    
    render() {
        const {startDate, endDate, accessToken} = this.state;
        return (
            <div className='inputContainer'>
                <div className='inputBox'>
                    Start date
                    <input className='dateInput' type="date" name="startDate" value={this.state.startDate} pattern='\d{4}-\d{2}-\d{2}' onChange={this.onStartChange}/><br/>
                    </div>
                <div className='inputBox'>
                    End date
                    <input className='dateInput' type="date" name="endDate" value={this.state.endDate} pattern='\d{4}-\d{2}-\d{2}'  onChange={this.onEndChange}/>
                </div>
                <div className='inputBox'>
                    <input className='textInput' type="text" name="accessToken" value={this.state.accessToken} placeholder='Access token' onChange={this.onAccessTokenChange}/>
                    <input className='fetchButton' type="button" value="Fetch data" onClick={this.props.onSubmit.bind(this, startDate, endDate, accessToken)}/>
                </div>
            </div>
        )
    }
}

export default InputContainer
