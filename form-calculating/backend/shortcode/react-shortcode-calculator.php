<?php
if (!function_exists('gs_react_shortcode_calculator')) {

    function gs_react_shortcode_calculator() {
        // Using this div element to "inject" React from the id-attribute as an entry point
        // Also the two first element is added behind the #cost-calculator-root is to give better accessibility for screen readers
        // instead of adding it inside nested div elements 
        return '
    <div>
        <div id="backdrop-portal"></div>
        <div id="register-item-portal"></div>
        <div id="cost-calculator-root"></div>
    </div>';
    }


    //   Generating shortcode [react_shortcode_form_calculation]
    add_shortcode('react_shortcode_form_calculation', 'gs_react_shortcode_calculator');
}
