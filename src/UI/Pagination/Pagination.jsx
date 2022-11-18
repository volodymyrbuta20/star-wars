import { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import "./Pagination.scss";

const Pagination = ({pages, changePage}) => {
    
    const totalPages = [];
    for (let i = 1; i <= pages; i++) {
        totalPages.push(i)
    }

    const [currentButton, setCurrentButton] = useState(1);
    const [visibleButtons, setVisibleButtons] = useState([]);

    useEffect(() => {
        let tempTotalPages = [...totalPages];
        let dotsInitial = '...';
        let dotsLeft = '...';
        let dotsRight = '...';

        if (totalPages.length < 3) {
            tempTotalPages = totalPages
        }

        else if (currentButton >= 1 && currentButton <= 2) {
            tempTotalPages = [1, 2, dotsInitial, totalPages.length]
        }

        else if (currentButton === 2) {
            const sliced = totalPages.slice(0, 2)
            tempTotalPages = [...sliced, dotsRight, totalPages.length]
        }

        else if (currentButton > 2 && currentButton < totalPages.length - 1) {
            const sliced = totalPages.slice(currentButton - 1, currentButton)
            tempTotalPages = ([1, dotsLeft, ...sliced, dotsRight, totalPages.length])
        }

        else if (currentButton > totalPages.length - 2) {
            const sliced = totalPages.slice(totalPages.length - 2)
            tempTotalPages = ([1, dotsLeft, ...sliced])
        }

        setVisibleButtons(tempTotalPages)
        changePage(currentButton)
    }, [currentButton])

    return (
        <div className="pagination">
            <button 
                className="pagination__btn" 
                onClick={() => setCurrentButton(prev => prev === 1 ? prev : prev - 1)}
                disabled={currentButton === 1 ? true : false}>
                    <MdArrowBackIosNew/>
            </button>
            {visibleButtons.map((page, index) => (
                <button 
                    onClick={() => setCurrentButton(page)} 
                    className={currentButton === page ? 'paginationActive' : ''} 
                    key={index}
                    disabled={page === '...' ? true : false}>
                        {page}
                </button>
            ))}
            <button 
                className="pagination__btn" 
                onClick={() => setCurrentButton(prev => prev === pages ? prev : prev + 1)}
                disabled={currentButton === totalPages.length ? true : false}>
                    <MdArrowForwardIos/>
            </button>
        </div>
    )
}

export default Pagination;