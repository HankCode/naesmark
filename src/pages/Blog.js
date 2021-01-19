import React, { useState, useEffect } from 'react';
import sanityClient from '../client';
import { Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 140,
        width: 350,
    },
});

export default function Blog() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    const [allPostsData, setAllPosts] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'post']{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }`
            )
            .then((data) => setAllPosts(data))
            .catch(console.error);
    }, []);

    return (
        <Container>
            <div>
                <Typography variant='title1' color='textSecondary' component='p'>
                    Blog Archive
                </Typography>
                {allPostsData &&
                    allPostsData.map((data, index) => (
                        <>
                            <Card className={classes.root}>
                                <CardContent>
                                    <Link to={'/blog/' + data.slug.current} key={data.slug.current}>
                                        <span key={index}>
                                            <CardMedia
                                                className={classes.media}
                                                image={data.mainImage.asset.url}
                                            />
                                            <Typography
                                                className={classes.title}
                                                color='textSecondary'
                                                gutterBottom
                                            >
                                                {data.title}
                                            </Typography>
                                        </span>
                                    </Link>
                                </CardContent>
                            </Card>
                            <Divider light />
                        </>
                    ))}
            </div>
        </Container>
    );
}
