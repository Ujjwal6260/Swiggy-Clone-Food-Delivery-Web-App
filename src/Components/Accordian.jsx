import { useState } from "react";
import vegetarian from "../assets/vegetarian.svg";
import non_vegetarian from "../assets/non_vegetarian.svg";
import rating from "../assets/rating.svg";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { addToCart } from "../Utilis/CartSlice";

function Accordian({ title, cards, cdn, id }) {

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();

    const existingResId = useSelector((store) => store.cart.id);

    const handleAddToCart = (foodItem) => {

        if (existingResId && existingResId !== id) {

            toast.error("Different restaurant item not allowed");

            return;
        }

        dispatch(
            addToCart({
                id: id,

                foodItem: {
                    itemId: foodItem.id,
                    name: foodItem.name,
                    price: foodItem.defaultPrice || foodItem.price,
                    imageId: foodItem.imageId,
                },
            })
        );

        toast.success("Item added to cart");
    };

    return (
        <>
            <div className="my-10">

                {/* Accordion Header */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex justify-between items-center cursor-pointer"
                >
                    <h2 className="font-extrabold text-lg">
                        {title} ({cards.length})
                    </h2>

                    <i
                        className={
                            "fa-solid " +
                            (isOpen ? "fa-chevron-up" : "fa-chevron-down")
                        }
                    ></i>
                </div>

                {/* Accordion Body */}
                {isOpen && (
                    <div className="mt-5">

                        {cards.map((item) => {

                            const foodItem = item.card.info;

                            const {
                                name,
                                defaultPrice,
                                price,
                                ratings,
                                imageId,
                                description,
                                itemAttribute,
                            } = foodItem;

                            return (
                                <article
                                    key={foodItem.id}
                                    className="flex justify-between py-6 border-b border-gray-200"
                                >

                                    {/* Left Content */}
                                    <div className="w-[70%]">

                                        <img
                                            src={
                                                itemAttribute?.vegClassifier === "VEG"
                                                    ? vegetarian
                                                    : non_vegetarian
                                            }
                                            alt="veg-icon"
                                            className="w-4 h-4"
                                        />

                                        <h2 className="text-[#02060CBF] text-[18px] font-bold mt-2">
                                            {name}
                                        </h2>

                                        <p className="font-semibold mt-1">
                                            ₹{(defaultPrice || price) / 100}
                                        </p>

                                        <p className="flex items-center gap-2 mt-1">

                                            <span className="flex items-center gap-1 text-green-700 font-semibold">

                                                <img
                                                    src={rating}
                                                    alt="rating"
                                                    className="w-4 h-4"
                                                />

                                                {ratings?.aggregatedRating?.rating}

                                            </span>

                                            <span className="text-gray-500">

                                                (
                                                {
                                                    ratings?.aggregatedRating
                                                        ?.ratingCountV2
                                                }
                                                )

                                            </span>

                                        </p>

                                        <p className="text-gray-500 mt-3 text-sm leading-6">

                                            {description
                                                ? description.length > 130
                                                    ? description.slice(0, 130) + "..."
                                                    : description
                                                : ""}

                                        </p>

                                    </div>

                                    {/* Right Image */}
                                    <div className="relative w-[156px] h-[144px] flex justify-center">

                                        <img
                                            src={cdn + imageId}
                                            alt="food-item"
                                            className="h-full w-full object-cover rounded-2xl"
                                        />

                                        <button
                                            onClick={() => handleAddToCart(foodItem)}
                                            className="
                                                cursor-pointer
                                                absolute
                                                -bottom-4
                                                bg-white
                                                text-[#1BA672]
                                                font-bold
                                                text-lg
                                                px-8
                                                py-1.5
                                                rounded-xl
                                                border
                                                border-gray-200
                                                shadow-md
                                                hover:bg-gray-50
                                                active:scale-95
                                                transition-all
                                            "
                                        >
                                            ADD
                                        </button>

                                    </div>

                                </article>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="h-5 bg-gray-100"></div>
        </>
    );
}

export default Accordian;