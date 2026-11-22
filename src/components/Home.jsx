import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import Airing from './Airing';
import Popular from './Popular';
import Upcoming from './Upcoming';
import Characters from './Characters';

const HomeContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba(11, 15, 25, 0.88);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
        padding: 0.9rem 3rem;
        transition: all 0.3s ease;
    }

    .header-content {
        max-width: 1440px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
    }

    .brand-logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        cursor: pointer;

        .logo-icon {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 1.2rem;
            box-shadow: 0 4px 12px rgba(236, 72, 153, 0.35);
        }

        .logo-text {
            font-size: 1.35rem;
            font-weight: 800;
            background: linear-gradient(135deg, #f8fafc 30%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.5px;
        }
    }

    .search-section {
        flex: 1;
        max-width: 520px;
        display: flex;
        align-items: center;
        gap: 0.6rem;

        form {
            position: relative;
            display: flex;
            align-items: center;
            flex: 1;
            background: var(--bg-card, #151f32);
            border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
            border-radius: 999px;
            padding: 3px 5px 3px 14px;
            transition: all 0.25s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

            &:focus-within {
                border-color: rgba(168, 85, 247, 0.6);
                box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
            }

            .search-type-pill {
                display: flex;
                background: rgba(255, 255, 255, 0.06);
                border-radius: 999px;
                padding: 2px;
                margin-right: 8px;

                button {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: var(--text-muted, #64748b);
                    font-size: 0.72rem;
                    font-weight: 700;
                    padding: 3px 8px;
                    border-radius: 999px;
                    cursor: pointer;
                    transition: all 0.2s;

                    &.active {
                        background: rgba(139, 92, 246, 0.3);
                        color: #c084fc;
                    }
                }
            }

            .search-icon {
                color: var(--text-muted, #64748b);
                font-size: 0.88rem;
                margin-right: 8px;
            }

            input {
                width: 100%;
                background: transparent;
                border: none;
                outline: none;
                color: var(--text-primary, #f8fafc);
                font-size: 0.9rem;

                &::placeholder {
                    color: var(--text-muted, #64748b);
                }
            }

            .clear-input {
                background: none;
                border: none;
                color: var(--text-muted, #64748b);
                cursor: pointer;
                padding: 4px 8px;
                font-size: 0.85rem;
                transition: color 0.2s;

                &:hover {
                    color: #fff;
                }
            }

            .submit-btn {
                background: linear-gradient(135deg, #8b5cf6, #ec4899);
                border: none;
                outline: none;
                color: #fff;
                font-weight: 600;
                font-size: 0.82rem;
                padding: 6px 16px;
                border-radius: 999px;
                cursor: pointer;
                transition: opacity 0.2s, transform 0.15s;
                flex-shrink: 0;

                &:hover {
                    opacity: 0.92;
                    transform: scale(1.02);
                }
            }
        }
    }

    .nav-tabs {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-color, rgba(255, 255, 255, 0.08));
        padding: 4px;
        border-radius: 999px;

        button {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 7px 15px;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-secondary, #94a3b8);
            background: transparent;
            border: none;
            outline: none;
            border-radius: 999px;
            cursor: pointer;
            transition: all 0.25s ease;

            i {
                font-size: 0.8rem;
            }

            &.active {
                background: linear-gradient(135deg, #8b5cf6, #ec4899);
                color: #fff;
                box-shadow: 0 4px 12px rgba(139, 92, 246, 0.35);
            }

            &:not(.active):hover {
                color: #fff;
                background: rgba(255, 255, 255, 0.05);
            }
        }
    }

    @media (max-width: 1024px) {
        header {
            padding: 1rem 1.5rem;
        }

        .header-content {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
        }

        .search-section {
            max-width: 100%;
        }

        .nav-tabs {
            justify-content: center;
            flex-wrap: wrap;
        }
    }

    @media (max-width: 480px) {
        .nav-tabs button {
            padding: 6px 10px;
            font-size: 0.78rem;
        }
    }
`;

const Home = () => {
    const {
        search,
        searchCategory,
        setSearchCategory,
        handleSearchChange,
        handleSubmitSearch,
        clearSearch,
        getPopularAnime,
        getAiringAnime,
        getUpcomingAnime,
        getTopCharacters,
    } = useGlobalContext();

    const [rendered, setRendered] = useState('popular');

    const handleTabSwitch = (tab) => {
        setRendered(tab);
        clearSearch();
        if (tab === 'popular') {
            setSearchCategory('anime');
            getPopularAnime();
        } else if (tab === 'airing') {
            setSearchCategory('anime');
            getAiringAnime();
        } else if (tab === 'upcoming') {
            setSearchCategory('anime');
            getUpcomingAnime();
        } else if (tab === 'characters') {
            setSearchCategory('character');
            getTopCharacters();
        }
    };

    const renderActiveView = () => {
        switch (rendered) {
            case 'popular':
                return <Popular />;
            case 'airing':
                return <Airing />;
            case 'upcoming':
                return <Upcoming />;
            case 'characters':
                return <Characters />;
            default:
                return <Popular />;
        }
    };

    return (
        <HomeContainer>
            <header>
                <div className="header-content">
                    <div
                        className="brand-logo"
                        onClick={() => handleTabSwitch('popular')}
                    >
                        <div className="logo-icon">
                            <i className="fa-solid fa-bolt" />
                        </div>
                        <span className="logo-text">Mera Anime</span>
                    </div>

                    <div className="search-section">
                        <form onSubmit={handleSubmitSearch}>
                            <div className="search-type-pill">
                                <button
                                    type="button"
                                    className={searchCategory === 'anime' ? 'active' : ''}
                                    onClick={() => {
                                        setSearchCategory('anime');
                                        if (rendered === 'characters') setRendered('popular');
                                    }}
                                >
                                    Anime
                                </button>
                                <button
                                    type="button"
                                    className={searchCategory === 'character' ? 'active' : ''}
                                    onClick={() => {
                                        setSearchCategory('character');
                                        if (rendered !== 'characters') setRendered('characters');
                                    }}
                                >
                                    Character
                                </button>
                            </div>
                            <i className="fa-solid fa-magnifying-glass search-icon" />
                            <input
                                type="text"
                                placeholder={
                                    searchCategory === 'character'
                                        ? 'Search characters (e.g. Gojo, Zoro, Luffy)...'
                                        : 'Search anime (e.g. Naruto, Bleach, Attack on Titan)...'
                                }
                                value={search}
                                onChange={handleSearchChange}
                            />
                            {search && (
                                <button
                                    type="button"
                                    className="clear-input"
                                    onClick={clearSearch}
                                >
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            )}
                            <button type="submit" className="submit-btn">
                                Search
                            </button>
                        </form>
                    </div>

                    <nav className="nav-tabs">
                        <button
                            className={rendered === 'popular' ? 'active' : ''}
                            onClick={() => handleTabSwitch('popular')}
                        >
                            <i className="fa-solid fa-fire" /> Popular
                        </button>
                        <button
                            className={rendered === 'airing' ? 'active' : ''}
                            onClick={() => handleTabSwitch('airing')}
                        >
                            <i className="fa-solid fa-tv" /> Airing
                        </button>
                        <button
                            className={rendered === 'upcoming' ? 'active' : ''}
                            onClick={() => handleTabSwitch('upcoming')}
                        >
                            <i className="fa-solid fa-rocket" /> Upcoming
                        </button>
                        <button
                            className={rendered === 'characters' ? 'active' : ''}
                            onClick={() => handleTabSwitch('characters')}
                        >
                            <i className="fa-solid fa-users" /> Characters
                        </button>
                    </nav>
                </div>
            </header>

            <main>{renderActiveView()}</main>
        </HomeContainer>
    );
};

export default Home;
