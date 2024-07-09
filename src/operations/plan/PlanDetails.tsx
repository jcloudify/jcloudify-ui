import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {planDetails} from "./constant";

export const PlanDetails: React.FC = () => {
  return (
    <Box>
      <Typography variant={"h4"}>Plan </Typography>
      <PlanTab />
    </Box>
  );
};

const PlanTab: React.FC = () => {
  const {hobby, pro} = planDetails;
  const rows = Object.keys(hobby);

  return (
    <TableContainer component={Paper} sx={{width: "fit-content"}}>
      <Table sx={{minWidth: 650}}>
        <TableHead>
          <TableRow>
            <TableCell>Feature</TableCell>
            <TableCell>Hobby</TableCell>
            <TableCell>Pro</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell>{hobby[row]}</TableCell>
              <TableCell>{pro[row]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
