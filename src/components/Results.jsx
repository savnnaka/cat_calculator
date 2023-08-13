import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, Button } from "@material-ui/core";

export const Results = ({result, history, deleteHistory}) => (
  <Card data-testid="results">
    <CardContent>
      <Typography variant="h5">Result</Typography>
      <Typography variant="h6">{result}</Typography>
    </CardContent>
    <CardContent>
      <Typography variant="h5">History</Typography>
      <List>
      {history.map((calculation, index) => (
        <ListItem key={index}>
          <Typography>{calculation}</Typography>
        </ListItem>
      ))}
      </List>
      <Button 
        color="primary"
        variant="contained"
        disabled={history.length < 1}
        onClick={deleteHistory}
        >
        Delete History
      </Button>
    </CardContent>
  </Card>
);
