import React from 'react'
import { placeholder } from '../../images/placeholder.jpg'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';


const PostSummary = (props) => {
    const { post, auth } = props;
    if (!auth.uid) return <Redirect to='/login' />
    if (post) {
        return (
            <div className="row">
                <div className="col s12 m6">
                    <div className="card large">
                        <div className="card-image">
                            <img src={placeholder} alt="placeholder" />
                        </div>
                        <span className="card-title">{post.title}</span>
                        <div className="card-content">
                            <p>by {post.authorUserName}</p>
                            <p>{post.message}</p>
                            <span>{moment(post.createdAt.toDate()).calendar()}</span>
                        </div>
                        <div className="card-action">
                            This should take the user back.
                        </div>
                    </div>
                </div >
            </div >
        )
    } else {
        return (
            <div>
                <p>
                    Loading posts...
            </p>
            </div>
        )
    }

}


const mapStateToProps = (state, ownProps) => {
    // haluamme ID:n ja jos kyseessä olisi muu kuin firebase appi, tekisimme sen.
    // props.match.params.id, mutta se ei ole vaihtoehto nytten. muuten router info olisi helppo saada.
    // id:mme on nyt toinen parametsi, jonka liitämme urlin loppuun.
    // posts => perus urli. id => perässä tuleva urli.
    // voit tarkistaa asiat console.logaammalla state, sieltä otat firestore --> data --> posts.
    const id = ownProps.match.params.id;
    const posts = state.firestore.data.posts;
    const post = posts ? posts[id] : null
    // returnissa post on post, joka on yhdistelä posts + id => nämä luovat specigfic id urlimme.
    return {
        post: post,
        auth: state.firebase.auth
    }

}



export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'posts' }
    ])
)(PostSummary);