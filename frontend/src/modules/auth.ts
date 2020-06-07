import { atom, selector } from 'recoil';

export const userState = atom({
  key: 'auth/userState',
  default: {},
});

export default {};

// import React, { FC, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { Nav, Button, Collapse } from 'reactstrap';
// import $ from 'jquery';

// const Header: FC<{}> = () => {
//   return (
//     // <header>
//     //   <Nav className="navbar-expand-md navbar-dark fixed-top bg-dark">
//     //     <Link to="/">workoutLog</Link>
//     //     <a>로그인</a>
//     //   </Nav>
//     // </header>
//     <header>
//       <Nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
//         <Link className="navbar-brand" to="/">
//           workoutLog
//         </Link>
//         <Button
//           className="navbar-toggler collapsed"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarCollapse"
//           aria-controls="navbarCollapse"
//           aria-expanded={true}
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </Button>
//         <div className="navbar-collapse collapse" id="navbarCollapse">
//           <ul className="navbar-nav mr-auto">
//             <li className="nav-item active">
//               <a className="nav-link" href="https://www.naver.com">
//                 Home <span className="sr-only">(current)</span>
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link" href="https://www.naver.com">
//                 Link
//               </a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link disabled" href="https://www.naver.com">
//                 Disabled
//               </a>
//             </li>
//           </ul>
//           <form className="form-inline mt-2 mt-md-0">
//             <input
//               className="form-control mr-sm-2"
//               type="text"
//               placeholder="Search"
//               aria-label="Search"
//             />
//             <button
//               className="btn btn-outline-success my-2 my-sm-0"
//               type="submit"
//             >
//               Search
//             </button>
//           </form>
//         </div>
//       </Nav>
//     </header>
//   );
// };

// export default Header;
