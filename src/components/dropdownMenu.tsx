import React, { useState } from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Container = styled.nav`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #1b1b1b;
  width: 400px;
  line-height: 40px;
  padding: 8px 25px;
  border-radius: 5px;

  label {
    color: white;
    font-size: 22px;
    font-weight: 500;
    display: block;
    cursor: pointer;
  }

  .button span {
    float: right;
    line-height: 40px;
    transition: 0.5s;
  }

  .button span.rotate {
    transform: rotate(-180deg);
  }

  ul {
    position: absolute;
    background: #1b1b1b;
    list-style: none;
    top: 75px;
    left: 0;
    width: 100%;
    border-radius: 5px;
    display: none;
  }

  input[id^="btn"]:checked + ul {
    display: block;
  }

  .menu:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    background: #1b1b1b;
    right: 20px;
    top: -10px;
    transform: rotate(45deg);
    z-index: -1;
  }

  ul li {
    line-height: 40px;
    padding: 8px 20px;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  ul li label {
    font-size: 18px;
  }

  ul li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    display: block;
  }

  ul li a:hover,
  ul li label:hover {
    color: cyan;
  }

  ul ul {
    position: static;
  }

  ul ul li {
    line-height: 30px;
    padding-left: 30px;
    border-bottom: none;
  }

  ul ul li a {
    color: #e6e6e6;
    font-size: 17px;
  }

  ul li span {
    font-size: 20px;
    float: right;
    margin-top: 10px;
    padding: 0 10px;
    transition: 0.5s;
  }

  ul li span.rotate {
    transform: rotate(-180deg);
  }

  input {
    display: none;
  }
`;

export const DropdownMenu: React.FC = () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2", parentId: "option1" },
    { value: "option3", label: "Option 3", parentId: "option1" },
    { value: "option4", label: "Option 4", parentId: "option2" },
    // Add more options as needed, using parentId to indicate nesting
  ];

  const [rotate, setRotate] = useState(false);

  const handleButtonClick = () => {
    setRotate((prevRotate) => !prevRotate);
  };

  const handleSubmenuClick = () => {
    setRotate(true);
  };

  return (
    <Container>
      <label htmlFor="btn" className="button" onClick={handleButtonClick}>
        Drop down
        <span>
          {rotate ? (
            <ArrowDropDownIcon></ArrowDropDownIcon>
          ) : (
            <ArrowDropUpIcon></ArrowDropUpIcon>
          )}
        </span>
      </label>
      <input type="checkbox" id="btn" />
      <ul className="menu">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <label htmlFor="btn-2" className="first" onClick={handleSubmenuClick}>
            Features
            <span
              className={
                rotate ? "fas fa-caret-down rotate" : "fas fa-caret-down"
              }
            ></span>
          </label>
          <input type="checkbox" id="btn-2" />
          <ul>
            <li>
              <a href="#">Pages</a>
            </li>
          </ul>
        </li>
        <li>
          <label
            htmlFor="btn-3"
            className="second"
            onClick={handleSubmenuClick}
          >
            Services
            <span
              className={
                rotate ? "fas fa-caret-down rotate" : "fas fa-caret-down"
              }
            ></span>
          </label>
          <input type="checkbox" id="btn-3" />
          <ul>
            <li>
              <a href="#">Web Design</a>
            </li>
            <li>
              <a href="#">App Design</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
        <li>
          <a href="#">Feedback</a>
        </li>
      </ul>
    </Container>
  );
};
