import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { normalizeCharacter } from '../context/globalContext';

const CharProfileContainer = styled.div`
    min-height: 100vh;
    padding-bottom: 5rem;
    background: var(--bg-main, #0b0f19);

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
        max-width: 1300px;
        margin: 2rem auto 0;
        padding: 0 2rem;
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    /* Hero Character Card */
    .char-hero {
        background: var(--bg-secondary, #111827);
        border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
        border-radius: var(--radius-lg, 20px);
        padding: 2.5rem;
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 2.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        position: relative;
        overflow: hidden;

        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(236, 72, 153, 0.09) 0%, transparent 70%);
            pointer-events: none;
        }

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

        .info-col {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;

            .names {
                h1 {
                    font-size: 2.2rem;
                    font-weight: 800;
                    line-height: 1.2;
                    background: linear-gradient(135deg, #ffffff 40%, #ec4899 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .kanji-name {
                    color: var(--text-muted, #64748b);
                    font-size: 1.05rem;
                    margin-top: 4px;
                }
            }

            .badge-row {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;

                .other-names-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 14px;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    color: #c084fc;
                    background: rgba(139, 92, 246, 0.12);
                    border: 1px solid rgba(139, 92, 246, 0.25);
                }
            }

            .bio-box {
                h3 {
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--text-primary, #f8fafc);
                    margin-bottom: 0.5rem;
                }

                p {
                    color: var(--text-secondary, #94a3b8);
                    line-height: 1.7;
                    font-size: 0.92rem;
                    white-space: pre-line;
                }

                .read-more-btn {
                    margin-top: 6px;
                    background: none;
                    border: none;
                    color: #ec4899;
                    font-size: 0.88rem;
                    font-weight: 600;
                    cursor: pointer;
                    padding: 4px 0;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .download-btn {
                align-self: flex-start;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 10px 22px;
                border-radius: 10px;
                background: linear-gradient(135deg, #8b5cf6, #ec4899);
                border: none;
                color: #fff;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: opacity 0.2s, transform 0.15s;

                &:hover {
                    opacity: 0.92;
                    transform: scale(1.02);
                }
            }
        }
    }

    /* Anime Appearances Section */
    .animeography-section {
        h2 {
            font-size: 1.45rem;
            font-weight: 700;
            margin-bottom: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;

            i {
                color: #06b6d4;
            }
        }

        .anime-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1.25rem;
        }

        .anime-entry {
            background: var(--bg-secondary, #111827);
            border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
            border-radius: 12px;
            overflow: hidden;
            text-decoration: none;
            transition: all 0.25s ease;

            &:hover {
                transform: translateY(-5px);
                border-color: rgba(6, 182, 212, 0.5);

                .entry-img {
                    transform: scale(1.05);
                }

                .entry-title {
                    color: #06b6d4;
                }
            }

            .img-wrap {
                width: 100%;
                padding-top: 140%;
                position: relative;
                overflow: hidden;
                background: #0f172a;
            }

            .entry-img {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s;
            }

            .entry-info {
                padding: 10px;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .entry-title {
                font-size: 0.85rem;
                font-weight: 600;
                color: var(--text-primary, #f8fafc);
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                line-height: 1.3;
                transition: color 0.2s;
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
        .char-hero {
            grid-template-columns: 1fr;
            padding: 1.75rem;

            .poster-wrapper {
                max-width: 240px;
                margin: 0 auto;
            }
        }
    }

    @media (max-width: 576px) {
        .top-nav {
            padding: 0.85rem 1.25rem;
        }

        .content-container {
            padding: 0 1rem;
        }

        .char-hero .info-col .names h1 {
            font-size: 1.75rem;
        }
    }
`;

