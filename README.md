# Maintenance App

[![N|Solid](https://i.ibb.co/56g0cDq/Maintenance-Logo-1-21.png)](https://github.com/rrweil/MaintenanceApp)

A web application to create, track, and complete maintenance tickets for a school system with multiple campuses using React Router, React Hooks, React Context, C# ASP.NET, Entity Framework Core, and LINQ to SQL. 

## Pages

- The **Home Page** is where users log into the app. The app saves the user's name, email, and campus that they work in to minimize the required information for submitting new maintenance tickets.
- The **New Ticket Page** is where users can submit new maintenance tickets.
- The **All Tickets Page** displays the unresolved tickets for the campus that the user works in. Users can easily edit/update tickets and mark them as complete. Only the user who submitted the ticket can make these changes, but all staff can see that the ticket was submitted and is unresolved. All users can sort the unresolved tickets by their preferred criteria.

## To Run this Project: 
-	Clone the github repository and save it to your local device
-	Use the command line to navigate to the file location
-	Run the following prompts on the command line to set up the database
```sh
dotnet ef migrations add initial
dotnet ef database update
```
- 	Run the following prompts on the command line to build and run the project
```sh
dotnet watch run
```
