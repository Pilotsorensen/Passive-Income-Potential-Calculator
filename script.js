function calculateIncome() {
    const investment = parseFloat(document.getElementById('investment').value);
    const incomeType = document.getElementById('income-type').value;
    const involvement = document.getElementById('involvement').value;

    if (isNaN(investment) || investment <= 0) {
        alert("Please enter a valid investment amount.");
        return;
    }

    let rateOfReturn;

    switch (incomeType) {
        case 'realEstate':
            rateOfReturn = 0.08; // 8% annual return for real estate
            break;
        case 'dividends':
            rateOfReturn = 0.05; // 5% annual return for dividend stocks
            break;
        case 'digitalProducts':
            rateOfReturn = 0.15; // 15% annual return for digital products
            break;
        case 'affiliateMarketing':
            rateOfReturn = 0.10; // 10% annual return for affiliate marketing
            break;
    }

    switch (involvement) {
        case 'high':
            rateOfReturn *= 1.1;
            break;
        case 'medium':
            rateOfReturn *= 1.0;
            break;
        case 'low':
            rateOfReturn *= 0.9;
            break;
    }

    const estimatedIncome = investment * rateOfReturn;
    document.getElementById('income-result').innerText = `$${estimatedIncome.toFixed(2)} per year`;

    // Provide actionable tips based on selected income stream
    provideTips(incomeType);
}

function provideTips(incomeType) {
    let tips;
    switch (incomeType) {
        case 'realEstate':
            tips = "Consider investing in REITs if you want lower involvement in real estate.";
            break;
        case 'dividends':
            tips = "Focus on dividend aristocrats with long histories of steady payouts.";
            break;
        case 'digitalProducts':
            tips = "Start with a simple product, like an ebook, and expand as you gain experience.";
            break;
        case 'affiliateMarketing':
            tips = "Pick a niche you're familiar with to promote products authentically.";
            break;
    }
    alert(tips);
}

function subscribe() {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Please enter a valid email address.");
        return;
    }
    alert(`Thank you for subscribing! Check your inbox for the PDF download.`);
}
