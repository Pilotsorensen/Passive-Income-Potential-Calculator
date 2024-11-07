// Format numbers with spaces
function formatNumber(number) {
    return number.toLocaleString('en-US'); // This adds the space between thousands
}

// Function to calculate income growth
function calculateIncome() {
    // Get values from the form
    const investment = parseFloat(document.getElementById('investment').value);
    const incomeStream = document.getElementById('incomeStream').value;
    const involvement = document.getElementById('involvement').value;
    const timeframe = parseInt(document.getElementById('timeframe').value);

    if (isNaN(investment) || investment <= 0) {
        alert('Please enter a valid initial investment');
        return;
    }

    // Define ROI based on the income stream
    let roi = 0;
    switch (incomeStream) {
        case 'rentalProperties':
            roi = 0.05;
            break;
        case 'stockMarket':
            roi = 0.07;
            break;
        case 'onlineBusinesses':
            roi = 0.10;
            break;
    }

    // Define level of involvement (this will affect the growth rate)
    let involvementMultiplier = 1;
    switch (involvement) {
        case 'handsOff':
            involvementMultiplier = 1;
            break;
        case 'moderate':
            involvementMultiplier = 1.1;
            break;
        case 'active':
            involvementMultiplier = 1.2;
            break;
    }

    // Calculate growth over time
    const growthRate = roi * involvementMultiplier;
    const results = [];
    const labels = [];

    // Adjust for months vs years
    let totalPeriods = 0;
    let step = 1;

    if (timeframe <= 5) {
        totalPeriods = timeframe * 12; // Convert to months if less than or equal to 5 years
        step = 1; // 1 month per step
    } else {
        totalPeriods = timeframe; // Years
        step = 1; // 1 year per step
    }

    // Generate data points for each period
    for (let i = 1; i <= totalPeriods; i++) {
        let value = investment * Math.pow(1 + growthRate, i / (step === 1 ? 12 : 1));
        results.push(value);
        labels.push(step === 1 ? `${i}m` : `${i}y`); // Show 'm' for months, 'y' for years
    }

    // Update the results text
    document.getElementById('result').innerHTML = `Your investment will grow to $${formatNumber(results[results.length - 1].toFixed(2))}`;

    // Update the chart
    const ctx = document.getElementById('incomeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Investment Growth',
                data: results,
                borderColor: '#4CAF50',
                borderWidth: 2,
                fill: false,
            }],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 15
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value ($)'
                    }
                }
            }
        }
    });
}
