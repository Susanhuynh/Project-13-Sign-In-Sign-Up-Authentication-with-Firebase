function deleteDataFunc(){
    var deleteData = document.querySelectorAll(".deleteData");
    console.log(deleteData);
    deleteData.forEach(element => {
      element.addEventListener("click", (e) => {
        console.log(e.target);
      })
    });
}

window.addEventListener("load", function(){
    deleteDataFunc();
})

