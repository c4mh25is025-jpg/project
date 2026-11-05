# AngularJS Employee Directory

This standalone example converts the React reference directory into plain HTML, CSS, and AngularJS 1.x. It includes sample data for eight employees; replace the controller's `employees` array in `app.js` with your service or API data.

## Run it

Open `index.html` through a local static web server. AngularJS and the display fonts are loaded from CDNs, so the page needs an internet connection. No React or Vite build is required for this folder.

## Use in an existing AngularJS app

1. Copy `styles.css` into your app's styles and include it in the page.
2. Copy the directory markup from `index.html` into the appropriate view/template, omitting the document wrapper and external script tags.
3. Register the controller and sample employee data from `app.js` in your existing AngularJS module, or adapt it to your app's services.
4. Keep one `ng-app` on the host page. Do not nest AngularJS application roots.

The example supports text search, department/location/status filters, sorting, card/table layouts, employee details, adding a sample employee, and CSV export. AngularJS 1.x is end-of-life; use it only where it is already required by the host project.
