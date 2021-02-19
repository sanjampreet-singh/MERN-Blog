
import renderHtml from 'react-render-html'
import moment from 'moment'
import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { API } from '../../config'

const SmallCard = ({ blog }) => {




    return <div className="">
        <div className="card">
            <section>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <img src={`${API}/blog/photo/${blog.slug}`} style={{ maxHeight: 220, width: 'auto' }} alt={`${blog.title}`} className="img img-fluid" />

                    </a>
                </Link>
            </section>
            <div className="card-body">
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a><h5 className="card-title">{blog.title}</h5></a>
                    </Link>
                    <div className="card-text">{renderHtml(blog.excerpt)}</div>
                </section>
            </div>
            <div className="card-body">
                <div>
                    Posted {moment(blog.updatedAt).fromNow()} by <Link href={`/profile/${blog.postedBy.username}`}><a className='float-right'>{blog.postedBy.username}</a></Link>
                </div>
            </div>
        </div>

    </div>
}

export default SmallCard