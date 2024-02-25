function Nutrition({label, quantity, unit}) {
    return (
        <div className="infoContainer">
            <p className="parAnalysis"><span>{label}</span> - {quantity.toFixed(3)} - {unit}</p>
        </div>
    )
}

export default Nutrition;