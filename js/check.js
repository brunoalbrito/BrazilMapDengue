$(document).ready(function(){
    // the selector will match all input controls of type :checkbox
// and attach a click event handler 
$("form").on("click", "input", function()  {
  // in the handler, 'this' refers to the box clicked on
  if (this.checked) {
    // the name of the box is retrieved using the .attr() method
    // as it is assumed and expected to be immutable
    var group = "input:checkbox[name='" + $(this).attr("name") + "']";
    // the checked state of the group/box on the other hand will change
    // and the current value is retrieved using .pr(op() method
    $(group).prop("checked", false);
    $(this).prop("checked", true);
  } else {
    $(this).prop("checked", false);
  }
});
})