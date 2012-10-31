function pad(input) {
    if (input && input.toString().length < 2) return '0' + input.toString();
    else if (!input) return null;
    else return input.toString();
}

function format_dt(year, month, day, hour, minute, timezone) {
    var dt = $.map([year, month, day], function(i){return pad(i)}).join('-')
    if (hour) {
        dt = dt + 'T' + $.map([hour, minute], function(i){return pad(i || 0)}).join(':');
    }
    if (timezone) dt = dt + timezone;
    return dt;
}

function rating_stars(rating){
    var stars  = [];
    for(i = 0; i < 5; i++){
      if(i < rating) {
        stars += String.fromCharCode(parseInt('2605', 16));
      } else {
        stars += String.fromCharCode(parseInt('2606', 16));
      }
    }
    return stars
}