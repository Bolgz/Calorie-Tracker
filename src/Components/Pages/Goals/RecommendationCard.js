import "./RecommendationCard.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function RecommendationCard(props) {
  return (
    <div className="recommendation-card" key={props.diet.name}>
      <h3 className="recommendation-title">{props.diet.name}</h3>
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

      <Link to="/">
        <Button
          variant="primary"
          onClick={() => props.activateDiet(props.diet.name)}
          className="recommendation-activate-button"
        >
          Activate Diet
        </Button>
      </Link>
    </div>
  );
}

export default RecommendationCard;
