import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { listRelated, singleBlog } from '../../actions/blog'
import SmallCard from '../../components/blog/SmallCard'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config'

import renderHtml from 'react-render-html'
import moment from 'moment'

const SingleBlog = ({ blog, query }) => {
    const [related, setRelated] = useState([])

    const loadRelated = ()=>{
        listRelated({blog}).then(data=>{
            if(data.error) console.log(data.error)
            else{
                setRelated(data)
            }
        })
    }
    useEffect(()=>{
        loadRelated()
    },[query])

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mx-1 mt-3">{c.name}</a>
            </Link>
        ))

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary mx-1 mt-3">{t.name}</a>
            </Link>
        ))

        const head = () => (
            <Head>
                <title>{blog.title} | {APP_NAME}</title>
                <meta name="description"
                    content={blog.mdesc} />
                <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
                <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
                <meta
                    property="og:description"
                    content={blog.mdesc}
                />
                <meta property="og:type" content="webiste" />
                <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
                <meta property="og:site_name" content={`${APP_NAME}`} />
    
                <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
                <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
                <meta property="og:image:type" content="image/jpg" />
                <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            </Head>
        )
    const showRelatedBlog = () =>{
        return related.map((blog, i)=>(
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog}/>
                </article>
            </div>
        ))
    }

    return <>
    {head()}
        <Layout>
            <main>
                <article>
                    <section>
                        <div className="container-fluid">
                            <div className="row mt-2">
                                <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className='img img-fluid featured-image' />
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">
                        <h1 className="display-4 py-3 text-center">
                            {blog.title}
                        </h1>
                        <p className="mark my-3">
                            Written by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link> | Published {moment(blog.updatedAt).fromNow()}
                        </p>
                        <div className="my-3">
                            {showBlogCategories(blog)}
                            {showBlogTags(blog)}

                        </div>
                        </div>
                    </section>
                    <div className="container my-3">
                        <section>
                            <div className="col-md-12">
                                {renderHtml(blog.body)}
                            </div>
                        </section>
                    </div>
                    <hr/>
                    <div className="container">
                        <h4 className="text-center py-5 h3">Related Blogs</h4>
                    
                    <div className="row">
                    {showRelatedBlog()}
                    </div>
                    <p>Show comments</p>
                    </div>
                </article>
            </main>
        </Layout>
    </>
}

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) console.log(data.error)
        else {
            return { blog: data, query }
        }
    })
}

export default SingleBlog