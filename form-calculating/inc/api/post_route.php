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

    // $sanitize_field = sanitize_text_field($data);

    $updated_fields['goods'] = [
        'product_id'            => $data['id'],
        'product_name'          => $data['product-name'],
        'gross_product_price'   => $data['gross-price'],
        'net_amount_price'      => $data['net-amount'],
        'tax_amount'            => $data['tax-amount'],
        'vat_rate'              => $data['vat-rate'],
        'currency_type'         => $data['currency'],

    ];

    foreach ($updated_fields as $field_selector => $field_value) {
        update_field($field_selector, $field_value, $post_id);
    }

    wp_update_post([
        'ID'         => $post_id,
        'post_title' => 'Form Calculation #' . $post_id
    ]);

    return $updated_fields;
}

add_action('rest_api_init', 'post_route_api');
