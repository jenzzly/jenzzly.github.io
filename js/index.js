function clearContents(e) {
    e.value="",
    $.notify( {
        title: "Welcome:", message: "To World Wide Trends, We would love to read some of the links from you :). Click on share button and paste your link"
    }
    , {
        element:"body", position:null, type:"info", allow_dismiss:!0, newest_on_top:!1, showProgressbar:!1, placement: {
            from: "top", align: "center"
        }
        , offset:40, spacing:10, z_index:1031, delay:5e3, timer:1e3, url_target:"_blank", mouse_over:null, animate: {
            enter: "animated fadeInDown", exit: "animated fadeOutUp"
        }
    }
    )
}
$('.btn-success').click(function() {
    $('#postModal').modal('hide');
  }
);
