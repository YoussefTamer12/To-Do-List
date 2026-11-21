
import {
    Container,
    Card,
    CardContent,
    Typography,
    Divider,
    ToggleButtonGroup,
    ToggleButton,
    Grid,
    TextField,
    Button
} from "@mui/material";

import ToDo from "./toDo";

import { useContext, useState } from "react";
import { TodosCon } from "../context/todosCon";
import { v4 as uuid } from "uuid";

export default function DoList() {

    const [tit, setTit] = useState("");

    const { doto, setdoto } = useContext(TodosCon);

    const [toDoType, setToDoType] = useState("ALL");

    function handleclick(todo) {

        const updatedTodos = doto.map((t) => {
            if (t.id === todo.id) {
                return {
                    ...t,
                    iscomp: !t.iscomp
                };
            }

            return t;
        });

        setdoto(updatedTodos);
    }

    function handleDel(todo) {

        const updatedTodos = doto.filter(
            (t) => t.id !== todo.id
        );

        setdoto(updatedTodos);
    }

    function handleUpdateTask(updatedTodo) {

        const updatedTodos = doto.map((t) => {
            if (t.id === updatedTodo.id) {
                return updatedTodo;
            }

            return t;
        });

        setdoto(updatedTodos);
    }

    function clickdo() {

        const title = tit.trim();

        if (!title) return;

        const newTodo = {
            id: uuid(),
            title: title,
            des: "",
            iscomp: false,
        };

        setdoto([...doto, newTodo]);

        setTit("");
    }

    let beRender = doto;

    if (toDoType === "Done") {
        beRender = doto.filter((d) => d.iscomp);
    }
    else if (toDoType === "Not-Done") {
        beRender = doto.filter((d) => !d.iscomp);
    }

    const toDos = beRender.map((t) => (
        <ToDo
            key={t.id}
            todo={t}
            handleclick={handleclick}
            handleDell={handleDel}
            onUpdate={handleUpdateTask}
        />
    ));

    function onDisplay(e, newValue) {
        if (newValue !== null) {
            setToDoType(newValue);
        }
    }

    return (
        <Container maxWidth="sm">

            <Card>

                <CardContent sx={{
                    maxHeight: "75vh",
                    overflowY: "auto"
                }}>

                    <Typography
                        variant="h2"
                        sx={{
                            color: "black",
                            fontWeight: "bold"
                        }}
                    >
                        Tasks
                    </Typography>

                    <Divider />

                    <ToggleButtonGroup
                        exclusive
                        value={toDoType}
                        sx={{ marginTop: "30px" }}
                        onChange={onDisplay}
                    >

                        <ToggleButton
                            sx={{ fontWeight: "bold" }}
                            value="ALL"
                        >
                            ALL
                        </ToggleButton>

                        <ToggleButton
                            sx={{ fontWeight: "bold" }}
                            value="Done"
                        >
                            DONE
                        </ToggleButton>

                        <ToggleButton
                            sx={{ fontWeight: "bold" }}
                            value="Not-Done"
                        >
                            NOT DONE
                        </ToggleButton>

                    </ToggleButtonGroup>

                    {toDos}

                </CardContent>

                <Grid
                    container
                    sx={{ margin: "20px", width: "auto" }}
                    spacing={2}
                >

                    <Grid
                        size={{ xs: 4 }}
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}
                    >

                        <Button
                            variant="contained"
                            sx={{ width: "100%", height: "100%" }}
                            onClick={clickdo}
                            disabled={!tit.trim()}
                        >
                            ADD
                        </Button>

                    </Grid>

                    <Grid
                        size={{ xs: 8 }}
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}
                    >

                        <TextField
                            label="NameTask"
                            value={tit}
                            onChange={(e) => setTit(e.target.value)}
                            sx={{ width: "100%" }}
                            variant="outlined"
                        />

                    </Grid>

                </Grid>

            </Card>

        </Container>
    );
}
