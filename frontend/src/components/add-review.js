//ADDING AND EDITING REVIEWS

import React, { useState } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddReview = props => {
    let editing = false //set to true if the component is in editing mode // false we are adding a review
    let initialReviewState = ""
    if (props.location.state && props.location.state.currentReview) {
        editing = true
        initialReviewState = props.location.state.currentReview.review
    }

    const [review, setReview] = useState(initialReviewState) //review state variable set to initialReviewState
    // keeps track if review is submitted
    const [submitted, setSubmitted] = useState(false)// keep track if the review is submitted
    const onChangeReview = e => { //keeps track of the user entered review value in the field
        const review = e.target.value
        setReview(review);
    }
    const saveReview = () => { //create a data object containing the reviews properties
        var data = {
            review: review,
            name: props.user.name, //we get name and user id from props as this is passed into the Add review component back in app.js
            user_id: props.user.id,
            movie_id: props.match.params.id // get movie id direct from url
        }
        //check if a state is passed into AddReview 
        if (editing) {
            // get existing review id
            data.review_id = props.location.state.currentReview._id
            MovieDataService.updateReview(data)
                .then(response => {
                    setSubmitted(true);
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e);
                })
        }
        else {


            MovieDataService.createReview(data) //routes to reviews controller in our backend amd call apiPostReview which then extracts data from the requests body paramater
                .then(response => {
                    setSubmitted(true)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }
        return (
            <div>
                {submitted ? (
                    <div>
                        <h4>Review submitted successfully</h4>
                        <Link to={"/movies/" + props.match.params.id}>
                            Back to Movie
                        </Link>
                    </div>
                ) : (
                    <Form>
                        <Form.Group>
                            <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={review}
                                onChange={onChangeReview}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={saveReview}>
                            Submit
                        </Button>
                    </Form>
                )}
            </div>
        )
    }
    export default AddReview;
