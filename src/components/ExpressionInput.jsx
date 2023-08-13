import { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

export const ExpressionInput = ({ handleSubmit }) => {

  const [isInputValid, setIsInputValid] = useState(true);

  const handleInputChange = (event) => {
    // set is input valid according to it's characters only
    const validExpression = /^[0-9.+\-*/\(\)^\s]+$/;
    setIsInputValid(validExpression.test(event.target.value));
  }

  return (
    <Card>
      <CardContent>
        <TextField 
          fullWidth={true} 
          label="Expression" 
          variant="outlined"
          error={!isInputValid}
          id="inputValue" 
          onChange={handleInputChange}
          />
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleSubmit(
            document.getElementById("inputValue").value
          )}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};
