import { ReviewPreview } from './ReviewPreview';

export function ReviewList({ reviews }) {
  if (!reviews?.length)
    return (
      <div className='review-list'>
        {' '}
        No reviews yet.. be the 1st to add a review!
      </div>
    );
  return (
    <section className='review-list'>
      {reviews.map((review) => {
        return <ReviewPreview review={review} key={review._id} />;
      })}
    </section>
  );
}
