# Assignment
## About
A simple React application using data from [giosg reporting API](https://developers.giosg.com/reporting_http_api.html). A live demo can be accessed at [http://junior-frontend-assignment.herokuapp.com/](http://junior-frontend-assignment.herokuapp.com/).

![](https://i.imgur.com/LQlcXLp.png)

The user can input start date, end date and access token and then fetch the data from the API. The totals for the time range is then shown in the three large boxes and daily number are shown below in a table, with up to five days per page. 
The daily data can be sorted both ascending and descending by clicking on any of the table headers. When the user fetches the data the input values are saved to the local storage so that the next time the user loads the page the inputs will be populated.
The project uses React with TypeScript for static type checking.

## Prerequisites
    node.js (>=8.10)
    
## Building
    # Clone repo
    git clone https://github.com/robinkar/frontend-assignment.git
    
    # Navigate to repo
    cd frontend-assignment
    
    # Install deps
    npm install
    
    # Build production build
    npm run build
    
## Deploying
After building the contents of the build folder can be hosted on a web server. You can for example serve it with a static server.

    # Install static server
    npm install -g serve
    
    # Serve the build folder
    serve -s build
    
The application can then be accessed by default at http://localhost:5000.

## Browser support
The application has been tested and working in Firefox 73, Chrome 80 and Edge 42.
    