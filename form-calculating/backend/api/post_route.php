<?php
if (!function_exists('gs_post_route_api')) {

    function gs_post_route_api() {

        register_rest_route('cpt/v1', 'post-form-calculation', [
            'methods' => WP_REST_SERVER::CREATABLE,
            'callback' => 'post_result',
        ]);
    }

    function post_result($data) {
        $post_id = wp_insert_post([
            'post_type'     => 'cpt-form-calculation',
            'post_status'   => 'publish',
        ]);

        $updated_fields['goods'] = [
            'product_id'            => sanitize_text_field($data['id']),
            'product_name'          => sanitize_text_field($data['product-name']),
            'gross_product_price'   => sanitize_text_field($data['gross-price']),
            'net_amount_price'      => sanitize_text_field($data['net-amount']),
            'tax_amount'            => sanitize_text_field($data['tax-amount']),
            'vat_rate'              => sanitize_text_field($data['vat-rate']),
            'currency_type'         => sanitize_text_field($data['currency']),

        ];

        foreach ($updated_fields as $field_selector => $field_value) {
            update_field($field_selector, $field_value, $post_id);
        }

        wp_update_post([
            'ID'         => $post_id,
            'post_title' => $data['product-name']
        ]);

        $post = [
            'title' => get_the_title($post_id),
        ];

        return array_merge($post, $updated_fields);
    }

    add_action('rest_api_init', 'gs_post_route_api');
}
