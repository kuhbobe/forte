import React, { useState, useEffect } from 'react';
import APIKit from '../spotify';
import './feed.css'
import { IconContext } from 'react-icons';
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

export default function Feed() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await APIKit.get('browse/categories', {
                params: {
                    limit: 50 // You can adjust the limit as needed
                }
            });
            setCategories(response.data.categories.items);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const navigate = useNavigate();
    const playCategory = (categoryId) => {
        navigate(`/category/${categoryId}`);
    }

    return (
        <div className='screen-container'>
            <div className='library-body'>
                {categories && categories.length > 0 ? (
                    categories.map((category) => (
                        <div className="category-card" key={category.id} onClick={() => playCategory(category.id)}>
                            {category.icons && Array.isArray(category.icons) && category.icons.length > 0 && (
                                <img src={category.icons[0]?.url} className="category-image" alt="Category-Art" />
                            )}
                            <p className="category-title">{category.name}</p>
                            <div className="category-fade">
                                <IconContext.Provider value={{ size: "50px", color: "#2d8fcf" }}>
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
