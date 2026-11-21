
import {
    Check,
    DeleteOutlineOutlined,
    ModeEditOutlineOutlined
} from "@mui/icons-material";

import {
    Card,
    CardContent,
    Grid,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField
} from "@mui/material";

import { useState } from "react";

export default function ToDo({
    todo,
    handleclick,
    handleDell,
    onUpdate
}) {

    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);

    const [title, setTitle] = useState(todo.title);
    const [des, setDes] = useState(todo.des);

    function handleEditOpen() {
        setTitle(todo.title);
        setDes(todo.des);
        setOpens(true);
    }

    function handleSave() {

        const updatedTitle = title.trim();

        if (!updatedTitle) return;

        onUpdate({
            ...todo,
            title: updatedTitle,
            des: des.trim()
        });

        setOpens(false);
    }

    function handleClose() {
        handleDell(todo);
        setOpen(false);
    }

    return (
        <>


            <Dialog
                open={opens}
                onClose={() => setOpens(false)}
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle
                    sx={{
                        fontWeight: "bold",
                        color: "#1769aa"
                    }}
                >
                    Edit Task
                </DialogTitle>

                <DialogContent>

                    <TextField
                        margin="dense"
                        label="Task Title"
                        fullWidth
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ marginBottom: "15px", marginTop: "10px" }}
                    />

                    <TextField
                        margin="dense"
                        label="Task Description"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={3}
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />

                </DialogContent>

                <DialogActions>

                    <Button
                        variant="outlined"
                        onClick={() => setOpens(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={!title.trim()}
                    >
                        Save Changes
                    </Button>

                </DialogActions>

            </Dialog>



            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >

                <DialogTitle
                    sx={{
                        fontWeight: "bold",
                        color: "#b23c17"
                    }}
                >
                    Are you sure you want to delete this task?
                </DialogTitle>

                <DialogContent>

                    <DialogContentText>
                        This action cannot be undone.
                    </DialogContentText>

                </DialogContent>

                <DialogActions>

                    <Button
                        variant="outlined"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                        autoFocus
                    >
                        Confirm Delete
                    </Button>

                </DialogActions>

            </Dialog>



            <Card
                className="card"
                sx={{
                    background: "#283593",
                    color: "white",
                    marginTop: 5
                }}
            >

                <CardContent>

                    <Grid
                        container
                        sx={{ justifyContent: "space-around" }}
                        spacing={2}
                    >

                        <Grid size={{ xs: 8 }}>

                            <Typography
                                variant="h4"
                                sx={{
                                    textDecoration: todo.iscomp
                                        ? "line-through"
                                        : "none"
                                }}
                            >
                                {todo.title}
                            </Typography>

                            <Typography variant="h6">
                                {todo.des}
                            </Typography>

                        </Grid>


                        <Grid
                            size={{ xs: 4 }}
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                                alignItems: "center"
                            }}
                        >


                            <IconButton
                                onClick={() => handleclick(todo)}
                                sx={{
                                    color: todo.iscomp ? "white" : "#8bc34a",
                                    background: todo.iscomp ? "#8bc34a" : "white",
                                    border: "solid #8bc34a 3px",
                                    borderRadius: "50%",
                                    margin: "3px"
                                }}
                            >
                                <Check />
                            </IconButton>



                            <IconButton
                                onClick={handleEditOpen}
                                sx={{
                                    color: "#1769aa",
                                    background: "white",
                                    border: "solid #1769aa 3px",
                                    borderRadius: "50%",
                                    margin: "3px"
                                }}
                            >
                                <ModeEditOutlineOutlined />
                            </IconButton>


                            <IconButton
                                onClick={() => setOpen(true)}
                                sx={{
                                    color: "#b23c17",
                                    background: "white",
                                    border: "solid #b23c17 3px",
                                    borderRadius: "50%",
                                    margin: "3px"
                                }}
                            >
                                <DeleteOutlineOutlined />
                            </IconButton>

                        </Grid>

                    </Grid>

                </CardContent>

            </Card>

        </>
    );
}
