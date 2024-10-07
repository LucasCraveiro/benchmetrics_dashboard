import { useState, useEffect } from "react";
import MetricCard from "./components/MetricCard";
import Logo from "/BNM_Logo_White.png";
import "./App.css";

export interface Metric {
  count: string;
  change: string;
  percentile: string;
}

export interface MetricsData {
  [key: string]: Metric;
}

export interface Tab {
  id: string;
  label: string;
}

export interface MetricDefinition {
  id: string;
  label: string;
}

const App: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricsData>({});
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    fetch("http://localhost:3001/api/metrics")
      .then((response) => response.json())
      .then((data: MetricsData) => setMetrics(data));
  }, []);

  const tabs: Tab[] = [
    { id: "overview", label: "OVERVIEW" },
    { id: "traffic", label: "TRAFFIC" },
    { id: "performance", label: "SITE PERFORMANCE" },
  ];

  const metricsData: { [key: string]: MetricDefinition[] } = {
    overview: [
      { id: "Sessions (Site Traffic)", label: "SESSIONS (SITE TRAFFIC)" },
      { id: "Avg. Pages Viewed", label: "AVG. PAGES VIEWED" },
      { id: "Avg. Time on Site", label: "AVG. TIME ON SITE" },
      { id: "Bounce Rate", label: "BOUNCE RATE" },
    ],
    traffic: [
      { id: "Direct Traffic", label: "DIRECT TRAFFIC" },
      { id: "Organic Search", label: "ORGANIC SEARCH" },
      { id: "Social Traffic", label: "SOCIAL TRAFFIC" },
      { id: "Referral Traffic", label: "REFERRAL TRAFFIC" },
    ],
    performance: [
      { id: "Users", label: "USERS" },
      { id: "Two or More Sessions", label: "TWO OR MORE SESSIONS" },
      { id: "Internal Page Entries", label: "INTERNAL PAGE ENTRIES" },
      { id: "Sessions > 1 Min.", label: "SESSIONS > 1 MIN." },
    ],
  };

  return (
    <div className="app">
      <header>
        <img src={Logo} alt="Benchmetrics" className="logo" />
      </header>
      <nav>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <main>
        {metricsData[activeTab]?.map((metric) => (
          <MetricCard
            key={metric.id}
            title={metric.label}
            value={metrics[metric.id]?.count || ""}
            percentile={metrics[metric.id]?.percentile || ""}
            change={metrics[metric.id]?.change || ""}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
