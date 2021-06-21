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

include_once('inc/custom-post-types/form-tax-vat-calculation.php');

include_once('inc/enqueue-style-and-scripts/enqueue-script-and-styles.php');

include_once('inc/menu-dashboard/menu-dashboard.php');

include_once('inc/rewrite-rules/custom-rewrite-rules.php');

include_once('inc/shortcode/react-shortcode-calculator.php');
