import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function MyCard({ title, children }) {
    return (
        <Card sx={{ maxWidth: 400, margin: "20px auto" }}>
            <CardContent>
                {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
                {children}
            </CardContent>
        </Card>
    );
}
