import React, { Component } from 'react'

export class InfoContainer extends Component<{nConversations: number, nUserMessages: number, nVisitorMessages: number}> {
    render() {

        let nConversationsBox;
        let nUserMessagesBox;
        let nVisitorMessagesBox;
        //Only show the boxes if the user has fetched data(default values for the props are -1)
        if (this.props.nConversations >= 0) {
            nConversationsBox = (
                <div className='infoBox'>
                    <span>{this.props.nConversations} </span><br />
                    Total conversation count
                </div>
            )
        }
        if (this.props.nUserMessages >= 0) {
            nUserMessagesBox = (
                <div className='infoBox'>
                    <span>{this.props.nUserMessages} </span> <br />
                    Total user message count 
                </div>
            )
        }
        if (this.props.nVisitorMessages >= 0) {
            nVisitorMessagesBox = (
                <div className='infoBox'>
                    <span>{this.props.nVisitorMessages} </span> <br />
                    Total visitor message count
                </div>
            )
        }
        return (
            <div className='infoContainer'>
                {nConversationsBox}
                {nUserMessagesBox}
                {nVisitorMessagesBox}
                <div style={{clear: 'both'}}></div>
            </div>
        )
    }
}

export default InfoContainer
