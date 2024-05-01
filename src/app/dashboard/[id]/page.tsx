import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function DashboardIdPage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <Box>
      <Typography>Dashboard {params.id}</Typography>
    </Box>
  );
}
