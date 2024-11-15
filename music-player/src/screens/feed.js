import React, { useState, useEffect } from 'react';
import APIKit from '../spotify';
import './feed.css';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export default function Feed() {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories) {
            const filtered = categories.filter((category) =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCategories(filtered);
        }
    }, [searchQuery, categories]);

    const fetchCategories = async () => {
        try {
            const response = await APIKit.get('browse/categories', {
                params: {
                    limit: 50, // You can adjust the limit as needed
                },
            });
            setCategories(response.data.categories.items);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const navigate = useNavigate();
    const playCategory = (categoryId) => {
        navigate('/player', { state: { id: categoryId } });
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="screen-container">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Let's try something new..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="library-body">
                {filteredCategories && filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                        <div className="category-card" key={category.id} onClick={() => playCategory(category.id)}>
                            {category.icons && Array.isArray(category.icons) && category.icons.length > 0 && (
                                <img src={category.icons[0]?.url} className="category-image" alt="Category-Art" />
                            )}
                            <p className="category-title">{category.name}</p>
                            <div className="category-fade">
                                <IconContext.Provider value={{ size: '50px', color: '#2d8fcf' }}>
                                    <AiFillPlayCircle />
                                </IconContext.Provider>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="loading-text">Loading feed...</p>
                )}
            </div>
        </div>
    );
}
