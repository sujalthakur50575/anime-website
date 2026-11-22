import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import CharacterCard from './CharacterCard';
import SkeletonGrid from './SkeletonGrid';

const ContentWrapper = styled.div`
    padding: 1.5rem 3rem 4rem;
    max-width: 1440px;
    margin: 0 auto;
    width: 100%;

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;

        .title-group {
            display: flex;
            align-items: center;
            gap: 0.75rem;

            h2 {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--text-primary, #f8fafc);
                letter-spacing: -0.5px;
            }

            .count-badge {
                padding: 3px 10px;
                border-radius: 999px;
                background: rgba(236, 72, 153, 0.15);
                color: #f472b6;
                border: 1px solid rgba(236, 72, 153, 0.3);
                font-size: 0.8rem;
                font-weight: 600;
            }
        }

        .clear-btn {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 8px;
            background: rgba(239, 68, 68, 0.15);
            color: #f87171;
            border: 1px solid rgba(239, 68, 68, 0.3);
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
                background: rgba(239, 68, 68, 0.25);
            }
        }
    }

    .char-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1.5rem;
    }

    .empty-state {
        text-align: center;
        padding: 4rem 2rem;
        background: var(--bg-secondary, #111827);
        border: 1px dashed var(--border-color, rgba(255, 255, 255, 0.1));
        border-radius: 16px;

        i {
            font-size: 3rem;
            color: var(--text-muted, #64748b);
            margin-bottom: 1rem;
        }

        h3 {
            font-size: 1.25rem;
            color: var(--text-primary, #f8fafc);
            margin-bottom: 0.5rem;
        }

        p {
            color: var(--text-secondary, #94a3b8);
            font-size: 0.95rem;
        }
    }

    @media (max-width: 992px) {
        padding: 1.5rem 1.5rem 3rem;
    }

    @media (max-width: 480px) {
        padding: 1rem;
        .char-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.85rem;
        }
    }
`;

const Characters = () => {
    const {
        characters,
        isSearch,
        searchCharResults,
        searchType,
        search,
        clearSearch,
        loading,
        error,
        getTopCharacters,
    } = useGlobalContext();

    useEffect(() => {
        if (!characters || characters.length === 0) {
            getTopCharacters();
        }
    }, [characters, getTopCharacters]);

    const isCharSearch = isSearch && searchType === 'character';
    const dataToDisplay = isCharSearch ? searchCharResults : characters;

    return (
        <ContentWrapper>
            <div className="section-header">
                <div className="title-group">
                    <h2>{isCharSearch ? `Character Results for "${search}"` : "Top Anime Characters"}</h2>
                    {dataToDisplay?.length > 0 && (
                        <span className="count-badge">{dataToDisplay.length} characters</span>
                    )}
                </div>
                {isCharSearch && (
                    <button className="clear-btn" onClick={clearSearch}>
                        <i className="fa-solid fa-xmark" /> Clear Search
                    </button>
                )}
            </div>

            {loading ? (
                <SkeletonGrid count={12} />
            ) : error ? (
                <div className="empty-state">
                    <i className="fa-solid fa-triangle-exclamation" />
                    <h3>Something went wrong</h3>
                    <p>{error}</p>
                </div>
            ) : dataToDisplay?.length === 0 ? (
                <div className="empty-state">
                    <i className="fa-solid fa-users-slash" />
                    <h3>No Characters Found</h3>
                    <p>Try searching with another character name.</p>
                </div>
            ) : (
                <div className="char-grid">
                    {dataToDisplay.map((char) => (
                        <CharacterCard character={char} key={char.mal_id} />
                    ))}
                </div>
            )}
        </ContentWrapper>
    );
};

export default Characters;
