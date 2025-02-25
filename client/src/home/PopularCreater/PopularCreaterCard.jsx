import React from 'react';

export default function PopularCreatorCard(
    {
        authorImg,
        authorName
    }
) {
    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-lg p-3 flex items-center space-x-2 flex-col">
            <img
                className="w-50 h-50 rounded-full object-cover"
                src={authorImg}
                alt="Creator Profile"
            />
            <div>
                <h2 className="text-lg font-semibold text-center">{authorName}</h2>
                <p className="text-gray-500 text-center">FollowingCount</p>

            </div>
        </div>
    );
}
