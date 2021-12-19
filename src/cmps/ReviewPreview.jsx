export function ReviewPreview({ review }) {
    return (
        <div className="review">
            <h3>From : {review.name}</h3>
            <h4>{'⭐'.repeat(review.rate)}</h4>
            <p>"{review.txt}"</p>
            <p className="date"><small>{review.readAt}</small></p>
        </div>
    )
}