const CharcImages = () => {
    const { id } = useParams();

    const [character, setCharacter] = useState(null);
    const [appearances, setAppearances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFullBio, setShowFullBio] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchCharData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Character full details from Kitsu
                const res = await fetch(`https://kitsu.io/api/edge/characters/${id}`, {
                    headers: { 'Accept': 'application/vnd.api+json' },
                });
                const json = await res.json();
                if (json.data) {
                    setCharacter(normalizeCharacter(json.data));
                }

                // 2. Fetch Character media appearances from Kitsu
                try {
                    const mRes = await fetch(`https://kitsu.io/api/edge/characters/${id}/media-characters?include=media&page[limit]=12`, {
                        headers: { 'Accept': 'application/vnd.api+json' },
                    });
                    const mJson = await mRes.json();
                    if (mJson.included) {
                        const animeList = mJson.included
                            .filter((item) => item.type === 'anime')
                            .map((a) => ({
                                id: a.id,
                                title: a.attributes?.canonicalTitle || a.attributes?.titles?.en || 'Untitled',
                                image: a.attributes?.posterImage?.medium || a.attributes?.posterImage?.large || '',
                            }));
                        setAppearances(animeList);
                    }
                } catch (e) {
                    console.error("Media characters fetch error:", e);
                }
            } catch (err) {
                console.error('Error fetching character details from Kitsu API:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCharData();
        }
    }, [id]);

    if (loading || !character) {
        return (
            <CharProfileContainer>
                <div className="top-nav">
                    <Link to="/" className="back-link">
                        <i className="fa-solid fa-arrow-left" /> Back to Home
                    </Link>
                </div>
                <div className="loader-container">
                    <div className="spinner" />
                    <p>Loading Character from Kitsu API...</p>
                </div>
            </CharProfileContainer>
        );
    }

    const {
        name,
        kanji,
        otherNames,
        description,
        image,
    } = character;

    const handleDownload = async () => {
        if (!image) return;
        try {
            const res = await fetch(image);
            const blob = await res.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = `${name.replace(/\s+/g, '_')}_artwork.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        } catch {
            window.open(image, '_blank');
        }
    };

    const bioPreview = description?.length > 400 ? `${description.substring(0, 400)}...` : description;

    return (
        <CharProfileContainer>
            <div className="top-nav">
                <Link to="/" className="back-link">
                    <i className="fa-solid fa-arrow-left" /> Back to Home
                </Link>
            </div>

            <div className="content-container">
                {/* Hero Character Card */}
                <div className="char-hero">
                    <div className="poster-wrapper">
                        <img src={image} alt={name} />
                    </div>

                    <div className="info-col">
                        <div className="names">
                            <h1>{name}</h1>
                            {kanji && <div className="kanji-name">{kanji}</div>}
                        </div>

                        {otherNames && otherNames.length > 0 && (
                            <div className="badge-row">
                                <div className="other-names-tag">
                                    <i className="fa-solid fa-tag" /> {otherNames.join(', ')}
                                </div>
                            </div>
                        )}

                        {description && (
                            <div className="bio-box">
                                <h3>About</h3>
                                <p>{showFullBio ? description : bioPreview}</p>
                                {description.length > 400 && (
                                    <button
                                        className="read-more-btn"
                                        onClick={() => setShowFullBio(!showFullBio)}
                                    >
                                        {showFullBio ? 'Show Less ▲' : 'Read Full Bio ▼'}
                                    </button>
                                )}
                            </div>
                        )}

                        {image && (
                            <button className="download-btn" onClick={handleDownload}>
                                <i className="fa-solid fa-download" /> Download Character Art
                            </button>
                        )}
                    </div>
                </div>

                {/* Animeography Section */}
                {appearances && appearances.length > 0 && (
                    <div className="animeography-section">
                        <h2>
                            <i className="fa-solid fa-clapperboard" /> Anime Appearances ({appearances.length})
                        </h2>
                        <div className="anime-grid">
                            {appearances.map((entry, index) => (
                                <Link to={`/anime/${entry.id}`} key={entry.id || index} className="anime-entry">
                                    <div className="img-wrap">
                                        <img src={entry.image} alt={entry.title} className="entry-img" loading="lazy" />
                                    </div>
                                    <div className="entry-info">
                                        <span className="entry-title" title={entry.title}>{entry.title}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </CharProfileContainer>
    );
};

export default CharcImages;
