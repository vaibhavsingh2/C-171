AFRAME.registerComponent("createmarkers", {
    init: async function() {
      var mainScene = document.querySelector("#main-scene");
      var toys = await this.getAllToys();
      toys.map(toy => {
        var marker = document.createElement("a-marker");
        marker.setAttribute("id", toy.id);
        marker.setAttribute("type", pattern);
        marker.setAttribute("url", toy.marker_pattern_url);
        marker.setAttribute("cursor",{
            rayOrign:"mouse"
        });
        marker.setAttribute("markerhandler",{})
        mainScene.appendChild(marker);
        
        if(!toy.is_out_of_stock){
        var model = document.createElement("a-entity");
        model.setAttribute("id", `model-${toy.id}`);
        model.setAttribute("position", toy.model_geometry.position);
        model.setAttribute("rotation", toy.model_geometry.rotation);
        model.setAttribute("scale", toy.model_geometry.scale);
        model.setAttribute("gltf-model", `url(${toy.model_url})`);
        model.setAttribute("gesture-handler", {});
        model.setAttribute("animation-mixer", {});
        marker.appendChild(model);

        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${toy.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("material",{
            color:"yellow"  
        })
        mainPlane.setAttribute("width", 2.3);
        mainPlane.setAttribute("height", 2.6);
        marker.appendChild(mainPlane);

        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${toy.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.69);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#F0C30F" });
        mainPlane.appendChild(titlePlane);
  
  // toy title background plane
  var titlePlane = document.createElement("a-plane");
  titlePlane.setAttribute("id", `title-plane-${toy.id}`);
  titlePlane.setAttribute("position", { x: 0, y: 1.1, z: 0.1 });
  titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
  titlePlane.setAttribute("width", 2.31);
  titlePlane.setAttribute("height", 0.4);
  titlePlane.setAttribute("material", { color: "#f14668" });
  mainPlane.appendChild(titlePlane);

  // Toy title
  var toyTitle = document.createElement("a-entity");
  toyTitle.setAttribute("id", `toy-title-${toy.id}`);
  toyTitle.setAttribute("position", { x: 1.3, y: 0, z: 0.1 });
  toyTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
  toyTitle.setAttribute("text", {
    font: "aileronsemibold",
    color: "#290149",
    width: 4.5,
    height: 3,
    align: "left",
    value: toy.toy_name.toUpperCase()
  });
  titlePlane.appendChild(toyTitle);


  var price = document.createElement("a-entity");
  price.setAttribute("id",`price-$(toy.id)`)
  price.setAttribute("position",{x:-0.65,y:0.75,z:0.1})
  price.setAttribute("rotation",{x:0,y:0,z:0})
  price.setAttribute("text", {
    font: "aileronsemibold",
    color: "#290149",
    width: 5,
    align: "center",
    value: `$${toy.price}`
  });

  mainPlane.appendChild(price)
  // description List
  var description = document.createElement("a-entity");
  description.setAttribute("id", `description-${toy.id}`);
  description.setAttribute("position", { x: 0.04, y: 0, z: 0.1 });
  description.setAttribute("rotation", { x: 0, y: 0, z: 0 });
  description.setAttribute("text", {
    font: "dejavu",
    color: "#6b011f",
    width: 2,
    height: 5,
    letterSpacing: 2,
    lineHeight: 50,
    align: "left",
    value: `${toy.description}`
  });
  mainPlane.appendChild(description);

  var age = document.createElement("a-entity");
  age.setAttribute("id", `age-${toy.id}`);
  age.setAttribute("position", { x: -0.75, y: -0.8, z: 0.1 });
  age.setAttribute("rotation", { x: 0, y: 0, z: 0 });
  age.setAttribute("text", {
    font: "aileronsemibold",
    color: "#290149",
    width: 2,
    height: 5,
    align: "center",
    value: `AGE : ${toy.age_group}`
  });

  mainPlane.appendChild(age);
}
})
},


getAllToys: async function(){
    return await firebase
      .firestore()
    .collection("toys")
    .get()
    .then(snap =>{
        return snap.docs.map(doc => doc.data());

    })
}
})