import React from 'react'
import {AiFillEye, AiOutlineBell, AiOutlineHome } from 'react-icons/ai';
import { IoMdNotificationsOutline,IoSettingsOutline } from 'react-icons/io'; 
import {MdSms } from 'react-icons/md';
import {FiSettings } from 'react-icons/fi';
import {RiLogoutBoxRLine } from 'react-icons/ri';

const Leftbar = (props) => {
  return (
    <div className='leftbar'>
      <img className='profilepic' src="assets/images/original.png" alt="" />

      <div className="icons">
        <ul>
          <li className={props.active == 'home' && 'active'}>
          <AiOutlineHome className='icon'/>
          </li>
          <li className={props.active == 'msg' && 'active'}>
          <MdSms className='icon'/>
          </li>
          <li className={props.active == 'notification' && 'active'}>
          <IoMdNotificationsOutline className='icon'/>
          </li>
          <li className={props.active == 'settings' && 'active'}>
          <FiSettings className='icon'/>
          </li>
          <li >
          <RiLogoutBoxRLine className='icon'/>
          </li>
        </ul>

      </div>
      
    </div>
  )
}

export default Leftbar