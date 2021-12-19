import { ReviewPreview } from "./ReviewPreview"


export function ReviewList({ reviews }) {

    if (!reviews) return <div className="review-list"> No reviews yet.. be the 1st to add a review!</div>
    return (
        <section className="review-list">
            {reviews.map((review, idx) => {
                return <ReviewPreview review={review} key={idx} />
            })}

        </section>
    )
}