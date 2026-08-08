import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";


function AddStudent() {

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [course, setCourse] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();


        await addDoc(
            collection(db, "students"),
            {
                name: name,
                age: age,
                email: email,
                course: course
            }
        );


        navigate("/home");

    };


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
                    onChange={(e) => setName(e.target.value)}
                />

                <br /><br />


                <label>Age:</label>
                <br />

                <input
                    type="number"
                    placeholder="Enter the age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <br /><br />


                <label>Email:</label>
                <br />

                <input
                    type="email"
                    placeholder="Enter the email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />


                <label>Course:</label>
                <br />

                <input
                    type="text"
                    placeholder="Enter the course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                />

                <br /><br />


                <button type="submit">
                    Submit
                </button>

            </form>

        </>
    );
}


export default AddStudent;