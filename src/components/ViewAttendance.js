import { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "../api.js";

const ViewAttendance = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    axios
      .get("/users/data")
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Error fetching face data");
      });
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "#000000d4", color: "white" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Employee ID</TableCell>
            <TableCell sx={{ color: "white" }}>Name</TableCell>
            <TableCell sx={{ color: "white" }}>Date</TableCell>
            <TableCell sx={{ color: "white" }}>Time</TableCell>
            <TableCell sx={{ color: "white" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <Fragment key={user.employeeID}>
              <TableRow
                onClick={() =>
                  selected.length > 0
                    ? setSelected("")
                    : setSelected(user.employeeID)
                }
                sx={{
                  "&:hover": { cursor: "pointer" },
                  // bgcolor:
                  //   selected === user.employeeID ? "primary.dark" : "inherit",
                }}
              >
                <TableCell sx={{ color: "white" }}>{user.employeeID}</TableCell>
                <TableCell sx={{ color: "white" }}>{user.name}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {new Date(user.attendance[0]?.date).toLocaleDateString()}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {new Date(user.attendance[0]?.date).toLocaleTimeString()}
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  {user.attendance[0]?.status}
                </TableCell>
              </TableRow>
              {selected === user.employeeID &&
                user.attendance.slice(1)?.map((attendance) => (
                  <TableRow key={attendance._id}>
                    <TableCell sx={{ color: "white" }}></TableCell>
                    <TableCell sx={{ color: "white" }}></TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {new Date(attendance?.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {new Date(attendance?.date).toLocaleTimeString()}
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      {attendance?.status}
                    </TableCell>
                  </TableRow>
                ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewAttendance;
