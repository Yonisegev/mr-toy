export function ReviewPreview({ review }) {
    return (
        <div className="review">
            <h3>From : {review.username}</h3>
            <h4>{'⭐'.repeat(review.rate)}</h4>
            <p>"{review.txt}"</p>
            <p className="date"><small>{review.addedAt}</small></p>
        </div>
    )
}