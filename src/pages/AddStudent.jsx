import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase";

import {
    collection,
    addDoc,
    getDocs
} from "firebase/firestore";

function AddStudent() {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");

    const navigate = useNavigate();


    async function handleSubmit(e) {

        e.preventDefault();


        // Get all existing students
        const snapshot = await getDocs(
            collection(db, "students")
        );


        // Find highest studentId
        let highestId = 0;


        snapshot.docs.forEach(
            (studentDoc) => {

                const data =
                    studentDoc.data();


                const currentId =
                    Number(data.studentId) || 0;


                if (currentId > highestId) {

                    highestId = currentId;

                }

            }
        );


        // New ID = highest ID + 1
        const newStudentId =
            highestId + 1;


        // Add new student
        await addDoc(
            collection(db, "students"),
            {
                studentId: newStudentId,
                name: name,
                age: age,
                email: email,
                course: course
            }
        );


        // Go to Home
        navigate("/home");
    }


    return (
        <>

            <h1>Add Student</h1>


            <form onSubmit={handleSubmit}>

                <label>Name:</label>
                <br />

                <input
                    type="text"
                    placeholder="Enter the name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                />


                <br />
                <br />


                <label>Age:</label>
                <br />

                <input
                    type="number"
                    placeholder="Enter the age"
                    value={age}
                    onChange={(e) =>
                        setAge(e.target.value)
                    }
                    required
                />


                <br />
                <br />


                <label>Email:</label>
                <br />

                <input
                    type="email"
                    placeholder="Enter the email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />


                <br />
                <br />


                <label>Course:</label>
                <br />

                <input
                    type="text"
                    placeholder="Enter the course"
                    value={course}
                    onChange={(e) =>
                        setCourse(e.target.value)
                    }
                    required
                />


                <br />
                <br />


                <button type="submit">
                    Submit
                </button>

            </form>

        </>
    );
}

export default AddStudent;
