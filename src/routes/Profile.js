import { authService, dbService } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import "../style/ProfileCard.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";

import MenuIcon from "@mui/icons-material/Menu";
import NoteIcon from "@mui/icons-material/Note";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import Swal from "sweetalert2";
import { onLog } from "firebase/app";
export default function Profile({ userObj, refreshUser }) {
  let navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    setDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (displayName !== "") {
      await updateProfile(authService.currentUser, {
        displayName: displayName,
      }).then(() => {
        console.log("profile updated..!");
      });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `닉네임 변경완료 - ${displayName}`,
        showConfirmButton: false,
        timer: 2000,
      });
      refreshUser();
      setDisplayName("");
      //음.. 이게 리렌더링을 일으켜야하는데?
    } else {
      Swal.fire({
        icon: "error",
        title: "시스템 알림",
        text: "아무것도 입력되지 않았어요!",
        footer: "다시 한번 확인해보세요",
      });
    }
  };

  const onLogOutClick = () => {
    Swal.fire({
      title: "로그아웃",
      text: "정말 로그아웃하시겠어요?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네",
      cancelButtonText: "아니요",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("로그아웃되었습니다!", "다음에 봐요", "success");
        authService.signOut();
        navigate("/");
        console.log("history pushed");
      }
    });
  };

  return (
    <div className="wrap">
      <div className="member1">
        <section>
          <nav className="menu">
            <a href="#1">
              <MenuIcon />
            </a>
            <a href="#2" onClick={onLogOutClick}>
              <LogoutIcon />
            </a>
          </nav>
          <article className="profile">
            <img src="img/profile.jpg" alt="profile" />
            <h1>{userObj.displayName}</h1>
            <input
              type="text"
              value={displayName}
              onChange={onChange}
              placeholder="변경할 birdname"
            />
            <input type="submit" value="send" onClick={onSubmit} />
            <h2>bird UID - {userObj.uid}</h2>
            <a href="#3" className="btnView">
              View More
            </a>
            <ul className="contact">
              <li>
                <CurrencyBitcoinIcon id="icon" />
                <span>BirdCoin wallet</span>
              </li>
              <li>
                <EmailIcon id="icon" />
                <span>{userObj.email}</span>
              </li>
            </ul>
            <nav className="others">
              <a href="member1.html" className="on"></a>
              <a href="member2.html"></a>
              <a href="member3.html"></a>
              <a href="member4.html"></a>
            </nav>
          </article>
        </section>
      </div>
    </div>
  );
}

// const getMyNweets = async () => {
//   const nweetsRef = query(
//     collection(dbService, "nweets"),
//     where("creatorId", "==", userObj.uid),
//     orderBy("createAt", "asc")
//   );

//   const nweets = await getDocs(nweetsRef);
//   nweets.forEach((doc) => {
//     console.log(doc.id, doc.data());
//   });
// };

// useEffect(() => {
//   getMyNweets();
// }, []);
