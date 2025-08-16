import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';

const domainData = [
  { id: 1, title: "Artificial Intelligence", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF_UAXiRgkQcb-xvsRvsza-y9FRpKZn50UfQ&s" },
  { id: 2, title: "Machine Learning", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuxuBnRgCgyyxEcaPgnBd3KgVIcl8c9R5dFA&s" },
  { id: 3, title: "Deep Learning", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe8Scp4oGtlwtn7y4KAjz_Y9tInwtghW4yFA&s" },
  { id: 4, title: "Cloud Computing", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAxp095IBlY3mkY90PzA7b1k3tlGTGi2Kg_A&s" },
  { id: 5, title: "Web Development", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXU4Ct7K00OsJhb702Y6ceN6iTjwhYQlFtA&s" },
  { id: 6, title: "Dotnet Framework", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrtJEY3WknA-Vn2ZyuHAGGrKnqqT9yYcu6tg&s" },
];

export default function ProjectDomainList() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Project Domains
      </Typography>
      <Grid container spacing={3}>
        {domainData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardMedia component="img" height="160" image={item.img} alt={item.title} />
              <CardContent>
                <Typography variant="h6" fontWeight={600}>{item.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
