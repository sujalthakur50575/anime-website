import React from 'react';
import styled from 'styled-components';

const SkeletonWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1.5rem;
    width: 100%;

    .skeleton-card {
        background: #151f32;
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.05);
        display: flex;
        flex-direction: column;
    }

    .skeleton-poster {
        width: 100%;
        padding-top: 142%;
        position: relative;
    }

    .skeleton-info {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .skeleton-line {
        height: 14px;
        border-radius: 6px;
    }

    .skeleton-title {
        width: 85%;
        height: 16px;
    }

    .skeleton-sub {
        width: 50%;
        height: 12px;
    }
`;

const SkeletonGrid = ({ count = 12 }) => {
    return (
        <SkeletonWrapper>
            {Array.from({ length: count }).map((_, i) => (
                <div className="skeleton-card" key={i}>
                    <div className="skeleton-poster shimmer" />
                    <div className="skeleton-info">
                        <div className="skeleton-line skeleton-title shimmer" />
                        <div className="skeleton-line skeleton-sub shimmer" />
                    </div>
                </div>
            ))}
        </SkeletonWrapper>
    );
};

export default SkeletonGrid;
