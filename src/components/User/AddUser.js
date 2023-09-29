import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if(enteredName.trim().length === 0 || enteredAge.trim().length === 0){
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values)"
      });
      return;
    }
    if(+enteredAge < 1){
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0)"
      });
      return;
    }
    //console.log(enteredName + enteredAge);
    props.onAddUser(enteredName, enteredAge);
    setEnteredName("");
    setEnteredAge("");
  };
  const enteredNameHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const enteredAgeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  const errorHandler = () => {
    setError(null);
  }
  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm = {errorHandler} />}
      <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          onChange={enteredNameHandler}
          value={enteredName}
        />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          onChange={enteredAgeHandler}
          value={enteredAge}
        />
        <Button type="submit">Add user</Button>
      </form>
    </Card>
    </div>
    
  );
};
export default AddUser;
