import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "firebase/firestore";


function Home() {

    const [students, setStudents] = useState([]);

    const navigate = useNavigate();


    // GET students from Firebase
    useEffect(() => {

        async function getStudents() {

            const querySnapshot = await getDocs(
                collection(db, "students")
            );

            const studentData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setStudents(studentData);
        }

        getStudents();

    }, []);


    // DELETE student from Firebase
    async function handleDelete(id) {

        await deleteDoc(
            doc(db, "students", id)
        );

        setStudents(
            students.filter((student) => student.id !== id)
        );
    }


    return (
        <>

            <h1>Student Management System</h1>


            <table>

                <thead>

                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Action</th>
                    </tr>

                </thead>


                <tbody>

                    {
                        students.map((student, index) => (

                            <tr key={student.id}>

                                <td>{index + 1}</td>

                                <td>{student.name}</td>

                                <td>{student.age}</td>

                                <td>{student.email}</td>

                                <td>{student.course}</td>


                                <td>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/editstudent/${student.id}`
                                            )
                                        }
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            handleDelete(student.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>


            <button
                onClick={() =>
                    navigate("/addstudent")
                }
            >
                Add Student
            </button>

        </>
    );
}


export default Home;