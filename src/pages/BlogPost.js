import React, { useState, useEffect } from 'react';
import sanityClient from '../client';
import { useParams } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
    return builder.image(source);
}

export default function BlogPost() {
    const [postData, setPostData] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[slug.current == $slug]{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    } 
                },
                body,
                "name": author->name,
                "authorImage": author->image


            }`,
                { slug }
            )
            .then((data) => setPostData(data[0]))
            .catch(console.error);
    }, [slug]);

    if (!postData)
        return (
            <>
                <div>Failed to get data... </div>
            </>
        );

    return (
        <>
            <div>
                <h2>{postData.title}</h2>
                <div>
                    <img src={urlFor(postData.authorImage).width(100).url} alt='Author image' />

                    <h4>{postData.name}</h4>
                </div>
            </div>
            <img src={urlFor(postData.mainImage).width(200).url()} alt='main image of post' />
            <div>
                <BlockContent
                    blocks={postData.body}
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}
                />
            </div>
        </>
    );
}
