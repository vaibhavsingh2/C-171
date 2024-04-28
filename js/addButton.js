AFRAME.registerComponent("create-buttons",{
    init: function(){
        //Ordering (Order Now)
         var button1=document.createElement("button");
         button1.innerHTML="RATE US";
         button1.setAttribute("id","order-button");
         button1.setAttribute("class","btn btn-warning");

         //Order Summary
         var button2=document.createElement("button");
         button2.innerHTML="ORDER SUMMARY";
         button2.setAttribute("id","order-summary-button");
         button2.setAttribute("class","btn btn-warning");

        //Append 
        var buttonDiv=document.createElement("button-div");
        buttonDiv.appendChild(button1);
        buttonDiv.appendChild(button2);

    }
})