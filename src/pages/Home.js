import React from 'react';
import { Typography, Container } from '@material-ui/core';

export default function Home() {
    return (
        <>
            <Container maxWidth='lg'>
                <Typography variant='h2' gutterBottom>
                    testing
                </Typography>
                <Typography variant='subtitle1' color='textSecondary' component='p'>
                    teeesting
                </Typography>
            </Container>
        </>
    );
}
