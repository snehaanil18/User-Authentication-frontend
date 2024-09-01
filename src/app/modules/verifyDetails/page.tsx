"use client";
import { useState } from 'react';

import PanCard from "./Components/Pan/PanCard";
import BankAccount from "./Components/Bank/BankAcct";
import Gst from './Components/GST/Gst'
import Address from "./Components/Address/Address";
import styles from './details.module.css'
import menu_icon from '../../../../public/Images/menu_open.svg'
import Image from 'next/image';


function Page() {

  const [activeTab, setActiveTab] = useState('tab1');

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const switchTabs = (tab: string) => {
    setActiveTab(tab)
  }

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className={styles.container}>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <Image src={menu_icon} alt='menu' width={20} height={20} />
      </button>
      <div className={`${styles.sidenav} ${isMenuVisible ? styles.show : ''}`}>
          <div className={styles.menuContent}>
            <button onClick={() => switchTabs('tab1')} className={`tab ${activeTab === 'tab1' ? styles.active : ''}`}>Verify Pan Card</button>
            <button onClick={() => switchTabs('tab2')} className={`tab ${activeTab === 'tab2' ? styles.active : ''}`}>Verify GST Number</button>
            <button onClick={() => switchTabs('tab3')} className={`tab ${activeTab === 'tab3' ? styles.active : ''}`}>Verify Bank Account</button>
            <button onClick={() => switchTabs('tab4')} className={`tab ${activeTab === 'tab4' ? styles.active : ''}`}>Verify Address</button>
          </div>
      </div>

      <div className={styles.verification}>

        {/* contents of tab1 */}
        {activeTab == 'tab1' && (
          <PanCard />
        )}

        {/* contents of tab2 */}
        {activeTab == 'tab2' && (
          <Gst />
        )}

        {/* contents of tab3 */}
        {activeTab == 'tab3' && (
          <BankAccount />
        )}

        {/* contents of tab4 */}
        {activeTab == 'tab4' && (
          <Address />
        )}
      </div>

    </div>
  );
}

export default Page;
