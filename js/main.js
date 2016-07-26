(function () {
  var group_events_from_the_past = function () {
    move_events_before(all_events_on_page(), new Date());
    unhide_non_empty_past_containers(all_past_containers_on_page());
  };

  var all_events_on_page = function () {
    return document.querySelectorAll(".events li");
  };

  var all_past_containers_on_page = function () {
    return document.querySelectorAll("details.hidden");
  };

  var move_events_before = function (all_events, threshold) {
    for (var i = all_events.length - 1; i >= 0; i--) {
      move_event_if_before(all_events[i], threshold);
    }
  };

  var move_event_if_before = function (event, threshold) {
    if (event_before(event, threshold)) {
      move_event_to_past_container(event);
    }
  };

  var event_before = function (event, threshold) {
    var start_time_element = event.querySelector("time");
    var start_date = new Date(start_time_element.getAttribute("datetime"));

    return start_date < threshold;
  };

  var move_event_to_past_container = function (event) {
    var service = event.getAttribute("data-service");
    var past_container = document.querySelector("#" + service + " .past.events");

    event.parentElement.removeChild(event);
    past_container.appendChild(event);
  };

  var unhide_non_empty_past_containers = function (past_containers) {
    for (var i = past_containers.length - 1; i >= 0; i--) {
      unhide_if_contains_events(past_containers[i]);
    }
  };

  var unhide_if_contains_events = function (container) {
    if (container.querySelector("li")) {
      container.classList.remove("hidden");
    }
  };

  var localize_time_on_page = function () {
    var elements = all_time_elements_on_page();
    localize_time_elements(elements);
  };

  var all_time_elements_on_page = function () {
    return document.querySelectorAll("time");
  };

  var localize_time_elements = function (time_elements) {
    for (var i = time_elements.length - 1; i >= 0; i--) {
      localize_time_element(time_elements[i]);
    }
  };

  var localize_time_element = function (element) {
    var datetime = element.getAttribute("datetime");
    var date = new Date(datetime);
    var localized_string = date.toLocaleDateString(undefined, {
      weekday: undefined, year: "numeric", month: "long", day: "numeric"
    });

    element.innerHTML = localized_string;
  };

  document.addEventListener("DOMContentLoaded", function () {
    group_events_from_the_past();
    localize_time_on_page();
  });
})();
