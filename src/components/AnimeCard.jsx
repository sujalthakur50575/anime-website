import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled(Link)`
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--bg-card, #151f32);
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
    border-radius: var(--radius-md, 14px);
    overflow: hidden;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);

    &:hover {
        transform: translateY(-6px);
        border-color: rgba(168, 85, 247, 0.5);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.4), 0 0 20px rgba(168, 85, 247, 0.25);

        .poster-img {
            transform: scale(1.05);
        }

        .play-overlay {
            opacity: 1;
        }

        .title {
            color: #ec4899;
        }
    }

    .poster-wrap {
        position: relative;
        width: 100%;
        padding-top: 142%;
        overflow: hidden;
        background: #0f172a;
    }

    .poster-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }

    .gradient-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 55%;
        background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 60%, transparent 100%);
        pointer-events: none;
    }

    .badges-top {
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
        z-index: 2;
    }

    .score-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 0.75rem;
        font-weight: 700;
        color: #fff;
        background: rgba(15, 23, 42, 0.85);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(245, 158, 11, 0.4);

        i {
            color: #fbbf24;
            font-size: 0.7rem;
        }
    }

    .type-badge {
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #f1f5f9;
        background: rgba(139, 92, 246, 0.85);
        backdrop-filter: blur(8px);
    }

    .play-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(11, 15, 25, 0.4);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 2;

        .play-btn {
            width: 46px;
            height: 46px;
            border-radius: 50%;
            background: linear-gradient(135deg, #a855f7, #ec4899);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.1rem;
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.5);
            transform: scale(0.9);
            transition: transform 0.2s ease;

            i {
                margin-left: 3px;
            }
        }
    }

    &:hover .play-overlay .play-btn {
        transform: scale(1);
    }

    .info {
        padding: 12px 14px 14px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: 1;
        background: var(--bg-card, #151f32);
    }

    .title {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-primary, #f8fafc);
        line-height: 1.35;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        transition: color 0.2s ease;
        min-height: 2.6em;
    }

    .meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.78rem;
        color: var(--text-secondary, #94a3b8);
        margin-top: auto;
    }

    .year {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .episodes {
        background: rgba(255, 255, 255, 0.06);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.72rem;
        color: #cbd5e1;
    }
`;

const AnimeCard = ({ anime }) => {
    if (!anime) return null;

    const id = anime.id || anime.mal_id;
    const poster =
        anime.poster ||
        anime.attributes?.posterImage?.large ||
        anime.attributes?.posterImage?.medium ||
        anime.images?.webp?.large_image_url ||
        '';

    const title =
        anime.title ||
        anime.attributes?.canonicalTitle ||
        anime.title_english ||
        'Untitled Anime';

    const rawRating = anime.score || (anime.attributes?.averageRating ? (parseFloat(anime.attributes.averageRating) / 10).toFixed(1) : null);
    const score = rawRating || null;
    const type = anime.type || anime.attributes?.subtype?.toUpperCase() || 'TV';
    const year = anime.year || (anime.attributes?.startDate ? anime.attributes.startDate.substring(0, 4) : '');
    const episodes = anime.episodes || anime.attributes?.episodeCount ? `${anime.episodes || anime.attributes.episodeCount} eps` : (anime.status || anime.attributes?.status || '');

    return (
        <CardContainer to={`/anime/${id}`}>
            <div className="poster-wrap">
                <img className="poster-img" src={poster} alt={title} loading="lazy" />
                <div className="gradient-overlay" />
                
                <div className="badges-top">
                    {score ? (
                        <div className="score-badge">
                            <i className="fa-solid fa-star" />
                            <span>{score}</span>
                        </div>
                    ) : <span />}
                    <div className="type-badge">{type}</div>
                </div>

                <div className="play-overlay">
                    <div className="play-btn">
                        <i className="fa-solid fa-play" />
                    </div>
                </div>
            </div>

            <div className="info">
                <h4 className="title" title={title}>{title}</h4>
                <div className="meta">
                    <span className="year">{year || anime.status || ''}</span>
                    {episodes && <span className="episodes">{episodes}</span>}
                </div>
            </div>
        </CardContainer>
    );
};

export default AnimeCard;
