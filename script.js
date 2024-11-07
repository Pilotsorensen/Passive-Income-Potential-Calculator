// Helper function to format numbers with thousand separators
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Main calculation and graph update function
function calculateIncome() {
    const investment = parseFloat(document.getElementById("investment").value);
    const incomeStream = document.getElementById("incomeStream").value;
    const involvement = document.getElementById("involvement").value;
    const timeframe = parseInt(document.getElementById("timeframe").value);

    if (isNaN(investment) || investment <= 0) {
        alert("Please enter a valid investment amount.");
        return;
    }

    // Set the ROI based on income stream
    let roi;
    switch (incomeStream) {
        case "rentalProperties":
            roi = 0.05;
            break;
        case "stockMarket":
            roi = 0.07;
            break;
        case "onlineBusinesses":
            roi = 0.10;
            break;
        default:
            roi = 0.05;
    }

    // Modify ROI based on involvement
    if (involvement === "handsOff") roi *= 0.9;
    if (involvement === "active") roi *= 1.1;

    // Prepare data arrays for the chart
    const labels = [];
    const data = [];
    let accumulated = investment;

    // Fill data based on timeframe and interval (months for <5 years, years otherwise)
    if (timeframe < 5) {
        for (let month = 1; month <= timeframe * 12; month++) {
            accumulated *= (1 + roi / 12);  // Monthly compounding
            labels.push(`Month ${month}`);
            data.push(accumulated);
        }
    } else {
        for (let year = 1; year <= timeframe; year++) {
            accumulated *= (1 + roi);  // Yearly compounding
            labels.push(`Year ${year}`);
            data.push(accumulated);
        }
    }

    // Update result display with thousand-separated formatting
    document.getElementById("result").innerHTML = `Your investment will grow to: $${formatNumber(accumulated.toFixed(2))}`;

    // Update or create the chart
    if (window.incomeChart) {
        window.incomeChart.destroy(); // Destroy previous chart instance
    }

    const ctx = document.getElementById("incomeChart").getContext("2d");
    window.incomeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Projected Passive Income Growth',
                data: data,
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: '#4CAF50',
                borderWidth: 2,
                pointRadius: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: timeframe < 5 ? 'Months' : 'Years'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Investment Value ($)'
                    },
                    beginAtZero: false
                }
            }
        }
    });
}
