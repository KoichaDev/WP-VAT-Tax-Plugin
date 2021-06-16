<?php

function shortcode_form_calculation($atts, $content = null) {

    $attributes = shortcode_atts([
        'tip' => 'default',
    ], $atts);

    return '<div id="cost-calculator-root"></div>';
}


// will look something like this for shortcode [wpc] 
add_shortcode('react_form_calculation', 'shortcode_form_calculation');
