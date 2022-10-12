import "./RecommendationCard.css";

function RecommendationCard(props) {
  return (
    <div className="recommendation-card" key={props.diet.name}>
      <h4 className="recommendation-title">{props.diet.name}</h4>
      <div className="recommendations-value-flex">
        <p className="recommendations-sub">Calories (Kcal):</p>
        <p className="recommendations-value">{props.diet.calorie}</p>
      </div>
      <div className="recommendations-value-flex">
        <p className="recommendations-sub">Carbs (grams):</p>
        <p className="recommendations-value">{props.diet.carbIntake}</p>
      </div>
      <div className="recommendations-value-flex">
        <p className="recommendations-sub">Fats (grams):</p>
        <p className="recommendations-value">{props.diet.fatsIntake}</p>
      </div>
      <div className="recommendations-value-flex">
        <p className="recommendations-sub">Proteins (grams):</p>
        <p className="recommendations-value">{props.diet.proteinsIntake}</p>
      </div>
    </div>
  );
}

export default RecommendationCard;
