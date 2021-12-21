const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    query,
    update,
    remove,
    add
};


const COLLECTION_NAME = 'review';

async function query(filterBy) {
    console.log('Filter by reviewService', filterBy);
    const collection = await dbService.getCollection(COLLECTION_NAME);
    try {

        const reviews = await collection.find(filterBy).toArray();
        console.log('reviews: ', reviews);
        return reviews;
    } catch (err) {
        console.log('ERROR: cannot find reviews');
        throw err;
    }
}

async function update(review) {
    review._id = ObjectId(review._id);
    const collection = await dbService.getCollection(COLLECTION_NAME);
    try {
        await collection.updateOne({ '_id': review._id }, { $set: review });
        return review;
    } catch (err) {
        console.log(`ERROR: cannot update review ${review._id}`);
        throw err;
    }
}

async function remove(reviewId) {
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME);
        return await collection.deleteOne({ _id: ObjectId(reviewId) });
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`);
        throw err;
    }
}

async function add(review) {
    const collection = await dbService.getCollection(COLLECTION_NAME);
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert review`);
        throw err;
    }
}

async function _getToyReviews(toyId) {
    console.log('reviews for toyId: ', toyId);
    const collection = await dbService.getCollection(COLLECTION_NAME);
    // return await collection.find({ toyId: ObjectId(toyId) }).toArray();
    return await collection.aggregate([ // array of mongo aggregation operators
        {
            $match: { toyId: ObjectId(toyId) }// find all the reviews that has the matching toyId
        },
        {
            $lookup:
            {
                from: 'toy',// in which collection to lookup?
                localField: 'toyId', // field name on the review itself
                foreignField: '_id', // field name in the collection im looking up, e.g toy._id
                as: 'toy' // under what key should i add the search results to the review object?
            }
        },
        {
            $unwind: '$toy' // spreads the results - should match the 'as' in the lookup
        }
    ]).toArray();
}




