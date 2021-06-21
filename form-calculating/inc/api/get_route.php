<?php

// This is optional if we need to use this API for the serving it on as the front-end in WordPress 

function get_route_api() {

    register_rest_route('cpt/v1', 'form-calculation', [
        'methods' => WP_REST_SERVER::READABLE,
        'callback' => 'get_post_results'
    ]);
}

function get_post_results($data) {
    $args = [
        'post_type' =>  'cpt-form-calculation',
        's'         =>  sanitize_text_field($data['search'])
    ];

    $form_calculation = new WP_Query($args);

    while ($form_calculation->have_posts()) {
        $form_calculation->the_post();
        $post_id = $form_calculation->ID;

        $cpt_post = [
            'title' => get_the_title(),
            'permalink' => get_permalink(),
        ];

        $cpt_fields = get_field('goods', $post_id);

        $form_calculation_results[] = array_merge($cpt_post, $cpt_fields);
    }

    return $form_calculation_results;
}

add_action('rest_api_init', 'get_route_api');
