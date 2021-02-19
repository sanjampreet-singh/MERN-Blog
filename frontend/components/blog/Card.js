
import renderHtml from 'react-render-html'
import moment  from 'moment'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { API} from '../../config'

const Card = ({blog})=>{

    const showBlogCategories = blog =>
          blog.categories.map((c,i)=>(
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mx-1 mt-3">{c.name}</a>
            </Link>
        ))
    
    const showBlogTags = blog =>
       blog.tags.map((t,i)=>(
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary mx-1 mt-3">{t.name}</a>
            </Link>
        ))
    

    return <div className="">
    <header>
        <Link href={`/blogs/${blog.slug}`}>
            <a>
                <h2 className=' py-3 font-weight-bold'>
                    {blog.title}
                </h2>
            </a>
        </Link>
    </header>
    <section>
        <div className="mark py-2">
            Written by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link> | Published {moment(blog.updatedAt).fromNow()}
        </div>
    </section> 
    <section>
        {showBlogCategories(blog)}
        {showBlogTags(blog)}
    </section>
    <div className="row">
        <div className="col-md-4">
            <section>
                <img src={`${API}/blog/photo/${blog.slug}`} style={{maxHeight:220, width:'auto'}} alt={`${blog.title}`} className="img img-fluid"/>
            </section>
        </div>
        <div className="col-md-8">
            <section>
                <div className="pb-3">
                {renderHtml(blog.excerpt)}
                </div>
                <Link href={`/blogs/${blog.slug}`}>
                    <a className='btn btn-primary pt-2'>Read more</a>
                </Link>
            </section>
        </div>
    </div>
</div>
}

export default Card