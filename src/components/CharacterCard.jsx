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
        border-color: rgba(236, 72, 153, 0.5);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.4), 0 0 20px rgba(236, 72, 153, 0.25);

        .char-img {
            transform: scale(1.05);
        }

        .name {
            color: #ec4899;
        }
    }

    .img-wrap {
        position: relative;
        width: 100%;
        padding-top: 135%;
        overflow: hidden;
        background: #0f172a;
    }

    .char-img {
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
        height: 50%;
        background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.3) 60%, transparent 100%);
        pointer-events: none;
    }

    .info {
        padding: 12px 14px 14px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
        background: var(--bg-card, #151f32);
    }

    .name {
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--text-primary, #f8fafc);
        line-height: 1.3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.2s ease;
    }

    .kanji {
        font-size: 0.8rem;
        color: var(--text-muted, #64748b);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .other-names {
        font-size: 0.75rem;
        color: #a855f7;
        margin-top: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const CharacterCard = ({ character }) => {
    if (!character) return null;

    const id = character.id || character.mal_id;
    const img =
        character.image ||
        character.attributes?.image?.original ||
        character.attributes?.image?.large ||
        character.attributes?.image?.medium ||
        '';

    const name =
        character.name ||
        character.attributes?.canonicalName ||
        character.attributes?.name ||
        'Unknown Character';

    const kanji = character.kanji || character.attributes?.names?.ja_jp || '';
    const otherNames =
        character.otherNames && character.otherNames.length > 0
            ? character.otherNames.join(', ')
            : character.attributes?.otherNames?.join(', ') || '';

    return (
        <CardContainer to={`/character/${id}`}>
            <div className="img-wrap">
                <img className="char-img" src={img} alt={name} loading="lazy" />
                <div className="gradient-overlay" />
            </div>

            <div className="info">
                <h4 className="name" title={name}>{name}</h4>
                {kanji && <span className="kanji">{kanji}</span>}
                {otherNames && <span className="other-names" title={otherNames}>aka {otherNames}</span>}
            </div>
        </CardContainer>
    );
};

export default CharacterCard;
