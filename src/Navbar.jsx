import React, { useEffect, useState } from "react";
import "./Navbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div class="topnav">
      <a class="active">Dashboard</a>
      <a
        onClick={() => {
          navigate("/graphs");
        }}
      >
        Bar Graphs
      </a>
      <a
        onClick={() => {
          navigate("/interactionchart");
        }}
      >
        Interaction Charts
      </a>
      <a
        onClick={() => {
          navigate("/geochart");
        }}
      >
        Geo Charts
      </a>
    </div>
  );
}

export default Navbar;
