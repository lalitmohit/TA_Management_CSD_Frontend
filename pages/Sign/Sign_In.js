import React from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { isValidPassword, isValidIdNumber } from "../../utils/validation";
import sign from "./Sign_In.module.css";
import SignInBtn from "./Sign_InBtn";

import iitbhilai from "../../public/image 7.png";
import college from "../../public/group_logo.svg";

export default function Sign_In() {
  const [ID_Number, setID_Number] = useState("");
  const [password, setPassword] = useState("");
  const [idNumberErrorMessage, setIdNumberErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [faculty, setFaculty] = useState(false);

  const handleToggleChange = (event) => {
    const isChecked = event.target.checked;
    setFaculty(isChecked);
  };
  const router = useRouter();

  const navigateToAboutPage = (idNumber) => {
    router.push(`/Professional_Info?idNumber=${idNumber}`);
  };

  const navigateToTADashboard = (idNumber) => {
    router.push(`/TA/Dashboard?idNumber=${idNumber}`);
  };

  const handleSubmit = async (event) => {
    // Do something with the form data
    event.preventDefault();
    console.log("Faculty: ", faculty);
    console.log("ID Number:", ID_Number);
    console.log("Password:", password);
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

    const data = {
      idNumber: ID_Number,
      password: password,
    };

    try {
      const resp = await axios.post(
        `https://ta-backend-new.vercel.app/api/v1/users/login`,
        data
      );
      if (resp.data.statusCode === 200 && resp.data.success) {
        localStorage.setItem("idNumber", ID_Number);
        localStorage.setItem("_id", resp.data.data.user._id);
        const userFormStatus = await axios.get(
          `https://ta-backend-new.vercel.app/api/v1/users/form/status?idNumber=${resp.data.data.user.idNumber}`
        );
        console.log(resp.data.data.user);
        if (
          userFormStatus.data.statusCode === 200 &&
          !userFormStatus.data.data.isUserInfoSaved &&
          !resp.data.data.user.isUserInfoSaved
        ) {
          navigateToAboutPage(resp.data.data.user.idNumber);
        } else {
          navigateToTADashboard(resp.data.data.user.idNumber);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={sign.content}>
      <div className={sign.whitebox}>
        <div className={sign.left}>
          <div className={sign.image}>
            <Image src={college} className={sign.logo} />
            <Image src={iitbhilai} className={sign.logoname} />
          </div>
        </div>
        <div className={sign.form}>
          <div className={sign.Head}>Log In</div>

          <div className={sign.Forms}>
            <input
              className={sign.input}
              placeholder="ID Number"
              value={ID_Number}
              type="text"
              onChange={(event) => setID_Number(event.target.value)}
              onBlur={(event) =>
                isValidIdNumber(event.target.value)
                  ? setIdNumberErrorMessage("")
                  : setIdNumberErrorMessage("Id is not valid")
              }
              required
            />
            {idNumberErrorMessage && (
              <div style={{ color: "red" }}>{idNumberErrorMessage}</div>
            )}
            <input
              className={sign.input}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={(event) =>
                isValidPassword(event.target.value)
                  ? setPasswordErrorMessage("")
                  : setPasswordErrorMessage(`Password must be 8-15 characters long and include at least one:
                digit (0-9), 
                lowercase letter (a-z)
                uppercase letter (A-Z)
                special character from @$!%*?&`)
              }
              required
            />
            {passwordErrorMessage && (
              <div style={{ color: "red" }}>{passwordErrorMessage}</div>
            )}{" "}
            Are you Faculty?
            <label className={sign.switch}>
              <input
                className={sign.cb}
                type="checkbox"
                checked={faculty}
                onChange={handleToggleChange}
              />
              <span className={sign.toggle}>
                <span className={sign.left}>No</span>
                <span className={sign.right}>Yes</span>
              </span>
            </label>
            <button className={sign.button} onClick={handleSubmit}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
