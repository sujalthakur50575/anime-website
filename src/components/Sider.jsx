import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

const SidebarStyle = styled.aside`
    width: 320px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;

    .sidebar-card {
        background: var(--bg-secondary, #111827);
        border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
        border-radius: var(--radius-md, 14px);
        padding: 1.25rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    .sidebar-header {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding-bottom: 0.85rem;
        margin-bottom: 0.85rem;
        border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));

        i {
            color: #f59e0b;
            font-size: 1.1rem;
        }

        h3 {
            font-size: 1.15rem;
            font-weight: 700;
            color: var(--text-primary, #f8fafc);
            letter-spacing: -0.3px;
        }
    }

    .anime-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .anime-item {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.6rem;
        border-radius: var(--radius-sm, 8px);
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid transparent;
        transition: all 0.25s ease;
        text-decoration: none;

        &:hover {
            background: rgba(139, 92, 246, 0.1);
            border-color: rgba(139, 92, 246, 0.3);
            transform: translateX(4px);

            .item-title {
                color: #ec4899;
            }
        }
    }

    .rank-badge {
        width: 26px;
        height: 26px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 800;
        flex-shrink: 0;

        &.rank-1 {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: #000;
            box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
        }
        &.rank-2 {
            background: linear-gradient(135deg, #e2e8f0, #94a3b8);
            color: #0f172a;
        }
        &.rank-3 {
            background: linear-gradient(135deg, #d97706, #b45309);
            color: #fff;
        }
        &.rank-other {
            background: rgba(255, 255, 255, 0.06);
            color: var(--text-secondary, #94a3b8);
        }
    }

    .thumb {
        width: 52px;
        height: 72px;
        border-radius: 6px;
        object-fit: cover;
        flex-shrink: 0;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .details {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        flex: 1;
    }

    .item-title {
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--text-primary, #f8fafc);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.2s ease;
    }

    .meta-row {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.75rem;
        color: var(--text-secondary, #94a3b8);
    }

    .score {
        display: inline-flex;
        align-items: center;
        gap: 3px;
        color: #fbbf24;
        font-weight: 700;
    }

    @media (max-width: 992px) {
        width: 100%;
        .anime-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        }
    }
`;

function Sider({ tobe, type }) {
    const globalContext = useGlobalContext();
    const data = globalContext[type] || [];

    // Safely sort a shallow copy by score or rating
    const sorted = [...data].sort((a, b) => {
        const scoreA = parseFloat(a.score || (a.averageRating ? a.averageRating / 10 : 0)) || 0;
        const scoreB = parseFloat(b.score || (b.averageRating ? b.averageRating / 10 : 0)) || 0;
        return scoreB - scoreA;
    });

    if (!sorted.length) return null;

    return (
        <SidebarStyle>
            <div className="sidebar-card">
                <div className="sidebar-header">
                    <i className="fa-solid fa-trophy" />
                    <h3>Top 5 {tobe}</h3>
                </div>
                <div className="anime-list">
                    {sorted.slice(0, 5).map((anime, index) => {
                        const id = anime.id || anime.mal_id;
                        const title = anime.title || anime.title_english || 'Unknown';
                        const poster = anime.poster || anime.attributes?.posterImage?.small || '';
                        const score = anime.score || (anime.averageRating ? (parseFloat(anime.averageRating) / 10).toFixed(1) : null);
                        const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : 'rank-other';

                        return (
                            <Link to={`/anime/${id}`} key={id} className="anime-item">
                                <span className={`rank-badge ${rankClass}`}>{index + 1}</span>
                                <img src={poster} alt={title} className="thumb" loading="lazy" />
                                <div className="details">
                                    <span className="item-title" title={title}>{title}</span>
                                    <div className="meta-row">
                                        {score ? (
                                            <span className="score">
                                                <i className="fa-solid fa-star" /> {score}
                                            </span>
                                        ) : null}
                                        <span>{anime.type || 'TV'}</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </SidebarStyle>
    );
}

export default Sider;
