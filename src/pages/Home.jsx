import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore";

function Home() {

    const [students, setStudents] = useState([]);

    const navigate = useNavigate();


    // GET students from Firebase
    async function getStudents() {

        const snapshot = await getDocs(
            collection(db, "students")
        );


        const studentsData = snapshot.docs.map(
            (studentDoc) => ({
                firebaseId: studentDoc.id,
                ...studentDoc.data()
            })
        );


        // Always sort by studentId
        studentsData.sort(
            (a, b) =>
                Number(a.studentId) -
                Number(b.studentId)
        );


        setStudents(studentsData);
    }


    // Load students when Home opens
    useEffect(() => {

        getStudents();

    }, []);


    // DELETE student
    async function handleDelete(firebaseId) {

        // Delete selected student
        await deleteDoc(
            doc(
                db,
                "students",
                firebaseId
            )
        );


        // Get remaining students
        const snapshot = await getDocs(
            collection(db, "students")
        );


        const remainingStudents =
            snapshot.docs.map(
                (studentDoc) => ({
                    firebaseId: studentDoc.id,
                    ...studentDoc.data()
                })
            );


        // Sort remaining students
        remainingStudents.sort(
            (a, b) =>
                Number(a.studentId) -
                Number(b.studentId)
        );


        // Renumber remaining students
        for (
            let i = 0;
            i < remainingStudents.length;
            i++
        ) {

            const newStudentId = i + 1;


            await updateDoc(
                doc(
                    db,
                    "students",
                    remainingStudents[i].firebaseId
                ),
                {
                    studentId: newStudentId
                }
            );


            // Update local data
            remainingStudents[i].studentId =
                newStudentId;
        }


        // Sort again after renumbering
        remainingStudents.sort(
            (a, b) =>
                Number(a.studentId) -
                Number(b.studentId)
        );


        // Update UI
        setStudents(remainingStudents);
    }


    return (
        <>

            <h1>Student Management System</h1>


            <table border="1">

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
                        students.map(
                            (student) => (

                                <tr
                                    key={student.firebaseId}
                                >

                                    <td>
                                        {student.studentId}
                                    </td>


                                    <td>
                                        {student.name}
                                    </td>


                                    <td>
                                        {student.age}
                                    </td>


                                    <td>
                                        {student.email}
                                    </td>


                                    <td>
                                        {student.course}
                                    </td>


                                    <td>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/editstudent/${student.firebaseId}`
                                                )
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    student.firebaseId
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>


            <br />
            <br />


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
