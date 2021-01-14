# J Clarke Management Report
[Link to Hosted Website](https://dry-journey-02805.herokuapp.com/) <br>
[Link to Website GitHub Repository](https://github.com/manopanashe/assignment) <br>

# Introduction
J Clarke is a global retail Company that has over 40 store branches across the world. Its stores are unique in many ways however the Administration for the company keeps logs for the store branches based on their numbers and locations and other various information and now these logs are stored into separate CSV files. Due to Covid-19, it has become less efficient for the company to have their store detail logs in these separate files and this has also made the data they need  less accessible for them. To solve this problem, I developed a proof-of-concept Web-application that moves these processes online. 
# System Overview
The J Clarke web-application will be a management portal for the company. It provides the administration a more efficient way to keep track of their branches during COVID-19 times. The application will contain appropriate tools that will allow them to be able to broadcast important company news or information and it will also help them to efficiently store and retrieve information about their store branches. <br>
![system diagram](/assets/System-diagram.png) <br>
The proposed application will be using The MVC architecture. The architecture separates the application logic into three-part Model, Controller and View. As seen in the System Architecture diagram above, the model stores and manages data from the database. The view effectively provides the user interface of the application it contains all the functionality that directly interacts with the user. The controller connects the new and the model. it converts user input from the view  into to demands for the model to  retrieve or update data. The application will use a Non-relational database through mongo DB which is a document-based database that stores data in JSON-like documents.  <br>

The database uses an existing dataset from the log details  which were previously stored in three CSV documents. As seen in the image above mongo then converts the data in the files into database objects which can then be accessed by the Model. The users should be able to access this data and interact with it on the browser. As seen in the image below the managers should be able to view data about the store as it is stored in the database and should be able to use Create, Update and Delete node functions on the data. 
![interface-diagram](/assets/interfaces.PNG)

# Key Design Choices
Before developing the application, I first designed wireframes for the view layer for the application. The first page that the users will see when they visit the webpage will be the index page. 

![index page](/assets/index-ejs.PNG)
The page will use bootstrap blog style. it will have generic information that will be public to all the managers that visit the site whether they are logged into the site or not. 

![register page diagram](sign-up.png)
If the users are new to the site, they should register as a new user to enter the site. They will need to enter a valid email and construct a valid password; the password will then be stored in the system. 
![log in page diagram](log-in.png)
Once the user has been stored, they will be able to log into website. they should enter the email and password that they registered which will allow them access to the site. 
![store logs diagram](store-logs-page.png)
The next step will be the store log page. This page will allow the users to be able to perform CRUD operations on the data that is stored in store collection that is in the database.

![sale logs diagram](sale-logs-page.png)
The next page will the page dedicated to the sale collection that is in the database. The page will allow the users to perform CRUD operations on the database objects. 

![features logs diagram](weekly-store-logs-page.png)
This page will allow the users to enter more details about the database objects, that are already stored in the database collections. The user will also be able to perform CRUD operations, 

![create new log page diagram](create-log.png)
This page allows the users to be able to create new logs. They will be asked to enter details about and then they will submit form back to the webserver. 
![Update log diagram](update-log.png)
This page also allows the user to update existing logs in the database. it will retrieve the existing database object and allow the user to edit. The page will then take the edited log and return it to the database. 

# Database Design
![store dataset diagram](store-dataset.png)
The company previously stored its logs into excel sheets that were saved as CSV file. As seen in the image above this is one of the files that stored the store data logs. For this concept application I used MongoDB's model document which  are constructed using flexible JSON-like document. It also provides all the capabilities needed for complex requirements. <br>
![mongo database diagram](mongo.png)<br>
![mongo-object diagram](mongo-object.png)<br>
After retrieving the three documents I then created three collections a database that has 3 collections. The collections are then inserted with the records from the documents.  

# Security and Scalability
The application will be receiving  users’ passwords and their emails when they register to their site which means that it needs to be secured to make sure that in the event of a data breach their information will be secured. To accomplish this the application will use hash algorithm to store the user’s passwords into a database. <br>
![hash architecture diagram](hash-algorithim.png)<br>
As seen in the image above when the users enter their passwords into the application registration form, this will be applied to the hash algorithm that will encrypt the password and store it into a database. The application will use the bcrypt hash function which incorporates a salt protection to protect the hash functions against rainbow table and it is resistant against brute force attacks due to its slow speed. <br>
 
I also made sure that the application would be able to withstand any amount of  workload. This was done through using the MVC architectural pattern which separates the application into three parts and allows the application to send specific aspects to their designated component. 

# Conclusion and Reflection
Overall, the proposed concept will be able to meet most of the requirements that the company requires for their web application. They will be able to access their data and interact with it much more easily. However, the application is a low-level application and requires frequent management and updating to be able to store more of the data that will be accumulated by the company into the database. The application also has low-quality usability as some of the data still can be accessed by users that are not logged into the application. 

