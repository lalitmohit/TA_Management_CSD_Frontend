import React, { useEffect, useState } from "react";
import iitbhilai from "../../public/group_logo.svg";
import account from "../../public/image 6.png";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import tb from "../../styles/Topbar.module.css";
export default function Topbar() {
  let [idNumber, setIdNumber] = useState();
  useEffect(() => {
    console.log("/////////////////////////////////////////");
    setIdNumber(localStorage.getItem("idNumber"));
    //  setlocalStorage.getItem("idNumber");
    console.log(idNumber);
  }, []);
  return (
    <Nav activeKey="/home" className={tb.topb} justify>
      <Nav.Item href="/TA/Dashboard" className={tb.nav}>
        {/* <Nav.Link href="/TA/Dashboard" className={tb.navbuttons}> */}
        <Image src={iitbhilai} style={{ width: 50, marginRight: 150 }} />

        <Nav.Item className={tb.nav}>
          <Nav.Link href="/TA/course_feed" className={tb.navbuttons}>
            Course Feed
          </Nav.Link>
          <Nav.Link href="/TA/add_Course" className={tb.navbuttons}>
            Add Courses
          </Nav.Link>
          <Nav.Link
            href={`/Personal_Info/?idNumber=${idNumber}`}
            className={tb.navbuttons}
          >
            Update Info
          </Nav.Link>
          <Nav.Link eventKey="disabled" className={tb.navbuttons}>
            TA List
          </Nav.Link>
          <Nav.Link
            href={`/TA/Dashboard/?idNumber=${idNumber}`}
            className={tb.navbuttons}
          >
            Dashboard
          </Nav.Link>
        </Nav.Item>
      </Nav.Item>

      <Nav.Item className={tb.acc}>
        <Image src={account} style={{ width: 50 }} />
      </Nav.Item>
    </Nav>
  );
}
