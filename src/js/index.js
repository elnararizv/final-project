document.addEventListener("DOMContentLoaded", function() {
    const deliveryText = document.querySelector(".delivery p");
    const detailsBtn = document.querySelector(".moreDetails");
//    console.log(deliveryText.textContent.substring(0,559));
    const shortText = deliveryText.textContent.substring(0, 559);
    const fullText = deliveryText.textContent;

    deliveryText.textContent = shortText;
    detailsBtn.textContent = "More Details";
    
    let isLong = true;
    detailsBtn.addEventListener("click", function() {
        if (isLong) {
            deliveryText.textContent = fullText;
            detailsBtn.textContent = "Hide Details";
        } else {
            deliveryText.textContent = shortText;
            detailsBtn.textContent = "More Details";
        }
        isLong = !isLong;
    });
});




