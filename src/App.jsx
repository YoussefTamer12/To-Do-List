
import './App.css'
import DoList from './component/to-list'
import { createTheme, ThemeProvider } from '@mui/material'
import { TodosCon } from './context/todosCon'
import { v4 as uuid } from "uuid"
import { useState, useEffect } from 'react'

const theme = createTheme({
    typography: {
        fontFamily: ["lato"],
    },
    palette: {
        primary: {
            main: "#004d40"
        }
    }
})

const todos = [
    {
        id: uuid(),
        title: "Study Course",
        des: "React.js, Docker and git & github",
        iscomp: false,
    },
    {
        id: uuid(),
        title: "Read Quran",
        des: "Read 3 Juzq",
        iscomp: false,
    },
    {
        id: uuid(),
        title: "Learn Germany",
        des: "30 Minute",
        iscomp: false,
    }
]

function getInitialTodos() {
    try {
        const savedTodos = localStorage.getItem("todo");

        if (savedTodos !== null) {
            return JSON.parse(savedTodos);
        }

        return todos;
    } catch (error) {
        console.error("Error loading todos:", error);
        return todos;
    }
}

function App() {

    const [doto, setdoto] = useState(getInitialTodos);

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(doto));
    }, [doto]);

    return (
        <ThemeProvider theme={theme}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#191b1f"
            }}>

                <TodosCon.Provider value={{ doto, setdoto }}>
                    <DoList />
                </TodosCon.Provider>

            </div>
        </ThemeProvider>
    )
}

export default App
