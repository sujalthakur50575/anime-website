import React, { createContext, useContext, useEffect, useState, useReducer, useCallback } from "react";

const GlobalContext = createContext();

// Using Kitsu API v4 edge
const baseUrl = `https://kitsu.io/api/edge`;

// Action types
const LOADING = "LOADING";
const POPULAR_ANIME = "POPULAR_ANIME";
const UPCOMING_ANIME = "UPCOMING_ANIME";
const AIRING_ANIME = "AIRING_ANIME";
const TOP_CHARACTERS = "TOP_CHARACTERS";
const SEARCH_ANIME_RESULTS = "SEARCH_ANIME_RESULTS";
const SEARCH_CHAR_RESULTS = "SEARCH_CHAR_RESULTS";
const CLEAR_SEARCH = "CLEAR_SEARCH";
const SET_ERROR = "SET_ERROR";

// Helper to normalize Kitsu Anime items to clean unified shape
export const normalizeAnime = (item) => {
    if (!item) return null;
    const attr = item.attributes || item;
    const id = item.id || attr.id;
    const rawRating = parseFloat(attr.averageRating);
    const score = !isNaN(rawRating) ? (rawRating / 10).toFixed(1) : null;
    const year = attr.startDate ? attr.startDate.substring(0, 4) : '';
    const statusMap = {
        current: 'Currently Airing',
        finished: 'Finished',
        upcoming: 'Upcoming',
        tba: 'TBA',
        unreleased: 'Unreleased',
    };

    return {
        id: String(id),
        mal_id: String(id), // backwards compatible with routes
        title: attr.canonicalTitle || attr.titles?.en || attr.titles?.en_jp || 'Untitled',
        title_english: attr.titles?.en || attr.canonicalTitle || '',
        title_japanese: attr.titles?.ja_jp || '',
        score,
        averageRating: attr.averageRating,
        rank: attr.ratingRank ? `#${attr.ratingRank}` : null,
        popularity: attr.popularityRank ? `#${attr.popularityRank}` : null,
        status: statusMap[attr.status] || attr.status,
        type: (attr.subtype || attr.showType || 'TV').toUpperCase(),
        year,
        episodes: attr.episodeCount,
        duration: attr.episodeLength ? `${attr.episodeLength} min` : '',
        synopsis: attr.synopsis || attr.description || '',
        poster: attr.posterImage?.large || attr.posterImage?.original || attr.posterImage?.medium || '',
        cover: attr.coverImage?.large || attr.coverImage?.original || '',
        youtubeVideoId: attr.youtubeVideoId,
        trailerUrl: attr.youtubeVideoId ? `https://www.youtube.com/embed/${attr.youtubeVideoId}` : null,
        ratingGuide: attr.ageRatingGuide || attr.ageRating || '',
        startDate: attr.startDate,
        endDate: attr.endDate,
    };
};

