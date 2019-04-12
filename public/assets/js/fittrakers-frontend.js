// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {


  $(".remove").on("click", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    router.delete("/train", function (req, res) {
      let condition = "id = " + req.params.id;

      console.log(req.params.id);
      // set.deleteSet(condition, function (result) {
      //   if (result.affectedRows == 0) {
      //     // If no rows were changed, then the ID must not exist, so 404
      //     return res.status(404).end();
      //   } else {
      //     res.status(200).end();
      //   }
      // });
    });
  });

});// end of load func



    // $(".create-set").on("submit", function(event) {
    //   // Make sure to preventDefault on a submit event.
    //   event.preventDefault();

    //   let newBurger = {
    //     burger_name: $("#burger-name").val().trim(),
    //     devoured: 0
    //   };

    //   // Send the POST request.
    //   $.ajax("/addSets", {
    //     type: "POST",
    //     data: newBurger
    //   }).then(
    //     function() {
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });

    // $(".changeEatStatus").on("click", function(event) {

    //   let id = $(this).data("id");
    //   //let justDevoured = $(this).data("devoured");

    //   let newEatenState = {
    //     devoured: 1
    //   };

    //   // Send the PUT request.
    //   $.ajax("/api/burger/" + id, {
    //     type: "PUT",
    //     data: newEatenState
    //   }).then(
    //     function() {
    //       console.log("changed eaten state to", newEatenState);
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });


    // $(".changeEatStatus").on("click", function(event) {
    //   var id = $(this).data("id");
    //   var newSleep = $(this).data("newsleep");

    //   console.log("clicked a sleep button");
    //   var newSleepState = {
    //     sleepy: newSleep
    //   };

    //   // Send the PUT request.
    //   $.ajax("/api/burger/" + id, {
    //     type: "PUT",
    //     data: newSleepState
    //   }).then(
    //     function() {
    //       console.log("changed sleep to", newSleep);
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });

    // $(".delete-cat").on("click", function(event) {
    //   var id = $(this).data("id");

    //   // Send the DELETE request.
    //   $.ajax("/api/cats/" + id, {
    //     type: "DELETE"
    //   }).then(
    //     function() {
    //       console.log("deleted cat", id);
    //       // Reload the page to get the updated list
    //       location.reload();
    //     }
    //   );
    // });


