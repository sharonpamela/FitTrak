// import { NULL } from "mysql2/lib/constants/types";

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

  $(".remove").on("click", function (event) {
    event.preventDefault();

    var id = $(this).data("id");
    // Send the DELETE request.
    $.ajax("/train/delSets/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleting set", id);
        // Reload the page to get the updated list
        //location.reload();
        let tag = ".setDiv"+id;
        $(tag).hide();
      }
    );
  });

  $(".add-set").on("click", function (event) {
    event.preventDefault();

    var id = $(this).data("id");

    let newSet = {
      set_sequence: 0,
      repetitions: 0,
      completed: 0,
      user_id: 1,
      exercise_code: 200
    };
    // Send the POST request.
    $.ajax("/train/addSets/", {
      type: "POST",
      data: newSet
    }).then(
      function () {
        console.log("adding a set");
        let divID = "#appendSetDiv" + id;
        console.log(divID);
        $(divID).append("<form><label>Extra Set:</label> 10 reps <button class='removeButton edit' type='button' value='Edit'>Edit</button><button class='removeButton remove' type='button' value='Remove'>Remove</button><br></form>");

      }
    );
  });

  $(".startStop-button").on("click", function (event) {
    event.preventDefault();

    // change the text to stop
    var state = $(this).attr("data-state");
  
    if (state === "stopped") {
      // change button properties
      $(this).text("Stop Workout");
      $(this).attr("data-state", "started");

      //disable exit button
      $(".exit-button").prop('disabled', true);
      $(".exit-button").css("color", "gray");
      $(".exit-button").css("border-color", "gray");

      // enable set control buttons and alter color
      $(".enableOnStart").prop('disabled', false);
      $(".enableOnStart").css("color", "white");
      $(".enableOnStart").css("border-color", "white");

    } else if (state === "started"){
      
      //mark workout completed timestamp
      let id = 1;
      $.ajax("/train/fitplanDayCompleted/" + id, {
        type: "PUT",
        data: "SET TIMESTAMP"
      }).then(
        function () {
          console.log("finished workout");
        }
      );

      //disable this start/stop button
      $(this).prop('disabled', true);
      $(this).css("color", "gray");
      $(this).css("border-color", "gray");

      //enable exit button
      $(".exit-button").prop('disabled', false);
      $(".exit-button").css("color", "white");
      $(".exit-button").css("border-color", "white");
    }
  });

  $(".selectedPlan").on("click", function (event) {
    event.preventDefault();
    // add timestamp to startdate of current fitplan
    // Send the PUT request.
    let id = 1;
    $.ajax("/train/fitplanStart/" + id, {
      type: "PUT",
      data: "SET TIMESTAMP"
    }).then(
      function () {
        console.log("started workout");
      }
    );
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


