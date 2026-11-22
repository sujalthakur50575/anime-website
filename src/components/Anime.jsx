import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { normalizeAnime } from '../context/globalContext';

const AnimeDetailContainer = styled.div`
    min-height: 100vh;
    padding-bottom: 5rem;
    background: var(--bg-main, #0b0f19);

    /* Top Navigation bar */
    .top-nav {
        padding: 1rem 3rem;
        display: flex;
        align-items: center;
        background: rgba(11, 15, 25, 0.8);
        backdrop-filter: blur(14px);
        border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
        position: sticky;
        top: 0;
        z-index: 50;

        .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--text-secondary, #94a3b8);
            font-size: 0.92rem;
            font-weight: 600;
            text-decoration: none;
            padding: 6px 14px;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
            transition: all 0.2s ease;

            &:hover {
                color: #fff;
                background: rgba(139, 92, 246, 0.2);
                border-color: rgba(139, 92, 246, 0.4);
                transform: translateX(-3px);
            }
        }
    }

    .content-container {
        max-width: 1320px;
        margin: 2rem auto 0;
        padding: 0 2rem;
    }

    /* Main Hero Info Section */
    .hero-card {
        background: var(--bg-secondary, #111827);
        border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
        border-radius: var(--radius-lg, 20px);
        padding: 2.5rem;
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 2.75rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        position: relative;
        overflow: hidden;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 450px;
            height: 450px;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.09) 0%, transparent 70%);
            pointer-events: none;
        }
    }

    .poster-column {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .poster-wrapper {
            position: relative;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);

            img {
                width: 100%;
                display: block;
                object-fit: cover;
            }
        }
    }

    .info-column {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;

        .titles {
            h1 {
                font-size: 2.2rem;
                font-weight: 800;
                line-height: 1.25;
                background: linear-gradient(135deg, #ffffff 40%, #c084fc 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin-bottom: 0.35rem;
            }

            .japanese-title {
                color: var(--text-muted, #64748b);
                font-size: 0.95rem;
                font-weight: 500;
            }
        }

        .stat-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 0.65rem;

            .badge {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 6px 14px;
                border-radius: 8px;
                font-size: 0.85rem;
                font-weight: 700;
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));

                &.score {
                    background: rgba(245, 158, 11, 0.15);
                    color: #fbbf24;
                    border-color: rgba(245, 158, 11, 0.3);
                }

                &.rank {
                    background: rgba(139, 92, 246, 0.15);
                    color: #c084fc;
                    border-color: rgba(139, 92, 246, 0.3);
                }

                &.status {
                    background: rgba(16, 185, 129, 0.15);
                    color: #34d399;
                    border-color: rgba(16, 185, 129, 0.3);
                }
            }
        }

        .genres-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;

            .genre-pill {
                padding: 4px 12px;
                border-radius: 999px;
                background: rgba(236, 72, 153, 0.12);
                color: #f472b6;
                border: 1px solid rgba(236, 72, 153, 0.25);
                font-size: 0.78rem;
                font-weight: 600;
            }
        }

        .specs-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem 1.5rem;
            padding: 1.1rem;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border-color, rgba(255, 255, 255, 0.06));

            .spec-item {
                display: flex;
                gap: 0.6rem;
                font-size: 0.88rem;

                .label {
                    color: var(--text-muted, #64748b);
                    font-weight: 600;
                    min-width: 85px;
                }

                .val {
                    color: var(--text-primary, #f8fafc);
                    font-weight: 500;
                }
            }
        }

        .synopsis-box {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;

            h3 {
                font-size: 1.1rem;
                font-weight: 700;
                color: var(--text-primary, #f8fafc);
            }

            p {
                color: var(--text-secondary, #94a3b8);
                line-height: 1.65;
                font-size: 0.92rem;
            }

            .expand-btn {
                align-self: flex-start;
                background: none;
                border: none;
                color: #c084fc;
                font-size: 0.88rem;
                font-weight: 600;
                cursor: pointer;
                padding: 4px 0;
                transition: color 0.2s;

                &:hover {
                    color: #ec4899;
                }
            }
        }
    }

    /* Trailer Section */
    .trailer-section {
        margin-top: 3.5rem;

        h2 {
            font-size: 1.45rem;
            font-weight: 700;
            margin-bottom: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;

            i {
                color: #ec4899;
            }
        }

        .video-container {
            width: 100%;
            max-width: 900px;
            aspect-ratio: 16 / 9;
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            background: #000;

            iframe {
                width: 100%;
                height: 100%;
                border: none;
                display: block;
            }
        }

        .no-trailer {
            padding: 2.25rem;
            background: var(--bg-secondary, #111827);
            border-radius: 14px;
            border: 1px dashed var(--border-color, rgba(255, 255, 255, 0.1));
            color: var(--text-secondary, #94a3b8);
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
        }
    }

    /* Characters Cast Section */
    .characters-section {
        margin-top: 3.5rem;

        h2 {
            font-size: 1.45rem;
            font-weight: 700;
            margin-bottom: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;

            i {
                color: #8b5cf6;
            }
        }

        .characters-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1.25rem;
        }

        .char-card {
            background: var(--bg-secondary, #111827);
            border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
            border-radius: 12px;
            overflow: hidden;
            text-decoration: none;
            transition: all 0.25s ease;
            display: flex;
            flex-direction: column;

            &:hover {
                transform: translateY(-5px);
                border-color: rgba(139, 92, 246, 0.5);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);

                .char-img {
                    transform: scale(1.05);
                }

                .char-name {
                    color: #c084fc;
                }
            }

            .img-wrap {
                position: relative;
                width: 100%;
                padding-top: 130%;
                overflow: hidden;
                background: #0f172a;
            }

            .char-img {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .char-meta {
                padding: 10px;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .char-name {
                font-size: 0.88rem;
                font-weight: 600;
                color: var(--text-primary, #f8fafc);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                transition: color 0.2s;
            }

            .char-role {
                font-size: 0.75rem;
                color: var(--text-muted, #64748b);
            }
        }
    }

    .loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60vh;
        gap: 1.5rem;

        .spinner {
            width: 48px;
            height: 48px;
            border: 4px solid rgba(139, 92, 246, 0.2);
            border-top-color: #8b5cf6;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        p {
            color: var(--text-secondary, #94a3b8);
            font-size: 1.1rem;
        }
    }

    @media (max-width: 992px) {
        .hero-card {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.75rem;
        }

        .poster-column {
            max-width: 260px;
            margin: 0 auto;
        }

        .specs-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 576px) {
        .top-nav {
            padding: 0.85rem 1.25rem;
        }

        .content-container {
            padding: 0 1rem;
        }

        .titles h1 {
            font-size: 1.7rem;
        }

        .characters-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
        }
    }
`;

