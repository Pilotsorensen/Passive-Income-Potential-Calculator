function calculateIncome() {
    const investmentInput = document.getElementById("investment").value;
    const incomeStreamSelect = document.getElementById("incomeStream").value;
    const involvementSelect = document.getElementById("involvement").value;
    const timeframeInput = parseInt(document.getElementById("timeframe").value);

    let roi;
    if (incomeStreamSelect === "rentalProperties") roi = 0.05;
    else if (incomeStreamSelect === "stockMarket") roi = 0.07;
    else if (incomeStreamSelect === "onlineBusinesses") roi = 0.10;

    const initialInvestment = parseFloat(investmentInput);
    const growthData = [];
    let amount = initialInvestment;

    if (timeframeInput <= 5) {
        // Monthly compounding for timeframes of 5 years or less
        for (let month = 1; month <= timeframeInput * 12; month++) {
            amount += amount * (roi / 12); // Monthly growth
            growthData.push(amount.toFixed(2));
        }
    } else {
        // Yearly compounding for timeframes over 5 years
        for (let year = 1; year <= timeframeInput; year++) {
            amount += amount * roi; // Yearly growth
            growthData.push(amount.toFixed(2));
        }
    }

    const formattedFinalAmount = amount.toLocaleString("en-US", { maximumFractionDigits: 2 });
    document.getElementById("result").textContent = `Your investment will grow to $${formattedFinalAmount}`;

    displayChart(growthData, timeframeInput);
}

function displayChart(growthData, timeframeInput) {
    const ctx = document.getElementById("incomeChart").getContext("2d");

    const labels = [];
    if (timeframeInput <= 5) {
        // Monthly labels for shorter timeframes
        for (let i = 1; i <= timeframeInput * 12; i++) {
            labels.push(`Month ${i}`);
        }
    } else {
        // Yearly labels for longer timeframes
        for (let i = 1; i <= timeframeInput; i++) {
            labels.push(`Year ${i}`);
        }
    }

    // Destroy existing chart if it exists
    if (window.incomeChart) {
        window.incomeChart.destroy();
    }

    // Create a new chart
    window.incomeChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Investment Growth Over Time",
                data: growthData,
                borderColor: "#4CAF50",
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: timeframeInput <= 5 ? "Months" : "Years"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Investment Value ($)"
                    }
                }
            }
        }
    });
}
