import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './Subscribe.css'
import {subscribe,  subscriptionStatus,  unsubscribe} from '../../actions/subscribe.js'

function Subscribe({channelId}) {
 
  const currentUser = useSelector(state=>state?.currentUserReducer)
  const isSubscribed = useSelector(state=>state?.subscribeReducer.isSubscribed)
  
    const [subscribed, setSubscribed] = useState(isSubscribed);


    const dispatch = useDispatch();
    
    useEffect(()=>{
      dispatch(subscriptionStatus({
        userId: currentUser?.result._id,
        channelId
      }))
    },[])

    useEffect(()=>{
      setSubscribed(isSubscribed);
    }, [isSubscribed])

    const handleSubscriptionToggle = () => {
      if(currentUser) {
        if(subscribed){
          setSubscribed(false)  
          dispatch(unsubscribe({
            userId: currentUser?.result._id,
            channelId
          }))         
        } else {
          setSubscribed(true)
          dispatch(subscribe({
            userId: currentUser?.result._id,
            channelId
          }))
        }
      } else {
        alert("Login to Subscribe")
      }
    };
  return (
    <div onClick={handleSubscriptionToggle}>
    { subscribed ? (
      <button className="subscribe">
        Subscribed
      </button>
    ): (
      <button className="subscribe">
        Subscribe
      </button>
    )}
      
    </div>
  )
}

export default Subscribe