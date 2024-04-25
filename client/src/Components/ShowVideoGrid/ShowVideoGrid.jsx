import React from 'react'
import ShowVideo from '../ShowVideo/ShowVideo'
import './ShowVideoGrid.css'

function ShowVideoGrid({vids}) {
  return (
    <div className='Container_ShowVideoGrid'>
        {
            vids?.map(vi =>
            {
                return (
                    <div className="video_box_app" key={vi._id}>
                        <ShowVideo vid={vi} />
                    </div>
                )
            })
        }
    </div>
  )
}

export default ShowVideoGrid