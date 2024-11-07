function calculateIncome() {
    const investmentAmount = parseFloat(document.getElementById("investment").value);
    const incomeStream = document.getElementById("incomeStream").value;
    const involvementLevel = document.getElementById("involvement").value;
    const timeframe = parseInt(document.getElementById("timeframe").value);

    // Define ROI based on the income stream
    let roi = 0;
    if (incomeStream === "rentalProperties") {
        roi = 0.05; // 5% ROI
    } else if (incomeStream === "stockMarket") {
        roi = 0.07; // 7% ROI
    } else if (incomeStream === "onlineBusinesses") {
        roi = 0.10; // 10% ROI
    }

    // Define the multiplier based on the involvement level
    let involvementMultiplier = 1;
    if (involvementLevel === "handsOff") {
        involvementMultiplier = 1;
    } else if (involvementLevel === "moderate") {
        involvementMultiplier = 1.2; // Higher return for moderate involvement
    } else if (involvementLevel === "active") {
        involvementMultiplier = 1.5; // Higher return for active involvement
    }

    const adjustedRoi = roi * involvementMultiplier;

    // Calculate the projected investment growth
    let years = timeframe;
    let months = 0;
    let labels = [];
    let data = [];

    if (years <= 5) {
        // For up to 5 years, show months
        months = years * 12;
        for (let i = 1; i <= months; i++) {
            const growth = investmentAmount * Math.pow(1 + adjustedRoi / 12, i);
            labels.push(i);
            data.push(growth);
        }
    } else {
        // For over 5 years, show years
        for (let i = 1; i <= years; i++) {
            const growth = investmentAmount * Math.pow(1 + adjustedRoi, i);
            labels.push(i);
            data.push(growth);
        }
    }

    // Format the result with spaces
    const formattedGrowth = formatNumber(data[data.length - 1]);

    // Display the results
    document.getElementById("result").innerHTML = `Your investment will grow to: $${formattedGrowth}`;

    // Create the chart
    const ctx = document.getElementById("incomeChart").getContext("2d");
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Projected Investment Growth",
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                data: data,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: years <= 5 ? 'Months' : 'Years'
                    }
                },
                y: {
                    ticks: {
                        callback: function(value) {
                            return "$" + value.toLocaleString(); // Adds thousand separators
                        }
                    }
                }
            }
        }
    });
}

// Function to format numbers with spaces (e.g., 1,000,000 => 1 000 000)
function formatNumber(number) {
    return number.toLocaleString('en-US').replace(/,/g, ' ');
}
