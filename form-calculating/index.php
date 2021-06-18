<?php

/**
 * Plugin Name
 *
 * @package PluginPackage
 * @author Khoi Hoang
 * @copyright 2021 Khoi Hoang
 * @license GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name: Form calculation for tax
 * Plugin URI: https://www.godtsagt.no/
 * Description: Form to calculate the gross amount and tax amount
 * Version: 1.0.0
 * Requires at least: 5.2
 * Requires PHP: 7.2
 * Author: Your Name
 * Author URI: khoii87@gmail.com
 * Text Domain: plugin-slug
 * License: GPL v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

if (!defined('ABSPATH')) {
    exit;
}

include_once('inc/api/get_route.php');

include_once('inc/api/post_route.php');

include_once('inc/custom-post-types/cpt_form_calculation.php');

include_once('inc/custom-plugin/menu_dashboard.php');

include_once('inc/enqueue-style-and-scripts/enqueue_react_script.php');

include_once('inc/shortcodes/cost-calculator.php');

// ! This is to automatic flushing of the WordPress rewrite rules
// ! Ideally, this is not optimal to do it, since it's an expensive operation so it should only be used when necessary.
// ! Since this is a testing assignment purpose, I just to ensure that the CPT is actually working without 
// ! you have go to settings -> permalinks -> save changes in order to let the CPT work
// ! Source: https://developer.wordpress.org/reference/functions/flush_rewrite_rules/

function custom_rewrite_rules() {
    flush_rewrite_rules();
}
add_action('init', 'custom_rewrite_rules');