// Helper to normalize Kitsu Character items
export const normalizeCharacter = (item, role = 'Main') => {
    if (!item) return null;
    const attr = item.attributes || item;
    const id = item.id || attr.id;
    return {
        id: String(id),
        mal_id: String(id),
        name: attr.canonicalName || attr.name || 'Unknown Character',
        kanji: attr.names?.ja_jp || '',
        otherNames: attr.otherNames || [],
        description: attr.description || '',
        image: attr.image?.original || attr.image?.large || attr.image?.medium || '',
        role: role || attr.role || 'Main',
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true, error: null };
        case POPULAR_ANIME:
            return { ...state, popular: action.payload || [], loading: false, error: null };
        case UPCOMING_ANIME:
            return { ...state, upcoming: action.payload || [], loading: false, error: null };
        case AIRING_ANIME:
            return { ...state, airing: action.payload || [], loading: false, error: null };
        case TOP_CHARACTERS:
            return { ...state, characters: action.payload || [], loading: false, error: null };
        case SEARCH_ANIME_RESULTS:
            return {
                ...state,
                searchResults: action.payload || [],
                searchType: 'anime',
                isSearch: true,
                loading: false,
                error: null,
            };
        case SEARCH_CHAR_RESULTS:
            return {
                ...state,
                searchCharResults: action.payload || [],
                searchType: 'character',
                isSearch: true,
                loading: false,
                error: null,
            };
        case CLEAR_SEARCH:
            return {
                ...state,
                searchResults: [],
                searchCharResults: [],
                isSearch: false,
                loading: false,
                error: null,
            };
        case SET_ERROR:
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

const safeFetch = async (url) => {
    const res = await fetch(url, {
        headers: {
            'Accept': 'application/vnd.api+json',
            'Content-Type': 'application/vnd.api+json',
        },
    });
    if (!res.ok) {
        throw new Error(`Kitsu API error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
};

export const GlobalContextProvider = ({ children }) => {
    const initialState = {
        popular: [],
        upcoming: [],
        airing: [],
        characters: [],
        searchResults: [],
        searchCharResults: [],
        searchType: 'anime',
        isSearch: false,
        loading: false,
        error: null,
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [search, setSearch] = useState("");
    const [searchCategory, setSearchCategory] = useState("anime"); // 'anime' | 'character'

    // Fetch popular anime from Kitsu
    const getPopularAnime = useCallback(async () => {
        dispatch({ type: LOADING });
        try {
            const data = await safeFetch(`${baseUrl}/anime?sort=-userCount&page[limit]=20`);
            const normalized = (data.data || []).map(normalizeAnime);
            dispatch({ type: POPULAR_ANIME, payload: normalized });
        } catch (err) {
            console.error("Failed to fetch popular anime:", err);
            dispatch({ type: SET_ERROR, payload: "Unable to load popular anime from Kitsu API." });
        }
    }, []);

    // Fetch upcoming anime from Kitsu
    const getUpcomingAnime = useCallback(async () => {
        dispatch({ type: LOADING });
        try {
            const data = await safeFetch(`${baseUrl}/anime?filter[status]=upcoming&sort=-userCount&page[limit]=20`);
            const normalized = (data.data || []).map(normalizeAnime);
            dispatch({ type: UPCOMING_ANIME, payload: normalized });
        } catch (err) {
            console.error("Failed to fetch upcoming anime:", err);
            dispatch({ type: SET_ERROR, payload: "Unable to load upcoming anime from Kitsu API." });
        }
    }, []);

    // Fetch airing anime from Kitsu
    const getAiringAnime = useCallback(async () => {
        dispatch({ type: LOADING });
        try {
            const data = await safeFetch(`${baseUrl}/anime?filter[status]=current&sort=-userCount&page[limit]=20`);
            const normalized = (data.data || []).map(normalizeAnime);
            dispatch({ type: AIRING_ANIME, payload: normalized });
        } catch (err) {
            console.error("Failed to fetch airing anime:", err);
            dispatch({ type: SET_ERROR, payload: "Unable to load airing anime from Kitsu API." });
        }
    }, []);

    // Fetch top characters from Kitsu
    const getTopCharacters = useCallback(async () => {
        dispatch({ type: LOADING });
        try {
            const data = await safeFetch(`${baseUrl}/characters?page[limit]=20`);
            const normalized = (data.data || []).map((c) => normalizeCharacter(c));
            dispatch({ type: TOP_CHARACTERS, payload: normalized });
        } catch (err) {
            console.error("Failed to fetch top characters:", err);
            dispatch({ type: SET_ERROR, payload: "Unable to load characters from Kitsu API." });
        }
    }, []);

    // Search anime from Kitsu
    const searchAnime = useCallback(async (query) => {
        if (!query.trim()) return;
        dispatch({ type: LOADING });
        try {
            const data = await safeFetch(`${baseUrl}/anime?filter[text]=${encodeURIComponent(query)}&page[limit]=20`);
            const normalized = (data.data || []).map(normalizeAnime);
            dispatch({ type: SEARCH_ANIME_RESULTS, payload: normalized });
        } catch (err) {
            console.error("Failed to search anime:", err);
            dispatch({ type: SET_ERROR, payload: "Anime search failed. Please try again." });
        }
    }, []);

    // Search characters from Kitsu
    const searchCharacters = useCallback(async (query) => {
        if (!query.trim()) return;
        dispatch({ type: LOADING });
        try {
            const data = await safeFetch(`${baseUrl}/characters?filter[name]=${encodeURIComponent(query)}&page[limit]=20`);
            const normalized = (data.data || []).map((c) => normalizeCharacter(c));
            dispatch({ type: SEARCH_CHAR_RESULTS, payload: normalized });
        } catch (err) {
            console.error("Failed to search characters:", err);
            dispatch({ type: SET_ERROR, payload: "Character search failed. Please try again." });
        }
    }, []);

    const clearSearch = useCallback(() => {
        setSearch("");
        dispatch({ type: CLEAR_SEARCH });
    }, []);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        if (val === "" && state.isSearch) {
            dispatch({ type: CLEAR_SEARCH });
        }
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        const trimmed = search.trim();
        if (trimmed) {
            if (searchCategory === 'character') {
                searchCharacters(trimmed);
            } else {
                searchAnime(trimmed);
            }
        } else {
            clearSearch();
        }
    };

    // Initial load
    useEffect(() => {
        getPopularAnime();
    }, [getPopularAnime]);

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                search,
                setSearch,
                searchCategory,
                setSearchCategory,
                handleSearchChange,
                handleSubmitSearch,
                searchAnime,
                searchCharacters,
                clearSearch,
                getPopularAnime,
                getUpcomingAnime,
                getAiringAnime,
                getTopCharacters,
                baseUrl,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
