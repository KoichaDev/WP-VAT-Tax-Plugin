<?php
function post_route_api() {

    register_rest_route('cpt/v1', 'form-calculation', [
        'methods' => WP_REST_SERVER::CREATABLE,
        'callback' => 'post_result'
    ]);
}

function post_result($data) {
    $post_id = wp_insert_post([
        'post_type'     => 'cpt-form-calculation',
        'post_title'    => 'form_calculation',
        'post_stattus'  => 'publish',
    ]);

    $updated_fields = [
        'productName'   => $data['product-name'],
        'netAmount'     => $data['net-amount'],
        'vatRate'       => $data['vat-rate'],
        'currency'      => $data['currency'],
        'permalink'     => get_post_permalink($post_id),
    ];

    foreach ($updated_fields as $field_seletor => $field_value) {
        update_field($field_seletor, $field_value, $post_id);
    }
}

add_action('rest_api_init', 'post_route_api');
