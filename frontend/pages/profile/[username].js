import Link from 'next/link'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../../components/Layout'
import { userPublicProfile } from '../../actions/user'
import SmallCard from '../../components/blog/SmallCard'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config'

import renderHtml from 'react-render-html'
import moment from 'moment'

const UserProfile = ({ user, blogs, query }) => {

    const showUserBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div className="my-4" key={i}>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className='lead'>{blog.title}</a>
                    </Link>
                </div>
            )
        })
    }
    const head = () => (
        <Head>
            <title>
                {user.username} | {APP_NAME}
            </title>
            <meta name="description" content={`Blogs by ${user.username}`} />
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:title" content={`${user.username}| ${APP_NAME}`} />
            <meta property="og:description" content={`Best programming tutorials by ${user.username}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    )
    return (
        <>
        {head()}
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5>{user.name}</h5>
                                    <Link href={`${user.profile}`}><a>View Profile</a></Link>
                                    <p className='text-muted'>
                                        Joined {moment(user.createdAt).fromNow()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container pb-5">
                    <div className="row pt-4">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-light bg-primary p-4">Recent blogs by {user.name}</h5>

                                    {showUserBlogs()}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title text-light bg-primary p-4">Message {user.name}</h5>
                                    <br />
                                    <p>Contact Form</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

UserProfile.getInitialProps = ({ query }) => {
    // console.log(query);
    return userPublicProfile(query.username).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            console.log(data);
            return { user: data.user, blogs: data.blogs, query };
        }
    });
};

export default UserProfile