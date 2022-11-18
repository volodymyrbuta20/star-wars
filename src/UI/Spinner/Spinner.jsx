

const Spinner = () => {
  return (
    <div>
        <svg 
            xmlns="http://www.w3.org/2000/svg"
            style= {{margin: "auto", background: "none", display: "block", padding: "40px 0"}}
            width="317px" 
            height="317px" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" r="44" strokeWidth="4" stroke="#ecc217" strokeDasharray="69.11503837897544 69.11503837897544" fill="none" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.6s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
            </circle>
        </svg>
    </div>
  );
}

export default Spinner;