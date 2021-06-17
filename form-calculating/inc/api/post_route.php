<?php

function post_route_api() {

    register_rest_route('cpt/v1', 'form-calculation', [
        'methods' => WP_REST_SERVER::CREATABLE,
        'callback' => 'post_result'
    ]);
}

function post_result() {
    $args = [
        'post_type' =>  'cpt-form-calculation',
    ];

    $form_calculation = new WP_Query($args);

    $form_calculation_results = [];

    while ($form_calculation->have_posts()) {
        $form_calculation->the_post();

        $form_calculation_results[] = [
            'title'         => get_the_title(),
            'productName'   => update_field('product'),
            'netAmount'     => update_field('net_amount'),
            'vatRate'       => update_field('vat_rate'),
            'currency'      => update_field('currency'),
            'permalink'     => get_the_permalink(),
        ];
    }

    return $form_calculation_results;
}

add_action('rest_api_init', 'post_route_api');
