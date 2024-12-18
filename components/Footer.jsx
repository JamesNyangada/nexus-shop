import Link from 'next/link';
import React from 'react';
import { FaTiktok } from "react-icons/fa";
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2024 Nexus Shop All rights reserverd</p>
      <p className="icons">
      <Link href='https://www.instagram.com/thenexusfit/' target="_blank">
        <AiFillInstagram />
      </Link>

      <Link href='https://web.facebook.com/profile.php?id=61570228142994' target="_blank">
        <AiFillFacebook/>
      </Link>

      <Link href='https://www.tiktok.com/@thenexusfit' target="_blank">
        <FaTiktok />
      </Link>
        
        
        
      </p>
    </div>
  )
}

export default Footer