<?php

function get_route_api() {

    register_rest_route('cpt/v1', 'form-calculation', [
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'get_result'
    ]);
}

function get_result($data) {
    $args = [
        'post_type' =>  'cpt-form-calculation',
        's'         =>  sanitize_text_field($data['search'])
    ];
    $form_calculation = new WP_Query($args);

    $form_calculation_results = [];

    while ($form_calculation->have_posts()) {
        $form_calculation->the_post();

        $form_calculation_results[] = [
            'title'         => get_the_title(),
            'productName'   => get_field('product'),
            'netAmount'     => get_field('net_amount'),
            'vatRate'       => get_field('vat_rate'),
            'currency'      => get_field('currency'),
            'permalink'     => get_the_permalink(),
        ];
    }

    return $form_calculation_results;
}

add_action('rest_api_init', 'get_route_api');
