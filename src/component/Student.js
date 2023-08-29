import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import Button from "@mui/material/Button";
import {useEffect} from "react";

export default function Student() {
    const paperstyle = {padding: '50px 20px', width: 1000, margin: '30px auto'};
    const [name, setName] = useState('')
    const [address, setAddress] = useState(' ')
    const [studentlist, setStudents] = useState([])
    const handleClick = (e) => {
        e.preventDefault()
        const student = {name, address}
        console.log(student)
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student)

        }).then(() => {
            console.log("New Student added")
        })
    }



useEffect(()=>{
    fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then((result)=>{
                setStudents(result);
            }
        )
},[])

    return (
        <Container>
            <Paper elevation={3} style={paperstyle}>
                <h1>Add Student</h1>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Student Name" variant="outlined" fullwidth="true"
                       value={name}
            onChange={(e)=>setName(e.target.value)}
            />

            <TextField id="outlined-basic" label="Student Address" variant="outlined" fullwidth="true"
                       value={address}
                       onChange={(e)=>setAddress(e.target.value)}
            />
            <Button variant="contained" onClick={handleClick}>Add Student</Button>

        </Box>
                <Paper elevation={3} style={paperstyle}>

                    {studentlist.map(student=>(
                        <Paper elevation={6} style={{margin:"10px",padding:"15px", textAlign:"left"}} key={student.id}>
                            Id:{student.id}<br/>
                            Name:{student.name}<br/>
                            Address:{student.address}

                        </Paper>
                    ))
                    }
                </Paper>
            </Paper>

        </Container>
    );
}
