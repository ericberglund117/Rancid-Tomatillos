import React, { Component } from 'react';
export const getComments = (comment, movieID) => {
import { getAllComments, getComments } from '../apiCalls.js'

export class Commenting extends Component {
    constructor(){
        super()
        this.state = {
            commentValue: '',
            comments: []
        } 
    }

    updateValue = (event) => {
        this.setState({
            commentValue: event.target.value
        })
    }

    fetchComments(id) {
        getAllComments(id)
        .then(data => this.setState({ comments: data.comments }))
        .catch(error => this.setState({ error }));
      }

    submitComment = (event) => {
        const  newComment = this.state
        this.fetchComments(newComment)
    }

    render() {
        return(
            <div>
                <input 
                    name='comment'
                    type='text' 
                    value= { this.state.commentValue }
                    className='input-commrnt'
                    onChange= { this.updateValue }
                />
                <button
                    onClick={console.log('Hello')}
                >
                    Submit
                </button>
            </div>
        )
    }
}