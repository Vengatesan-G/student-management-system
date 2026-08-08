import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { db } from "../firebase";

import {
    doc,
    getDoc,
    updateDoc
} from "firebase/firestore";


function EditStudent() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [student, setStudent] = useState({
        name: "",
        age: "",
        email: "",
        course: ""
    });


    // Get particular student from Firebase
    useEffect(() => {

        async function getStudent() {

            const studentRef = doc(
                db,
                "students",
                id
            );

            const response = await getDoc(studentRef);


            if (response.exists()) {

                setStudent(response.data());

            }

        }

        getStudent();

    }, [id]);


    // Handle input changes
    function handleChange(e) {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    }


    // Update student in Firebase
    async function handleUpdate() {

        const studentRef = doc(
            db,
            "students",
            id
        );


        await updateDoc(
            studentRef,
            {
                name: student.name,
                age: student.age,
                email: student.email,
                course: student.course
            }
        );


        navigate("/home");

    }


    return (
        <>

            <h1>Edit Student</h1>


            <input
                type="text"
                name="name"
                value={student.name}
                placeholder="Name"
                onChange={handleChange}
            />


            <input
                type="number"
                name="age"
                value={student.age}
                placeholder="Age"
                onChange={handleChange}
            />


            <input
                type="email"
                name="email"
                value={student.email}
                placeholder="Email"
                onChange={handleChange}
            />


            <input
                type="text"
                name="course"
                value={student.course}
                placeholder="Course"
                onChange={handleChange}
            />


            <button onClick={handleUpdate}>
                Update
            </button>

        </>
    );
}


export default EditStudent;