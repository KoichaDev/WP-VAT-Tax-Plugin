<?php
if (!function_exists('gs_form_calculation')) {

    function gs_form_calculation() {
        $svg = '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="calculator" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-calculator fa-w-14 fa-2x"><path fill="currentColor" d="M400 0H48C22.4 0 0 22.4 0 48v416c0 25.6 22.4 48 48 48h352c25.6 0 48-22.4 48-48V48c0-25.6-22.4-48-48-48zm0 464H48V208h352v256zm0-304H48V48h352v112zM108.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8v-38.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v38.4c0 6.4 6.4 12.8 12.8 12.8zm192 96h38.4c6.4 0 12.8-6.4 12.8-12.8V268.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm-192 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-38.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v38.4c0 6.4 6.4 12.8 12.8 12.8zm96-96h38.4c6.4 0 12.8-6.4 12.8-12.8v-38.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v38.4c0 6.4 6.4 12.8 12.8 12.8zm0 96h38.4c6.4 0 12.8-6.4 12.8-12.8v-38.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v38.4c0 6.4 6.4 12.8 12.8 12.8z" class=""></path></svg>';

        add_menu_page(
            'Calculate Tax/Vat',
            'Calculate Tax/Vat',
            'manage_options',
            'calculate_tax_vat',
            'init_menu',
            'data:image/svg+xml;base64,' . base64_encode($svg),
            10
        );

        function init_menu() {
            // injecting the shortcode for using React framework here
            echo do_shortcode('[react_shortcode_form_calculation]');
        }
    }
    add_action('admin_menu', 'gs_form_calculation');
}
