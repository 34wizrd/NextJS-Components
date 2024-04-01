"use client";

import CustomDropdownMenu from "@/components/CustomDropdownMenu";
import CustomTreeView from "@/components/CustomTreeView";
import { Box, Typography } from "@mui/material";

import Container from "@mui/material/Container";

import { useState } from "react";

interface DataItem {
  id: string;
  parentId: string | null;
  name: string;
}

export default function Home() {
  const data: DataItem[] = [
    { id: "1", parentId: null, name: "Parent Node" },
    { id: "2", parentId: "1", name: "Child Node 1" },
    // Add more nodes as necessary
  ];
  return (
    <Box
      sx={{
        height: "100vh",
        paddingY: 6,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "80%",
          border: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            backgroundColor: "grey",
            lineHeight: 3,
            textAlign: "center",
            justifySelf: "center",
          }}
        >
          Users Role Permissions
        </Typography>

        <Box
          sx={{
            backgroundColor: "#EBEDF0",
            paddingX: 5,
            paddingY: 2,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gap: 2,
            }}
          >
            <Box>
              <Typography>Organisation</Typography>
              <CustomDropdownMenu></CustomDropdownMenu>
            </Box>
            <Box>
              <Typography>User Role</Typography>
              <CustomDropdownMenu></CustomDropdownMenu>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            height: "60%",
            overflow: "hidden"
          }}
        >
          <Box
            sx={{
              paddingX: 2,
            }}
          >
            <CustomTreeView></CustomTreeView>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
