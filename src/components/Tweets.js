import React from 'react'
import {connect} from 'react-redux'
import {formatTweet, formatDate} from '../utils/helpers'
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index'
import {handleToggleTweet} from '../actions/tweets'
import {Link, withRouter} from 'react-router-dom'

class Tweet extends React.Component{
    
    handleLike=(e)=>{ //handle like tweets
        e.preventDefault()

        const {dispatch, tweet, authedUser} = this.props
        
        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked : tweet.hasLiked,
            authedUser
        }))
    }

    toParent =(e, id) =>{ //redirect to the parent tweet
        e.preventDefault()
        this.props.history.push(`/tweet/${id}`)
    }

    render(){
        const {tweet} = this.props

        if (tweet === null){
            return <p>This tweet doesn't exist</p>
        }
        // console.log(this.props)

        const {name, avatar, timestamp, text, hasLiked, likes, replies, id, parent} = tweet

        return(
            <Link to={`/tweet/${id}`} className='tweet'>
                <img src={avatar} alt={`Avatar of ${name}`} className='avatar' />
                <div className='tweet-info'>
                    <div>
                        <span>{name}</span>
                        <div>{formatDate(timestamp)}</div>
                        {parent && (
                        <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                            Replying to @{parent.author}
                        </button>
                        )}
                        <p>{text}</p>
                    </div>
                    <div className='tweet-icons'>
                        <TiArrowBackOutline className='tweet-icon' />
                        <span>{replies !== 0 && replies}</span>
                        <button className='heart-button' onClick={this.handleLike}>
                        {hasLiked === true
                            ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                            : <TiHeartOutline className='tweet-icon'/>}
                        </button>
                        <span>{likes !== 0 && likes}</span>
                    </div>
                </div>
            </Link>
        )
    }
}

//The important thing to notice here is that mapStateToProps accepts two arguments:
// the state of the store
// the props passed to the Tweet component

//if you pass the component that you are rendering a prop that's going to come as second argument here
function mapStateToProps ({ authedUser, users, tweets }, {id}) {
    //what information do we want to pass from the state of out redux store to our tweet component
    const tweet = tweets[id]
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null
    return {
        authedUser,
        tweet: tweet
        ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
        : null
      
    }
}
  
export default withRouter(connect(mapStateToProps)(Tweet))