<?php

function shortcode_form_calculation($atts, $content = null) {

    $attributes = shortcode_atts([
        'tip' => 'default',
    ], $atts);

    // Using this div element to "inject" React from the id-attribute as an entry point
    return '
    <div>
        <div id="overlay"></div>
        <div id="modal-calculator"></div>
        <div id="cost-calculator-root"></div>
    </div>';
}


// This is a shortcode used to generate [shortcode_form-calculation] 
add_shortcode('react_form_calculation', 'shortcode_form_calculation');
