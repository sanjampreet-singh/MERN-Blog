import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { listBlogsWithCategoriesAndTags, listRelated, singleBlog } from '../../actions/category'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config'
import Card from '../../components/blog/Card'
import renderHtml from 'react-render-html'
import moment from 'moment'
import { singleTag } from '../../actions/tag'

const Tag = ({ tag, blogs, query }) => {
    const head = () => (
        <Head>
            <title>
                {tag.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Best programming tutorials on ${tag.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${tag.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`Best programming tutorials on ${tag.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    )
    return <>
        {head()}
        <Layout>
            <main>
                <div className="container-fluid ">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 text-center">
                                {tag.name}
                            </h1>
                            {
                                blogs.map((b, i) => (
                                    <Card key={i} blog={b} />

                                ))
                            }

                        </div>
                    </header>
                </div>
            </main>
        </Layout>
    </>
}

Tag.getInitialProps = ({ query }) => {
    return singleTag(query.slug).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return { tag: data.tag, blogs: data.blogs, query }
        }
    })
}

export default Tag