const Anime = () => {
    const { id } = useParams();

    const [anime, setAnime] = useState(null);
    const [genres, setGenres] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchDetails = async () => {
            setLoading(true);
            try {
                // 1. Fetch Anime details from Kitsu
                const res = await fetch(`https://kitsu.io/api/edge/anime/${id}`, {
                    headers: { 'Accept': 'application/vnd.api+json' },
                });
                const json = await res.json();
                if (json.data) {
                    setAnime(normalizeAnime(json.data));
                }

                // 2. Fetch Genres from Kitsu
                try {
                    const gRes = await fetch(`https://kitsu.io/api/edge/anime/${id}/genres`, {
                        headers: { 'Accept': 'application/vnd.api+json' },
                    });
                    const gJson = await gRes.json();
                    setGenres(gJson.data?.map((g) => g.attributes.name) || []);
                } catch (e) {
                    console.error("Genre fetch error:", e);
                }

                // 3. Fetch Characters from Kitsu
                try {
                    const cRes = await fetch(`https://kitsu.io/api/edge/anime/${id}/characters?include=character&page[limit]=20`, {
                        headers: { 'Accept': 'application/vnd.api+json' },
                    });
                    const cJson = await cRes.json();
                    if (cJson.included) {
                        const parsedChars = cJson.included.map((charItem) => ({
                            id: charItem.id,
                            name: charItem.attributes?.canonicalName || charItem.attributes?.name || 'Unknown',
                            image: charItem.attributes?.image?.original || charItem.attributes?.image?.large || charItem.attributes?.image?.medium || '',
                            role: 'Character',
                        }));
                        setCharacters(parsedChars);
                    }
                } catch (e) {
                    console.error("Character fetch error:", e);
                }
            } catch (err) {
                console.error('Error fetching anime details from Kitsu API:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDetails();
        }
    }, [id]);

    if (loading || !anime) {
        return (
            <AnimeDetailContainer>
                <div className="top-nav">
                    <Link to="/" className="back-link">
                        <i className="fa-solid fa-arrow-left" /> Back to Home
                    </Link>
                </div>
                <div className="loader-container">
                    <div className="spinner" />
                    <p>Loading Anime Details from Kitsu API...</p>
                </div>
            </AnimeDetailContainer>
        );
    }

    const {
        title,
        title_english,
        title_japanese,
        synopsis,
        duration,
        year,
        poster,
        rank,
        score,
        popularity,
        status,
        type,
        episodes,
        trailerUrl,
        ratingGuide,
        startDate,
        endDate,
    } = anime;

    const mainTitle = title_english || title || 'Anime Details';
    const synopsisPreview = synopsis?.length > 450 ? `${synopsis.substring(0, 450)}...` : synopsis;

    return (
        <AnimeDetailContainer>
            <div className="top-nav">
                <Link to="/" className="back-link">
                    <i className="fa-solid fa-arrow-left" /> Back to Home
                </Link>
            </div>

            <div className="content-container">
                <div className="hero-card">
                    <div className="poster-column">
                        <div className="poster-wrapper">
                            <img src={poster} alt={mainTitle} />
                        </div>
                    </div>

                    <div className="info-column">
                        <div className="titles">
                            <h1>{mainTitle}</h1>
                            {title_japanese && <div className="japanese-title">{title_japanese}</div>}
                        </div>

                        <div className="stat-badges">
                            {score ? (
                                <div className="badge score">
                                    <i className="fa-solid fa-star" /> Score: {score}
                                </div>
                            ) : null}
                            {rank ? (
                                <div className="badge rank">
                                    <i className="fa-solid fa-trophy" /> Rank {rank}
                                </div>
                            ) : null}
                            {status && (
                                <div className="badge status">
                                    <i className="fa-solid fa-circle-dot" /> {status}
                                </div>
                            )}
                            {type && (
                                <div className="badge">
                                    <i className="fa-solid fa-film" /> {type}
                                </div>
                            )}
                            {episodes ? (
                                <div className="badge">
                                    <i className="fa-solid fa-tv" /> {episodes} Episodes
                                </div>
                            ) : null}
                        </div>

                        {genres && genres.length > 0 && (
                            <div className="genres-row">
                                {genres.map((genreName, idx) => (
                                    <span key={idx} className="genre-pill">
                                        {genreName}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="specs-grid">
                            <div className="spec-item">
                                <span className="label">Aired:</span>
                                <span className="val">
                                    {startDate ? `${startDate} ${endDate ? `to ${endDate}` : ''}` : 'N/A'}
                                </span>
                            </div>
                            <div className="spec-item">
                                <span className="label">Rating:</span>
                                <span className="val">{ratingGuide || 'N/A'}</span>
                            </div>
                            <div className="spec-item">
                                <span className="label">Year:</span>
                                <span className="val">{year || 'N/A'}</span>
                            </div>
                            <div className="spec-item">
                                <span className="label">Duration:</span>
                                <span className="val">{duration || 'N/A'}</span>
                            </div>
                            <div className="spec-item">
                                <span className="label">Popularity:</span>
                                <span className="val">{popularity || 'N/A'}</span>
                            </div>
                            <div className="spec-item">
                                <span className="label">Format:</span>
                                <span className="val">{type || 'TV'}</span>
                            </div>
                        </div>

                        {synopsis && (
                            <div className="synopsis-box">
                                <h3>Synopsis</h3>
                                <p>{showMore ? synopsis : synopsisPreview}</p>
                                {synopsis.length > 450 && (
                                    <button
                                        className="expand-btn"
                                        onClick={() => setShowMore(!showMore)}
                                    >
                                        {showMore ? 'Show Less ▲' : 'Read More ▼'}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Official Trailer Section */}
                <div className="trailer-section">
                    <h2>
                        <i className="fa-solid fa-play" /> Official Trailer
                    </h2>
                    {trailerUrl ? (
                        <div className="video-container">
                            <iframe
                                src={trailerUrl}
                                title={`${mainTitle} Trailer`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div className="no-trailer">
                            <i className="fa-solid fa-video-slash" />
                            <span>No official trailer preview is currently available for this title.</span>
                        </div>
                    )}
                </div>

                {/* Characters Cast Section */}
                {characters && characters.length > 0 && (
                    <div className="characters-section">
                        <h2>
                            <i className="fa-solid fa-users" /> Characters Cast
                        </h2>
                        <div className="characters-grid">
                            {characters.map((charItem, index) => (
                                <Link
                                    to={`/character/${charItem.id}`}
                                    key={charItem.id || index}
                                    className="char-card"
                                >
                                    <div className="img-wrap">
                                        <img
                                            src={charItem.image}
                                            alt={charItem.name}
                                            className="char-img"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="char-meta">
                                        <span className="char-name" title={charItem.name}>
                                            {charItem.name}
                                        </span>
                                        <span className="char-role">{charItem.role}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AnimeDetailContainer>
    );
};

export default Anime;
