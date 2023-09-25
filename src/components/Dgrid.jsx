import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";


export default function ResponsiveGrid(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 5, sm: 8, md: 5 }}
            >
             
                {props.children}
            </Grid>
        </Box>
    );
}
