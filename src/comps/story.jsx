import React from 'react'
import './story.css'

export default function Story(props) {

  return (
    <div>
      <div className='maindiv m-3 p-1 d-flex flex-wrap justify-content-center '>
        
        <div className='bg-warning m-2' >
          <img src={props.photo} className='imgg' />
        </div>
        <div>
          <i className='m-2 fa fa-times crossbtn' onClick={() => props.removefunc(props.src)}></i>
        </div>
        <div className=' m-2 p-1 textdiv '>
           {props.myphotostory}
        </div>
      </div>

      
    </div>
  )
}
