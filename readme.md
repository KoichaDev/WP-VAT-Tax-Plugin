# Godt Sagt AS Assignment



## 📝 Task Assignment:

 

> Prepare a plugin that will allow you (by using the "shortcode") to add a form calculating the gross amount and tax amount
>
> The form should contain:
>
> 1. Product name [Text field],
> 2. Net amount [Numeric field],
> 3. Currency [Pole select, You can choose NOK, PLN, EUR, USD]
> 4. Selectable VAT rate [25%, 23%, 22%, 8%, 7%, 5%, 0%]
> 5. Calculate button
> 6. All fields are required.
>
> After completing the form, the following information should be displayed: 
>
> 1. “Gross product price is: X
> 2. Net product price is: Y
> 3. Tax amount is Z”.
>
> The data from the form should be saved in the database based on the custom post type. The form should be based on one of the javascript Vue or React frameworks. The form should be written in Vanilla js without using jQuery.



## 👨‍💻 Getting Started



### 1. Clone this project into WP plugin folder:

```
cd wp-content/plugin/[copy-the-plugin-here]
```

This repo contains Advanced Custom Fields and my custom plugin I created for this assignment 



### 2. Import Advanced Custom Fields .json file

The file of this project includes `acf-export-form-tax-vat-calculation.json` file. This json file contains all the custom field is used for this project.  



![2021-06-21_21-07-57](https://i.ibb.co/frtFW01/2021-06-21-21-07-57.jpg)



![2021-06-21_21-09-05](https://i.ibb.co/zS1WVvB/2021-06-21-21-09-05.jpg)



![2021-06-21_21-08-38](https://i.ibb.co/LSMpTZp/2021-06-21-21-08-38.jpg)



![2021-06-21_21-10-08](https://i.ibb.co/yWHG31C/2021-06-21-21-10-08.jpg)



![2021-06-21_21-10-42](https://i.ibb.co/ZTPXF0X/2021-06-21-21-10-42.jpg)



![2021-06-21_21-11-23](https://i.ibb.co/gJRCH1v/2021-06-21-21-11-23.jpg)



### 3. Install React dependencies and other packages 

Navigate to the JavaScript folder

```
cd wp-content/plugins/form-calculating/frontend
```

Install dependency

```
npm install
```

If you use yarn:

```
yarn install
```



### 4. Run the Frontend Code

For development

```
npm run dev
```



## How this plugin works



The file is distinguished between backend and frontend folder, so it's easier to differential how the decision of the coding workflow. 

### Back-end

------

The backend folder will act on everything that is related to the WordPress setup and is not directly touched with the front-end. The WordPress will handle all the heavy lifting when it comes to:

1. Creating a custom plugin which will activate a custom post type automatically and activating the plugin to work with the React
2. Storing data into the WordPress database when using React as front-end framework to do POST HTTP Request against WordPress REST API
3. Enqueuing (Loading) the JavaScript and CSS files for the React framework
4. Creating a shortcode to "inject" the React framework/library  

### Advanced Custom Fields   

------

In this assignment, I decided to use the popular [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/) to create the field which will contains:

1. Product ID
2. Product Name
3. Gross Product Price
4. Net Amount Price
5. Tax Amount
6. Currency Types
7. VAT Rate


Even the assignment said explicitly to present only **“Gross product price is, Net product price and Tax amount is Z”.**  I feel it's fair to add a bit extra more fields. We want to simulate as an end user to get extra information which doesn't always hurts.

I created a custom WP REST API that is connected with the ACF. The goal is to use the REST API with the ACF so we can do POST HTTP Request using Vue, React or any other frameworks out there.    

### WP REST API

------

There are two files that will handle my custom WordPress REST API. 

1. GET Request
2. POST Request 

The GET API is optional we can use to fetch data from the WP and present it to the front-end. Those data will of course be displayed on the front-end as long as end-user is using the custom plugin to insert the TAX and VAT form calculation. 

The POST API is where we want React to communicate with the WordPress to send POST HTTP Request. The POST HTTP Request will be sent if the end user accepts to the calculation is corrected.



## Front-end

In this assignment, I decided to use React as framework for handling all the heavy lifting of the form calculation. 

The design of the form isn't really particularly beautiful, but the most important is the business logic is working for this assignment.



### The workflow

------

As the assignment stated. I have created a custom shortcode in PHP where this shortcode is the entry point for "injecting" the React into the DOM element. The React will use the form calculation for calculating, Tax, VATs price, net price and tax amount. 

In order for the React to work, I used [Parcel.js](https://parceljs.org/) to make sure React could work. I also included the popular [SASS package](https://www.npmjs.com/package/sass) for the React as well [React UUID](https://www.npmjs.com/package/react-uuid) to create unique ID for the Product price that is going to be sent to the WP database. You could think of the UUID is the unique ID linked for each post(s) of the custom post type, even we actually have the unique ID generated on the back-end already from the WP.



### Currency Data

------

Originally I decided to use free currency API by googling around on the internet, but I decided to hold off, because there was limited request and since I am developing this application, there will be many API calls to test and could lead to application not working, also I don't want to take the risk that if the API from the third-party not working for the assignment, then it could lead to application not working as intended for this assignment.

I decided instead to hardcoded currency for NOK, USD, EURO and PLN. Those currency number is based from the google search I did for example "1 USD to NOK". That lead me to 1 NOK =  0.12USD for example. I also did it with 1EUR to USD etc. This lead me to create a dummy/mock-data `currencyExchange.json` file I could use to convert target net amount to converted final currency net amount for this calculator plugin. 



### Context API with useReducer vs useState-hook

------

I started out with the useState-hook, but I noticed that the more I started to develop this project, the more it started to be cumbersome with all the useState-hook management by sending the state(s) either down to child component or up (lifting up the state) from child to parent component. 

The end result actually working fine as the application for the React, but for developing experience, it wasn't all that good in my opinion. You could look at this commit here to see the "end result" of the `useState`. It's not 100% fine-tuned compared to the latest git commit when I decided to use the Context API with `useReducer` . 

We could argue that using the `useReducer`-hook is actually an overkill for this assignment, since it's pretty small application for the front-end, but the reason I decided to go this route is due to the file, folder and code development experience is easier to handle and scalable working with the logic and JSX with each React component. Each of the component could be more focused and be good at something instead of sending states, aka. prop drill, or doing couple movements of lifting-up-the-state. Of course, the `useReducer` is not meant to replace the `useState`, instead I am combining `useReducer` with `useState`.    

Using the Context API with `useReducer`-hook lead me for example a component that is called `addProductName.js`. That component is solely focused on only adding  product name in combine with `ueState`. If I really need to use the product name state to get the name of the product, I could use my Context API and call it on other component for example `RegisterItem.js` directly by using `useContext` thanks to `ItemProvider` that I created to hold the state(s) with Context API.



### custom useHTTP-Hook 

------

This custom hook component might look too excessive, because it's only used for post HTTP Request, instead I could just use the easier route async/await with fetch. I decided to keep custom useHTTP-hook because it demonstrates that I could use this custom hook to do GET request from a free currency API if needed. This custom hook can also do PUT/DELETE as well.  







