import Up from "/BNM_Metric_Up.svg";
import Down from "/BNM_Metric_Down.svg";

interface MetricCardProps {
  title: string;
  value: string;
  percentile: string;
  change: string;
}

function formatPercentile(percentile: string): string {
  return percentile.replace(/th$/, "%");
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  percentile,
  change,
}) => {
  const isPositive = parseFloat(change) > 0;
  const formattedPercentile = formatPercentile(percentile);

  return (
    <div className="metric-card">
      <div className="metric-header">{title}</div>
      <div className="metric-content">
        <span className="metric-value">{value}</span>
        <span className="slash">|</span>
        <span
          className={`metric-percentile ${
            isPositive ? "positive" : "negative"
          }`}
        >
          {formattedPercentile}
          <div className="metric-arrow">
            {isPositive ? (
              <img src={Up} alt="Up" className="arrow" />
            ) : (
              <img src={Down} alt="Down" className="arrow" />
            )}

            <span className="pctl">pctl</span>
          </div>
        </span>
      </div>
      <div className="metric-change">
        <span>Your performance from last week:</span>
        <span className={isPositive ? "positive" : "negative"}>{change}</span>
      </div>
    </div>
  );
};

export default MetricCard;
