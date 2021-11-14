import React, {useEffect, useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import "./Reviews.css";
import {makeGetRequest} from "../../makeGetRequest";
import DJANGO_URL from "../../constants";
import {useParams} from "react-router-dom";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const {guideId} = useParams();

    useEffect(async () => {
        const res = await makeGetRequest(DJANGO_URL + "/reviews/create?guide=" + guideId);

        setReviews(res.data)


    }, [])
    return (
        <div className="reviews">
            <PageHeader
                pageTitle={
                    <>
                        Nmn's <span style={{color: "#f78383"}}>Reviews</span>
                    </>
                }
                rightIcon="fa fa-filter"
            />

            <div className="reviews__cards">
                {reviews.map(review => {
                        const dateTime = new Date(review.created_at)
                        return (<ReviewCard content={review.content} imgUrl={review.user_data.image}
                                            fullName={review.user_data.name} rating={review.rating}
                                            date={String(dateTime.getDate()) + " " + String(dateTime.toLocaleString('default', {month: 'short'}))}
                                            time={dateTime.toLocaleTimeString().slice(0, 5)}/>)
                    }
                )}      </div>
        </div>
    );
}

export default Reviews;
