import React from 'react'
import Header from '../components/layout/Header'
import styles from '../styles/styles'
import ProfileSidebar from "../components/Profile/ProfileSidebar.jsx"
import ProfileContent from "../components/Profile/ProfileContent.jsx"
const ProfilePage = () => {
  return (
    <div>
        <Header/>
        <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className="w-[335px]">
                <ProfileSidebar  />
            </div>
            <ProfileContent />
        </div>
    </div>
  )
}

export default ProfilePage