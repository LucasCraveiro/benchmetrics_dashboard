const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/metrics", (req, res) => {
  const results = [];
  fs.createReadStream("./backend/data.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      const formattedData = results.reduce((acc, row) => {
        if (row["Metric Name"]) {
          acc[row["Metric Name"]] = {
            count: row["Metric Count"],
            change: row["Week-Over-Week Change"],
            percentile: row["Percentile"],
          };
        }
        return acc;
      }, {});

      res.json(formattedData);
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
