<?php
function post_route_api() {

    register_rest_route('cpt/v1', 'post-form-calculation', [
        'methods' => WP_REST_SERVER::CREATABLE,
        'callback' => 'post_result'
    ]);
}

function post_result($data) {
    $post_id = wp_insert_post([
        'post_type'     => 'cpt-form-calculation',
        'post_status'   => 'publish',
    ]);

    $updated_fields = [
        'id'             => $data['id'],
        'product_name'   => $data['product-name'],
        'net_amount'     => $data['net-amount'],
        'vat_rate'       => $data['vat-rate'],
        'currency'       => $data['currency'],
    ];

    foreach ($updated_fields as $field_selector => $field_value) {
        update_field($field_selector, $field_value, $post_id);
    }

    wp_update_post([
        'ID'         => $post_id,
        'post_title' => 'Form Calculation #' . $post_id
    ]);
}

add_action('rest_api_init', 'post_route_api');
