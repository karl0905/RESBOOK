"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CategoryCard } from './CategoryCard';
import { GiHamburger, GiSandwich, GiSteak, GiSushis } from 'react-icons/gi';
import { FaPizzaSlice } from 'react-icons/fa';

export function CategorySwiper() {
    const categories = [
        { title: "Burger", subtitle: "74 steder", Icon: <GiHamburger /> },
        { title: "Pizza", subtitle: "95 steder", Icon: <FaPizzaSlice /> },
        { title: "Sandwich", subtitle: "49 steder", Icon: <GiSandwich /> },
        { title: "Meat", subtitle: "16 steder", Icon: <GiSteak /> },
        { title: "Sushi", subtitle: "34 steder", Icon: <GiSushis /> },
    ];
    return (
        <article className='p-4'>
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={8}
                slidesPerView={4}
                pagination={{ clickable: true }}
                className="custom-swiper"
                breakpoints={{
                    320: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {categories.map((category, index) => (
                    <SwiperSlide key={index}>
                        <CategoryCard
                            Icon={category.Icon}
                            title={category.title}
                            subtitle={category.subtitle}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </article>
    );
}