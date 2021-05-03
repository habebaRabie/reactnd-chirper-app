import React from 'react'
import {connect} from 'react-redux'
import {handleAddTweet} from '../actions/tweets'
import {Redirect} from 'react-router-dom'


class NewTweet extends React.Component{

    state={
        text:'',
        toHome: false,

    }
    handleChange = (event)=>{
        const text = event.target.value
        this.setState(()=>({
            text
        }))
    }

    handleSubmit =(event) =>{
        event.preventDefault()

        const {text} = this.state

        //add tweet to the store

        console.log("The new tweet: ", text)

        const {dispatch, id} = this.props

        dispatch(handleAddTweet(text, id))

        this.setState(()=>({
            text:'',
            toHome: id ? false : true
        }))
    }

    render(){

        const {text, toHome} = this.state

        if(toHome === true){
            return <Redirect to='/'/>
        }

        const tweetLeft = 280 - text.length

        return(
            <div>
                <h3 className='center'>Compose new tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                    <textarea 
                        placeholder="what's happening ?"
                        value = {text}
                        onChange ={this.handleChange}
                        className='textarea'
                        maxLength={280}
                    />

                    {tweetLeft <=100 &&(
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}

                    <button className='btn' type='submit' disabled ={text === ''}>
                        Submit
                    </button>

                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)